import { UserPageLayout } from "@/components";

export default async function page() {
  return (
    <UserPageLayout>
      Hey
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
