"use client";

import { mergeClassNames } from "@/lib/mergeClassNames";
import React from "react";

export type TextFieldProps = React.ComponentProps<"input"> & {
  error?: boolean;
};

export default function TextField(props: TextFieldProps) {
  const { className = "", error = false, ...rest } = props;

  return (
    <input
      aria-invalid={error}
      className={mergeClassNames(
        "rounded-lg border w-full text-lg border-gray-300 px-2 py-1 outline-none focus-visible:border-2 focus-visible:border-primary-500",
        className,
        error ? "border-error" : "",
      )}
      {...rest}
    />
  );
}
