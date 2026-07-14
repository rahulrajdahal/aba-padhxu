"use client";

import { Footer, Navbar } from "@/components";

interface PublicPageLayoutProps {
  children: React.ReactNode;
  cartItemsCount?: number;
  wishlistItemsCount?: number;
  isAuth: boolean;
}

export default function PublicPageLayout({
  children,
  cartItemsCount = 0,
  wishlistItemsCount = 0,
  isAuth,
}: PublicPageLayoutProps) {
  return (
    <>
      <Navbar
        cartItemsCount={cartItemsCount}
        wishlistItemsCount={wishlistItemsCount}
        isAuth={isAuth}
      />
      {children}
      <Footer />
    </>
  );
}
