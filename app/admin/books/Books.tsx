"use client";

import { AvatarWithName, TableActions, TablePage } from "@/components";
import { BookWithAuthorAndGenre } from "@/types";
import { routes } from "@/utils/routes";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import parse from "html-react-parser";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteBook } from "./actions";

type BooksProps = Readonly<{ books: BookWithAuthorAndGenre[] }>;
export default function Books({ books }: BooksProps) {
  const columnHelper = createColumnHelper<Partial<BookWithAuthorAndGenre>>();

  const [loading, setLoading] = useState(false);

  const columns = [
    columnHelper.accessor("name", {
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

    columnHelper.accessor("author.name", {
      header: "Author",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("genre.title", {
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
        const id = info.row.original.id;

        if (id) {
          const handleDelete = async () => {
            setLoading(true);
            const { type, message } = await deleteBook(id);

            if (type === "success") {
              toast.success(message);
            }
            if (type === "error") {
              toast.error(message);
            }
            setLoading(false);
          };

          return (
            <TableActions
              id={id}
              handleDelete={handleDelete}
              href={`${routes.dashboard}${routes.books}`}
              description="book"
            />
          );
        }
      },
    }),
  ] as ColumnDef<unknown, unknown>[];

  return (
    <TablePage
      data={books ?? []}
      columns={columns}
      title="Books"
      loading={false}
    />
  );
}
