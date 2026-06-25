import { TableActions, TablePage } from "@/components";
import { Listing } from "@/generated/prisma/client/client";
import { routes } from "@/utils/routes";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import toast from "react-hot-toast";
import { deleteListingById } from "./actions";

type ListingsProps = {
  listings: Listing[];
};

export default function Listings({ listings }: ListingsProps) {
  const columnHelper = createColumnHelper<Partial<Listing>>();

  const columns = [
    columnHelper.accessor("condition", {
      header: "Condition",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("priceCents", {
      header: "Price",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("isActive", {
      header: "Status",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("bookId", {
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

  return <TablePage data={listings ?? []} columns={columns} loading={false} />;
}
