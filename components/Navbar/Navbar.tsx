"use server";

import { UserRoles } from "@prisma/client";
import { cookies } from "next/headers";
import Design from "./Design";

export default async function Navbar() {
  const role = (await cookies()).get("role")?.value as UserRoles;
  const isLoggedIn = (await cookies()).get("loggedIn")?.value;

  const count = (await cookies())?.get("cartItems")?.value
    ? JSON.parse((await cookies())?.get("cartItems")?.value as string).length
    : 0;

  return (
    <Design role={role} isLoggedIn={isLoggedIn === "true"} count={count} />
  );
}
