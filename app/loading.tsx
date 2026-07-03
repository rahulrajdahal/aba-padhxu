import { FooterSkeleton, NavbarSkeleton } from "@/components";
import { HeaderSkeleton, ListingsSkeleton } from "./components";

export default function Loading() {
  return (
    <>
      <NavbarSkeleton />
      <HeaderSkeleton />
      <ListingsSkeleton />
      <FooterSkeleton />
    </>
  );
}
