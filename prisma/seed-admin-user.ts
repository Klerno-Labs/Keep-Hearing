const { prisma } = require('../src/lib/prisma');
const { hash } = require('bcrypt');

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
