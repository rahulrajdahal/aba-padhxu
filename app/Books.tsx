"use client";

import { BookCard, PageLayout } from "@/components";
import { Author, Book, Genre } from "@prisma/client";

export default function Books({
  books,
}: Readonly<{
  books: ({
    genre: Pick<Genre, "title">;
    author: Pick<Author, "name">;
  } & Book)[];
}>) {
  return (
    <PageLayout className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {books.map((book) => (
        // <Card
        //   key={book.id}
        //   title={book.name}
        //   src={`/uploads/books/${book.image}`}
        //   author={book.author?.name}
        //   price={Number(Number(book.price).toFixed(2))}
        //   buttonProps={{
        //     onClick: async () => await addToCart(book.id),
        //   }}
        // />
        <BookCard
          key={book.id}
          book={book as Book & { genre: Genre } & { author: Author }}
        />
      ))}
    </PageLayout>
  );
}
