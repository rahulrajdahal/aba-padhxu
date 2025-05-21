"use client";

import { Button } from "@/components";
import { routes } from "@/utils/routes";

export default function PlaceOrder({ isAuth }: Readonly<{ isAuth: boolean }>) {
  return (
    <Button
      variant={"text"}
      linkProps={{ href: isAuth ? routes.order : routes.login }}
      className="flex self-end"
    >
      {isAuth ? "Place Order" : "LogIn to Checkout"}
    </Button>
  );
}
