'use client';

import { Button, Input } from '@/components';
import { Author } from '@prisma/client';
import { updateAuthor } from '../action';

export default function Page({
  author,
}: Readonly<{
  author: Author;
}>) {
  const { name, id } = author;

  const updateWithAuthorId = updateAuthor.bind(null, id);

  return (
    <form action={updateWithAuthorId}>
      <strong className='text-2xl font-bold'>Edit Author </strong>
      <Input
        label='Name'
        // error={state?.errors?.name}
        inputProps={{ name: 'name', required: true, defaultValue: name }}
      />
      <Input
        label='Avatar'
        // error={state?.errors?.avatar}
        inputProps={{ type: 'file', name: 'avatar' }}
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
