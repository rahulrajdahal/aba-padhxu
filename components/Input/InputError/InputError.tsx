"use client";

import React from "react";

type InputErrorProps = React.ComponentProps<"p">;

export default function InputError(props: InputErrorProps) {
  const { className, children, ...rest } = props;

  return (
    <p
      className={`text-red-500 text-sm leading-tight ${className || ""}`}
      {...rest}
    >
      {children}
    </p>
  );
}
