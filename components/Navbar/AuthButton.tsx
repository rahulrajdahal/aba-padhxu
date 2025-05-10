"use client";

import { logout } from "@/app/auth/actions";
import { routes } from "@/utils/routes";
import Button from "../Button/Button";

export default function AuthButton({
  isLoggedIn,
}: Readonly<{ isLoggedIn: boolean }>) {
  return (
    <>
      <li>
        {isLoggedIn ? (
          <Button onClick={() => logout()}>Logout</Button>
        ) : (
          <a href={routes.login}>
            <Button>Login</Button>
          </a>
        )}
      </li>
    </>
  );
}
