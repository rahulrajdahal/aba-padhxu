import z from "zod";

export const updateEmailAddressSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string(),
});
