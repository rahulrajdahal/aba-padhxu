'use client';

import { Genre } from '@prisma/client';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { TableActions, TablePage } from '@/components';
import { routes } from '@/utils/routes';
import { deleteGenre } from './action';

type IGenres = Readonly<{ genres: Genre[] }>;
export default function Genres({ genres }: IGenres) {
  const columnHelper = createColumnHelper<Partial<Genre>>();

  const columns = [
    columnHelper.accessor('title', {
      header: 'Title',
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('id', {
      header: () => 'Actions',
      cell: (info) => {
        const id = info.row.original.id;

        if (id) {
          const handleDelete = async () => await deleteGenre(id);

          return (
            <TableActions
              id={id}
              handleDelete={handleDelete}
              href={`${routes.dashboard}${routes.genres}`}
              description='blog'
            />
          );
        }
      },
    }),
  ] as ColumnDef<unknown, unknown>[];

  return (
    <TablePage
      data={genres ?? []}
      columns={columns}
      title='Genres'
      loading={false}
    />
  );
}
