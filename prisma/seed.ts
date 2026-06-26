import { prisma } from "./prisma";
import seedBooks from "./seeds/books.seed";
import seedListings from "./seeds/listings.seed";

async function main() {
  await seedBooks();
  await seedListings();
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
