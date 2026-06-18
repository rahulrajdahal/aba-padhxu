import type { IRootLayout } from "@/app/layout";
import { AdminSidebar } from "@/components";

interface IAdminLayout extends IRootLayout {}

export default async function AdminLayout({ children }: IAdminLayout) {
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
