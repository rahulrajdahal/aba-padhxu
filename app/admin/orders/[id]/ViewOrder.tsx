"use client";

import { OrderWithUserAndItems } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ViewOrderProps = {
  order: OrderWithUserAndItems;
};

export default function ViewOrder({ order }: Readonly<ViewOrderProps>) {
  const router = useRouter();

  const { id, items, user, amount, isComplete } = order;

  // const handleUpdateGenre = async (prevState: unknown, formData: FormData) => {
  //   formData.append("id", id);

  //   const state = await updateGenre(prevState, formData);

  //   if (state?.type === "success") {
  //     toast.success(state.message);
  //     return router.push(`${routes.dashboard}${routes.genres}`);
  //   }
  //   if (state?.type === "error") {
  //     toast.error(state.message);
  //   }

  //   return state;
  // };

  // const [state, formAction, pending] = useActionState(handleUpdateGenre, null);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <strong>Order From - {user.name}</strong>
        <strong>Order Email - {user.email}</strong>
        <strong>Order ID - {id}</strong>
        <strong>Order Items - {items.length}</strong>
        <strong>Order Total - ${amount}</strong>
        <strong>Order Status - {isComplete ? "Completed" : "Pending"}</strong>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Order Items</h2>
        <div className="grid grid-cols-4 gap-4 w-full">
          {items.map((item) => (
            <div key={item.bookId} className="flex flex-col gap-2">
              <Image
                src={`/uploads/books/${item.book.image}`}
                alt={item.book.name}
                width={100}
                height={100}
                className="rounded-md h-40 aspect-square w-full object-contain"
              />
              <div className="flex flex-col gap-1">
                <strong>{item.book.name}</strong>
                <strong>Quantity - {item.quantity}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
