import { PageLayout, UserPageLayout } from "@/components";
import { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
  return (
    <UserPageLayout>
      <PageLayout>{children}</PageLayout>
    </UserPageLayout>
  );
}
