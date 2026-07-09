import "server-only";

import { Listing } from "@/generated/prisma/client/client";

export type CreateListingDTO = Omit<Listing, "createdAt" | "updatedAt" | "id">;

export type PatchListingDTO = Partial<CreateListingDTO>;
