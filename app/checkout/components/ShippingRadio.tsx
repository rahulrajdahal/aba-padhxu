"use client";

import { deleteUserAddressById } from "@/app/dashboard/user_addresses/actions";
import { Button, DeleteModal } from "@/components";
import { UserAddress } from "@/generated/prisma/client/client";
import { mergeClassNames } from "@/lib/mergeClassNames";
import { CheckCircleB, Circle, Cross, Edit } from "@meistericons/react";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import ShippingForm from "./ShippingForm";

type ShippingRadioProps = {
  shippingAddress: UserAddress;
  isSelected: boolean;
  setSelectedAddress: (address: string) => void;
};

export default function ShippingRadio({
  shippingAddress,
  isSelected,
  setSelectedAddress,
}: ShippingRadioProps) {
  const [showActions, setShowActions] = useState(false);

  const onMouseOver = () => {
    setShowActions(true);
  };

  const onMouseLeave = () => {
    setShowActions(false);
  };

  const handleOnDelete = async () => {
    const { type, message } = await deleteUserAddressById(shippingAddress.id);

    if (type === "success") {
      toast.success("User Address Removed!");
    } else {
      toast.error(message);
    }
    return;
  };

  return (
    <div
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={() => setSelectedAddress(shippingAddress.id)}
      aria-checked={isSelected}
      role="radio"
      className={mergeClassNames(
        "border flex items-center gap-4 rounded-lg px-4 py-2 cursor-pointer",
        isSelected
          ? "border-primary-400 bg-primary-200"
          : "border-primary-200 bg-primary-50 hover:bg-primary-100",
      )}
    >
      <div className="flex items-center gap-2 justify-between w-full">
        <div className="flex items-start gap-2">
          {isSelected ? (
            <CheckCircleB className="text-primary-600" />
          ) : (
            <Circle className="text-primary-600" />
          )}
          <div className="flex flex-col gap-0.5 items-start">
            <strong>{shippingAddress.addressLine1}</strong>
            <span>{shippingAddress.addressLine2}</span>
            <em>
              {shippingAddress.city}, {shippingAddress.stateProvince}
            </em>
            <span>{shippingAddress.postalCode}</span>
          </div>
        </div>

        {showActions && (
          <div className="flex items-center gap-2">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button size="sm" type="button">
                  <Edit size={16} />
                </Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm data-[state=open]:animate-fade-in-up" />
                <Dialog.Content
                  onInteractOutside={(e) => e.preventDefault()}
                  className="fixed top-1/2 left-1/2 max-h-[90vh] w-[90vw] max-w-200 -translate-x-1/2 -translate-y-1/2 rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%/35%)_0_10px_30px_-10px,hsl(206_22%_7%/20%)_0_0_0_1px] focus:outline-none data-[state=open]:animate-contentShow"
                >
                  <ShippingForm isEdit shippingAddress={shippingAddress} />
                  <Dialog.Close className="absolute top-4 right-4">
                    <Cross size={16} />
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>

            <DeleteModal
              handleDelete={handleOnDelete}
              description={"address"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
