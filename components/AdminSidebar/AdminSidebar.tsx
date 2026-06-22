"use client";

import { logout } from "@/app/(auth)/actions";
import { routes } from "@/utils/routes";
import { ArrowBlockLeft } from "@meistericons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "../Buttons";
const links = [
  { id: 1, label: "Dashboard", href: routes.dashboard },

  { id: 2, label: "All Books", href: `${routes.dashboard}${routes.books}` },
  { id: 3, label: "Add Book", href: `${routes.dashboard}${routes.books}/add` },
  { id: 4, label: "All Authors", href: `${routes.dashboard}${routes.authors}` },
  { id: 5, label: "All Genres", href: `${routes.dashboard}${routes.genres}` },
  { id: 6, label: "All Orders", href: `${routes.dashboard}${routes.orders}` },
];
export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    return toast.success("Logged out successfully");
  };

  return (
    <aside className="flex flex-col justify-between w-80 border-r-2 border-gray-400 px-2 py-4">
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

      <Button
        onClick={handleLogout}
        size="sm"
        variant="outline"
        leftIcon={<ArrowBlockLeft size={18} />}
      >
        Sign out
      </Button>
    </aside>
  );
}
