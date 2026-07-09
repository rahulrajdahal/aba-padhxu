import { Book, Genre } from "@/generated/prisma/client/client";
import { fetchAllGenres } from "../genres/actions";
import Books from "./Books";
import { fetchAllBooksWithGenreName, fetchBooksCount } from "./actions";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    query?: string;
    limit?: number;
    genre?: string;
  }>;
}) {
  const { limit, page, query, genre } = await searchParams;

  const currentPage = Number(page) || 1;
  const offset = currentPage * Number(limit) - Number(limit);

  const [{ data }, { data: totalBooksCount }, { data: genres }] =
    await Promise.all([
      fetchAllBooksWithGenreName(
        Number(limit || 20),
        Number(offset || 0),
        query,
        genre,
      ),
      fetchBooksCount(query, genre),
      fetchAllGenres(),
    ]);

  return (
    <Books
      books={data as (Book & { genre: Pick<Genre, "name"> })[]}
      totalBooks={totalBooksCount as number}
      currentPage={currentPage}
      limit={Number(limit || 20)}
      genres={genres as Genre[]}
    />
  );
}
