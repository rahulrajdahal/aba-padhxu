import { IRootLayout } from "@/app/layout";
import { Notification, User } from "@prisma/client";
import AdminNavbar from "./AdminNavbar";

interface AdminPageLayoutProps extends IRootLayout {
  user?: Pick<User, "email" | "name" | "avatar">;
  notifications?: Notification[];
}

export default function AdminPageLayout({
  children,

  user,
  notifications,
}: Readonly<AdminPageLayoutProps>) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <AdminNavbar user={user} notifications={notifications} />
      {children}
    </div>
  );
}
