"use client";

import { mergeClassNames } from "@/lib/mergeClassNames";
import React from "react";

type InputHelperTextProps = React.ComponentProps<"p">;

export default function InputHelperText(props: InputHelperTextProps) {
  const { className = "", children, ...rest } = props;

  const baseClassName = "text-sm font-medium tracking-tight text-gray-400";

  return (
    <p className={mergeClassNames(baseClassName, className)} {...rest}>
      {children}
    </p>
  );
}
