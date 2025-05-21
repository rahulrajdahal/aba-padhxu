import { WebVitals } from "@/_components/web-vitals";
import { StyledComponentsRegistry } from "@/components";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aba Padhxu",
  description: "Buy and sell books",
};
export type IRootLayout = Readonly<{
  children: React.ReactNode;
}>;
export default function RootLayout({ children }: IRootLayout) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WebVitals />
        <StyledComponentsRegistry>
          {children}
          <Toaster />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
