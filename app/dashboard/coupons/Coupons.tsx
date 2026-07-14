"use client";

import { Pill, Select, TableActions, TablePage } from "@/components";
import SearchInput from "@/components/SearchInput/SearchInput";
import { Coupon } from "@/generated/prisma/client/client";
import { DiscountType } from "@/generated/prisma/client/enums";
import { routes } from "@/utils/routes";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { redirect, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { deleteCouponById } from "./actions";

type CouponsProps = Readonly<{
  coupons: Coupon[];
  totalCoupons: number;
}>;
export default function Coupons({ coupons, totalCoupons }: CouponsProps) {
  const columnHelper = createColumnHelper<Partial<Coupon>>();

  const columns = [
    columnHelper.accessor("code", {
      header: "Coupon Code",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("discountType", {
      header: "Discount Type",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("maxUses", {
      header: "Max Uses",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("expiresAt", {
      header: "Expires On",
      cell: (info) => info.getValue()?.toDateString(),
    }),

    columnHelper.accessor("isActive", {
      header: "Status",
      cell: (info) => (
        <Pill
          className={` ${(info.getValue() as boolean) ? "bg-green-500" : "bg-red-500"} `}
        >
          {(info.getValue() as boolean) ? "Active" : "Inactive"}
        </Pill>
      ),
    }),

    columnHelper.accessor("id", {
      header: () => "Actions",
      cell: (info) => {
        const id = info.getValue();

        if (id) {
          const handleDelete = async () => {
            const { type, message } = await deleteCouponById(id);

            if (type === "success") {
              toast.success("Coupon Deleted!");
            }
            if (type === "error") {
              toast.error(message);
            }
          };

          return (
            <TableActions
              id={id}
              handleDelete={handleDelete}
              href={`${routes.dashboard}${routes.coupons}`}
              description="coupon"
            />
          );
        }
      },
    }),
  ] as ColumnDef<Coupon, unknown>[];

  const searchParams = useSearchParams();
  const handleDiscountTypeOnChange: React.ChangeEventHandler<
    HTMLSelectElement,
    HTMLSelectElement
  > = (e) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("discountType", e.target.value);
    if (params.get("discountType") === "") params.delete("discountType");
    redirect(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 mt-4 px-4">
      <div className="flex items-center gap-4">
        <SearchInput placeholder="Search by coupon code..." />

        <Select
          label="Discount Type"
          options={[
            { label: "All Discount Types", value: "" },
            ...Object.entries(DiscountType).map(([key, value]) => ({
              label: value,
              value: key,
            })),
          ]}
          onChange={handleDiscountTypeOnChange}
        />
      </div>
      <TablePage
        data={coupons}
        columns={columns}
        loading={false}
        totalItems={totalCoupons}
      />
    </div>
  );
}
