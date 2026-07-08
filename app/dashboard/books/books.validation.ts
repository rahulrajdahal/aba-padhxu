import { isValidFileType } from "@/utils/helpers";
import z from "zod";

export const bookSchema = z.object({
  title: z.string().min(5, "Min 5 Characters."),
  isbn13: z.string().max(13, "Max 13 digits.").min(13, "Min 13 digits."),
  description: z.string().min(2, "Min 20 characters.").optional(),
  author: z.string(),
  genreId: z.string(),
  publisher: z.string(),
  publishedDate: z.string(),
  image: z
    .any()
    .refine((file) => file?.size <= 5000000, `Max image size is 5MB.`)
    .refine((file) => isValidFileType(file?.name), "Not a valid image."),
});

export const updateBookSchema = z.object({
  title: z.string().min(5, "Min 5 Characters.").optional(),
  isbn13: z
    .string()
    .max(13, "Max 13 digits.")
    .min(13, "Min 13 digits.")
    .optional(),
  author: z.string().optional(),
  genreId: z.string().optional(),
  publisher: z.string().optional(),
  publishedDate: z.string().optional(),
  description: z.string().min(20, "Min 20 characters.").optional(),
  image: z
    .any()
    .refine((file) => file?.size <= 5000000, `Max image size is 5MB.`)
    .refine((file) => isValidFileType(file?.name), "Not a valid image.")
    .optional(),
});
