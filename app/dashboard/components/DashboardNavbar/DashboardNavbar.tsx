"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
// import Button from "../Buttons/Button";
// import NotificationsDropdown from "../NotificationsDropdown/NotificationsDropdown";

interface DashboardNavbarProps extends React.HTMLAttributes<HTMLElement> {
  user: { email: string; name: string; avatar: string };
  notifications?: Notification[];
}

export default function DashboardNavbar({
  user,
  notifications,
  ...props
}: Readonly<DashboardNavbarProps>) {
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
      className={`${props.className} flex items-center sticky top-0 z-50 justify-between w-full bg-white shadow-sm px-4 py-4`}
    >
      <h1 className="text-h1 capitalize font-bold">{title}</h1>

      <div className="flex items-center gap-2">
        <div className="flex flex-col -space-y-1">
          <p className="text-sm font-semibold">{user.name}</p>
          <p className="text-xs font-medium text-gray-600">{user.email}</p>
        </div>
        <Image
          src={`/uploads/users/${user.avatar}`}
          alt={`${user.name}'s profile picture`}
          width={60}
          height={60}
          className="rounded-full w-10 h-10 object-cover border-2 border-blue-500"
        />
      </div>
    </nav>
  );
}
