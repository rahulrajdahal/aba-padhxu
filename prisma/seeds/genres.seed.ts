import { faker } from "@faker-js/faker";
import { prisma } from "../prisma";

export default async function seedGenres() {
  console.log("Seeding genres...");
  await prisma.genre.deleteMany();

  const genresToCreate = 80;

  for (let i = 0; i < genresToCreate; i++) {
    const title = faker.book.genre();

    await prisma.genre.create({
      data: {
        name: title,
        description: faker.helpers.maybe(() => faker.lorem.paragraph(), {
          probability: 0.8,
        }),
      },
    });
  }
  console.log(`✅ Successfully seeded ${genresToCreate} genres.`);
}
