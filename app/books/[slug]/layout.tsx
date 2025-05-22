import { getNavbarProps } from "@/app/auth/actions";
import { PageLayout, UserPageLayout } from "@/components";
import { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
  const navbarProps = await getNavbarProps();

  return (
    <UserPageLayout navbarProps={navbarProps}>
      <PageLayout>{children}</PageLayout>
    </UserPageLayout>
  );
}
