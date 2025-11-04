# Render Shell Quick Commands

## Step 1: Get Database URL

1. Go to Render Dashboard: https://dashboard.render.com/
2. Click on your **keephearing-db** database
3. Scroll to **Connection** section
4. Copy the **External Database URL** (starts with `postgresql://`)

## Step 2: Open Render Shell

1. In Render Dashboard, go to your **keephearing-web** service
2. Click the **Shell** tab at the top
3. Wait for shell to connect

## Step 3: Set Environment Variable

Paste this command (replace `YOUR_DATABASE_URL` with the actual URL from Step 1):

```bash
export DATABASE_URL="YOUR_DATABASE_URL"
```

Example:
```bash
export DATABASE_URL="postgresql://keephearing_user:abc123xyz@dpg-abc123.oregon-postgres.render.com/keephearing"
```

## Step 4: Run Database Migrations

```bash
npx prisma migrate deploy
```

Expected output:
```
✅ Migrations completed successfully
```

## Step 5: Create Admin User

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

## Step 6: Verify Setup

Test the database connection:
```bash
npx prisma db pull
```

Should complete without errors.

---

## Admin Credentials

**Email**: `chatfield@keephearing.org`
**Password**: `Hearing2025`

**Login URL**: `https://keep-hearing.onrender.com/signin`

---

## Troubleshooting

### If seed fails with "User already exists":
This is normal if you've run the seed before. The admin user is already created.

### If you get "DATABASE_URL not set":
Make sure you ran the `export DATABASE_URL="..."` command in **the same shell session**.

### If migrations fail:
Check that DATABASE_URL is correct and database is accessible:
```bash
echo $DATABASE_URL
```

### To start fresh (only if needed):
```bash
# Reset migrations (WARNING: This deletes all data!)
npx prisma migrate reset --skip-seed
```

---

## After Setup Complete

1. Visit: `https://keep-hearing.onrender.com`
2. Go to: `https://keep-hearing.onrender.com/signin`
3. Login with admin credentials above
4. Access admin panel: `https://keep-hearing.onrender.com/admin`

---

## Notes

- Shell sessions are **temporary** - if you close the shell, you'll need to `export DATABASE_URL` again
- The seed script is **idempotent** - running it multiple times won't create duplicate users
- All these commands are already configured in your **package.json** scripts
