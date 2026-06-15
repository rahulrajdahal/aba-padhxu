"use client";

import React from "react";

type InputLabelProps = React.ComponentProps<"label"> & { error?: boolean };

export default function InputLabel(props: InputLabelProps) {
  const { className, children, error = false, ...rest } = props;

  return (
    <label
      className={`block font-semibold text-base transition-colors duration-300 ${error ? "text-red-500" : "text-gray-700"} ${className || ""}`}
      {...rest}
    >
      {children}
    </label>
  );
}
