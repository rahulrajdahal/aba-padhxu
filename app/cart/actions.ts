"use server";

import prisma from "@/utils/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const addToCart = async (bookId: string) => {
  try {
    const book = await prisma.book.findUnique({ where: { id: bookId }, include: { author: { select: { name: true } } } });

    const cartItems = (await cookies()).get("cartItems")?.value
      ? JSON.parse((await cookies()).get("cartItems")?.value as string)
      : [];

    const updateCartItem = cartItems.find(
      (cartItem: { book: { id: string } }) => cartItem.book.id === bookId
    );
    if (updateCartItem) {
      updateCartItem.quantity++;
    } else {
      cartItems.push({
        id: `${bookId}-${Math.floor(Math.random() * 999999)}`,
        book,
        quantity: 1,
      });
    }
    (await cookies()).set({
      name: `cartItems`,
      value: JSON.stringify(cartItems),
    });
    revalidatePath("/");
    revalidatePath("/cart");
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error(error.message);
      }
    }
    throw new Error("Server Error");
  }
};
export const updateQty = async (
  bookId: string,
  operation: "increment" | "decrement" = "increment"
) => {
  try {
    const cartItems = (await cookies()).get("cartItems")?.value
      ? JSON.parse((await cookies()).get("cartItems")?.value as string)
      : [];

    const updateCartItem = cartItems.find(
      (cartItem: { book: { id: string } }) => cartItem.book.id === bookId
    );
    if (operation === "increment") {
      updateCartItem.quantity++;
    } else if (updateCartItem.quantity <= 1) {
      cartItems.splice(cartItems.indexOf(updateCartItem), 1);
    } else {
      updateCartItem.quantity--;
    }
    (await cookies()).set({
      name: `cartItems`,
      value: JSON.stringify(cartItems),
      maxAge: 60 * 6,
    });
    revalidatePath("/");
    revalidatePath("/cart");
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error(error.message);
      }
    }
    throw new Error("Server Error");
  }
};
