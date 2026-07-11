import { prisma } from "./prisma";
import seedBooks from "./seeds/books.seed";
import seedGenres from "./seeds/genres.seed";
import seedListings from "./seeds/listings.seed";
import { seedUserAddresses } from "./seeds/userAddresses.seed";
import seedUsers from "./seeds/users.seed";

async function main() {
  await seedUsers();
  await seedGenres();
  await seedBooks();
  await seedListings();
  await seedUserAddresses();
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
