#!/bin/bash

# Database setup script for Render deployment
# This script should be run once after deployment

echo "🔧 Keep Hearing - Database Setup"
echo "================================="
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ ERROR: DATABASE_URL environment variable is not set"
  echo ""
  echo "To fix this:"
  echo "1. Go to your Render database dashboard"
  echo "2. Copy the External Database URL"
  echo "3. Run: export DATABASE_URL='your-database-url-here'"
  echo "4. Then run this script again"
  exit 1
fi

echo "✅ DATABASE_URL is set"
echo ""

# Run migrations
echo "📦 Running database migrations..."
npx prisma migrate deploy

if [ $? -ne 0 ]; then
  echo "❌ Migration failed"
  exit 1
fi

echo "✅ Migrations completed"
echo ""

# Seed database
echo "🌱 Seeding database (creating admin user)..."
npx prisma db seed

if [ $? -ne 0 ]; then
  echo "❌ Seeding failed"
  exit 1
fi

echo ""
echo "================================="
echo "✅ Database setup complete!"
echo ""
echo "Admin Credentials:"
echo "  Email: chatfield@keephearing.org"
echo "  Password: Hearing2025"
echo ""
echo "Next steps:"
echo "1. Visit your app URL"
echo "2. Go to /signin"
echo "3. Log in with the credentials above"
echo "================================="
