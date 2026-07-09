"use client";

import { AvatarWithName, Input, TableActions, TablePage } from "@/components";
import { Book, Genre } from "@/generated/prisma/client/client";
import { useDebounce } from "@/hooks";
import { routes } from "@/utils/routes";
import { Search } from "@meistericons/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import parse from "html-react-parser";
import { redirect, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { deleteBookById } from "./actions";

type BooksProps = Readonly<{
  books: (Book & { genre: Pick<Genre, "name"> })[];
  totalBooks: number;
  currentPage: number;
  limit: number;
}>;
export default function Books({
  limit,
  books,
  currentPage,
  totalBooks,
}: BooksProps) {
  const columnHelper =
    createColumnHelper<Partial<Book & { genre: Pick<Genre, "name"> }>>();

  const columns = [
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => {
        const name = info.getValue() as string;
        let image;
        if (process.env.NODE_ENV === "development") {
          image = `/uploads/books/${info.row.original.image}`;
        } else {
          image = info.row.original.image as string;
        }

        if (name) {
          return <AvatarWithName avatar={image} name={name} />;
        }
      },
    }),

    columnHelper.accessor("author", {
      header: "Author",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("genre.name", {
      header: "Genre",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => {
        const value = info.getValue();

        if (value && value?.length > 25)
          return parse(`${value?.substring(0, 25)}...`);

        return value;
      },
    }),

    columnHelper.accessor("id", {
      header: () => "Actions",
      cell: (info) => {
        const id = info.getValue();

        if (id) {
          const handleDelete = async () => {
            const { type, message } = await deleteBookById(id);

            if (type === "success") {
              toast.success("Book Deleted!");
            }
            if (type === "error") {
              toast.error(message);
            }
          };

          return (
            <TableActions
              id={info.row.original.slug}
              handleDelete={handleDelete}
              href={`${routes.dashboard}${routes.books}`}
              description="book"
            />
          );
        }
      },
    }),
  ] as ColumnDef<unknown, unknown>[];

  const totalPages = useMemo(
    () => Math.ceil(totalBooks / limit),
    [limit, totalBooks],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set("page", String(page));
      // params.set("limit", String(limit));

      redirect(`${routes.dashboard}${routes.books}?${params.toString()}`);
    },
    [limit],
  );

  const [query, setQuery] = useState("");
  const lastQuery = useDebounce(query, 700);

  const handleOnChange: React.ChangeEventHandler<
    HTMLInputElement,
    HTMLInputElement
  > = (e) => setQuery(e.target.value);

  useEffect(() => {
    if (lastQuery) {
      const newUrl = `${routes.dashboard}${routes.books}?page=${currentPage}&query=${lastQuery}`;
      redirect(newUrl);
    }
  }, [lastQuery]);

  const searchParams = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchParams.get("query")) {
      searchRef.current?.focus();
    }
  }, [searchParams]);

  const handleLimitChange = (limit: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", String(limit));
    if (currentPage > totalPages) {
      params.set("page", totalPages.toString());
    }
    redirect(`${routes.dashboard}${routes.books}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 mt-4 px-4">
      <div>
        {/* <SearchInput searchFunction={fetchAllListings} /> */}
        <Input
          ref={searchRef}
          type="search"
          label="Search"
          placeholder="Search by title, author, or ISBN..."
          iconLeft={<Search size={24} />}
          onChange={handleOnChange}
          defaultValue={searchParams.get("query") ?? ""}
        />
      </div>
      <TablePage
        data={books ?? []}
        columns={columns}
        loading={false}
        onPageChange={handlePageChange}
        totalPages={totalPages}
        currentPage={currentPage}
        onLimitChange={handleLimitChange}
      />
    </div>
  );
}
