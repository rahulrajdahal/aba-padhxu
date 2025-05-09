"use client";

import { routes } from "@/utils/routes";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";

const Container = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

interface IInput extends ComponentPropsWithoutRef<"fieldset"> {
  label?: string;
  error?: string;
  inputProps?: ComponentPropsWithoutRef<"input">;
  forgot?: boolean;
}
export default function Input({
  label,
  error,
  inputProps,
  forgot = false,
  ...props
}: Readonly<IInput>) {
  return (
    <Container {...props}>
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor="" className="text-base font-semibold">
            {label}
          </label>

          {forgot ? (
            <Link
              href={routes.forgotPassword}
              className="text-blue-600 underline text-xs"
            >
              Forgot Password?
            </Link>
          ) : null}
        </div>
      )}
      <input
        {...inputProps}
        className="rounded-lg border border-gray-300 px-2 py-1 outline-none"
      />
      {error && (
        <p className="text-sm font-medium tracking-tight text-red-400">
          {error}
        </p>
      )}
    </Container>
  );
}
