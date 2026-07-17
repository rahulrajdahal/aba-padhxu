"use client";

import { redirect, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import Input from "../Input/Input";
import Pagination from "./Pagination";

interface TableFooterProps {
  totalItems: number;
}

export default function TableFooter({
  totalItems,
}: Readonly<TableFooterProps>) {
  const searchParams = useSearchParams();

  const limit = Number(searchParams.get("limit") ?? 20);

  const totalPages = useMemo(
    () => Math.ceil(totalItems / limit),
    [limit, totalItems],
  );

  const defaultValue = useMemo(
    () => (limit > totalItems ? totalItems : limit),
    [limit, totalItems],
  );

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", String(event.target.value));
    if (params.get("page")) params.delete("page");
    redirect(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between border-t border-neutral-100 bg-neutral-50/30 px-6 py-4">
      <Input
        label="Number of items"
        type="number"
        className="py-0! w-fit!"
        wrapperClassName="w-fit!"
        onChange={handleLimitChange}
        defaultValue={defaultValue}
        min={1}
        max={totalItems}
      />

      <Pagination totalPages={totalPages} />
    </div>
  );
}
