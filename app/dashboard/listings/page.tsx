import { Listing } from "@/generated/prisma/client/client";
import { fetchSellerListings } from "./actions";
import Listings from "./Listings";

export default async function page() {
  const { data: listings } = await fetchSellerListings();

  return <Listings listings={listings as Listing[]} />;
}
