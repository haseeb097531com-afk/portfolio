# Owner's Manual

This site is Hafiz Muhammad Haseeb's portfolio: a cinematic showcase of your work as a Full Stack Developer & Quran teacher.

## 📁 Where everything lives
- **`src/data/site.ts`** → all text, projects, journey, testimonials, contact, cinematic flags.
- **`src/components/sections/`** → visual sections (Hero, About, Projects, etc.).
- **`src/components/cinematic/`** → preloader, cursor, HUD, accent visual.
- **`public/`** → images, favicon, OG image.
- **`.env.local`** → secrets (never commit).

## ✍️ How to manage content
* **How to change text**: Edit `site.ts`, save, push.
* **How to add a project**: Add your screenshots to `public/images/projects/<slug>/`. Then open `site.ts`, add a new project block, fill in the real values, and remove every `"TODO"`.
* **How to add a testimonial**: Ensure you have permission to use the real review, add it to `site.ts`, and set `confirmed: true`.
* **How to add a journey milestone**: Add the real year and place to `site.ts`, and set `confirmed: true`.
* **How to update contact info**: Remove `"TODO"` and put in your real email/number in `site.ts`.
* **How to toggle cinematic features**: Open `site.ts`, find the `cinematic` block, and change `true` to `false` for any feature you wish to disable.
* **How to publish**: Run `git add . && git commit -m "Update content" && git push` in your terminal. Vercel will automatically detect the push and deploy.
* **How to roll back**: Go to your Vercel Dashboard → Deployments → click the three dots on the previous working deployment → Promote to Production.

**CRITICAL RULE:** If any field still contains the exact word `"TODO"` or has `confirmed: false`, that item will automatically hide itself on the live site. This is by design to ensure fake data never accidentally publishes.

---

## 🛠️ Troubleshooting

- **Site renders unstyled (like a white page)**: Tailwind/globals.css broke. See Step 18. Check globals.css is imported in layout.tsx, content paths in tailwind.config.ts, and .next/ cache is cleared.
- **Contact form stops sending**: Check Resend key, Vercel env vars, spam folder.
- **A section disappeared**: All its items are TODO or confirmed: false. Fill real data and confirm.
- **Site feels slow**: Check Lighthouse. Usually a large hero image. Re-export as WebP at 2× display size.
- **Secret committed by accident**: Rotate the key at the provider immediately, then remove from code and push.
- **Domain not loading**: Check DNS propagation, verify records match Vercel's instructions.

---

## ✅ First-Week Checklist
- [ ] Open the site on your own phone (cellular data, not Wi-Fi).
- [ ] Send the link to 2–3 trusted people; ask for one specific piece of feedback each.
- [ ] Submit the contact form from two different email addresses.
- [ ] Check Google Search Console — submit the sitemap.
- [ ] Check Bing Webmaster — same.
- [ ] Verify the OG preview on WhatsApp / LinkedIn / Twitter.
- [ ] Walk the site with keyboard only — no mouse.
- [ ] Click every link once.
- [ ] Note all change requests in one list before editing (batch edits).

---

## 📅 30-Day Review Plan
- **Traffic patterns** (if analytics is enabled) or direct feedback from visitors.
- **How many real contact messages vs spam**.
- **Add 1 new project**, 1 testimonial, or 1 milestone to keep the site alive.
- **Re-run Lighthouse** — check nothing regressed.
- **Google Search Console** → first impressions and any indexing errors.
- **Read the whole site out loud once** — fix awkward sentences.
- **Compare to 2–3 portfolios you admire** — note one improvement for next quarter. Do not redesign.
