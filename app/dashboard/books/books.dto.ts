import { Book } from "@/generated/prisma/client/client";

export type CreateBookDTO = Omit<Book, "id" | "createdAt" | "updatedAt">;

export type PatchBookDTO = Partial<CreateBookDTO>;
