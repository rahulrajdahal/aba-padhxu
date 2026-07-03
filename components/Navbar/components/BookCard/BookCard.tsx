import { Book, Listing } from "@/generated/prisma/client/client";
import { routes } from "@/utils/routes";
import Link from "next/link";

type BookCardProps = {
  listing: Listing & { book: Book };
};

export default function BookCard({ listing }: BookCardProps) {
  const { book, priceCents, id } = listing;

  return (
    <div className="flex justify-between items-center gap-4 p-4 hover:bg-primary-100">
      <Link
        href={`${routes.listings}/${id}`}
        className="flex items-center gap-4"
      >
        <img
          src={book.image}
          alt={book.title}
          className="h-20 w-20 object-cover rounded-md"
        />
        <div>
          <strong className="text-sm text-gray-700 font-semibold">
            {book.title}
          </strong>
          <p className="text-xs text-gray-600">{book.author}</p>
        </div>
      </Link>

      <strong className="text-sm text-gray-700 font-semibold">
        ${(priceCents / 100).toFixed(2)}
      </strong>
    </div>
  );
}
