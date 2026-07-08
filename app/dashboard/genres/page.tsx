import { Genre } from "@/generated/prisma/client/client";
import { fetchAllGenres } from "./actions";
import Genres from "./Genres";

export default async function page() {
  const { data } = await fetchAllGenres();

  return <Genres genres={data as Genre[]} />;
}
