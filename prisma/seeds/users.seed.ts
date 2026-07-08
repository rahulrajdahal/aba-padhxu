import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import { prisma } from "../prisma";

async function createUsers() {
  console.log("Seeding users...");
  await prisma.user.deleteMany();

  const usersToCreate = 10;
  const password = faker.internet.password();

  await prisma.user.create({
    data: {
      email: "rehidoc174@besenica.com",
      passwordHash: bcrypt.hashSync("Pa$$w0rd!", 10),
      isActive: true,
      isAdmin: true,
      profile: {
        create: {
          firstName: "New",
          lastName: "admin",
          avatar: faker.image.avatar(),
          isSeller: true,
        },
      },
    },
  });

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
  await prisma.userProfile.deleteMany();

  const users = await prisma.user.findMany({ select: { id: true } });
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
  await createUsers();
  await createProfiles();

  console.log(`✅ Successfully seeded users and profiles.`);
}
