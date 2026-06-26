import { Book, Listing } from "@/generated/prisma/client/client";
import { fetchAllListings } from "./actions";
import { cartItemsCount } from "./cart/cartItems/actions";
import Home from "./Home";

export default async function page() {
  const { data } = await fetchAllListings();
  const { data: cartCount } = await cartItemsCount();

  return (
    <Home
      listings={data as (Listing & { book: Book })[]}
      cartItemsCount={cartCount as number}
    />
  );
}
