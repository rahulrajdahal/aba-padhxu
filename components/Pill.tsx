import { mergeClassNames } from "@/lib/mergeClassNames";
import React from "react";

interface PillProps extends React.ComponentProps<"span"> {
  children: React.ReactNode;
}

export default function Pill({
  children,
  className = "",
  ...props
}: PillProps) {
  return (
    <span
      className={mergeClassNames(
        "inline-flex items-center gap-2 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-semibold tracking-wide uppercase",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
