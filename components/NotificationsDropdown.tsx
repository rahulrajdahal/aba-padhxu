"use client";

import { updateNotification } from "@/app/dashboard/notifications/actions";
import { routes } from "@/utils/routes";
import { Notification as NotificationIcon } from "@meistericons/react";
import { Notification } from "@prisma/client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NotificationCard from "./NotificationCard";

interface NotificationsDropdownProps {
  notifications?: Notification[];
}

export default function NotificationsDropdown({
  notifications,
}: Readonly<NotificationsDropdownProps>) {
  const router = useRouter();

  const [loading, setLoading] = useState({ id: "", loading: false });

  const handleNotificationOnClick = async (id: string) => {
    setLoading({ id, loading: true });

    const formData = new FormData();
    formData.append("isRead", "true");

    await updateNotification(id, formData);

    setLoading((prev) => ({ ...prev, loading: false }));
    router.push(`${routes.dashboard}${routes.orders}`);
  };

  const unreadNotifications = notifications?.filter(
    (notification) => !notification.isRead
  );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="outline-none hover:cursor-pointer">
        <div className="relative">
          <NotificationIcon className="w-8 h-8" />
          {unreadNotifications && unreadNotifications?.length > 0 ? (
            <span className="absolute select-none text-xs top-0 right-0 w-5 flex items-center text-white font-semibold justify-center h-5 bg-red-500 rounded-full">
              {unreadNotifications.length}
            </span>
          ) : null}
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          className="flex flex-col border z-20 bg-white border-gray-300 shadow-md rounded-md"
        >
          {notifications && notifications?.length > 0 ? (
            notifications?.map((notification: Notification) => (
              <DropdownMenu.Item
                key={notification.id}
                className="outline-none hover:cursor-pointer"
                onClick={() => {
                  if (!notification.isRead) {
                    handleNotificationOnClick(notification.id);
                  }
                }}
              >
                <NotificationCard
                  notification={notification}
                  loading={loading.id === notification.id}
                />
              </DropdownMenu.Item>
            ))
          ) : (
            <DropdownMenu.Item className="text-center p-4">
              No Notifications
            </DropdownMenu.Item>
          )}
          <DropdownMenu.Arrow />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
