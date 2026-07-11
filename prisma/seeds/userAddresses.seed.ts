import { faker } from "@faker-js/faker";
import { prisma } from "../prisma";

export async function seedUserAddresses() {
  console.log("Seeding userAddresses...");
  await prisma.userAddress.deleteMany();

  const users = await prisma.user.findMany({ select: { id: true } });
  const userIds = users.map((u) => u.id);

  const userAddressesToCreate = userIds.length * 2;

  for (let i = 0; i < userAddressesToCreate; i++) {
    await prisma.userAddress.create({
      data: {
        userId: faker.helpers.arrayElement(userIds),
        addressLine1: faker.location.streetAddress(),
        addressLine2: faker.location.secondaryAddress(),
        city: faker.location.city(),
        stateProvince: faker.location.state(),
        postalCode: faker.location.zipCode(),
        countryCode: faker.location.countryCode(),
        isDefault: faker.datatype.boolean(),
        recipientName: faker.person.firstName(),
      },
    });
  }

  console.log(`✅ Successfully seeded ${userAddressesToCreate} userAddresses.`);
}
