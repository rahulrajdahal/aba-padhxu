import { Listing } from "@/generated/prisma/client/client";
import { fetchListingById } from "../actions";
import EditListingPage from "./EditListingPage";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: listing } = await fetchListingById(id);

  return <EditListingPage listing={listing as Listing} />;
}
