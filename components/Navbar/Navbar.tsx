"use client";

import { routes } from "@/utils/routes";

import { CartB } from "@meistericons/react";
import { Notification, UserRoles } from "@prisma/client";
import NotificationsDropdown from "../NotificationsDropdown";
import AuthButton from "./AuthButton";

export type NavbarProps = {
  role: UserRoles;
  count: number;
  isLoggedIn: boolean;
  notifications?: Notification[];
};

export default function Navbar({
  role,
  count,
  isLoggedIn = false,
  notifications,
}: Readonly<NavbarProps>) {
  return (
    <nav className="sticky z-10 top-0 flex w-full shadow-sm items-center justify-between bg-white px-[12.5%] py-4">
      <a href="/" className="text-gray-70 text-xl font-bold">
        Logo
      </a>

      <ul className="flex items-center gap-4">
        {role === "SELLER" && (
          <li>
            <a href={routes.dashboard}>Dashboard</a>
          </li>
        )}

        <NotificationsDropdown notifications={notifications} />

        <li className="relative">
          <a href={routes.cart}>
            <span className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-slate-700 p-2.5 text-sm text-slate-50">
              {count}
            </span>
            <CartB className="h-10 w-10" />
          </a>
        </li>

        <AuthButton isLoggedIn={isLoggedIn} />
      </ul>
    </nav>
  );
}
