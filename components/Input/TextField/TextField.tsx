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
        "rounded-lg border w-full text-lg px-2 py-1 outline-none focus-visible:border-2",
        className,
        error
          ? "border-error focus-visible:border-error"
          : "border-neutral-muted focus-visible:border-brand-ink",
      )}
      {...rest}
    />
  );
}
