import React from "react";
import Navbar, { NavbarProps } from "./Navbar/Navbar";

type UserPageLayoutProps = {
  children: React.ReactNode;
  navbarProps: NavbarProps;
};

export default function UserPageLayout({
  children,
  navbarProps,
}: Readonly<UserPageLayoutProps>) {
  return (
    <>
      <Navbar {...navbarProps} />
      {children}
    </>
  );
}
