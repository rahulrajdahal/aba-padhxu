import { Token } from "@/generated/prisma/client/client";

export type CreateTokenDTO = Pick<Token, "type" | "token" | "userId">;

export type PatchTokenDTO = Partial<CreateTokenDTO>;
