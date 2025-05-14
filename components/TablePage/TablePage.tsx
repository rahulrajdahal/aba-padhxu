"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

interface ITablePage extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Data to fill the table rows.
   */
  data: unknown[];
  /**
   * Columns of the table.
   */
  columns: ColumnDef<unknown, unknown>[];
  /**
   * Title to the Page.
   */
  title?: string;
  /**
   * Need extra elements on the right?
   */
  headerRight?: React.ReactNode;
  /**
   * Is table data loading?
   */
  loading?: boolean;
}

export default function TablePage({
  data,
  columns,
  title,
  headerRight,
  loading = false,
}: Readonly<ITablePage>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <nav className="flex items-center justify-between">
        {title && (
          <h2 className="mb-4 text-[2.5rem] font-medium leading-[3.75rem] text-gray-900">
            {title}
          </h2>
        )}
        {headerRight ? (
          <span className="flex items-center gap-4">{headerRight}</span>
        ) : null}
      </nav>

      {loading ? (
        "Loading..."
      ) : (
        <div className="mt-5 rounded-[2rem] bg-white px-10">
          <table border={1} className="w-full text-left">
            <thead>
              {table.getHeaderGroups().map((headerGroup, idx) => (
                <tr key={idx}>
                  {headerGroup.headers.map((header, index) => (
                    <th
                      key={index}
                      className={`border-b border-gray-200 py-5 text-base font-bold capitalize tracking-[0.2rem] text-gray-500
            ${header.index === 0 ? "pl-14 " : ""} ${
              header.index === data.length + 1 ? "pr-14" : ""
            }`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {data.length <= 0 ? (
              <p className="mt-4 text-center">No data available</p>
            ) : (
              <tbody>
                {table.getRowModel().rows.map((row, index) => (
                  <tr key={index}>
                    {row.getVisibleCells().map((cell, idx) => (
                      <td key={idx} className={`border-b border-gray-200 py-5`}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      )}
    </div>
  );
}
