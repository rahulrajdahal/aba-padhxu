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
        "rounded-lg border w-full text-lg px-4 py-2 focus-visible:ring-2 outline-none transition-colors",
        className,
        error
          ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500 placeholder:text-red-400"
          : "border-gray-300 focus-visible:border-primary-400 focus-visible:ring-primary-400 placeholder:text-gray-400",
      )}
      {...rest}
    />
  );
}
