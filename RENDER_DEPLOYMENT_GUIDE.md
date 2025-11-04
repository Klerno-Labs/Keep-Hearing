# Render Deployment Guide for Keep Hearing Initiative

This guide walks you through deploying the Keep Hearing Initiative website to Render.

## Prerequisites

Before you begin, make sure you have:

1. A [Render account](https://render.com) (free tier available)
2. A [GitHub account](https://github.com) with this repository pushed
3. Your environment variables ready (see below)

## Step 1: Push Your Code to GitHub

If you haven't already, push your code to GitHub:

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit your changes
git commit -m "Prepare for Render deployment"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/keep-hearing.git

# Push to GitHub
git push -u origin master
```

## Step 2: Connect to Render

### Option A: Using render.yaml (Recommended - Infrastructure as Code)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** button in the top right
3. Select **"Blueprint"**
4. Connect your GitHub repository
5. Render will automatically detect the `render.yaml` file
6. Click **"Apply"** to create all services

### Option B: Manual Setup

#### Create Database

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `keephearing-db`
   - **Database**: `keephearing`
   - **User**: `keephearing`
   - **Region**: Oregon (or closest to you)
   - **Plan**: Free
4. Click **"Create Database"**
5. Wait for the database to provision (takes ~2-3 minutes)
6. **Copy the "External Database URL"** - you'll need this

#### Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `keephearing-web`
   - **Region**: Oregon (same as database)
   - **Branch**: `master` (or `main`)
   - **Root Directory**: (leave blank)
   - **Runtime**: Node
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

## Step 3: Configure Environment Variables

In your web service settings, go to the **"Environment"** tab and add these variables:

### Required Variables

```env
NODE_ENV=production
DATABASE_URL=<paste your database external URL here>
NEXTAUTH_URL=https://your-app-name.onrender.com
NEXTAUTH_SECRET=<generate a strong random string>
```

### Optional Variables (Add when ready to use these features)

```env
# Email (Resend) - For contact form and notifications
RESEND_API_KEY=re_your_api_key_here

# Stripe (For future donation processing)
STRIPE_SECRET_KEY=sk_live_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# PayPal (Alternative payment processor)
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_secret
```

### How to Generate NEXTAUTH_SECRET

Run this command locally:
```bash
openssl rand -base64 32
```

Copy the output and use it as your `NEXTAUTH_SECRET`.

## Step 4: Run Database Migrations

After your web service deploys successfully:

1. Go to your web service in Render Dashboard
2. Click on the **"Shell"** tab
3. Run the following command:

```bash
npx prisma migrate deploy
```

This will create all necessary database tables.

## Step 5: Create Admin User

To create your first admin user:

1. In the Render Shell, run:

```bash
node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function createAdmin() {
  const hashedPassword = await bcrypt.hash('YourSecurePassword123!', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@keephearing.org',
      name: 'Admin',
      password: hashedPassword,
      role: 'SUPERADMIN'
    }
  });
  console.log('Admin created:', admin.email);
  await prisma.\$disconnect();
}

createAdmin();
"
```

Replace `YourSecurePassword123!` with a strong password.
Replace `admin@keephearing.org` with your email.

## Step 6: Verify Deployment

1. Visit your app URL: `https://your-app-name.onrender.com`
2. Test the main pages:
   - Homepage: `/`
   - About: `/about`
   - Learn: `/learn`
   - Participate: `/participate`
   - Contact: `/contact`
3. Sign in to admin panel: `/signin`
4. Verify admin dashboard: `/admin`

## Step 7: Configure Custom Domain (Optional)

1. In your web service, go to **"Settings"** → **"Custom Domain"**
2. Click **"Add Custom Domain"**
3. Enter your domain (e.g., `keephearing.org`)
4. Follow the DNS configuration instructions
5. Add these DNS records at your domain registrar:
   - **CNAME** record: `www` → `your-app-name.onrender.com`
   - **A** record: `@` → Render's IP address (shown in settings)

Update your `NEXTAUTH_URL` environment variable to your custom domain:
```env
NEXTAUTH_URL=https://keephearing.org
```

## Troubleshooting

### Build Fails

**Error**: `Cannot find module '@prisma/client'`
- **Solution**: Make sure `postinstall` script runs: `"postinstall": "prisma generate"`

**Error**: `Build command exited with code 1`
- **Solution**: Check your build logs for specific errors. Common issues:
  - Missing dependencies in `package.json`
  - TypeScript errors - run `npm run build` locally first

### Database Connection Issues

**Error**: `Can't reach database server`
- **Solution**: Verify your `DATABASE_URL` is correct
- Make sure it's the **External Database URL**, not the Internal URL
- Check that your database service is running

### App Won't Start

**Error**: `Application failed to respond`
- **Solution**: Check that your `start` command is correct: `npm start`
- Verify the `PORT` environment variable is being used
- Check logs for runtime errors

### Environment Variables Not Working

- Make sure there are no extra spaces in your variable values
- Restart your service after adding/changing environment variables
- For `NEXTAUTH_URL`, do not include a trailing slash

## Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Admin login works
- [ ] Contact form sends emails (if RESEND_API_KEY configured)
- [ ] Database is persisting data
- [ ] SSL certificate is active (https://)
- [ ] Custom domain configured (if applicable)
- [ ] Analytics tracking works (Google Analytics)
- [ ] No console errors in browser
- [ ] Mobile responsive design works
- [ ] Performance is acceptable (check Lighthouse score)

## Maintenance

### Viewing Logs

1. Go to your web service in Render
2. Click on **"Logs"** tab
3. Use filters to find specific issues

### Database Backups

Render automatically backs up your database daily on free tier.

To manually export your database:
1. Go to your database service
2. Click **"Export"**
3. Download the SQL dump

### Updating Your App

Render automatically deploys when you push to your connected branch:

```bash
git add .
git commit -m "Update description"
git push origin master
```

Render will automatically:
1. Detect the push
2. Run the build command
3. Deploy the new version
4. Run health checks

### Monitoring

- Check the **"Metrics"** tab for performance data
- Set up alerts in Render for downtime notifications
- Monitor database usage to ensure you stay within free tier limits

## Free Tier Limits

Render's free tier includes:

- **Web Service**:
  - 750 hours/month (enough for 1 service running 24/7)
  - Spins down after 15 minutes of inactivity
  - Spins up on first request (takes ~30 seconds)

- **PostgreSQL**:
  - 1 GB storage
  - 90-day data retention
  - Daily automatic backups

## Upgrading to Paid Plan

If you need better performance:

- **Starter Plan ($7/month)**: No spin-down, better performance
- **Standard Plan ($25/month)**: More resources, faster builds
- **PostgreSQL Standard ($7/month)**: More storage, better performance

## Support

- **Render Documentation**: https://render.com/docs
- **Render Community**: https://community.render.com
- **Keep Hearing Tech Support**: Check project documentation

## Security Notes

1. **Never commit `.env` file to git** - Use Render's environment variables
2. **Rotate secrets regularly** - Update `NEXTAUTH_SECRET` and API keys periodically
3. **Use HTTPS only** - Render provides free SSL certificates
4. **Monitor logs** - Watch for suspicious activity
5. **Keep dependencies updated** - Run `npm audit` and `npm update` regularly

## Next Steps

After successful deployment:

1. Set up monitoring and alerts
2. Configure email service (Resend) for contact form
3. Test all functionality in production
4. Set up Google Analytics if not already done
5. Submit sitemap to Google Search Console
6. When ready, re-enable donation features from `_future_features/Donations/`

---

**Congratulations!** Your Keep Hearing Initiative website is now live on Render! 🎉
