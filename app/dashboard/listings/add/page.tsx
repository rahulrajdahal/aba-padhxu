import { Book } from "@/generated/prisma/client/client";
import { fetchAllBooks } from "../../books/actions";
import AddListing from "./AddListing";

export default async function page() {
  const { data } = await fetchAllBooks();

  return <AddListing books={data as Book[]} />;
}
