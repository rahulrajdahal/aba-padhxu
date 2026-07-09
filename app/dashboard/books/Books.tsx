"use client";

import {
  AvatarWithName,
  Input,
  Select,
  TableActions,
  TablePage,
} from "@/components";
import { Book, Genre } from "@/generated/prisma/client/client";
import { useDebounce } from "@/hooks";
import { routes } from "@/utils/routes";
import { Search } from "@meistericons/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import parse from "html-react-parser";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { deleteBookById } from "./actions";

type BooksProps = Readonly<{
  books: (Book & { genre: Pick<Genre, "name"> })[];
  totalBooks: number;
  currentPage: number;
  genres: Genre[];
}>;
export default function Books({
  books,
  currentPage,
  totalBooks,
  genres,
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

  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    redirect(`?${params.toString()}`);
  };

  const defaultQuery = searchParams.get("query") ?? "";

  const [query, setQuery] = useState<string>();
  const lastQuery = useDebounce(String(query), 700);

  const handleOnChange: React.ChangeEventHandler<
    HTMLInputElement,
    HTMLInputElement
  > = (e) => setQuery(e.target.value);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (lastQuery !== "undefined") {
      params.set("query", String(lastQuery));
      params.delete("page");

      if (lastQuery === "") {
        params.delete("query");
      }
      redirect(`?${params.toString()}`);
    }
  }, [lastQuery]);

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchParams.get("query")) {
      searchRef.current?.focus();
    }
  }, [searchParams]);

  const handleGenreOnChange: React.ChangeEventHandler<
    HTMLSelectElement,
    HTMLSelectElement
  > = (e) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("genre", e.target.value);
    if (params.get("genre") === "") params.delete("genre");
    redirect(`?${params.toString()}`);
  };

  const defaultGenre = searchParams.get("genre") ?? "";

  return (
    <div className="flex flex-col gap-4 mt-4 px-4">
      <div className="flex items-center gap-4">
        <Input
          ref={searchRef}
          type="search"
          label="Search"
          placeholder="Search by title, author, or ISBN..."
          iconLeft={<Search size={24} />}
          onChange={handleOnChange}
          defaultValue={defaultQuery}
        />

        <Select
          label="Genre"
          options={[
            { label: "All Genres", value: "" },
            ...genres.map((genre) => ({
              label: genre.name,
              value: genre.name,
            })),
          ]}
          defaultValue={defaultGenre}
          onChange={handleGenreOnChange}
        />
      </div>
      <TablePage
        data={books ?? []}
        columns={columns}
        loading={false}
        totalItems={totalBooks}
      />
    </div>
  );
}
