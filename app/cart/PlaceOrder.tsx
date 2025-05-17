"use client";

import { Button } from "@/components";
import { routes } from "@/utils/routes";
import { getCookie } from "cookies-next";

export default function PlaceOrder() {
  const isLoggedIn = getCookie("loggedIn");

  return (
    <Button
      variant={"text"}
      linkProps={{ href: isLoggedIn ? routes.order : routes.login }}
      className="flex self-end"
    >
      {isLoggedIn ? "Place Order" : "LogIn to Checkout"}
    </Button>
  );
}
