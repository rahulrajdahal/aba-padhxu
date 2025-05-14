import type { IRootLayout } from "@/app/layout";
import { AdminPageLayout, AdminSidebar } from "@/components";
import prisma from "@/prisma/prisma";
import { cookies } from "next/headers";
import { getUserInfo } from "../auth/actions";

interface IAdminLayout extends IRootLayout {}

const userInfo = getUserInfo();

export default async function AdminLayout({ children }: IAdminLayout) {
  const userInfo = await getUserInfo();

  const notifications = await prisma.notification.findMany({
    where: { userId: (await cookies()).get("userId")?.value as string },
  });

  return (
    <div className="flex h-screen w-screen">
      <AdminSidebar />
      <div className="flex flex-col w-[calc(100%-15rem)] max-h-screen flex-grow overflow-y-scroll">
        <AdminPageLayout user={userInfo} notifications={notifications}>
          {children}
        </AdminPageLayout>
      </div>
    </div>
  );
}
