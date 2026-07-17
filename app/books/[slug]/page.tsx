import { fetchBookWithGenreNameBySlug } from "@/app/dashboard/books/actions";
import { BookWithGenreName } from "@/app/dashboard/books/books.dto";
import { notFound } from "next/navigation";
import Book from "./Book";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await fetchBookWithGenreNameBySlug(slug);

  if (!data) return notFound();

  return <Book book={data as BookWithGenreName} />;
}
