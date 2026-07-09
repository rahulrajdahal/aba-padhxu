"use client";

import { ChevronDown, ChevronTop } from "@meistericons/react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import TableFooter from "./TableFooter";

interface ITablePage extends React.ComponentPropsWithoutRef<"div"> {
  data: unknown[];
  columns: ColumnDef<any, any>[];
  loading?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

export default function TablePage({
  data,
  columns,

  loading = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onLimitChange,
}: Readonly<ITablePage>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const searchParams = useSearchParams();

  const limit = Number(searchParams.get("limit"));
  return (
    <div className="w-full space-y-8">
      <div className="overflow-hidden rounded-2xl">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
          </div>
        ) : (
          <div className="overflow-x-auto h-[calc(100vh-16rem)]">
            <table className="w-full text-left">
              <thead>
                {table.getHeaderGroups().map((headerGroup, idx) => (
                  <tr key={idx} className="bg-primary-500/30">
                    {headerGroup.headers.map((header, index) => (
                      <th
                        key={index}
                        className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-neutral-500 border-b border-neutral-100"
                      >
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none flex items-center gap-2 group"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                          {header.column.getCanSort() && (
                            <span className="text-gray-300 transition-colors group-hover:text-primary-500">
                              {{
                                asc: <ChevronTop className="h-4 w-4" />,
                                desc: <ChevronDown className="h-4 w-4" />,
                              }[header.column.getIsSorted() as string] ?? (
                                <ChevronTop className="h-4 w-4 opacity-0 group-hover:opacity-100" />
                              )}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {data.length <= 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="py-20 text-center text-neutral-400"
                    >
                      No data available.
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row, index) => (
                    <tr
                      key={index}
                      className="group transition-colors hover:bg-primary-50/30"
                    >
                      {row.getVisibleCells().map((cell, idx) => (
                        <td
                          key={idx}
                          className="px-6 py-4 text-sm text-neutral-600 border-b border-neutral-50 group-last:border-0"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <TableFooter totalPages={totalPages} />
      </div>
    </div>
  );
}
