#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Change these values as needed
    const adminData = {
      email: 'admin@keephearing.org',
      name: 'Admin User',
      password: 'ChangeThisPassword2024', // Change this to your desired password
      role: 'SUPERADMIN'
    };

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    // Create the admin user
    const admin = await prisma.user.create({
      data: {
        email: adminData.email,
        name: adminData.name,
        password: hashedPassword,
        role: adminData.role
      }
    });

    console.log('✅ Admin user created successfully!');
    console.log('Email:', admin.email);
    console.log('Password:', adminData.password);
    console.log('\n⚠️  IMPORTANT: Change this password after first login!');

  } catch (error) {
    if (error.code === 'P2002') {
      console.error('❌ Error: User with this email already exists');
    } else {
      console.error('❌ Error creating admin user:', error.message);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
