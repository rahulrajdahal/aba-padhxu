"use client";

import { Pill, TablePage } from "@/components";
import SearchInput from "@/components/SearchInput/SearchInput";
import { User, UserProfile } from "@/generated/prisma/client/client";
import { CheckCircleB, Cross } from "@meistericons/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

interface UsersProps {
  users: User & { profile: UserProfile }[];
  totalUsers: number;
}

export default function Users({ users, totalUsers }: UsersProps) {
  const columnHelper =
    createColumnHelper<Partial<User & { profile: UserProfile }>>();

  const columns = [
    columnHelper.accessor("profile.firstName", {
      header: "First Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("profile.lastName", {
      header: "Last Name",
      cell: (info) => info.getValue(),
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
        !info.getValue() ? (
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
