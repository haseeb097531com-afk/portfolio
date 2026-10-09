# Troubleshooting Guide

A quick reference for the 6 most common issues you might face post-launch.

### 1. "I pushed my code but the live site didn't change."
- **Wait 1-2 minutes**: Vercel takes a moment to build. Check Vercel -> Deployments for the status.
- **Check for build errors**: If the deployment failed, click the log in Vercel, find the red error line, fix it locally, and push again.
- **Clear cache**: Hard-refresh your browser (`Ctrl+Shift+R` or `Cmd+Shift+R`).

### 2. "The contact form stopped sending emails."
- Check your [Resend dashboard](https://resend.com) to ensure your API key is still active.
- Check Vercel -> Settings -> Environment Variables. Ensure `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` are all set exactly as they appear in your local `.env.local`.
- Check your spam folder.

### 3. "A section completely disappeared."
- **This is by design!** Every item has a visibility rule. If an item has `confirmed: false` or contains the exact text `"TODO"`, it hides itself to prevent fake data from leaking.
- **Fix**: Fill in real data and set `confirmed: true`.

### 4. "An image looks stretched or blurry."
- Always keep the aspect ratio intact before uploading. Do not upscale small images.
- For projects, ensure your screenshot is roughly a 16:9 ratio and saved as a compressed WebP format.

### 5. "The site is slow."
- The most common cause is a massive image file in the hero section or project gallery. Re-export your images to be smaller (under 500KB is ideal) and use WebP format.
- Run a Lighthouse audit in Chrome to pinpoint the exact bottleneck.

### 6. "The domain isn't loading."
- Check DNS propagation on [dnschecker.org](https://dnschecker.org) to ensure your A record or CNAME is active globally.
- SSL certificates usually issue immediately, but can take up to 24 hours. Check Vercel -> Domains for specific errors.
