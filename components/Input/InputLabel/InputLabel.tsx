"use client";

import { mergeClassNames } from "@/lib/mergeClassNames";
import React from "react";

type InputLabelProps = React.ComponentProps<"label"> & {
  error?: boolean;
  required?: boolean;
};

export default function InputLabel(props: InputLabelProps) {
  const {
    className = "",
    children,
    error = false,
    required = false,
    ...rest
  } = props;

  const baseClassName = `block font-semibold text-base transition-colors duration-300 ${error ? "text-red-500" : "text-gray-700"}`;

  return (
    <label
      aria-required={required}
      className={mergeClassNames(baseClassName, className)}
      {...rest}
    >
      {children}
      {required ? <span className="ml-1 text-red-500">*</span> : null}
    </label>
  );
}
