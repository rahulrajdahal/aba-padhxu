'use client';

import { Button, Input } from '@/components';
import { Genre } from '@prisma/client';
import { updateGenre } from '../action';

export default function EditGenre({
  genre,
}: Readonly<{
  genre: Genre;
}>) {
  const { title, id } = genre;

  const updateWithGenreId = updateGenre.bind(null, id);

  return (
    <form action={updateWithGenreId}>
      <strong className='text-2xl font-bold'>Edit Genre</strong>
      <Input
        label='Title'
        // error={state?.errors?.name}
        inputProps={{ name: 'title', required: true, defaultValue: title }}
      />

      <Button
        type='submit'
        //  disabled={pending} aria-disabled={pending}
      >
        Update Genre
      </Button>
    </form>
  );
}
