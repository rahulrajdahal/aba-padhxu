"use client"; // Error boundaries must be Client Components

import { Button } from "@/components";
import { PublicPageLayout } from "@/components/layouts";
import { routes } from "@/utils/routes";
import { ArrowLoopLeft, HomeMinimal, LaptopCrossB } from "@meistericons/react";
import Link from "next/link";
import { useEffect } from "react";

interface ErrorComponentProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorComponent({
  error,
  reset,
}: Readonly<ErrorComponentProps>) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error, "Error in Error.tsx");
  }, [error]);

  return (
    <PublicPageLayout>
      <div className="flex items-center justify-center py-20 mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-4">
          <LaptopCrossB className="text-red-400" size={128} />
          <h2 className="text-7xl text-red-400 font-black">500</h2>
          <h4 className="text-3xl font-bold text-gray-900">
            Something went wrong
          </h4>
          <p className="text-gray-600 text-base">
            We're experiencing some technical difficulties. Please try again
            later.
          </p>
          <Link href={routes.home}>
            <Button leftIcon={<HomeMinimal size={16} />}>Back to Home</Button>
          </Link>
          <Button
            onClick={() => reset()}
            leftIcon={<ArrowLoopLeft size={16} />}
            variant="outline"
          >
            Try Again
          </Button>
        </div>
      </div>
    </PublicPageLayout>
  );
}
