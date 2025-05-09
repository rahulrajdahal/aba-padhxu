"use client";

import { Delete } from "@meistericons/react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React from "react";

interface IDeleteModal extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * What to do when deleted?
   */
  handleDelete: React.MouseEventHandler<HTMLSpanElement> | undefined;
  /**
   * What to delete?
   */
  description: string;
}

/**
 * Primary Delete modal.
 */
export default function DeleteModal({
  handleDelete,
  description,
}: Readonly<IDeleteModal>) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button title="Delete" className="h-8 w-8 ">
          <Delete className="h-8 w-8 text-[#DB1920]" />
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="absolute inset-0 h-full w-full bg-[#03091352]" />
        <AlertDialog.Content className="fixed left-[30%] top-[30%] max-w-[37.5rem] rounded-[2rem] bg-white p-10">
          <AlertDialog.Title className="text-[2rem] font-medium leading-10 text-gray-900">
            Confirm Delete?
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-8 mt-4 text-lg font-medium text-gray-600">
            Are you sure you want to delete this {description}. This action
            cannot be reverted.
          </AlertDialog.Description>
          <div className="flex items-center gap-4">
            <AlertDialog.Action asChild>
              <button
                onClick={handleDelete}
                className="rounded-md px-6 py-2 text-base font-semibold"
              >
                Yes, Delete
              </button>
            </AlertDialog.Action>
            <AlertDialog.Cancel asChild>
              <button className="rounded-lg bg-gray-100 px-6 py-2  text-base font-semibold text-gray-700">
                Cancel
              </button>
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
