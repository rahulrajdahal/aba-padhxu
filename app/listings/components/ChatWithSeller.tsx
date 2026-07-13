"use client";

import { createListingChatRoom } from "@/app/messages/actions";
import { Button } from "@/components";
import { routes } from "@/utils/routes";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

interface ChatWithSellerProps {
  listingId: string;
  sellerId: string;
}

export default function ChatWithSeller({
  listingId,
  sellerId,
}: ChatWithSellerProps) {
  const handleChatWithSeller = async () => {
    const { type, message, data } = await createListingChatRoom(
      listingId,
      sellerId,
    );

    if (type === "success") {
      toast.success(message);
      redirect(`${routes.messages}/${data}`);
    }

    if (type === "error") {
      toast.error(message);
    }
  };

  return (
    <Button
      type="button"
      size="sm"
      variant="filled"
      className="bg-gray-50! text-gray-950!"
      onClick={handleChatWithSeller}
    >
      💬 Chat with Seller
    </Button>
  );
}
