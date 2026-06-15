"use client";

import React from "react";

type InputLabelProps = React.ComponentProps<"label">;

export default function InputLabel(props: InputLabelProps) {
  const { className, children, ...rest } = props;

  return (
    <label
      className={`block font-medium text-sm text-gray-700 ${className || ""}`}
      {...rest}
    >
      {children}
    </label>
  );
}
