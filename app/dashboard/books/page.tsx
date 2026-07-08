import { Book, Genre } from "@/generated/prisma/client/client";
import Books from "./Books";
import { fetchAllBooksWithGenre } from "./actions";

export default async function page() {
  const { data } = await fetchAllBooksWithGenre();

  return <Books books={data as (Book & { genre: Genre })[]} />;
}
