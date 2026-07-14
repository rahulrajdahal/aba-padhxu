"use client";

import { logout } from "@/app/(auth)/actions";
import { Button } from "@/components";
import Logo from "@/components/Logo/Logo";
import { routes } from "@/utils/routes";
import { ArrowBlockLeft } from "@meistericons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

const baseLinks = [
  { id: 1, label: "Dashboard", href: routes.dashboard },
  { id: 2, label: "All Books", href: `${routes.dashboard}${routes.books}` },
  {
    id: 3,
    label: "Settings",
    href: `${routes.dashboard}${routes.generalSettings}`,
  },
];

const sellerLinks = [
  ...baseLinks,
  { id: 4, label: "Add Book", href: `${routes.dashboard}${routes.books}/add` },
  { id: 5, label: "All Orders", href: `${routes.dashboard}${routes.orders}` },
  {
    id: 6,
    label: "All Listings",
    href: `${routes.dashboard}${routes.listings}`,
  },
  {
    id: 7,
    label: "Add Listings",
    href: `${routes.dashboard}${routes.listings}/add`,
  },
];

const adminLinks = [
  ...sellerLinks,
  { id: 8, label: "All Users", href: `${routes.dashboard}${routes.users}` },
  { id: 9, label: "Add User", href: `${routes.dashboard}${routes.users}/add` },
  { id: 10, label: "All Genres", href: `${routes.dashboard}${routes.genres}` },
  {
    id: 11,
    label: "Add Genre",
    href: `${routes.dashboard}${routes.genres}/add`,
  },
  {
    id: 12,
    label: "All Coupons",
    href: `${routes.dashboard}${routes.coupons}`,
  },
  {
    id: 11,
    label: "Add Coupon",
    href: `${routes.dashboard}${routes.coupons}/add`,
  },
];

type DashboardSidebarProps = {
  isSeller?: boolean;
  isAdmin?: boolean;
};

export default function DashboardSidebar({
  isSeller = false,
  isAdmin = false,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    return toast.success("Logged out successfully");
  };

  const links = isAdmin ? adminLinks : isSeller ? sellerLinks : baseLinks;

  return (
    <aside className="flex flex-col justify-between w-80 border-r-2 border-gray-400 px-2 py-4">
      <div className=" flex flex-col gap-8">
        <Link href={routes.dashboard} className="p-2">
          <Logo />
        </Link>

        <ul className="w-full">
          {links.map(({ id, href, label }) => {
            const activeLink = href === pathname;

            return (
              <Link key={id} href={href}>
                <li
                  className={`${activeLink ? "bg-gray-600 text-gray-100" : ""}
            w-full rounded-md px-4 py-2
        hover:bg-gray-700 hover:text-gray-50`}
                >
                  {label}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>

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
