import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import { prisma } from "../prisma";

async function createUsers() {
  console.log("Seeding users...");

  const usersToCreate = 10;
  const password = faker.internet.password();

  const [admin, seller, user] = await Promise.all([
    prisma.user.create({
      data: {
        email: "test@admin.com",
        passwordHash: bcrypt.hashSync("Pa$$w0rd!", 10),
        isActive: true,
        isAdmin: true,
      },
    }),
    prisma.user.create({
      data: {
        email: "test@seller.com",
        passwordHash: bcrypt.hashSync("Pa$$w0rd!", 10),
        isActive: true,
        isAdmin: false,
      },
    }),
    prisma.user.create({
      data: {
        email: "test@user.com",
        passwordHash: bcrypt.hashSync("Pa$$w0rd!", 10),
        isActive: true,
        isAdmin: false,
      },
    }),
  ]);

  await Promise.all([
    prisma.userProfile.create({
      data: {
        userId: admin.id,
        firstName: "Test",
        lastName: "Admin",
        avatar: faker.image.avatar(),
        isSeller: true,
        phoneNumber: faker.phone.number(),
      },
    }),
    prisma.userProfile.create({
      data: {
        userId: seller.id,
        firstName: "Test",
        lastName: "Seller",
        avatar: faker.image.avatar(),
        isSeller: true,
        phoneNumber: faker.phone.number(),
      },
    }),
    prisma.userProfile.create({
      data: {
        userId: user.id,
        firstName: "Test",
        lastName: "User",
        avatar: faker.image.avatar(),
        isSeller: false,
        phoneNumber: faker.phone.number(),
      },
    }),
  ]);

  for (let i = 0; i < usersToCreate; i++) {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        passwordHash: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        isActive: true,
      },
    });
  }
  console.log(`✅ Successfully seeded ${usersToCreate} users.`);
}

async function createProfiles() {
  console.log("Seeding profiles...");

  const users = await prisma.user.findMany({
    select: { id: true },
    where: {
      email: { not: { contains: "test" } },
    },
  });
  const userIds = users.map((u) => u.id);

  for (let i = 0; i < userIds.length; i++) {
    await prisma.userProfile.create({
      data: {
        userId: userIds[i],
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        avatar: faker.image.avatar(),
        isSeller: faker.datatype.boolean(),
      },
    });
  }
  console.log(`✅ Successfully seeded ${users.length} profiles.`);
}

export default async function seedUsers() {
  await prisma.user.deleteMany();
  await prisma.userProfile.deleteMany();

  await createUsers();
  await createProfiles();

  console.log(`✅ Successfully seeded users and profiles.`);
}
