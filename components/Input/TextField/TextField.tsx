"use client";

import React from "react";

type TextFieldProps = React.ComponentProps<"input">;

export default function TextField(props: TextFieldProps) {
  const { className, ...rest } = props;

  return (
    <input
      className={`rounded-lg border border-gray-300 px-2 py-1 outline-none ${className || ""}`}
      {...rest}
    />
  );
}
