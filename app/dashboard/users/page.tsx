import { logout } from "@/app/(auth)/actions";
import { isAdmin } from "@/app/(auth)/middleware";
import { User, UserProfile } from "@/generated/prisma/client/client";
import { routes } from "@/utils/routes";
import { redirect } from "next/navigation";
import { fetchAllUsers, fetchAllUsersCount } from "./actions";
import Users from "./Users";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    query?: string;
    limit?: string;
  }>;
}) {
  const { limit, page, query } = await searchParams;

  const currentPage = Number(page) || 1;
  const offset = currentPage * Number(limit) - Number(limit);

  const isUserAdmin = await isAdmin();

  if (!isUserAdmin) {
    await logout();
    redirect(routes.login);
  }

  const [{ data }, { data: totalUsers }] = await Promise.all([
    fetchAllUsers(Number(limit || 20), Number(offset || 0), query),
    fetchAllUsersCount(query as string),
  ]);

  return (
    <Users
      users={data as User & { profile: UserProfile }[]}
      totalUsers={Number(totalUsers)}
    />
  );
}
