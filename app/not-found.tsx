import { Button } from "@/components";
import { PublicPageLayout } from "@/components/layouts";
import RootPageLayout from "@/components/layouts/RootPageLayout/RootPageLayout";
import { routes } from "@/utils/routes";
import { FileCross, HomeMinimal } from "@meistericons/react";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <RootPageLayout>
      <PublicPageLayout>
        <div className="flex items-center justify-center py-20 mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-4">
            <FileCross className="text-primary-400" size={128} />
            <h2 className="text-7xl text-primary-400 font-black">404</h2>
            <h4 className="text-3xl font-bold text-gray-900">Page Not Found</h4>
            <p className="text-gray-600 text-base">
              The page you are looking for does not exist or has been moved.
            </p>
            <Link href={routes.home}>
              <Button leftIcon={<HomeMinimal size={16} />}>Back to Home</Button>
            </Link>
          </div>
        </div>
      </PublicPageLayout>
    </RootPageLayout>
  );
}
