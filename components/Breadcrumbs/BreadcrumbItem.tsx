import Link from "next/link";
import React from "react";

interface BreadcrumbItemProps {
  href: string;
  children: React.ReactNode;
}

export default function BreadcrumbItem({
  href,
  children,
}: BreadcrumbItemProps) {
  return (
    <Link href={href} className="hover:underline">
      {children}
    </Link>
  );
}
