import type { IRootLayout } from "@/app/layout";
import { AdminSidebar } from "@/components";
import { routes } from "@/utils/routes";
import { redirect } from "next/navigation";
import { authUser, isAuthenticated } from "../(auth)/middleware";
import DashboardNavbar from "./components/DashboardNavbar/DashboardNavbar";

interface IAdminLayout extends IRootLayout {}

export default async function AdminLayout({ children }: IAdminLayout) {
  const isAuth = await isAuthenticated();

  if (!isAuth) {
    return redirect(routes.login);
  }

  const user = await authUser();

  return (
    <div className="flex h-screen w-screen">
      <AdminSidebar />
      <main className="flex flex-col w-[calc(100%-15rem)] max-h-screen overflow-y-scroll">
        <DashboardNavbar
          user={{
            avatar: user.avatar || "/default.avif",
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
          }}
        />

        {children}
        {/* AdminPage Layout */}
        {/* <AdminPageLayout user={userInfo} notifications={notifications}>
        </AdminPageLayout> */}
      </main>
    </div>
  );
}
