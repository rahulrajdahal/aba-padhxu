"use client";

import { routes } from "@/utils/routes";
import { Cart, Search } from "@meistericons/react";
import Link from "next/link";
import Input from "../Input/Input";
import Logo from "../Logo/Logo";

interface NavbarProps {
  cartItemsCount: number;
}

export default function Navbar({ cartItemsCount }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 backdrop-blur-md bg-primary-100/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href={routes.home}>
          <Logo />
        </Link>

        {/* Search Bar */}
        <Input
          type="search"
          placeholder="Search by title, author, or ISBN..."
          iconLeft={<Search size={24} />}
          className="rounded-full!"
          wrapperClassName="max-w-md"
        />

        <div className="flex items-center gap-6">
          <Link
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-primary-600 transition"
          >
            Bestsellers
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-primary-600 transition"
          >
            New Releases
          </Link>
          <Link
            href={routes.cart}
            className="relative p-2 text-gray-600 hover:text-primary-600 transition"
          >
            <Cart className="h-6 w-6" />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
