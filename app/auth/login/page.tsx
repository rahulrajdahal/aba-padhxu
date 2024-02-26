'use client';

import { Button, Input } from '@/components';
import { routes } from '@/utils/routes';
import { useFormState, useFormStatus } from 'react-dom';
import { login } from '../action';

export default function Page() {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(login, null);

  return (
    <form action={formAction} className='flex flex-col gap-6 '>
      <strong>Login</strong>
      <Input
        label='Email'
        error={state?.errors?.email}
        inputProps={{ type: 'email', name: 'email', required: true }}
      />
      <Input
        label='Password'
        error={state?.errors?.password}
        inputProps={{ type: 'password', name: 'password', required: true }}
      />
      <Button type='submit' disabled={pending} aria-disabled={pending}>
        Login
      </Button>
      <span className='flex items-center gap-1'>
        Don&apos;t have an account?
        <Button variant='text' href={routes.signup}>
          Signup Instead.
        </Button>
      </span>
    </form>
  );
}
