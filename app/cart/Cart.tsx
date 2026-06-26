"use client";

import { Button, Input } from "@/components";
import { PublicPageLayout } from "@/components/layouts";
import { Book, CartItem, Listing } from "@/generated/prisma/client/client";
import { routes } from "@/utils/routes";
import { Add, ArrowLeft, Bag, Delete, MinusBlock } from "@meistericons/react";
import Link from "next/link";
import { deletecartItem, updateCartItemQuantity } from "./cartItems/actions";

type CartProps = {
  cartItems: (CartItem & {
    listing: Listing & { book: Book };
  })[];
  cartCount: number;
};

export default function Cart({ cartItems, cartCount }: Readonly<CartProps>) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.listing.priceCents / 100) * item.quantity,
    0,
  );

  const estimatedTax = subtotal * 0.08;
  const total = subtotal + estimatedTax;

  return (
    <PublicPageLayout cartItemsCount={Number(cartCount)}>
      <section className="max-w-7xl mx-auto">
        {cartItems?.length > 0 ? (
          <div className="py-12 px-4 sm:px-6 lg:px-8 text-gray-800">
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                Your Reading Cart
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-200">
                      {cartItems.map((cartItem) => (
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
                                  <Link
                                    href={`${routes.listings}/${cartItem.listing.book.slug}`}
                                  >
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
                              <div className="flex items-center border border-gray-300 rounded-md bg-gray-50">
                                <button
                                  onClick={() =>
                                    updateCartItemQuantity(
                                      cartItem.id,
                                      cartItem.listingId,
                                      "decrement",
                                    )
                                  }
                                  className="p-1.5 text-gray-600 hover:bg-gray-200 transition-colors"
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
                                  className="p-1.5 text-gray-600 hover:bg-gray-200 transition-colors"
                                >
                                  <Add size={14} />
                                </button>
                              </div>

                              {/* Delete Button */}
                              <div className="flex">
                                <button
                                  type="button"
                                  onClick={() => deletecartItem(cartItem.id)}
                                  className="flex items-center gap-1 font-medium text-yellow-700 hover:text-yellow-600 transition-colors"
                                >
                                  <Delete size={16} />
                                  <span className="hidden sm:inline">
                                    Remove
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <Link href={routes.home}>
                      <Button
                        variant="text"
                        size="sm"
                        leftIcon={<ArrowLeft size={16} />}
                      >
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:col-span-4 sticky top-20 h-fit space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-lg font-serif font-bold text-gray-900 border-b border-gray-200 pb-4 mb-4">
                      Order Summary
                    </h2>

                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-medium text-gray-900">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>
                      {/* {discount > 0 && (
                           <div className="flex justify-between text-emerald-700 font-medium">
                             <span>Discount (15%)</span>
                             <span>-${discount.toFixed(2)}</span>
                           </div>
                         )} */}
                      {/* <div className="flex justify-between">
                           <span>Shipping</span>
                           <span className="font-medium text-gray-900">
                             {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                           </span>
                         </div> */}
                      <div className="flex justify-between pb-4 border-b border-gray-200">
                        <span>Estimated Tax</span>
                        <span className="font-medium text-gray-900">
                          ${estimatedTax.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-base font-serif font-bold text-gray-900 pt-2">
                        <span>Order Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button className="w-full mt-6">Proceed to Checkout</Button>

                    {/* Shipping Notice */}
                    {/* {shipping > 0 && (
                         <p className="mt-4 text-xs text-center text-gray-500 italic">
                           Add ${(35 - subtotal).toFixed(2)} more to your cart for
                           Free Shipping!
                         </p>
                       )} */}
                  </div>

                  {/* Promo Code Box */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <form
                      // onSubmit={applyPromoCode}
                      className="flex gap-2"
                    >
                      <Input
                        type="text"
                        placeholder="Promo code (Try: BOOKWORM)"
                        required
                      />
                      <button
                        type="submit"
                        className="bg-gray-200 text-gray-800 px-4 py-1.5 text-sm font-medium rounded-md hover:bg-gray-300 transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-16 px-4 text-center">
            <div className="max-w-md mx-auto flex flex-col items-center">
              <Bag className="h-16 w-16 text-gray-300 mb-4" />
              <h2 className="text-2xl font-serif text-gray-800 font-bold mb-2">
                Your reading cart is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Time to find your next great adventure!
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-primary-700 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition-colors font-medium"
              >
                <ArrowLeft size={16} /> Browse the Shelves
              </a>
            </div>
          </div>
        )}
      </section>
    </PublicPageLayout>
  );
}
