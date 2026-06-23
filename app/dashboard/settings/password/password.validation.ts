import z from "zod";

export const updatePasswordSchema = z
  .object({
    oldPassword: z.string(),
    newPassword: z
      .string()
      .regex(/.*[A-Z].*/, "One uppercase character")
      .regex(/.*[a-z].*/, "One lowercase character")
      .regex(/.*\d.*/, "One number")
      .regex(
        /.*[`~<>?,./!@#$%^&*()\-_+="'|{}[\];:\\].*/,
        "One special character",
      )
      .min(8, "Must be at least 8 characters in length"),
    confirmPassword: z.string(),
  })
  .refine(
    ({ confirmPassword, newPassword }) => confirmPassword === newPassword,
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    },
  );
