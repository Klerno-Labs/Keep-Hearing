const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

(async function main() {
  const email = 'c.hatfield309@gmail.com';
  const password = 'Hearing2025';
  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { 
      password: hashedPassword, 
      role: 'SUPERADMIN',
      name: 'Chris Hatfield'
    },
    create: {
      email,
      password: hashedPassword,
      role: 'SUPERADMIN',
      name: 'Chris Hatfield',
    },
  });

  console.log('✅ SUPERADMIN user created/updated:');
  console.log('   Email:', user.email);
  console.log('   Role:', user.role);
  console.log('   Name:', user.name);
})()
  .catch(e => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
