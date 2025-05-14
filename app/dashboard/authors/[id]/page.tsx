import prisma from "@/prisma/prisma";
import EditAuthor from "./EditAuthor";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const author = await prisma.author.findUnique({
    where: { id },
  });

  if (author) {
    return <EditAuthor author={author} />;
  }

  return <div>Author not found</div>;
}
