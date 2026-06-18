import type { IRootLayout } from "@/app/layout";
import { AdminSidebar } from "@/components";
import { prisma } from "@/prisma/prisma";
import { routes } from "@/utils/routes";
import { redirect } from "next/navigation";
import { canUseDashboard, getUserId } from "../(auth)/dto";

interface IAdminLayout extends IRootLayout {}

export default async function AdminLayout({ children }: IAdminLayout) {
  if (!(await canUseDashboard())) {
    return redirect(routes.home);
  }

  const userId = await getUserId();

  const notifications = await prisma.notification.findMany({
    where: { userId },
  });

  return (
    <div className="flex h-screen w-screen">
      <AdminSidebar />
      <div className="flex flex-col w-[calc(100%-15rem)] max-h-screen flex-grow overflow-y-scroll">
        AdminPage Layout
        {/* <AdminPageLayout user={userInfo} notifications={notifications}>
          {children}
        </AdminPageLayout> */}
      </div>
    </div>
  );
}
