"use client";

import { logout } from "@/app/auth/actions";
import { Notification, User } from "@prisma/client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Button from "./Button/Button";
import NotificationsDropdown from "./NotificationsDropdown";

interface AdminNavbarProps extends React.HTMLAttributes<HTMLElement> {
  user?: Pick<User, "email" | "name" | "avatar">;
  notifications?: Notification[];
}

export default function AdminNavbar({
  user,
  notifications,
  ...props
}: Readonly<AdminNavbarProps>) {
  const pathname = usePathname();

  const title = useMemo(() => {
    if (pathname.includes("orders")) {
      return "Orders";
    } else if (pathname.includes("books")) {
      return "Books";
    } else if (pathname.includes("authors")) {
      return "Authors";
    } else if (pathname.includes("genres")) {
      return "Genres";
    }

    return pathname.split("/").pop();
  }, [pathname]);

  return (
    <nav
      {...props}
      className={`${props.className} flex items-center sticky top-0 justify-between w-full bg-white shadow-sm px-4 py-8`}
    >
      <h1 className="h1 capitalize">{title}</h1>

      <div className="flex items-center gap-4">
        <NotificationsDropdown notifications={notifications} />

        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="outline-none select-none hover:cursor-pointer">
            <Image
              src={`/uploads/users/${user?.avatar}`}
              alt={user?.name ?? "user"}
              width={60}
              height={60}
              className="rounded-full w-10 h-10 object-cover border-2 border-blue-500"
            />
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              className="flex flex-col gap-2 bg-white border border-gray-300 shadow-md rounded-md px-4 py-2"
            >
              <DropdownMenu.Item className="outline-none">
                <p className="text-base font-semibold">{user?.name}</p>
                <p className="text-xs font-medium italic text-gray-600">
                  {user?.email}
                </p>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="outline-none">
                <Button variant="text" onClick={logout}>
                  Logout
                </Button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </nav>
  );
}
