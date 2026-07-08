import { BookCondition } from "@/generated/prisma/client/enums";
import { faker } from "@faker-js/faker";
import { prisma } from "../prisma";

export default async function seedListings() {
  console.log("🌱 Start seeding book listings...");

  const users = await prisma.user.findMany({ select: { id: true } });
  const books = await prisma.book.findMany({ select: { id: true } });

  if (users.length === 0 || books.length === 0) {
    console.error(
      "❌ Error: You must have Users and Books in the database before seeding listings.",
    );
    process.exit(1);
  }

  await prisma.listing.deleteMany();

  const listingsToCreate = 1500;
  const userIds = users.map((u) => u.id);
  const bookIds = books.map((b) => b.id);

  for (let i = 0; i < listingsToCreate; i++) {
    await prisma.listing.create({
      data: {
        condition: faker.helpers.arrayElement(Object.values(BookCondition)),
        priceCents: faker.number.int({ min: 500, max: 15000 }),
        quantity: faker.number.int({ min: 1, max: 10 }),
        description: faker.helpers.maybe(() => faker.lorem.sentence(), {
          probability: 0.6,
        }),
        isActive: faker.datatype.boolean({ probability: 0.85 }),
        sellerId: faker.helpers.arrayElement(userIds),
        bookId: faker.helpers.arrayElement(bookIds),
      },
    });
  }

  console.log(`✅ Successfully seeded ${listingsToCreate} book listings.`);
}
