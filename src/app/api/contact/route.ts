import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Simple in-memory rate limiting map
// Keys: IP, Values: [count, timestamp]
const rateLimit = new Map<string, [number, number]>();

const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);
  if (!record) {
    rateLimit.set(ip, [1, now]);
    return true;
  }
  
  const [count, timestamp] = record;
  if (now - timestamp > WINDOW_MS) {
    rateLimit.set(ip, [1, now]);
    return true;
  }
  
  if (count >= LIMIT) {
    return false;
  }
  
  rateLimit.set(ip, [count + 1, timestamp]);
  return true;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, subject, message, honeypot } = body;

    // Honeypot check
    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    // Validation
    if (!name || name.trim().length < 2 || name.length > 80 ||
        !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120 ||
        !message || message.trim().length < 10 || message.length > 2000) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Env check
    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL || !process.env.CONTACT_TO_EMAIL) {
      console.error('Missing email environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const finalSubject = subject ? `New portfolio message — ${subject}` : 'New portfolio message — no subject';

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: finalSubject,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || 'N/A'}\n\nMessage:\n${message}\n\nTimestamp: ${new Date().toISOString()}\nIP: ${ip}`,
      html: `
        <h3>New message from your portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
        <hr />
        <small>Timestamp: ${new Date().toISOString()} | IP: ${ip}</small>
      `
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
