"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { siteData } from '@/data/site';

export function ContactForm() {
  const { form } = siteData.contact;
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  if (!form.enabled) return null;

  const validate = (formData: FormData) => {
    const newErrors: Record<string, string> = {};
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || name.trim().length < 2) newErrors.name = "Name must be at least 2 characters.";
    else if (name.length > 80) newErrors.name = "Name is too long.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) newErrors.email = "Please enter a valid email.";
    else if (email.length > 120) newErrors.email = "Email is too long.";

    if (!message || message.trim().length < 10) newErrors.message = "Message must be at least 10 characters.";
    else if (message.length > 2000) newErrors.message = "Message is too long.";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrors({});
    
    const formData = new FormData(e.currentTarget);
    const formEl = e.currentTarget;
    
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('idle');
      
      const firstInvalid = Object.keys(validationErrors)[0];
      const el = document.getElementById(firstInvalid);
      if (el) el.focus();
      return;
    }

    try {
      const response = await fetch(form.actionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      setStatus('success');
      formEl.reset();
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div role="status" className="flex flex-col items-center justify-center p-8 h-full min-h-[400px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl text-center">
        <CheckCircle2 size={48} className="text-[var(--color-accent)] mb-6" />
        <h3 className="text-2xl font-heading font-semibold text-[var(--color-text)] mb-2">Message Sent</h3>
        <p className="text-[var(--color-muted)] mb-8 max-w-sm">{form.successMsg}</p>
        <button 
          onClick={() => setStatus('idle')}
          className="px-6 py-3 rounded-full bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 md:p-8 relative min-h-[400px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
        
        {/* Honeypot */}
        <div aria-hidden="true" className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden">
          <label htmlFor="honeypot">Leave this field empty</label>
          <input type="text" id="honeypot" name="honeypot" tabIndex={-1} autoComplete="off" />
        </div>

        {status === 'error' && (
          <div role="alert" className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <p>{form.errorMsg}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-[var(--color-text)]">Name *</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              disabled={status === 'loading'}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`w-full px-4 py-3 rounded-xl bg-[var(--color-background)] border ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-[var(--color-border)] focus:border-[var(--color-accent)]'} text-[var(--color-text)] placeholder-[var(--color-muted)]/50 focus:outline-none focus:ring-1 ${errors.name ? 'focus:ring-red-500' : 'focus:ring-[var(--color-accent)]'} transition-colors`}
              placeholder="John Doe" 
            />
            {errors.name && <span id="name-error" className="text-xs text-red-400 mt-1">{errors.name}</span>}
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-[var(--color-text)]">Email *</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              disabled={status === 'loading'}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`w-full px-4 py-3 rounded-xl bg-[var(--color-background)] border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-[var(--color-border)] focus:border-[var(--color-accent)]'} text-[var(--color-text)] placeholder-[var(--color-muted)]/50 focus:outline-none focus:ring-1 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-[var(--color-accent)]'} transition-colors`}
              placeholder="john@example.com" 
            />
            {errors.email && <span id="email-error" className="text-xs text-red-400 mt-1">{errors.email}</span>}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="subject" className="text-sm font-medium text-[var(--color-text)]">Subject (Optional)</label>
          <input 
            type="text" 
            id="subject" 
            name="subject" 
            disabled={status === 'loading'}
            className="w-full px-4 py-3 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] focus:border-[var(--color-accent)] text-[var(--color-text)] placeholder-[var(--color-muted)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
            placeholder="How can we collaborate?" 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-medium text-[var(--color-text)]">Message *</label>
          <textarea 
            id="message" 
            name="message" 
            rows={5}
            disabled={status === 'loading'}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`w-full px-4 py-3 rounded-xl bg-[var(--color-background)] border ${errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-[var(--color-border)] focus:border-[var(--color-accent)]'} text-[var(--color-text)] placeholder-[var(--color-muted)]/50 focus:outline-none focus:ring-1 ${errors.message ? 'focus:ring-red-500' : 'focus:ring-[var(--color-accent)]'} transition-colors resize-none`}
            placeholder="Tell me about your project..."
          />
          {errors.message && <span id="message-error" className="text-xs text-red-400 mt-1">{errors.message}</span>}
        </div>

        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="mt-4 flex items-center justify-center gap-2 w-full px-8 py-4 rounded-xl bg-[var(--color-accent)] text-black font-bold tracking-wide hover:shadow-[0_0_20px_rgba(10,252,219,0.3)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>

      </form>
    </div>
  );
}
