"use client";

import { Button } from "@/components";
import Empty from "@/components/Empty/Empty";
import { PublicPageLayout } from "@/components/layouts";
import { Book, CartItem, Listing } from "@/generated/prisma/client/client";
import { routes } from "@/utils/routes";
import { ArrowLeft, Bag } from "@meistericons/react";
import Link from "next/link";
import CartItemCard from "./components/CartItemCard/CartItemCard";
import OrderSummary from "./components/OrderSummary/OrderSummary";

type CartProps = {
  cartItems: (CartItem & {
    listing: Listing & { book: Book };
  })[];
  cartCount: number;
  wishlistCount: number;
};

export default function Cart({
  cartItems,
  cartCount,
  wishlistCount,
}: Readonly<CartProps>) {
  const subtotal = cartItems?.reduce(
    (sum, item) => sum + (item.listing.pricePennies / 100) * item.quantity,
    0,
  );

  return (
    <PublicPageLayout
      cartItemsCount={Number(cartCount)}
      wishlistItemsCount={Number(wishlistCount)}
    >
      <main className="max-w-7xl mx-auto">
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
                        <CartItemCard key={cartItem.id} cartItem={cartItem} />
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

                <OrderSummary subTotal={subtotal} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 gap-8">
            <Empty
              icon={<Bag size={128} className="text-gray-400" />}
              message="Time to find your next great adventure!"
              title="Your reading cart is empty"
              className="py-0!"
            />
            <Link href={routes.home}>
              <Button leftIcon={<ArrowLeft size={16} />}>Browse Books</Button>
            </Link>
          </div>
        )}
      </main>
    </PublicPageLayout>
  );
}
