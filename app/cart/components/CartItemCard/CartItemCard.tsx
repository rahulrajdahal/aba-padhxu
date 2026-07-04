import { Book, CartItem, Listing } from "@/generated/prisma/client/client";
import { routes } from "@/utils/routes";
import { Add, Delete, MinusBlock } from "@meistericons/react";
import Link from "next/link";
import {
  deletecartItem,
  updateCartItemQuantity,
} from "../../cartItems/actions";

interface CartItemCardProps {
  cartItem: CartItem & {
    listing: Listing & { book: Book };
  };
}

export default function CartItemCard({ cartItem }: CartItemCardProps) {
  return (
    <li key={cartItem.id} className="flex py-6">
      <div className="h-24 w-16 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
        <img
          src={cartItem.listing.book.image}
          alt={cartItem.listing.book.title}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900 font-serif">
            <h3>
              <Link href={`${routes.listings}/${cartItem.listing.id}`}>
                {cartItem.listing.book.title}
              </Link>
            </h3>
            <p className="ml-4">
              $
              {(
                (cartItem.listing.priceCents / 100) *
                cartItem.quantity
              ).toFixed(2)}
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-500 italic">
            by {cartItem.listing.book.author}
          </p>
        </div>

        <div className="flex flex-1 items-end justify-between text-sm">
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-300 rounded-md bg-primary-50">
            <button
              onClick={() =>
                updateCartItemQuantity(
                  cartItem.id,
                  cartItem.listingId,
                  "decrement",
                )
              }
              className="p-1.5 text-gray-600 hover:bg-primary-200 transition-colors"
            >
              <MinusBlock size={14} />
            </button>
            <span className="px-3 text-gray-800 font-medium">
              {cartItem.quantity}
            </span>
            <button
              onClick={() =>
                updateCartItemQuantity(
                  cartItem.id,
                  cartItem.listingId,
                  "increment",
                )
              }
              className="p-1.5 text-gray-600 hover:bg-primary-200 transition-colors"
            >
              <Add size={14} />
            </button>
          </div>

          <div className="flex">
            <button
              type="button"
              onClick={() => deletecartItem(cartItem.id)}
              className="flex items-center gap-1 font-medium text-red-400 hover:text-red-600 transition-colors"
            >
              <Delete size={16} />
              <span className="hidden sm:inline">Remove</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
