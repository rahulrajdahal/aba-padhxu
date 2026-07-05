import { mergeClassNames } from "@/lib/mergeClassNames";
import React from "react";

interface EmptyProps {
  title?: string;
  message: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function Empty({
  icon,
  message,
  title,
  className = "",
}: EmptyProps) {
  return (
    <div
      className={mergeClassNames(
        "flex items-center justify-center py-20",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-2">
        {icon && <div className="text-gray-600">{icon}</div>}
        {title && (
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        )}
        <p className="text-gray-600 text-base">{message}</p>
      </div>
    </div>
  );
}
