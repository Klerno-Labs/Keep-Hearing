# Quick Render Setup - Get keep-hearing.onrender.com Live

## What You Need to Know

You mentioned using Supabase for PostgreSQL - that's fine! You can use either:
- **Option A**: Use Render's PostgreSQL (free tier, easier setup)
- **Option B**: Keep using Supabase and just host the web app on Render

I've configured the project for **Option A** (Render PostgreSQL) since it's simpler.

---

## Step 1: Create Render Account & Deploy

1. Go to https://dashboard.render.com/
2. Sign up or log in with GitHub
3. Click **"New Blueprint Instance"** button
4. Connect to your GitHub repository: `keep-hearing`
5. Render will detect the `render.yaml` file automatically

### Important Settings:
- **Service Name**: Will automatically be `keep-hearing` (gives you `keep-hearing.onrender.com`)
- **Database Name**: Will automatically be `keephearing-db`
- **Region**: Oregon (already configured)
- **Plan**: Free (already configured)

---

## Step 2: Set Required Environment Variable

After Blueprint creates the services, you need to set **NEXTAUTH_URL**:

1. Go to your `keep-hearing` web service in Render dashboard
2. Click **"Environment"** tab on the left
3. Find the `NEXTAUTH_URL` variable
4. Set its value to: `https://keep-hearing.onrender.com`
5. Click **"Save Changes"**

This will trigger a redeploy (takes ~2-5 minutes).

---

## Step 3: Wait for Deployment to Complete

Watch the **"Logs"** tab to see progress:

```
==> Downloading cache...
==> Installing dependencies...
==> Running build command: npm ci && npx prisma generate && npm run build
==> Build succeeded!
==> Starting service...
✓ Ready on http://0.0.0.0:10000
```

When you see "Your service is live", continue to Step 4.

---

## Step 4: Setup Database via Render Shell

1. In your `keep-hearing` web service, click the **"Shell"** tab
2. Run these commands one by one:

### Get your database URL (from Render):
```bash
echo $DATABASE_URL
```

This should show something like:
```
postgresql://keephearing_user:xxxxx@dpg-xxxxx.oregon-postgres.render.com/keephearing
```

### Run migrations:
```bash
npx prisma migrate deploy
```

Expected output:
```
✅ Applying migration: 20231201120000_init
✅ Migrations completed
```

### Create admin user:
```bash
npx prisma db seed
```

Expected output:
```
🌱 Starting database seed...
✅ Admin user created successfully!
   Email: chatfield@keephearing.org
   Role: SUPERADMIN
```

---

## Step 5: Test Your Site!

Visit: **https://keep-hearing.onrender.com**

### Test Login:
1. Go to: https://keep-hearing.onrender.com/signin
2. Email: `chatfield@keephearing.org`
3. Password: `Hearing2025`
4. Click **Sign In**

### Access Admin Panel:
After login, visit: https://keep-hearing.onrender.com/admin

---

## If You Want to Use Supabase Instead

If you prefer to use your existing Supabase PostgreSQL:

1. Get your Supabase connection string (looks like):
   ```
   postgresql://postgres:[password]@[project-ref].supabase.co:5432/postgres
   ```

2. In Render dashboard:
   - Remove the `keephearing-db` database service
   - Go to `keep-hearing` web service
   - Environment tab
   - Set `DATABASE_URL` to your Supabase connection string

3. Then run the same Shell commands (Step 4 above)

---

## Troubleshooting

### Build Failed
Check logs for errors. Most common issues:
- TypeScript errors (already fixed)
- Missing environment variables (NEXTAUTH_URL required)

### Database Connection Failed
Make sure DATABASE_URL is set correctly:
```bash
# In Render Shell:
echo $DATABASE_URL
```

### Site Shows "Service Unavailable"
- Check if deployment completed successfully
- Free tier services spin down after 15 minutes - first request takes ~30 seconds

### Can't Login
- Verify admin user was created (check seed command output)
- Make sure NEXTAUTH_URL matches your actual URL: `https://keep-hearing.onrender.com`
- Clear browser cookies and try again

---

## What Happens After Deploy

Your site will be live at: **https://keep-hearing.onrender.com**

### Free Tier Behavior:
- Site spins down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds to wake up
- 750 hours/month (enough for 24/7 uptime of one service)

### Database (Render PostgreSQL Free):
- 1 GB storage
- 90-day data retention
- Automatic daily backups

---

## Next Steps After Going Live

1. **Test all pages** - contact form, navigation, etc.
2. **Set up email** (optional) - Add RESEND_API_KEY for contact form emails
3. **Custom domain** (optional) - Point keephearing.org to Render
4. **Monitor** - Check logs regularly for errors

---

## Quick Reference

**Your Live URL**: https://keep-hearing.onrender.com
**Admin Login**: https://keep-hearing.onrender.com/signin
**Admin Panel**: https://keep-hearing.onrender.com/admin

**Credentials**:
- Email: `chatfield@keephearing.org`
- Password: `Hearing2025`

**Important**: Change the admin password after first login!

---

Need help? Check the full guides:
- [RENDER_DEPLOYMENT_GUIDE.md](RENDER_DEPLOYMENT_GUIDE.md) - Complete deployment documentation
- [RENDER_SHELL_COMMANDS.md](RENDER_SHELL_COMMANDS.md) - Database setup commands
- [RENDER_REDIRECT_GUIDE.md](RENDER_REDIRECT_GUIDE.md) - Post-deployment configuration
