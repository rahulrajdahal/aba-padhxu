"use client";

import React from "react";

export type TextFieldProps = React.ComponentProps<"input">;

export default function TextField(props: TextFieldProps) {
  const { className, ...rest } = props;

  return (
    <input
      className={`rounded-lg border text-lg border-gray-300 px-2 py-1 outline-none focus-visible:border-2 focus-visible:border-primary-500 ${className || ""}`}
      {...rest}
    />
  );
}
