"use client"; // Error boundaries must be Client Components

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
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
