'use client';

import { Button, Input } from '@/components';
import { Author, Book } from '@prisma/client';
import CreateableSelect from 'react-select/creatable';
import { updateBook } from '../action';

export default function Page({
  book,
  authors,
}: Readonly<{
  book: Book & { author: Pick<Author, 'name' | 'id'> };
  authors: Pick<Author, 'name' | 'id'>[];
}>) {
  const { name, description, author, publishedDate, id } = book;

  const updateWithBookId = updateBook.bind(null, id);

  const authorDefault = { label: author?.name, value: author?.name };
  const authorOptions = authors.map(({ name }) => ({
    label: name,
    value: name,
  }));

  return (
    <form action={updateWithBookId}>
      <strong className='text-2xl font-bold'>Edit Book </strong>
      <Input
        label='Book Title'
        // error={state?.errors?.name}
        inputProps={{ name: 'name', defaultValue: name }}
      />
      <Input
        label='Book description'
        // error={state?.errors?.description}
        inputProps={{
          name: 'description',
          defaultValue: description,
        }}
      />
      <Input
        label='Book Image'
        // error={state?.errors?.image}
        inputProps={{ type: 'file', name: 'image' }}
      />
      <CreateableSelect
        closeMenuOnSelect={false}
        name='author'
        placeholder='Select Author'
        options={authorOptions}
        defaultValue={authorDefault}
      />
      {/* <Input
        label='Author'
        // error={state?.errors?.author}
        inputProps={{
          name: 'author',
          defaultValue: author.id,
        }}
      /> */}
      <Input
        label='Published Date'
        // error={state?.errors?.publisedDate}
        inputProps={{
          name: 'publishedDate',
          defaultValue: publishedDate,
        }}
      />
      <Button
        type='submit'
        //  disabled={pending} aria-disabled={pending}
      >
        Update Book
      </Button>
    </form>
  );
}
