# Production Deployment Guide
## Keep Hearing Initiative - Complete Deployment Checklist

This guide covers everything you need to deploy your nonprofit website to production successfully.

---

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Platform Options](#platform-options)
3. [Vercel Deployment (Recommended)](#vercel-deployment-recommended)
4. [Railway Deployment](#railway-deployment)
5. [Environment Variables](#environment-variables)
6. [Database Setup](#database-setup)
7. [Email Service Setup](#email-service-setup)
8. [Domain Configuration](#domain-configuration)
9. [Post-Deployment Tasks](#post-deployment-tasks)
10. [Monitoring & Maintenance](#monitoring--maintenance)
11. [Security Considerations](#security-considerations)
12. [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Tested all features locally
- [ ] Created a production database (Neon, Railway, etc.)
- [ ] Signed up for Resend email service
- [ ] Registered a domain name (optional but recommended)
- [ ] Set up Google Analytics 4 property
- [ ] Reviewed all environment variables
- [ ] Created admin user account
- [ ] Tested contact form submissions
- [ ] Verified payment integrations (if applicable)
- [ ] Reviewed privacy policy and terms of service

---

## Platform Options

### Recommended Platforms

| Platform | Best For | Pros | Cons | Monthly Cost |
|----------|----------|------|------|--------------|
| **Vercel** | Next.js apps | Automatic deployments, excellent performance, generous free tier | Database requires external provider | Free - $20 |
| **Railway** | Full-stack apps | Includes database, simple setup | Less specialized for Next.js | $5 - $20 |
| **Netlify** | Static sites | Simple deployment, good DX | Limited server functions on free tier | Free - $19 |
| **AWS/Azure/GCP** | Enterprise | Full control, scalability | Complex setup, steeper learning curve | Varies |

**Our Recommendation**: Vercel + Neon (PostgreSQL) for the best Next.js experience.

---

## Vercel Deployment (Recommended)

### Step 1: Prepare Your Repository

1. Push your code to GitHub/GitLab/Bitbucket:
   ```bash
   git add .
   git commit -m "Prepare for production deployment"
   git push origin main
   ```

### Step 2: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub (recommended)
3. Grant Vercel access to your repository

### Step 3: Import Project

1. Click "Add New" → "Project"
2. Select your GitHub repository
3. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### Step 4: Configure Environment Variables

Add these in Vercel dashboard under "Environment Variables":

```bash
# Database
DATABASE_URL="postgresql://..."

# Authentication
AUTH_SECRET="your-production-secret-here"
NEXTAUTH_URL="https://your domain.com"

# Email
RESEND_API_KEY="re_..."

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

# Environment
NODE_ENV="production"
```

**IMPORTANT**: Generate a new `AUTH_SECRET` for production:
```bash
openssl rand -base64 32
```

### Step 5: Deploy

1. Click "Deploy"
2. Wait for build to complete (2-5 minutes)
3. Visit your deployment URL: `https://your-project.vercel.app`

### Step 6: Set Up Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `keephearing.org`)
3. Update DNS records at your domain registrar:
   - **Type**: CNAME
   - **Name**: www
   - **Value**: cname.vercel-dns.com
   - **Type**: A
   - **Name**: @
   - **Value**: 76.76.21.21

4. Wait for DNS propagation (can take up to 48 hours)
5. Vercel will automatically provision SSL certificate

### Step 7: Run Database Migrations

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Link your project:
   ```bash
   vercel link
   ```

3. Pull environment variables:
   ```bash
   vercel env pull .env.production
   ```

4. Run migrations:
   ```bash
   npm run prisma:migrate
   ```

5. Seed admin user:
   ```bash
   node prisma/seed-admin-user.ts
   ```

---

## Railway Deployment

### Step 1: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create a new project

### Step 2: Add PostgreSQL Database

1. Click "New" → "Database" → "PostgreSQL"
2. Wait for database to provision
3. Copy connection string from "Variables" tab

### Step 3: Deploy Application

1. Click "New" → "GitHub Repo"
2. Select your repository
3. Railway will auto-detect Next.js and deploy

### Step 4: Configure Environment Variables

In Railway dashboard, add:

```bash
DATABASE_URL=${{Postgres.DATABASE_URL}}  # Auto-filled
AUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-app.up.railway.app"
RESEND_API_KEY="re_..."
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
NODE_ENV="production"
```

### Step 5: Custom Domain (Optional)

1. Go to Settings → Domains
2. Click "Generate Domain" for a Railway domain
3. Or add custom domain and update DNS

---

## Environment Variables

### Required Variables

| Variable | Description | Example | Where to Get |
|----------|-------------|---------|--------------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` | Neon, Railway, Supabase |
| `AUTH_SECRET` | NextAuth secret key | `random-32-char-string` | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Full site URL | `https://yourdomain.com` | Your domain |
| `NODE_ENV` | Environment | `production` | Manually set |

### Optional but Recommended

| Variable | Description | Example | Where to Get |
|----------|-------------|---------|--------------|
| `RESEND_API_KEY` | Email service API key | `re_...` | [resend.com](https://resend.com) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | `G-XXXXXXXXXX` | [analytics.google.com](https://analytics.google.com) |

### Payment Providers (If Accepting Donations)

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `STRIPE_SECRET_KEY` | Stripe API key | [stripe.com/dashboard](https://dashboard.stripe.com) |
| `STRIPE_PUBLISHABLE_KEY` | Stripe public key | Stripe Dashboard |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | Stripe Dashboard → Webhooks |

---

## Database Setup

### Option 1: Neon (Recommended for Vercel)

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. **Important**: Append `?sslmode=require` to the connection string
5. Add to `DATABASE_URL` in Vercel

**Benefits**: Generous free tier, serverless Postgres, branching

### Option 2: Railway Database

1. Add PostgreSQL to your Railway project
2. Connection string is automatically available
3. No additional configuration needed

### Option 3: Supabase

1. Create project at [supabase.com](https://supabase.com)
2. Go to Settings → Database
3. Copy "Connection string" (use "Connection pooling" mode)
4. Use the pooled connection for best performance

### Running Migrations in Production

After setting up your database:

```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed admin user
node prisma/seed-admin-user.ts
```

---

## Email Service Setup

### Resend Setup (Recommended)

1. Create account at [resend.com](https://resend.com)
2. Verify your domain:
   - Add DNS records (TXT, MX, CNAME)
   - Wait for verification (can take a few hours)
3. Create API key
4. Add `RESEND_API_KEY` to environment variables
5. Update email addresses in code:
   - [src/app/api/contact/route.ts](src/app/api/contact/route.ts#L83) - Change admin email
   - Email templates use `noreply@yourdomain.com`

### Email Configuration Checklist

- [ ] Domain verified in Resend
- [ ] SPF record added
- [ ] DKIM record added
- [ ] API key added to environment variables
- [ ] Admin email updated in contact form handler
- [ ] Test email sent successfully
- [ ] Check spam folder (improve sender reputation)

---

## Domain Configuration

### Purchasing a Domain

**Recommended Registrars:**
- [Namecheap](https://www.namecheap.com) - Affordable, good UX
- [Google Domains](https://domains.google.com) - Simple, integrated with Google Workspace
- [Cloudflare](https://www.cloudflare.com/products/registrar/) - At-cost pricing, built-in CDN

### DNS Configuration for Vercel

At your domain registrar, add these DNS records:

```
Type: A
Name: @
Value: 76.76.21.21
TTL: Auto

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Auto
```

### SSL Certificate

- Vercel automatically provisions SSL certificates
- No manual configuration needed
- Renews automatically

---

## Post-Deployment Tasks

### 1. Create First Admin User

```bash
# SSH into your server or run locally with production DB
npx ts-node prisma/seed-admin-user.ts
```

Follow the prompts to create your superadmin account.

### 2. Test All Features

- [ ] Sign in as admin
- [ ] Create a test user
- [ ] Submit contact form
- [ ] Check admin panel → Contact submissions
- [ ] Verify email notifications (if configured)
- [ ] Test responsive design on mobile
- [ ] Check all pages load correctly
- [ ] Verify Google Analytics tracking

### 3. Configure CORS (if needed)

If using external APIs, update CORS settings in `next.config.js`:

```javascript
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: 'https://yourdomain.com' },
        { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
      ],
    },
  ];
},
```

### 4. Set Up Monitoring

**Vercel Analytics** (Built-in):
- Automatically tracks Web Vitals
- View in Vercel Dashboard → Analytics

**Google Analytics** (Already configured):
- View real-time data in GA4 dashboard
- Set up conversion goals for donations

**Sentry (Optional - Error Tracking)**:
1. Sign up at [sentry.io](https://sentry.io)
2. Create Next.js project
3. Install Sentry SDK:
   ```bash
   npm install @sentry/nextjs
   ```
4. Run setup wizard:
   ```bash
   npx @sentry/wizard@latest -i nextjs
   ```

### 5. SEO Configuration

Update these files for better SEO:

**public/robots.txt** (already created):
```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

**public/sitemap.xml** (already created):
- Update domain in the file
- Add all public pages

**Meta Tags** (in page files):
```typescript
export const metadata = {
  title: 'Keep Hearing Initiative - Supporting Hearing Health',
  description: 'Nonprofit organization supporting hearing health...',
  openGraph: {
    title: 'Keep Hearing Initiative',
    description: '...',
    images: ['/og-image.jpg'],
  },
};
```

---

## Monitoring & Maintenance

### Health Checks

Set up monitoring for:

1. **Uptime**: Use [UptimeRobot](https://uptimerobot.com) (free)
   - Monitor homepage
   - Check API endpoints
   - Get alerts via email/SMS

2. **Performance**: Vercel Analytics (built-in)
   - Core Web Vitals
   - Page load times
   - Real user monitoring

3. **Errors**: Sentry (optional)
   - JavaScript errors
   - API errors
   - Performance issues

### Regular Maintenance Tasks

**Weekly:**
- [ ] Check contact form submissions
- [ ] Review audit logs
- [ ] Monitor donation totals (if applicable)

**Monthly:**
- [ ] Review analytics data
- [ ] Check for dependency updates: `npm outdated`
- [ ] Review and respond to all contact submissions
- [ ] Backup database
- [ ] Review security logs

**Quarterly:**
- [ ] Update dependencies: `npm update`
- [ ] Review and update content
- [ ] Test all forms and features
- [ ] Review and optimize SEO
- [ ] Check SSL certificate status

### Database Backups

**Neon (Automatic)**:
- Automatic point-in-time recovery
- 7-day history on free tier
- 30-day history on paid tiers

**Railway (Automatic)**:
- Automatic daily backups
- Manual backups available

**Manual Backups**:
```bash
# Export database
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Restore from backup
psql $DATABASE_URL < backup-20240101.sql
```

---

## Security Considerations

### Pre-Launch Security Checklist

- [ ] All environment variables are secrets (not in code)
- [ ] `AUTH_SECRET` is unique and strong (32+ characters)
- [ ] Database password is strong
- [ ] Rate limiting is enabled (already configured)
- [ ] CSRF protection is active (already configured)
- [ ] Input sanitization is in place (already configured)
- [ ] SQL injection prevention (using Prisma)
- [ ] XSS protection (React default + sanitization)
- [ ] HTTPS is enforced (Vercel does this automatically)
- [ ] Security headers are configured

### Security Headers

Add to `next.config.mjs`:

```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload'
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin'
        }
      ]
    }
  ];
}
```

### Ongoing Security

1. **Keep Dependencies Updated**:
   ```bash
   npm audit
   npm audit fix
   ```

2. **Monitor Security Alerts**:
   - GitHub Dependabot (enable in repo settings)
   - npm security advisories

3. **Review Access Logs**:
   - Check admin panel audit logs regularly
   - Look for suspicious activity

---

## Troubleshooting

### Common Issues

#### 1. Build Fails on Vercel

**Error**: `Cannot find module '@prisma/client'`

**Solution**:
```bash
# Add to package.json scripts
"postinstall": "prisma generate"
```

#### 2. Database Connection Fails

**Error**: `connect ECONNREFUSED` or `SSL required`

**Solution**:
- Check if `?sslmode=require` is appended to `DATABASE_URL`
- Verify database is accessible from Vercel's network
- Check firewall rules

#### 3. Authentication Not Working

**Error**: `[next-auth][error] JWTSessionError`

**Solution**:
- Verify `AUTH_SECRET` is set in production
- Check `NEXTAUTH_URL` matches your actual domain
- Clear browser cookies and try again

#### 4. Emails Not Sending

**Error**: Contact form submits but no emails

**Solution**:
- Check `RESEND_API_KEY` is set correctly
- Verify domain is verified in Resend
- Check Resend dashboard logs for errors
- Test with a simple email first

#### 5. 500 Internal Server Error

**Solution**:
1. Check Vercel logs: Dashboard → Your Project → Functions
2. Look for specific error messages
3. Check database connection
4. Verify all environment variables are set

### Getting Help

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Railway Support**: [Discord](https://discord.gg/railway)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Prisma Docs**: [prisma.io/docs](https://www.prisma.io/docs)

---

## Performance Optimization

### Recommended Settings

1. **Enable Vercel Analytics**:
   - Already installed (`@vercel/analytics`)
   - Automatic Web Vitals tracking

2. **Enable Edge Caching**:
   ```typescript
   // Add to API routes that can be cached
   export const runtime = 'edge';
   export const revalidate = 60; // Cache for 60 seconds
   ```

3. **Optimize Images**:
   - Use Next.js Image component (already doing this)
   - Compress images before uploading
   - Use WebP format when possible

4. **Enable Compression**:
   - Already enabled by Vercel
   - Gzip and Brotli compression automatic

---

## Cost Estimates

### Monthly Costs (Estimated)

**Minimum Setup** (Free Tier):
- Vercel: $0
- Neon Database: $0 (free tier)
- Resend Email: $0 (3,000 emails/month)
- Domain: $12/year ($1/month)
- **Total**: ~$1/month

**Recommended Setup** (Small Nonprofit):
- Vercel Pro: $20/month
- Neon Scale: $19/month (or keep free tier)
- Resend: $20/month (50,000 emails)
- Domain: $12/year
- Google Workspace (optional): $6/user/month
- **Total**: ~$40-60/month

**Growth Stage** (Medium Traffic):
- Vercel Pro: $20/month
- Neon Scale: $69/month
- Resend Pro: $20/month
- CDN (Cloudflare): Free
- **Total**: ~$100-120/month

---

## Next Steps After Deployment

1. **Promote Your Website**:
   - Share on social media
   - Email your supporters
   - Add to nonprofit directories

2. **SEO Optimization**:
   - Submit sitemap to Google Search Console
   - Set up Google My Business (if applicable)
   - Build backlinks

3. **Apply for Nonprofit Benefits**:
   - Google Ad Grants ($10k/month free ads)
   - Microsoft for Nonprofits (free Azure credits)
   - GitHub Sponsors (if applicable)

4. **Expand Features**:
   - Add blog/news section
   - Integrate donation tracking
   - Build email newsletter
   - Add event calendar

---

## Conclusion

You're now ready to deploy Keep Hearing Initiative to production!

**Quick Deploy Checklist**:
- [ ] Database created and migrated
- [ ] All environment variables set
- [ ] Code pushed to GitHub
- [ ] Vercel project created and deployed
- [ ] Custom domain configured (optional)
- [ ] Admin user created
- [ ] All features tested
- [ ] Email service configured
- [ ] Analytics tracking verified
- [ ] Monitoring set up

**Need Help?** Review the troubleshooting section or reach out to the community.

Good luck with your deployment! 🚀
