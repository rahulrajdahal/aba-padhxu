import prisma from "@/prisma/prisma";
import EditAuthor from "./EditAuthor";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const author = await prisma.author.findUnique({
    where: { slug },
  });

  if (author) {
    return <EditAuthor author={author} />;
  }

  return <div>Author not found</div>;
}
