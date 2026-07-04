import React from "react";

interface BreadcrumbsProps {
  children: React.ReactNode[];
  seperator?: string;
}

export default function Breadcrumbs({
  children,
  seperator = ">",
}: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6">
      {children.map((child, index) => {
        return (
          <>
            {child}
            {index !== children.length - 1 && (
              <span className="text-gray-500">{seperator}</span>
            )}
          </>
        );
      })}
    </nav>
  );
}
