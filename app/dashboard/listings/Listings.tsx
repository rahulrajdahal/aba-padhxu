"use client";

import { Select, TableActions, TablePage } from "@/components";
import SearchInput from "@/components/SearchInput/SearchInput";
import { Book, Listing } from "@/generated/prisma/client/client";
import { BookCondition } from "@/generated/prisma/client/enums";
import { routes } from "@/utils/routes";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { redirect, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { deleteListingById } from "./actions";

type ListingsProps = {
  listings: (Listing & { book: Pick<Book, "title"> })[];
  totalListings: number;
};

export default function Listings({ listings, totalListings }: ListingsProps) {
  const columnHelper =
    createColumnHelper<Partial<Listing & { book: Pick<Book, "title"> }>>();

  const columns = [
    columnHelper.accessor("condition", {
      header: "Condition",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("priceCents", {
      header: "Price",
      cell: (info) => {
        const price = info.getValue();
        return price ? "£" + price / 100 : "";
      },
    }),
    columnHelper.accessor("quantity", {
      header: "Quantity",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("book.title", {
      header: "Book",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("id", {
      header: () => "Actions",
      cell: (info) => {
        const id = info.getValue();

        if (id) {
          const handleDelete = async () => {
            const { type, message } = await deleteListingById(id);

            if (type === "success") {
              toast.success("Listing Deleted!");
            }
            if (type === "error") {
              toast.error(message);
            }
          };

          return (
            <TableActions
              id={id}
              handleDelete={handleDelete}
              href={`${routes.dashboard}${routes.listings}/${id}`}
              description="listing"
            />
          );
        }
      },
    }),
  ] as ColumnDef<unknown, unknown>[];

  const searchParams = useSearchParams();

  const handleConditionOnChange: React.ChangeEventHandler<
    HTMLSelectElement,
    HTMLSelectElement
  > = (e) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("condition", e.target.value);
    if (params.get("condition") === "") params.delete("condition");
    redirect(`?${params.toString()}`);
  };
  const defaultCondition = searchParams.get("condition") ?? "";

  return (
    <div className="flex flex-col gap-4 mt-4 px-4">
      <div className="flex items-center gap-4">
        <SearchInput placeholder="Search by title, author, or ISBN..." />

        <Select
          label="Condition"
          options={[
            { label: "All", value: "" },
            ...Object.values(BookCondition).map((condition) => ({
              label: condition,
              value: condition,
            })),
          ]}
          onChange={handleConditionOnChange}
          defaultValue={defaultCondition}
        />
      </div>

      <TablePage
        data={listings ?? []}
        columns={columns}
        loading={false}
        totalItems={totalListings}
      />
    </div>
  );
}
