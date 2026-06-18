import { Token } from "@/generated/prisma/client/client";

export interface CreateTokenDTO extends Omit<
  Token,
  "id" | "createdAt" | "updatedAt" | "expiresAt"
> {
  expiresAt?: Date;
}

export type PatchTokenDTO = Partial<CreateTokenDTO>;
