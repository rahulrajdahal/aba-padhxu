"use client";

import { mergeClassNames } from "@/lib/mergeClassNames";
import { routes } from "@/utils/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsSidebar() {
  const pathname = usePathname();
  const currentPath = pathname.split("/dasboard").pop();

  const links = [
    { label: "General Settings", href: routes.generalSettings },
    { label: "Address Settings", href: routes.addressSettings },
    { label: "Email Settings", href: routes.emailSettings },
    { label: "Password Settings", href: routes.passwordSettings },
  ];

  return (
    <nav className="border border-gray-400 sticky w-fit left-4 top-32 p-4 gap-4 flex flex-col rounded-lg h-fit bg-white">
      {links.map((link) => (
        <Link
          key={link.label}
          href={`${routes.dashboard}${link.href}`}
          className={mergeClassNames(
            "font-medium text-sm hover:underline hover:text-blue-500",
            currentPath === link.href ? "text-blue-600" : "",
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
