import RootPageLayout from "@/components/layouts/RootPageLayout/RootPageLayout";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aba Padhxu",
  description: "Buy and sell books",
};

export type IRootLayout = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: IRootLayout) {
  return <RootPageLayout>{children}</RootPageLayout>;
}
