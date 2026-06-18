import Book from "./Book";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <Book book={null} />;
}
