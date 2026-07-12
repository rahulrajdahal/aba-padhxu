import { Button, Pill } from "@/components";
import BreadcrumbItem from "@/components/Breadcrumbs/BreadcrumbItem";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import {
  Book,
  BookCondition,
  Listing,
  User,
  UserProfile,
} from "@/generated/prisma/client/client";
import { routes } from "@/utils/routes";
import Link from "next/link";

interface ListingPageProps {
  listing: Listing & {
    book: Book;
    seller: User & { profile: Pick<UserProfile, "firstName" | "lastName"> };
  };
  currentUserId?: string;
  isAuth?: boolean;
}

export default function ListingDetail({
  listing,
  currentUserId,
  isAuth = false,
}: ListingPageProps) {
  const formattedPrice = (listing.pricePennies / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const isOwnListing = currentUserId === listing.sellerId;

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs>
        <BreadcrumbItem href={routes.listings}>Listings</BreadcrumbItem>
        <BreadcrumbItem href={`${routes.listings}/${listing.id}`}>
          {listing.book.title}
        </BreadcrumbItem>
      </Breadcrumbs>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 flex flex-col items-center">
          <div className="w-full aspect-3/4 rounded-lg bg-gray-100 shadow-md overflow-hidden border border-gray-200">
            <img
              src={listing.book.image || "/placeholder-cover.jpg"}
              alt={listing.book.title}
              className="w-full h-full object-cover object-center transform hover:scale-105 transition duration-300"
            />
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">
            ISBN-13: {listing.book.isbn13}
          </p>
        </div>

        <div className="md:col-span-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {listing.book.title}
            </h1>
            <p className="text-xl text-gray-600 mt-1">
              by <span className="font-semibold">{listing.book.author}</span>
            </p>

            <hr className="my-4 border-gray-200" />

            {/* Condition & Price Metrics */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-extrabold text-gray-900">
                {formattedPrice}
              </span>
              <Pill
                className={`text-sm!
                ${listing.condition === BookCondition.NEW ? "bg-green-100! text-green-800!" : ""}
                ${listing.condition === BookCondition.LIKE_NEW ? "bg-blue-100! text-blue-800!" : ""}
                ${listing.condition === BookCondition.GOOD ? "bg-yellow-100! text-yellow-800!" : ""}
                ${listing.condition === BookCondition.ACCEPTABLE ? "bg-red-100! text-red-800!" : ""}
              `}
              >
                Condition: {listing.condition}
              </Pill>
            </div>

            <p className="text-sm mt-2 font-medium">
              {listing.quantity > 1 ? (
                <span className="text-gray-600">
                  {listing.quantity} copies available
                </span>
              ) : (
                <span className="text-amber-600 font-semibold">
                  🔥 Only 1 copy left!
                </span>
              )}
            </p>

            <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Seller Notes
              </h3>
              <p className="text-gray-600 text-sm italic">
                {listing.description ||
                  "“No additional physical description provided by the seller.”"}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            {isOwnListing ? (
              <Link
                href={`${routes.dashboard}${routes.listings}/${listing.id}`}
              >
                <Button size="lg" className="w-full">
                  Edit Your Listing
                </Button>
              </Link>
            ) : (
              <div className="space-y-3">
                {isAuth ? (
                  <div className="flex gap-4">
                    <Button size="lg" variant="outline" className="w-full">
                      Add to Cart
                    </Button>
                    <Button size="lg" variant="filled" className="w-full">
                      Buy It Now
                    </Button>
                  </div>
                ) : (
                  <Link href={routes.login}>
                    <Button size="lg" className="w-full">
                      Login to Buy
                    </Button>
                  </Link>
                )}

                <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md mt-4">
                  <div className="text-sm">
                    <span className="text-gray-500">Sold by </span>
                    <Link
                      href={`/user/${listing.sellerId}`}
                      className="font-semibold text-indigo-600 hover:underline"
                    >
                      {listing.seller.profile.firstName}{" "}
                      {listing.seller.profile.lastName}
                    </Link>
                  </div>
                  {isAuth && (
                    <Button
                      size="sm"
                      variant="filled"
                      className="bg-gray-50! text-gray-950!"
                    >
                      💬 Chat with Seller
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
