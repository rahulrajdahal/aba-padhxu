"use client";

import { Button, Form, Input, Navbar, PaymentMethod } from "@/components";
import { routes } from "@/utils/routes";
import { Book } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { placeOrder } from "./action";

export default function Order({
  cartItems,
}: Readonly<{ cartItems: { book: Book; id: string; qty: number }[] }>) {
  const router = useRouter();

  const handlePlaceOrder = async (prevState: unknown, formData: FormData) => {
    const state = await placeOrder(prevState, formData);

    if (state?.type === "success") {
      toast.success(state.message);
      return router.push(routes.home);
    }

    if (state?.type === "error") {
      toast.error(state.message);
    }

    return state;
  };

  const [state, formAction, pending] = useActionState(handlePlaceOrder, null);

  return (
    <>
      <Navbar />
      <main className="px-[12.5%]">
        <h3 className="my-4 text-xl font-bold">Confirm Order</h3>

        <div className="flex w-full gap-4">
          {cartItems.length > 0 && (
            <div className="grid w-full grid-cols-4 gap-4">
              {cartItems.map((cartItem) => (
                <div key={cartItem.id}>
                  <strong>{cartItem.book.name}</strong>
                  <Image
                    src={`/uploads/books/${cartItem.book.image}`}
                    alt={cartItem.book.name}
                    width={150}
                    height={80}
                    className="h-20 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
          <Form
            action={formAction}
            className="w-full max-w-96"
            title="Confirm Order"
          >
            <Input
              label="Country"
              error={state?.errors?.coutry}
              inputProps={{ name: "country" }}
            />
            <Input
              label="City"
              error={state?.errors?.city}
              inputProps={{ name: "city" }}
            />
            <Input
              label="Street"
              error={state?.errors?.street}
              inputProps={{ name: "street" }}
            />

            <PaymentMethod />
            <Button
              type="submit"
              className="mt-4 w-fit !rounded-md"
              disabled={pending}
              aria-disabled={pending}
            >
              {pending ? "Confirming Order..." : "Confirm Order"}
            </Button>
          </Form>
        </div>
      </main>
    </>
  );
}
