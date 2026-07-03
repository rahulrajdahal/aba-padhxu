"use client";

import { Button } from "@/components";
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
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.listing.priceCents / 100) * item.quantity,
    0,
  );

  return (
    <PublicPageLayout
      cartItemsCount={Number(cartCount)}
      wishlistItemsCount={Number(wishlistCount)}
    >
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
