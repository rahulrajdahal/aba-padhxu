"use client";

import { routes } from "@/utils/routes";
import Link from "next/link";
import { Button } from "../Buttons";
import Logo from "../Logo/Logo";

export default function Navbar() {
  return (
    <nav className="sticky z-10 top-0 flex w-full shadow-sm items-center justify-between bg-gray-50 px-[12.5%] py-4">
      <Link href="/">
        <Logo />
      </Link>

      <div className="flex items-center gap-2">
        <Link href={routes.signup}>
          <Button variant="outline">Register</Button>
        </Link>
        <Link href={routes.login}>
          <Button>Log In</Button>
        </Link>
      </div>
      {/* <ul className="flex items-center gap-4">
        {role === "SELLER" && (
          <li>
            <a href={routes.dashboard}>Dashboard</a>
          </li>
        )}
        {isLoggedIn && <NotificationsDropdown notifications={notifications} />}

        <li className="relative">
          <a href={routes.cart}>
            <span className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-slate-700 p-2.5 text-sm text-slate-50">
              {count}
            </span>
            <CartB className="h-10 w-10" />
          </a>
        </li> */}

      {/* <AuthButton isLoggedIn={isLoggedIn} /> */}
      {/* </ul> */}
    </nav>
  );
}
