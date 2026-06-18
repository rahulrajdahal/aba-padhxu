import { UserPageLayout } from "@/components";

export default async function page() {
  return (
    <UserPageLayout>
      Hye hey hey
      {/* <Books
        books={
          books.map((book) => ({
            ...book,
            price: Number(book.price).toFixed(2),
          })) as unknown as BookWithAuthorAndGenre[]
        }
      /> */}
    </UserPageLayout>
  );
}
