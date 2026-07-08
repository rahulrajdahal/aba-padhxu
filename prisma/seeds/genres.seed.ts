import { faker } from "@faker-js/faker";
import { prisma } from "../prisma";

export default async function seedGenres() {
  console.log("Seeding genres...");
  await prisma.genre.deleteMany();

  const genresToCreate = 20;

  const genreTitles = faker.helpers.uniqueArray(
    faker.book.genre,
    genresToCreate,
  );

  for (let i = 0; i < genresToCreate; i++) {
    await prisma.genre.create({
      data: {
        name: genreTitles[i],
        description: faker.helpers.maybe(() => faker.lorem.paragraph(), {
          probability: 0.8,
        }),
      },
    });
  }
  console.log(`✅ Successfully seeded ${genresToCreate} genres.`);
}
