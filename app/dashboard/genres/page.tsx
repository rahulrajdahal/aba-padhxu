import { Genre } from "@/generated/prisma/client/client";
import { fetchAllGenres, fetchGenresCount } from "./actions";
import Genres from "./Genres";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    query?: string;
    limit?: number;
  }>;
}) {
  const { limit, page, query } = await searchParams;

  const currentPage = Number(page) || 1;
  const offset = currentPage * Number(limit) - Number(limit);

  const [{ data }, { data: totalCount }] = await Promise.all([
    fetchAllGenres(Number(limit || 20), Number(offset || 0), query),
    fetchGenresCount(query),
  ]);

  return <Genres genres={data as Genre[]} totalGenres={totalCount as number} />;
}
