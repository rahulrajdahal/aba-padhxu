"use client";

import { AvatarWithName, TableActions, TablePage } from "@/components";
import { Book } from "@/generated/prisma/client/client";
import { routes } from "@/utils/routes";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import parse from "html-react-parser";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteBookById } from "./actions";

type BooksProps = Readonly<{ books: Book[] }>;
export default function Books({ books }: BooksProps) {
  const columnHelper = createColumnHelper<Partial<Book>>();

  const [loading, setLoading] = useState(false);

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
    columnHelper.accessor("genre", {
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
            setLoading(true);
            const { type, message } = await deleteBookById(id);

            if (type === "success") {
              toast.success("Book Deleted!");
            }
            if (type === "error") {
              toast.error(message);
            }
            setLoading(false);
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

  return <TablePage data={books ?? []} columns={columns} loading={false} />;
}
