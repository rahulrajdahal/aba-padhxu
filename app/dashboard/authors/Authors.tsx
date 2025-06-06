"use client";

import { Author } from "@prisma/client";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { AvatarWithName, TableActions, TablePage } from "@/components";
import { routes } from "@/utils/routes";
import { deleteAuthor } from "./actions";

type IAuthors = Readonly<{ authors: Author[] }>;
export default function Authors({ authors }: IAuthors) {
  const columnHelper = createColumnHelper<Partial<Author>>();

  const columns = [
    columnHelper.accessor("name", {
      header: "Author",
      cell: (info) => {
        const name = info.getValue() as string;
        let avatar;
        if (process.env.NODE_ENV === "development") {
          avatar = `/uploads/authors/${info.row.original.avatar}`;
        } else {
          avatar = info.row.original.avatar as string;
        }

        if (name) {
          return <AvatarWithName avatar={avatar} name={name} />;
        }
      },
    }),

    columnHelper.accessor("id", {
      header: () => "Actions",
      cell: (info) => {
        const id = info.getValue();

        if (id) {
          const handleDelete = async () => await deleteAuthor(id);

          return (
            <TableActions
              id={info.row.original.slug}
              handleDelete={handleDelete}
              href={`${routes.dashboard}${routes.authors}`}
              description="author"
            />
          );
        }
      },
    }),
  ] as ColumnDef<unknown, unknown>[];

  return <TablePage data={authors ?? []} columns={columns} loading={false} />;
}
