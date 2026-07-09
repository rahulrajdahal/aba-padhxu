"use client";

import { TableActions, TablePage } from "@/components";
import SearchInput from "@/components/SearchInput/SearchInput";
import { Genre } from "@/generated/prisma/client/client";
import { routes } from "@/utils/routes";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import parse from "html-react-parser";
import toast from "react-hot-toast";
import { deleteGenreById } from "./actions";

type GenresProps = Readonly<{
  genres: Genre[];
  totalGenres: number;
}>;

export default function Genres({ genres, totalGenres }: GenresProps) {
  const columnHelper = createColumnHelper<Partial<Genre>>();

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
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
            const { type, message } = await deleteGenreById(id);

            if (type === "success") toast.success("Genre deleted!");

            if (type === "error") toast.error(message);
          };

          return (
            <TableActions
              id={info.row.original.id}
              handleDelete={handleDelete}
              href={`${routes.dashboard}${routes.genres}`}
              description="genre"
            />
          );
        }
      },
    }),
  ] as ColumnDef<unknown, unknown>[];

  return (
    <div className="flex flex-col gap-4 mt-4 px-4">
      <SearchInput placeholder="Search genre by name..." />

      <TablePage
        data={genres ?? []}
        columns={columns}
        loading={false}
        totalItems={totalGenres}
      />
    </div>
  );
}
