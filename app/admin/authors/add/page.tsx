'use client';

import { Button, Input } from '@/components';
import { useFormState, useFormStatus } from 'react-dom';
import { addAuthor } from '../action';

export default function AddBook() {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(addAuthor, null);

  return (
    <form action={formAction}>
      <strong className='text-2xl font-bold'>Add Author </strong>
      <Input
        label='Name'
        error={state?.errors?.name}
        inputProps={{ name: 'name', required: true }}
      />
      <Input
        label='Avatar'
        error={state?.errors?.avatar}
        inputProps={{ type: 'file', name: 'avatar' }}
      />
      <Button type='submit' disabled={pending} aria-disabled={pending}>
        Add Author
      </Button>
    </form>
  );
}
