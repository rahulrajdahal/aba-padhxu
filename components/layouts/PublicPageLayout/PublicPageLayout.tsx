import { Footer, Navbar } from "@/components";

interface PublicPageLayoutProps {
  children: React.ReactNode;
  cartItemsCount: number;
}

export default function PublicPageLayout({
  children,
  cartItemsCount,
}: PublicPageLayoutProps) {
  return (
    <>
      <Navbar cartItemsCount={cartItemsCount} />
      {children}
      <Footer />
    </>
  );
}
