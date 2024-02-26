'use client'

import { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

const Container = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

interface IInput extends ComponentPropsWithoutRef<'fieldset'> {
  label?: string;
  error?: string;
  inputProps?: ComponentPropsWithoutRef<'input'>;
}
export default function Input({
  label,
  error,
  inputProps,
  ...props
}: Readonly<IInput>) {
  return (
    <Container {...props}>
      {label && (
        <label htmlFor='' className='text-base font-semibold'>
          {label}
        </label>
      )}
      <input
        {...inputProps}
        className='rounded-lg border border-gray-300 px-2 py-1 outline-none'
      />
      {error && (
        <p className='text-sm font-medium tracking-tight text-red-400'>
          {error}
        </p>
      )}
    </Container>
  );
}
