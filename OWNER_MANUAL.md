# Portfolio Owner's Manual

This manual is your guide to keeping your portfolio alive and updated without needing an AI or developer every time. It explains where things are, how to update content safely, and what to do post-launch.

## 📁 Where Everything Lives
- **`src/data/site.ts`** → Your central brain. All text, projects, journey milestones, testimonials, and contact details live here.
- **`src/components/sections/`** → The visual structure (Hero, About, Projects, etc).
- **`src/app/`** → Your routes and pages.
- **`public/`** → Images (like `/public/og.png`, avatars, project screenshots) and icons.
- **`.env.local`** → Your private secrets for the contact form (never commit this to Git).

---

## ✍️ How to Update Your Content

The golden rule of this portfolio: **If any item contains the word "TODO" or has `confirmed: false`, it will automatically hide itself on the live site.** This guarantees you never accidentally publish dummy data.

### 1. Changing General Text
1. Open `src/data/site.ts`.
2. Find the section you want to change (e.g., `hero` or `about`).
3. Edit the text between the quotes. 
4. Save the file and push your changes to Git.

### 2. Adding a Project
1. Take a great screenshot and save it in `public/images/projects/<slug>.webp`.
2. Open `site.ts` and locate the `projects.items` array.
3. Copy an existing project block and paste it below.
4. Fill in real values for `title`, `description`, `tags`, `year`, `github`, and `live`.
5. Remove any "TODO" strings.
6. Set `featured: true` if you want it highlighted on the homepage.
7. Save and push.

### 3. Adding a Testimonial
1. Open `site.ts` and locate the `testimonials.items` array.
2. Fill in the `quote`, `name`, `role`, and `source`.
3. If the review is public, add the `sourceLink`.
4. Set `confirmed: true`.
5. Save and push.

### 4. Adding a Journey Milestone
1. Open `site.ts` and locate the `journey.items` array.
2. Fill in the `year`, `title`, `place`, `description`, and `type` (education, course, work, milestone).
3. Set `confirmed: true`.
4. Save and push.

### 5. Updating Contact Info
1. Open `site.ts` and locate the `contact` object.
2. Replace the `"TODO"` string in `email`, `phone`, or `whatsapp` with your real details.
3. To add a social link, replace the `"TODO"` in the `url` field inside the `socials` array.
4. Save and push.

---

## 🚀 How to Publish & Roll Back

**To Publish Changes:**
Open your terminal and run:
```bash
git add .
git commit -m "Updated portfolio content"
git push
```
Vercel will detect the push and automatically deploy the changes within 2 minutes.

**To Roll Back (Undo a bad deploy):**
1. Go to your Vercel Dashboard -> Your Project -> **Deployments**.
2. Find the last deployment that worked perfectly.
3. Click the three dots (options) next to it and select **Promote to Production**.

---

## ✅ First-Week Post-Launch Checklist
Run through this list in the 7 days after launching:
- [ ] Open the site on your phone using cellular data (not Wi-Fi) to test speed.
- [ ] Send the link to 2-3 trusted friends and ask for specific feedback.
- [ ] Submit a test message on your own contact form to ensure the email arrives.
- [ ] Check Google Search Console and submit your sitemap (`https://yourdomain.com/sitemap.xml`).
- [ ] Send a link to yourself on WhatsApp/Twitter/LinkedIn to check the link preview image (OG Image).
- [ ] Use only your keyboard (Tab, Enter) to navigate the site to ensure accessibility.
- [ ] Make a list of minor tweaks and batch edit them all at once later.

---

## 📅 30-Day Review Plan
One month from now, do a quick health check:
1. **Traffic**: Look at Vercel Analytics. Which sections are people viewing?
2. **Contact Form**: Are you getting real messages or spam? (If spam, we can upgrade the honeypot).
3. **Content**: Add 1 new project or 1 new testimonial to keep the site alive.
4. **Copy**: Read the whole site out loud. Change any sentence that sounds unnatural.

---

## 🛠 What to do when you want a new feature?
- **Small text change?** -> Edit `site.ts` and push. No AI needed.
- **New project/testimonial?** -> Follow the steps in this manual. No AI needed.
- **Brand new section?** -> Open a new chat with your AI assistant. Tell it to reuse existing components and respect the dark theme, teal accent, and auto-hide rules.
- **Framework migration?** -> Don't do it unless strictly necessary.

*Enjoy your new portfolio!*
