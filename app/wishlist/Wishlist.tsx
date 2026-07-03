"use client";

import { Button } from "@/components";
import { PublicPageLayout } from "@/components/layouts";
import { Book, Wishlist } from "@/generated/prisma/client/client";
import { routes } from "@/utils/routes";
import { ArrowLeft, HeartRate } from "@meistericons/react";
import Link from "next/link";

type WishlistPageProps = {
  wishlistItems: (Wishlist & { book: Book })[];
  cartCount: number;
  wishlistCount: number;
};

export default function WishlistPage({
  wishlistItems,
  cartCount,
  wishlistCount,
}: Readonly<WishlistPageProps>) {
  return (
    <PublicPageLayout
      cartItemsCount={Number(cartCount)}
      wishlistItemsCount={Number(wishlistCount)}
    >
      <section className="max-w-7xl mx-auto">
        {wishlistItems?.length > 0 ? (
          <div className="py-12 px-4 sm:px-6 lg:px-8 text-gray-800">
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                Your Wishlist
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flow-root">
                    <div className="-my-6 divide-y divide-gray-200">
                      {wishlistItems.map((wishlistItem) => (
                        <div
                          key={wishlistItem.bookId}
                          className="flex justify-between items-center p-4 border-b border-gray-200"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={wishlistItem.book.image}
                              alt={wishlistItem.book.title}
                              className="h-20 w-20 object-cover"
                            />

                            <div>
                              <strong className="text-lg">
                                {wishlistItem.book.title}
                              </strong>
                              <p className="text-sm text-gray-600">
                                {wishlistItem.book.author}
                              </p>
                              <p className="text-sm text-gray-600">
                                {wishlistItem.book.genre}
                              </p>
                            </div>
                          </div>
                          {/* <AddToCart listing={book}/> */}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4">
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
              </div>
            </div>
          </div>
        ) : (
          <div className="py-16 px-4 text-center">
            <div className="max-w-md mx-auto flex flex-col items-center">
              <HeartRate className="h-16 w-16 text-gray-300 mb-4" />
              <h2 className="text-2xl font-serif text-gray-800 font-bold mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Time to find your next great adventure!
              </p>
              <Link href={routes.home}>
                <Button leftIcon={<ArrowLeft size={16} />}>
                  Browse the Shelves
                </Button>
              </Link>
            </div>
          </div>
        )}
      </section>
    </PublicPageLayout>
  );
}
