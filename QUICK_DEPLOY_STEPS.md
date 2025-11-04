# Quick Deploy to Render - 5 Minute Setup

## Step 1: Go to Render
Visit: https://dashboard.render.com/

## Step 2: Deploy Blueprint
1. Click **"New +"** → **"Blueprint"**
2. Connect: `https://github.com/Klerno-Labs/Keep-Hearing`
3. Click **"Apply"**

## Step 3: Set Environment Variables
In your web service, add these under **Environment** tab:

```
NODE_ENV=production
NEXTAUTH_URL=https://your-app-name.onrender.com
NEXTAUTH_SECRET=<run: openssl rand -base64 32>
```

**Optional (for later):**
```
RESEND_API_KEY=re_xxx (for email)
```

## Step 4: Wait for Deploy
- Database: ~2-3 minutes
- Web Service: ~5-7 minutes

## Step 5: Run Database Migration
In web service Shell tab:
```bash
npx prisma migrate deploy
```

## Step 6: Create Admin User
In Shell:
```bash
node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
async function createAdmin() {
  const hashedPassword = await bcrypt.hash('ChangeMe123!', 10);
  await prisma.user.create({
    data: {
      email: 'admin@keephearing.org',
      password: hashedPassword,
      role: 'SUPERADMIN'
    }
  });
  console.log('Admin created!');
  await prisma.\$disconnect();
}
createAdmin();
"
```

## Done! 🎉
Your app is live at: `https://your-app-name.onrender.com`

---

**Need help?** See [RENDER_DEPLOYMENT_GUIDE.md](RENDER_DEPLOYMENT_GUIDE.md) for detailed instructions.

**Important Notes:**
- Free tier spins down after 15 min inactivity
- First request after spin-down takes ~30 seconds
- Your DATABASE_URL is auto-configured
- HTTPS/SSL is automatic
