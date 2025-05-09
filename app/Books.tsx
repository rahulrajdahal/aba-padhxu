"use client";

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
    <main className="mt-10 grid grid-cols-1 gap-8 px-[12.5%] md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {books.map(
        (book) => book.name
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
        // <BookCard
        //   key={book.id}
        //   book={book as Book & { genre: Genre } & { author: Author }}
        // />
      )}
    </main>
  );
}
