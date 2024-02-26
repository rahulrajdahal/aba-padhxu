'use client';

import { Button, Input } from '@/components';
import { routes } from '@/utils/routes';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { signup } from '../action';

export default function Page() {
  const { pending } = useFormStatus();
  const [preview, setPreview] = useState('');
  const [state, formAction] = useFormState(signup, null);

  const handleAvatarOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files?.length > 0) setPreview(URL.createObjectURL(files[0]));
  };

  return (
    <form action={formAction} className='flex flex-col gap-6 '>
      <strong>Signup</strong>
      <Input
        label='Full Name'
        error={state?.errors?.name}
        inputProps={{ name: 'name', required: true }}
      />
      <Input
        label='Email'
        error={state?.errors?.email}
        inputProps={{ type: 'email', name: 'email', required: true }}
      />
      <Input
        label='Avatar'
        error={state?.errors?.avatar}
        inputProps={{
          name: 'avatar',
          onChange: handleAvatarOnChange,
          type: 'file',
          required: true,
        }}
      />
      {preview && (
        <Image
          src={preview}
          alt='avatar'
          className='h-12 w-12 rounded-full'
          width={24}
          height={24}
        />
      )}
      <Input
        label='Password'
        error={state?.errors?.password}
        inputProps={{ type: 'password', name: 'password', required: true }}
      />
      <Input
        label='Confirm Password'
        error={state?.errors?.password}
        inputProps={{
          type: 'password',
          name: 'confirmPassword',
          required: true,
        }}
      />
      <Button type='submit' disabled={pending} aria-disabled={pending}>
        Signup
      </Button>

      <span className='flex items-center gap-1'>
        Already have an account?
        <Button variant='text' href={routes.login}>
          Login Instead.
        </Button>
      </span>
    </form>
  );
}
