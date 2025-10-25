import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await hash('Hearing2025', 10);
  await prisma.user.upsert({
    where: { email: 'c.hatfield309@gmail.com' },
    update: { password },
    create: {
      email: 'c.hatfield309@gmail.com',
      name: 'Temporary Admin',
      password,
      role: 'ADMIN',
    },
  });
  console.log('Temporary admin user created/updated.');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
