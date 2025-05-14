import prisma from "@/prisma/prisma";
import Authors from "./Authors";

export default async function page() {
  const authors = await prisma.author.findMany({});

  return <Authors authors={authors} />;
}
