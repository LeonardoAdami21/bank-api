import * as argon from 'argon2';
import { PrismaClient } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';
import {
  superAdminEmail,
  superAdminName,
  superAdminSeedPassword,
} from '../env/envoriment';

const prisma = new PrismaClient();

async function seed() {
  const adminEmail = superAdminEmail;
  const adminPassword = superAdminSeedPassword;
  const adminName = superAdminName;
  console.log(adminEmail, adminPassword, adminName);
  if (!adminEmail || !adminPassword || !adminName) {
    throw new NotFoundException('Missing environment variables');
  }

  const hashPassword = await argon.hash(superAdminSeedPassword);
  const userExists = await prisma.users.findUnique({
    where: {
      email: superAdminEmail,
    },
  });

  if (!userExists) {
    await prisma.users.create({
      data: {
        name: superAdminName,
        document: '25836914788',
        email: superAdminEmail,
        password: hashPassword,
        profile: 'ADMIN',
        isActive: true,
        rg: '123456789',
      },
    });

    console.log('Super admin created successfully');
  } else {
    console.log('Super admin already exists');
  }
}
seed()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
