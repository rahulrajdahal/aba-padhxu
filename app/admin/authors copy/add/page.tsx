'use client';

import { Button, Input } from '@/components';
import { useFormState, useFormStatus } from 'react-dom';
import { addGenre } from '../action';

export default function AddGenre() {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(addGenre, null);

  return (
    <form action={formAction}>
      <strong className='text-2xl font-bold'>Add Genre </strong>
      <Input
        label='title'
        error={state?.errors?.title}
        inputProps={{ name: 'title', required: true }}
      />

      <Button type='submit' disabled={pending} aria-disabled={pending}>
        Add Genre
      </Button>
    </form>
  );
}
