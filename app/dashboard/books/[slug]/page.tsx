import { Book } from "@/generated/prisma/client/client";
import { fetchBookBySlug } from "../actions";
import EditBook from "./EditBook";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data } = await fetchBookBySlug(slug);

  return <EditBook book={data as Book} />;
}
