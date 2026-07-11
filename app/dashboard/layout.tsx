import type { IRootLayout } from "@/app/layout";
import { routes } from "@/utils/routes";
import { redirect } from "next/navigation";
import { logout } from "../(auth)/actions";
import { authUser, isAuthenticated } from "../(auth)/middleware";
import { DashboardSidebar } from "./components";
import DashboardNavbar from "./components/DashboardNavbar/DashboardNavbar";

interface IAdminLayout extends IRootLayout {}

export default async function AdminLayout({ children }: IAdminLayout) {
  const isAuth = await isAuthenticated();

  if (!isAuth) {
    await logout();
    return redirect(routes.login);
  }

  const user = await authUser();

  console.log(user.isSeller, "user");

  return (
    <div className="flex h-screen w-screen">
      <DashboardSidebar isSeller={user.isSeller} isAdmin={user.isAdmin} />
      <main className="flex flex-col w-[calc(100%-15rem)] max-h-screen overflow-y-scroll">
        <DashboardNavbar
          user={{
            avatar: user.avatar,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
          }}
        />

        {children}
      </main>
    </div>
  );
}
