"use client";

import { Footer, Navbar } from "@/components";

interface PublicPageLayoutProps {
  children: React.ReactNode;
  cartItemsCount?: number;
  wishlistItemsCount?: number;
}

export default function PublicPageLayout({
  children,
  cartItemsCount = 0,
  wishlistItemsCount = 0,
}: PublicPageLayoutProps) {
  return (
    <>
      <Navbar
        cartItemsCount={cartItemsCount}
        wishlistItemsCount={wishlistItemsCount}
      />
      {children}
      <Footer />
    </>
  );
}
