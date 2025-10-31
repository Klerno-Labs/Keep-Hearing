const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

(async function main() {
  const email = 'c.hatfield309@gmail.com';
  const password = 'Hearing2025';
  const hashedPassword = await hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { password: hashedPassword, role: 'ADMIN' },
    create: {
      email,
      password: hashedPassword,
      role: 'ADMIN',
      name: 'Admin User',
    },
  });

  console.log('Admin user ensured:', email);
})()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
