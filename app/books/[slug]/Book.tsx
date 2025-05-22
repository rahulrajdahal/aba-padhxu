import { AddToCart } from "@/components/Buttons";
import { BookWithAuthorAndGenre } from "@/types";
import parse from "html-react-parser";
import Image from "next/image";

type BookProps = {
  book: BookWithAuthorAndGenre;
};

export default function Book({ book }: Readonly<BookProps>) {
  return (
    <div className="flex flex-col gap-4 mt-12">
      <div className="flex items-end justify-between">
        <strong className="text-4xl font-black">{book.name}</strong>

        <p className="text-gray-600 text-2xl italic">{book.genre?.title}</p>
      </div>
      <Image
        alt={book.name}
        src={
          process.env.NODE_ENV === "development"
            ? `/uploads/books/${book.image}`
            : book.image
        }
        width={100}
        height={150}
        className="mt-8 h-[40rem]  w-full object-cover transition-all hover:scale-105"
      />

      {book.author && (
        <div className="my-4 flex items-center justify-end gap-2">
          <span>
            <strong className="text-xl font-bold">Author</strong>
            <p className="text-lg font-medium text-gray-600">
              {book.author?.name}
            </p>
          </span>
          <Image
            alt={book.author.name}
            src={
              process.env.NODE_ENV === "development"
                ? `/uploads/authors/${book.author?.avatar as string}`
                : (book.author?.avatar as string)
            }
            width={80}
            height={80}
            className="mt-8 h-12 w-12 rounded-full object-cover transition-all hover:scale-105"
          />
        </div>
      )}

      <strong className="block text-xl font-bold">Summary</strong>
      <article className="mt-2 break-words">{parse(book.description)}</article>

      <AddToCart book={book} buttonProps={{ className: "!w-fit" }} />
    </div>
  );
}
