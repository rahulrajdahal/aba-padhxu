import { Notification } from "@prisma/client";
import Image from "next/image";

interface NotificationCardProps {
  notification: Notification;
  loading?: boolean;
}

export default function NotificationCard({
  notification,
  loading = false,
}: Readonly<NotificationCardProps>) {
  return (
    <div
      className={`${notification.isRead ? "" : "bg-blue-200"} outline-none max-w-96 flex items-center gap-4 border-b border-gray-300 p-2 w-full hover:bg-blue-100`}
    >
      {loading ? (
        <div className="animate-pulse flex items-center gap-4 w-full">
          <div className="bg-gray-300 w-12 h-12 rounded-full" />
          <div className="flex flex-col gap-2">
            <div className="bg-gray-300 h-6 w-24 rounded-md" />
            <div className="flex flex-col gap-1">
              <div className="bg-gray-300 h-4 w-64 rounded-md" />
              <div className="bg-gray-300 h-4 w-40 rounded-md" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <Image
            src={"/uploads/order-default.webp"}
            alt="notification image"
            width={60}
            height={60}
            className="rounded-full w-12 h-12 object-cover border-2 border-blue-500"
          />
          <div className="flex flex-col">
            <p className="text-base font-semibold">{notification.title}</p>
            <p className="text-sm font-medium text-gray-600">
              {notification.description}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
