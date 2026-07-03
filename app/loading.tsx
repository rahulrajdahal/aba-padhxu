import { FooterSkeleton, NavbarSkeleton } from "@/components";
import { HeaderSkeleton, ListingsSkeleton } from "./components";

export default function loading() {
  return (
    <>
      <NavbarSkeleton />
      <HeaderSkeleton />

      <ListingsSkeleton />
      <FooterSkeleton />
    </>
  );
}
