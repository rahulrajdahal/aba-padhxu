"use client";

import { InstallPrompt } from "@/_components/InstallPrompt";
import { WebVitals } from "@/_components/web-vitals";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

interface RootPageLayoutProps {
  children: React.ReactNode;
}

export default function RootPageLayout({ children }: RootPageLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WebVitals />
        {children}
        <InstallPrompt />
        <Toaster />
      </body>
    </html>
  );
}
