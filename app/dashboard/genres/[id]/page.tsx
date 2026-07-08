import { Genre } from "@/generated/prisma/client/client";
import { fetchGenreById } from "../actions";
import EditGenre from "./EditGenre";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data } = await fetchGenreById(id);

  return <EditGenre genre={data as Genre} />;
}
