import { Navbar, PageLayout } from "@/components";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <PageLayout>{children}</PageLayout>
    </>
  );
}
