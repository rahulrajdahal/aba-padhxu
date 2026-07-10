"use client";

import { AvatarWithName, Pill, TableActions, TablePage } from "@/components";
import SearchInput from "@/components/SearchInput/SearchInput";
import { User, UserProfile } from "@/generated/prisma/client/client";
import { routes } from "@/utils/routes";
import { CheckCircleB, Cross } from "@meistericons/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import toast from "react-hot-toast";
import { deleteUserWithProfileById } from "./actions";

interface UsersProps {
  users: User & { profile: UserProfile }[];
  totalUsers: number;
}

export default function Users({ users, totalUsers }: UsersProps) {
  const columnHelper =
    createColumnHelper<Partial<User & { profile: UserProfile }>>();

  const columns = [
    columnHelper.accessor("profile.firstName", {
      header: "User",

      cell: (info) => (
        <AvatarWithName
          className="w-full inline-flex!"
          avatar={
            info.row.original.profile?.avatar ||
            `${process.cwd()}/public/uploads/users/default.avif`
          }
          name={`${info.row.original.profile?.firstName} ${info.row.original.profile?.lastName}`}
        />
      ),
    }),
    columnHelper.accessor("profile.phoneNumber", {
      header: "Phone Number",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("isActive", {
      header: "Active",
      cell: (info) =>
        info.getValue() ? (
          <CheckCircleB className="text-green-500" size={24} />
        ) : (
          <div className="bg-red-500 w-5 h-5 flex items-center justify-center rounded-full">
            <Cross className="text-white" size={14} />
          </div>
        ),
    }),
    columnHelper.accessor("profile.isSeller", {
      header: "Seller",
      cell: (info) =>
        info.getValue() ? (
          <Pill className="bg-yellow-300 text-gray-950!">Seller</Pill>
        ) : (
          <Pill className="bg-primary-300 text-gray-950!">User</Pill>
        ),
    }),
    columnHelper.accessor("isAdmin", {
      header: "Admin",
      cell: (info) =>
        info.getValue() ? (
          <Pill className="bg-red-300! text-gray-950!">Admin</Pill>
        ) : (
          <Pill className="bg-primary-300! text-gray-950!">User</Pill>
        ),
    }),
    columnHelper.accessor("id", {
      header: () => "Actions",
      cell: (info) => {
        const id = info.getValue();

        if (id) {
          const handleDelete = async () => {
            const { type, message } = await deleteUserWithProfileById(id);

            if (type === "success") toast.success("User data deleted!");

            if (type === "error") toast.error(message);
          };

          return (
            <TableActions
              id={info.row.original.id}
              handleDelete={handleDelete}
              href={`${routes.dashboard}${routes.users}`}
              description="user"
            />
          );
        }
      },
    }),
  ] as ColumnDef<unknown, unknown>[];

  return (
    <div className="flex flex-col gap-4 mt-4 px-4">
      <div className="flex items-center gap-4">
        <SearchInput placeholder="Search by name, email, or phone number..." />

        {/* <Select
          label="Role"
          options={[
            { label: "All", value: "" },
            ...Object.values(BookCondition).map((condition) => ({
              label: condition,
              value: condition,
            })),
          ]}
          onChange={handleConditionOnChange}
          defaultValue={defaultCondition}
        /> */}
      </div>

      <TablePage
        data={users ?? []}
        columns={columns}
        loading={false}
        totalItems={totalUsers}
      />
    </div>
  );
}
