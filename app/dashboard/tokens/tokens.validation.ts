import { TokenType } from "@/generated/prisma/client/enums";
import z from "zod";

export const addTokenSchema = z.object({
  type: z.enum(Object.values(TokenType)),
});
