import "server-only";

import z from "zod";

export const addUserSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.email("Invalid Email"),
    password: z
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
    phoneNumber: z.string().optional(),
    isSeller: z.boolean().optional(),
    isAdmin: z.boolean().optional(),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const updateUserSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.email("Invalid Email").optional(),
    password: z
      .string()
      .regex(/.*[A-Z].*/, "One uppercase character")
      .regex(/.*[a-z].*/, "One lowercase character")
      .regex(/.*\d.*/, "One number")
      .regex(
        /.*[`~<>?,./!@#$%^&*()\-_+="'|{}[\];:\\].*/,
        "One special character",
      )
      .min(8, "Must be at least 8 characters in length")
      .optional(),
    confirmPassword: z.string().optional(),
    phoneNumber: z.string().optional(),
    isSeller: z.boolean().optional(),
    isAdmin: z.boolean().optional(),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
