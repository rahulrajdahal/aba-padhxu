"use client";

import { Edit } from "@meistericons/react";
import Link from "next/link";
import React from "react";
import { ButtonProps } from "../Buttons/Button";
import DeleteModal from "../DeleteModal/DeleteModal";

interface ITableActions extends React.ComponentPropsWithoutRef<"span"> {
  /**
   * Key identifier of the row object.
   */
  id?: string;
  /**
   * What to do when deleted?
   */
  handleDelete: () => Promise<void>;
  /**
   * What to delete?
   */
  description?: string;
  /**
   * Url for edit action.
   */
  href?: string;
  buttonProps?: ButtonProps;
}

export default function TableActions({
  id,
  handleDelete,
  description = "project",
  href = "#",
  buttonProps,
}: Readonly<ITableActions>) {
  return (
    <span className="flex items-center gap-0.5">
      <Link
        href={`${href}/${id}`}
        className="text-blue-600 hover:bg-blue-100 hover:scale-110 p-2 rounded-md transition-all duration-200"
        title="Edit"
      >
        <Edit size={20} />
      </Link>

      <DeleteModal handleDelete={handleDelete} description={description} />
    </span>
  );
}
