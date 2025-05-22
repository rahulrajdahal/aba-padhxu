import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
    const generateRandomNumber = (length = 100000) =>
        Math.floor(Math.random() * length);

    const images = [
        "https://res.cloudinary.com/drnmphnjo/image/upload/v1663870979/cld-sample-4.jpg",
        "https://res.cloudinary.com/drnmphnjo/image/upload/v1663870951/sample.jpg",
    ];
    const avatars = [
        "https://res.cloudinary.com/drnmphnjo/image/upload/v1663870978/cld-sample.jpg",
        "https://res.cloudinary.com/drnmphnjo/image/upload/v1663870959/samples/bike.jpg",
        "https://res.cloudinary.com/drnmphnjo/image/upload/v1674317301/jobs/axm2ik1u9o4wyjwke8ki.png",
        "https://res.cloudinary.com/drnmphnjo/image/upload/v1664273605/bbxgxsnwsfpethtwxyby.png",
    ];
    const salt = bcrypt.genSaltSync(10);

    const user = await prisma.user.create({
        data: {
            name: "admin",
            email: "admin@me.com",
            password: bcrypt.hashSync("?=VK-^Kin.$X7C,", salt),
            emailConfirmed: true,
            avatar: "1708552824810-meistericons.png",
            isSuperAdmin: true,
            role: "SELLER",
        },
    });

    await prisma.author.createMany({
        data: Array(20)
            .fill(0)
            .map((_, i) => ({
                name: `Author-${i}`,
                avatar: avatars[generateRandomNumber(4)],
                slug: `${`Author-${i}`.toLowerCase().replace(/ /g, "-")}-${Date.now()}`,
            })),
    });
    await prisma.genre.createMany({
        data: Array(20)
            .fill(0)
            .map((_, i) => ({
                title: `genre-${i}`,
                slug: `${`genre-${i}`.toLowerCase().replace(/ /g, "-")}-${Date.now()}`,
            })),
    });
    const authorIds = await prisma.author.findMany({ select: { id: true } });
    const genreIds = await prisma.genre.findMany({ select: { id: true } });
    await prisma.book.createMany({
        data: Array(30)
            .fill(0)
            .map((_, i) => ({
                name: `Book-${i}`,
                image: images[generateRandomNumber(2)],
                description: `This is a long book description of ${i}`,
                price: generateRandomNumber(500),
                publishedDate: `${generateRandomNumber(30)}-${generateRandomNumber(12)}-${generateRandomNumber(2050)}`,
                quantity: generateRandomNumber(20),
                authorId: authorIds[generateRandomNumber(authorIds.length)].id,
                sellerId: user.id,
                genreId: genreIds[generateRandomNumber(genreIds.length)].id,
                slug: `${`Book-${i}`.toLowerCase().replace(/ /g, "-")}-${Date.now()}`,
            })),
    });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
