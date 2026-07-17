"use client";

import { ChevronLeft, ChevronRight } from "@meistericons/react";
import { redirect, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
}
export default function Pagination({ totalPages }: Readonly<PaginationProps>) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  const handlePageChange = (direction: "next" | "previous") => {
    const params = new URLSearchParams(searchParams.toString());
    if (direction === "next") {
      params.set("page", String(currentPage + 1));
    }

    if (direction === "previous") {
      params.set("page", String(currentPage - 1));
    }

    redirect(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-3">
      <p className="text-sm text-neutral-500">
        Page <span className="font-medium text-neutral-900">{currentPage}</span>{" "}
        of <span className="font-medium text-neutral-900">{totalPages}</span>
      </p>
      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange("previous")}
            className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium transition-all hover:bg-neutral-50 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange("next")}
            className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium transition-all hover:bg-neutral-50 disabled:opacity-50"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
