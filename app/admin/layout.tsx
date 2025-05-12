"use client";

import type { IRootLayout } from "@/app/layout";
import { routes } from "@/utils/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { id: 1, label: "Dashboard", href: routes.dashboard },

  { id: 2, label: "All Books", href: `${routes.dashboard}${routes.books}` },
  { id: 3, label: "Add Book", href: `${routes.dashboard}${routes.books}/add` },
  { id: 4, label: "All Authors", href: `${routes.dashboard}${routes.authors}` },
  { id: 5, label: "All Genres", href: `${routes.dashboard}${routes.genres}` },
  { id: 5, label: "All Orders", href: `${routes.dashboard}${routes.orders}` },
];

interface IAdminLayout extends IRootLayout {}
export default function AdminLayout({ children }: IAdminLayout) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-screen">
      <aside className="flex w-[15rem] border-r-2 border-gray-400 px-2 py-8">
        <ul className="w-full">
          {links.map(({ id, href, label }) => (
            <Link key={id} href={href}>
              <li
                className={`${pathname === href ? "bg-gray-600 text-gray-100" : ""}
                  w-full rounded-md px-4 py-2
              hover:bg-gray-700 hover:text-gray-50`}
              >
                {label}
              </li>
            </Link>
          ))}
        </ul>
      </aside>

      <main className="flex max-h-screen w-[calc(100%-15rem)] flex-grow overflow-y-scroll px-4 py-8">
        {children}
      </main>
    </div>
  );
}
