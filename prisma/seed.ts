import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'chatfield@keephearing.org' }
  });

  if (existingAdmin) {
    console.log('✅ Admin user already exists');
    return;
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash('Hearing2025', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'chatfield@keephearing.org',
      name: 'Chatfield Admin',
      password: hashedPassword,
      role: 'SUPERADMIN'
    }
  });

  console.log('✅ Admin user created successfully!');
  console.log('   Email:', admin.email);
  console.log('   Role:', admin.role);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
