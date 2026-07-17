import { BookWithGenreName } from "@/app/dashboard/books/books.dto";
import { routes } from "@/utils/routes";
import Link from "next/link";

interface BookCardProps {
  book: BookWithGenreName;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link
      href={`${routes.books}/${book.slug}`}
      className="bg-primary-50 border border-primary-100 rounded-lg p-2"
    >
      <div className="overflow-hidden">
        <img
          src={book.image}
          alt={book.title}
          width={125}
          height={200}
          className="rounded-md object-cover hover:scale-125 transition-all w-full"
        />
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <i className="text-sm font-medium text-gray-500">{book.genre}</i>
        <div className="flex flex-col gap-0.5">
          <h4 className="text-lg line-clamp-2 font-semibold text-gray-800">
            {book.title}
          </h4>
          <p className="text-sm text-gray-600">by {book.author}</p>
        </div>
      </div>
    </Link>
  );
}
