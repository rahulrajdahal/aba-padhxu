import { GenreSelect } from "@/components";
import Empty from "@/components/Empty/Empty";
import BookSkeleton from "@/components/Navbar/components/BookSkeleton/BookSkeleton";
import SearchInput from "@/components/SearchInput/SearchInput";
import TableFooter from "@/components/TablePage/TableFooter";
import { Notebook } from "@meistericons/react";
import { Suspense } from "react";
import { BookWithGenreName } from "../dashboard/books/books.dto";
import BookCard from "./components/BookCard";

type BooksProps = {
  books: BookWithGenreName[];
  totalBooksCount: number;
};

export default function Books({ books, totalBooksCount }: BooksProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex items-center gap-4">
        <SearchInput
          label="Search Books"
          placeholder="Search by title, author, or ISBN..."
        />
        <GenreSelect />
      </div>

      <Suspense
        fallback={Array.from({ length: 8 }, (_, i) => (
          <BookSkeleton key={i} />
        ))}
      >
        {books?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {books?.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <Empty
            icon={<Notebook size={48} />}
            message="Could not find any books"
            title="Books not found"
          />
        )}
      </Suspense>

      <TableFooter totalItems={totalBooksCount} />
      {/* <div className="justify-self-end mt-8">
        <Pagination totalPages={totalBooksCount} />
      </div> */}
    </div>
  );
}
