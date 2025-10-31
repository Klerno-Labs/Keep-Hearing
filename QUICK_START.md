# Quick Start Guide
## Get Up and Running in 5 Minutes

---

## What Was Just Built

Your nonprofit website now has a complete contact management system with:

- ✅ Contact form that saves to database
- ✅ Admin panel to view/manage submissions
- ✅ Professional email templates (optional)
- ✅ Auto-reply emails to users (optional)
- ✅ Advanced analytics tracking
- ✅ Complete documentation

---

## Immediate Next Steps

### 1. Test the Contact Form (2 minutes)

```bash
# Server should already be running, if not:
npm run dev

# Visit: http://localhost:3000/contact
# Fill out and submit the form
```

### 2. View Submissions in Admin Panel (1 minute)

```bash
# Visit: http://localhost:3000/admin
# Sign in if needed
# Click "Contact" tab
# You should see your test submission!
```

### 3. Verify Database (1 minute)

```bash
# Open Prisma Studio
npx prisma studio

# Navigate to ContactSubmission table
# Your submission should be there
```

---

## Optional: Enable Email Notifications (15 minutes)

### Quick Email Setup

1. **Sign up for Resend** (2 min)
   - Go to [resend.com](https://resend.com)
   - Create free account (3,000 emails/month free!)

2. **Get API Key** (1 min)
   - Dashboard → API Keys → Create API Key
   - Copy it (starts with `re_...`)

3. **Add to .env** (30 sec)
   ```bash
   RESEND_API_KEY="re_your_key_here"
   ```

4. **Update Admin Email** (1 min)
   - Open [src/app/api/contact/route.ts](src/app/api/contact/route.ts)
   - Line 83: Change `info@keephearing.org` to your email

5. **Restart Server** (30 sec)
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

6. **Test It** (1 min)
   - Submit another contact form
   - Check your inbox!
   - Check spam folder if you don't see it

**Full details**: [RESEND_EMAIL_SETUP.md](RESEND_EMAIL_SETUP.md)

---

## Optional: Enable Google Analytics (20 minutes)

### Quick GA Setup

1. **Create GA4 Property**
   - Go to [analytics.google.com](https://analytics.google.com)
   - Create property → Get Measurement ID

2. **Add to .env**
   ```bash
   NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
   ```

3. **Restart Server**
   ```bash
   npm run dev
   ```

4. **Test It**
   - Visit your site
   - Check GA Realtime report

**Full details**: [GOOGLE_ANALYTICS_SETUP.md](GOOGLE_ANALYTICS_SETUP.md)

---

## What to Do Now

### Recommended Path

**Option A: Test First, Deploy Later** (Safest)
1. ✅ Test contact form thoroughly
2. ✅ Set up email notifications (optional)
3. ✅ Set up Google Analytics (optional)
4. ✅ Test everything works perfectly
5. → Then follow [PRODUCTION_DEPLOYMENT_GUIDE.md](PRODUCTION_DEPLOYMENT_GUIDE.md)

**Option B: Deploy Now, Configure Later** (Faster)
1. ✅ Test contact form works locally
2. → Deploy to Vercel now (follow [PRODUCTION_DEPLOYMENT_GUIDE.md](PRODUCTION_DEPLOYMENT_GUIDE.md))
3. ✅ Configure email in production
4. ✅ Configure analytics in production

---

## Key Files & URLs

### Local Development

- **Homepage**: `http://localhost:3000`
- **Contact Form**: `http://localhost:3000/contact`
- **Admin Panel**: `http://localhost:3000/admin`
- **Prisma Studio**: Run `npx prisma studio`

### Important Files

- **Contact API**: [src/app/api/contact/route.ts](src/app/api/contact/route.ts)
- **Admin Panel**: [src/app/admin/page.tsx](src/app/admin/page.tsx)
- **Email Templates**: [src/lib/email-templates.ts](src/lib/email-templates.ts)
- **Database Schema**: [prisma/schema.prisma](prisma/schema.prisma)

### Documentation

- **This File**: Quick start guide
- **[SETUP_COMPLETE_SUMMARY.md](SETUP_COMPLETE_SUMMARY.md)**: Overview of what's ready
- **[COMPLETE_FEATURES_SUMMARY.md](COMPLETE_FEATURES_SUMMARY.md)**: Detailed feature docs
- **[RESEND_EMAIL_SETUP.md](RESEND_EMAIL_SETUP.md)**: Email setup guide
- **[GOOGLE_ANALYTICS_SETUP.md](GOOGLE_ANALYTICS_SETUP.md)**: Analytics setup guide
- **[PRODUCTION_DEPLOYMENT_GUIDE.md](PRODUCTION_DEPLOYMENT_GUIDE.md)**: Deployment guide

---

## Common Tasks

### Submit a Test Contact Form

```bash
# 1. Visit contact page
open http://localhost:3000/contact

# 2. Fill out form with test data:
Name: Test User
Email: test@example.com
Subject: Testing the form
Message: This is a test submission

# 3. Click "Send Message"

# 4. Should see success message
```

### View Submissions in Admin Panel

```bash
# 1. Visit admin panel
open http://localhost:3000/admin

# 2. Click "Contact" tab

# 3. See all submissions in list

# 4. Click one to see details

# 5. Try these actions:
- Mark as Read
- Archive
- Reply via Email (opens your email client)
```

### Check Database Directly

```bash
# Open Prisma Studio
npx prisma studio

# Navigate to:
# ContactSubmission table

# You can:
# - View all records
# - Edit records
# - Delete records
# - Filter and search
```

### Test Email Notifications

```bash
# Prerequisites:
# - RESEND_API_KEY in .env
# - Admin email updated in code
# - Server restarted

# 1. Submit contact form with real email

# 2. Check admin email inbox
# Should receive "New Contact" email

# 3. Check submitter email inbox
# Should receive "Thank you" auto-reply

# 4. Check Resend dashboard logs
# Shows all emails sent
```

---

## Troubleshooting

### Contact form submits but nothing in database

```bash
# Check server logs for errors
# Make sure Prisma Client is generated:
npx prisma generate

# Restart server
npm run dev
```

### Can't see Contact tab in admin panel

```bash
# Make sure you're signed in
# Make sure your user is ADMIN or SUPERADMIN

# Check user role:
npx prisma studio
# Navigate to User table
# Find your user
# Check "role" field
```

### Emails not sending

```bash
# 1. Check .env has RESEND_API_KEY
# 2. Check Resend dashboard for errors
# 3. Try test email in Resend dashboard
# 4. Check spam folder
# 5. Verify API key is valid (not expired)
```

### TypeScript errors

```bash
# Regenerate Prisma Client
npx prisma generate

# Restart TS server in VS Code:
# Cmd/Ctrl + Shift + P
# "TypeScript: Restart TS Server"
```

---

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm start

# Run tests
npm test

# Open Prisma Studio (database GUI)
npx prisma studio

# Generate Prisma Client
npx prisma generate

# Create new migration
npx prisma migrate dev --name migration_name

# Run migrations (production)
npx prisma migrate deploy

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

---

## Environment Variables Checklist

```bash
# ✅ Required (Already Set)
DATABASE_URL="postgresql://..."
AUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
NODE_ENV="development"

# ⚠️ Optional (Set if you want emails)
RESEND_API_KEY="re_..."

# ⚠️ Optional (Set if you want analytics)
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

---

## Success Checklist

After following this guide, you should have:

- [ ] Contact form working locally
- [ ] Can submit test forms
- [ ] Submissions appear in database
- [ ] Can view submissions in admin panel
- [ ] Can manage submissions (mark as read, archive, restore)
- [ ] (Optional) Email notifications working
- [ ] (Optional) Google Analytics tracking
- [ ] Understand where to find documentation

---

## What's Next?

### Today
1. Test all features
2. Set up email (optional)
3. Set up analytics (optional)

### This Week
1. Customize email templates (colors, content, links)
2. Add your logo and branding
3. Update content on other pages

### When Ready
1. Deploy to production
2. Set up custom domain
3. Share with your team

---

## Need Help?

**Read the docs**:
- [COMPLETE_FEATURES_SUMMARY.md](COMPLETE_FEATURES_SUMMARY.md) - Detailed features
- [PRODUCTION_DEPLOYMENT_GUIDE.md](PRODUCTION_DEPLOYMENT_GUIDE.md) - Deployment help

**Check troubleshooting**:
- [COMPLETE_FEATURES_SUMMARY.md#troubleshooting](COMPLETE_FEATURES_SUMMARY.md#troubleshooting)
- [PRODUCTION_DEPLOYMENT_GUIDE.md#troubleshooting](PRODUCTION_DEPLOYMENT_GUIDE.md#troubleshooting)

**Review examples**:
- Look at existing code
- Check email templates
- Review API endpoints

---

## You're All Set! 🎉

Everything is working and ready to use. Take your time testing and exploring the new features.

**Recommended next action**: Submit a few test contact forms and explore the admin panel's Contact tab.

Good luck with your nonprofit! 💙
