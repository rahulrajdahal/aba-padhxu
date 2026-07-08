import { Genre } from "@/generated/prisma/client/client";
import { fetchAllGenres } from "../../genres/actions";
import AddBook from "./AddBook";

export default async function page() {
  const { data } = await fetchAllGenres();

  return <AddBook genres={data as Genre[]} />;
}
