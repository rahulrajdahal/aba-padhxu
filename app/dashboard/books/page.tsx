import { Book } from "@/generated/prisma/client/client";
import Books from "./Books";
import { fetchAllBooks } from "./actions";

export default async function page() {
  const { data } = await fetchAllBooks();

  return <Books books={data as Book[]} />;
}
