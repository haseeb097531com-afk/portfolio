# Deployment & Operations Guide

## Stack Summary
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Email**: Resend
- **Hosting**: Vercel (Recommended)

---

## Local Development
1. **Clone the repository** and navigate to the project root.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up Environment Variables**:
   Copy `.env.example` to `.env.local` and fill in your details:
   ```bash
   cp .env.example .env.local
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## Environment Variables
- `RESEND_API_KEY`: Your private Resend API key for sending contact emails.
- `CONTACT_FROM_EMAIL`: The verified sender email (e.g., `Portfolio <no-reply@yourdomain.com>`).
- `CONTACT_TO_EMAIL`: The email address where you want to receive contact form submissions.
- `NEXT_PUBLIC_SITE_URL`: The absolute URL of your live production site (e.g., `https://yourdomain.com`). Used for SEO metadata and sitemap generation.

*(Never commit actual values for these variables to your repository!)*

---

## Deploying to Vercel
This site is optimized for Vercel auto-deployment.
1. Push your code to your GitHub (or GitLab/Bitbucket) repository.
2. Log into [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your repository. Vercel will automatically detect the Next.js framework.
4. **Environment Variables**: Open the "Environment Variables" toggle and add the keys from your `.env.local` file.
5. Click **Deploy**. Vercel will now automatically redeploy the site whenever you push changes to the `main` branch.

---

## Custom Domain
1. In Vercel, navigate to your Project -> **Settings** -> **Domains**.
2. Add your custom domain (e.g., `yourdomain.com`).
3. Vercel will provide DNS records. Log into your domain registrar (e.g., Namecheap, GoDaddy) and add the provided A record (for the apex domain) and CNAME (for `www`).
4. Once DNS propagates, Vercel will automatically provision a free SSL certificate.
5. **CRITICAL**: Update `NEXT_PUBLIC_SITE_URL` in Vercel to match your final domain exactly (e.g. `https://yourdomain.com`). Redeploy the site to apply it.

---

## Email API (Resend)
- **Provider**: [Resend](https://resend.com)
- **Where the key lives**: Vercel Environment Variables (`RESEND_API_KEY`).
- **How to rotate**: If your key is compromised, immediately log into Resend, revoke the old key, generate a new one, update the Vercel Environment Variable, and manually trigger a redeploy in Vercel.

---

## Updating Content
Your entire portfolio content is managed in `src/data/site.ts`.

- **To show an item**: Set `confirmed: true` and ensure text fields do **NOT** contain the string `"TODO"`.
- **To hide an item**: Set `confirmed: false` or put `"TODO"` back into its text fields.
- **Projects**: To publish a new project, add a new object to the `items` array under the `projects` section. It will automatically generate its own detail page route (`/projects/[slug]`).
- **Testimonials**: Add a new object to the `testimonials` section. 

The site enforces strict visibility rules. If a section has 0 visible items, the entire section (and its navigation link) will safely disappear.

---

## Rollback
If a bad update gets deployed:
1. Go to your Vercel Project Dashboard.
2. Click on **Deployments**.
3. Find the last known good deployment.
4. Click the three dots (options) next to it and select **Promote to Production**.

---

## Common Issues
- **Contact form is hanging or showing errors**: Double check that `RESEND_API_KEY` is correct in Vercel, and that you have verified the `CONTACT_FROM_EMAIL` domain inside the Resend dashboard.
- **Sitemap / SEO sharing links pointing to localhost**: You forgot to set `NEXT_PUBLIC_SITE_URL` in Vercel production environment variables. Update it and redeploy.
- **Images not loading or looking squished**: Ensure images are placed in the `public` folder and their paths correctly match in `site.ts`. 

---

**Admin Contact**: *Hafiz Muhammad Haseeb*
