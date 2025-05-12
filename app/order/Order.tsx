"use client";

import { Button, Form, Input, PaymentMethod } from "@/components";
import { routes } from "@/utils/routes";
import { Author, Book, Genre } from "@prisma/client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Key, useActionState, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { placeOrder } from "./actions";

export default function Order({
  cartItems,
}: Readonly<{
  cartItems: {
    id: Key | null | undefined;
    book: Book & {
      genre: Genre;
    } & {
      author: Author;
    };
    quantity: number;
  }[];
}>) {
  const router = useRouter();

  const totalPrice = useMemo(() => {
    return cartItems
      .map(
        (cartItem) =>
          parseInt(cartItem.book.price.toString()) * cartItem.quantity
      )
      .reduce((a: number, b: number) => a + b, 0);
  }, [cartItems]);

  const handlePlaceOrder = async (prevState: unknown, formData: FormData) => {
    formData.append("amount", String(totalPrice));
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
  const searchParams = useSearchParams();
  const paid = useMemo(
    () => !!searchParams.get("payment_intent"),
    [searchParams]
  );

  const [paymentMethod, setPaymentMethod] = useState("ONLINE");

  return (
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

          <PaymentMethod
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            paid={paid}
          />
          <Button
            type="submit"
            className="mt-4 w-fit !rounded-md"
            disabled={pending || (paymentMethod === "ONLINE" && !paid)}
            aria-disabled={pending}
          >
            {pending ? "Confirming Order..." : "Confirm Order"}
          </Button>
        </Form>
      </div>
    </main>
  );
}
