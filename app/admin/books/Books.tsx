'use client';

import { Book } from '@prisma/client';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import parse from 'html-react-parser';

import { AvatarWithName, TableActions, TablePage } from '@/components';
import { routes } from '@/utils/routes';
import { deleteBook } from './action';

type IBooks = Readonly<{ books: Book[] }>;
export default function Books({ books }: IBooks) {
  const columnHelper = createColumnHelper<Partial<Book>>();

  const columns = [
    columnHelper.accessor('name', {
      header: 'Title',
      cell: (info) => {
        const name = info.getValue() as string;
        let image;
        if (process.env.NODE_ENV === 'development') {
          image = `/uploads/books/${info.row.original.image}`;
        } else {
          image = info.row.original.image as string;
        }

        if (name) {
          return <AvatarWithName avatar={image} name={name} />;
        }
      },
    }),

    columnHelper.accessor('author.name', {
      header: 'Author',
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('description', {
      header: 'Description',
      cell: (info) => {
        const value = info.getValue();

        if (value && value?.length > 25)
          return parse(`${value?.substring(0, 25)}...`);

        return value;
      },
    }),

    columnHelper.accessor('id', {
      header: () => 'Actions',
      cell: (info) => {
        const id = info.row.original.id;

        if (id) {
          const handleDelete = async () => await deleteBook(id);

          return (
            <TableActions
              id={id}
              handleDelete={handleDelete}
              href={`${routes.dashboard}${routes.books}`}
              description='blog'
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
      title='Books'
      loading={false}
    />
  );
}
