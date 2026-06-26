import { slugify } from "@/lib/slugify";
import { faker } from "@faker-js/faker";
import { prisma } from "../prisma";

export default async function seedBooks() {
  console.log("Seeding books...");
  await prisma.book.deleteMany();

  const booksToCreate = 20;

  for (let i = 0; i < booksToCreate; i++) {
    const title = faker.book.title();
    // Append a short unique identifier to ensure the slug is always unique
    const slug = `${slugify(title)}-${faker.string.alphanumeric(5)}`;

    await prisma.book.create({
      data: {
        isbn13: faker.string.numeric(13), // Generates a exact 13-digit string
        title: title,
        slug: slug,
        description: faker.helpers.maybe(() => faker.lorem.paragraph(), {
          probability: 0.8,
        }),
        author: faker.book.author(),
        genre: faker.helpers.maybe(() => faker.book.genre(), {
          probability: 0.7,
        }),
        publisher: faker.helpers.maybe(() => faker.company.name(), {
          probability: 0.6,
        }),
        publishedDate: faker.helpers.maybe(
          () => faker.date.past({ years: 20 }),
          {
            probability: 0.8,
          },
        ),
        image: faker.image.url({ height: 200, width: 200 }), // Generates a placeholder book image URL
      },
    });
  }
  console.log(`✅ Successfully seeded ${booksToCreate} books.`);
}
