"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { deleteOrder } from "@/app/order/actions";
import { TableActions, TablePage } from "@/components";
import { OrderWithUserAndItems } from "@/types";
import { routes } from "@/utils/routes";
import { OrderStatus } from "@prisma/client";
import Image from "next/image";
import toast from "react-hot-toast";
import { updateOrder } from "./actions";

type OrdersProps = Readonly<{ orders: OrderWithUserAndItems[] }>;
export default function Orders({ orders }: OrdersProps) {
  const columnHelper = createColumnHelper<Partial<OrderWithUserAndItems>>();

  const columns = [
    columnHelper.accessor("user.email", {
      header: "Email",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("items", {
      header: "Order Items",
      cell: (info) => {
        const items = info.getValue();

        return (
          <div className="grid grid-cols-3">
            {items?.slice(0, 3).map((item) => (
              <div
                className="flex flex-col items-center gap-2"
                key={item.bookId}
              >
                <Image
                  src={`/uploads/books/${item.book.image}`}
                  alt={item.book.name}
                  width={100}
                  height={100}
                  className="rounded-md max-h-20 w-full object-contain"
                />
                <div className="flex flex-col items-center">
                  <p>{item.book.name}</p>
                  <p>X {item.quantity}</p>
                </div>
              </div>
            ))}
            ...
          </div>
        );
      },
    }),

    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (info) => `$ ${info.getValue()}`,
    }),

    columnHelper.accessor("paymentMethod", {
      header: "Payment Method",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const updateStatus = async (
          e: React.ChangeEvent<HTMLSelectElement>
        ) => {
          const status = e.target.value as OrderStatus;

          const formData = new FormData();
          formData.append("status", status);
          formData.append("userId", info.row.original.userId as string);
          formData.append("id", info.row.original.id as string);

          const state = await updateOrder(null, formData);

          if (state.type === "success") {
            toast.success("Order status updated!");
          }
          if (state.type === "error") {
            toast.error("Error updating order status!");
          }
        };

        return (
          <select
            name="status"
            defaultValue={info.getValue()}
            onChange={updateStatus}
          >
            {Object.entries(OrderStatus).map((orderStatus) => (
              <option
                key={orderStatus[0]}
                className="capitalize"
                value={orderStatus[1]}
              >
                {orderStatus[1]}
              </option>
            ))}
          </select>
        );
      },
    }),

    columnHelper.accessor("id", {
      header: () => "Actions",
      cell: (info) => {
        const id = info.getValue();

        if (id) {
          const handleDelete = async () => {
            await deleteOrder(id);
            toast.success("Order deleted successfully");
          };

          return (
            <TableActions
              id={id}
              handleDelete={handleDelete}
              href={`${routes.dashboard}${routes.orders}`}
              description="order"
              buttonProps={{
                children: "View",
                href: `${routes.dashboard}${routes.orders}/${id}`,
                variant: "text",
              }}
            />
          );
        }
      },
    }),
  ] as ColumnDef<unknown, unknown>[];

  return <TablePage data={orders ?? []} columns={columns} loading={false} />;
}
