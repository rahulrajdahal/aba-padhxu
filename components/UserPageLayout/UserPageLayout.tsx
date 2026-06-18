"use client";

import React from "react";
import Navbar from "../Navbar/Navbar";

type UserPageLayoutProps = {
  children: React.ReactNode;
};

export default function UserPageLayout({
  children,
}: Readonly<UserPageLayoutProps>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
