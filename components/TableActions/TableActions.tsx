import Link from "next/link";
import React from "react";
import Button, { ButtonProps } from "../Buttons/Button";
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
    <span className="flex items-center gap-8 ">
      <Link href={`${href}/${id}`} className="">
        <Button
          {...buttonProps}
          type="button"
          className="bg-gray-100 px-6 py-2 text-base font-semibold text-gray-700"
        >
          {buttonProps?.children ?? "Edit"}
        </Button>
      </Link>

      <DeleteModal handleDelete={handleDelete} description={description} />
    </span>
  );
}
