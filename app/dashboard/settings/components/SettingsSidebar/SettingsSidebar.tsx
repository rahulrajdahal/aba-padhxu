"use client";

import { mergeClassNames } from "@/lib/mergeClassNames";
import { routes } from "@/utils/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsSidebar() {
  const pathname = usePathname();
  const currentPath = pathname.split("/").pop();

  return (
    <nav className="border border-gray-400 sticky w-fit left-4 top-32 p-4 gap-4 flex flex-col rounded-lg h-fit bg-white">
      <Link
        href={`${routes.dashboard}${routes.generalSettings}`}
        className={mergeClassNames(
          "font-medium text-sm hover:underline hover:text-blue-500",
          currentPath === "general" ? "text-blue-600" : "",
        )}
      >
        General Settings
      </Link>
      <Link
        href={`${routes.dashboard}${routes.addressSettings}`}
        className={mergeClassNames(
          "font-medium text-sm hover:underline hover:text-blue-500",
          currentPath === "address" ? "text-blue-600" : "",
        )}
      >
        Address Settings
      </Link>
    </nav>
  );
}
