'use client';

import Link from 'next/link';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import styled, { css } from 'styled-components';

const getVariantStyles = (variant: Variant) => {
  if (variant === 'filled') {
    return css`
      background-color: #1b911bd9;
      color: #cddfcd;
      padding: 0.5rem 1.25rem;
    `;
  } else if (variant === 'outlined') {
    return css`
      border: 1px solid #cddfcd;
      color: #1b911bd9;
      padding: 0.5rem 1.25rem;
    `;
  } else {
    return css`
      color: #1b911bd9;

      &:hover {
        text-decoration: underline;
      }
    `;
  }
};
const Container = styled.button<{ variant: Variant }>`
  ${(p) => getVariantStyles(p.variant)};
  border-radius: 1.25rem;
`;

type TextVariant = 'text';
type Variant = 'filled' | 'outlined' | TextVariant;
interface ITextButton extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  variant?: TextVariant;
  href: string;
}
interface IVariantButton extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  variant?: Variant;
  href?: string;
}
type IButton = IVariantButton | ITextButton;

export default function Button({
  variant = 'filled',
  href,
  children,
  ...props
}: Readonly<IButton>) {
  return href && variant === 'text' ? (
    <Link href={href}>
      <Container variant={'text'} type='button' {...props}>
        {children}
      </Container>
    </Link>
  ) : (
    <Container variant={variant} type='button' {...props}>
      {children}
    </Container>
  );
}
