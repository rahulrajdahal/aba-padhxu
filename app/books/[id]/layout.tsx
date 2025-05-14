import { UserPageLayout, PageLayout } from "@/components";
import { getNavbarProps } from "@/app/auth/actions";
import { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
  const navbarProps = await getNavbarProps();

  return (
    <UserPageLayout navbarProps={navbarProps}>
      <PageLayout>{children}</PageLayout>
    </UserPageLayout>
  );
}
