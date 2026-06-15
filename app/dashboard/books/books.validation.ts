import { isValidFileType } from "@/utils/helpers";
import z from "zod";

export const bookSchema = z.object({
  name: z.string().min(5, "Min 5 Characters."),
  author: z.string(),
  genre: z.string(),
  description: z.string().min(20, "Min 20 characters."),
  image: z
    .any()
    .refine((file) => file?.size <= 5000000, `Max image size is 5MB.`)
    .refine((file) => isValidFileType(file?.name), "Not a valid image."),
  publishedDate: z.string(),
});

export const updateBookSchema = z.object({
  name: z.string().min(5, "Min 5 Characters.").optional(),
  author: z.string().optional(),
  genre: z.string().optional(),
  description: z.string().min(20, "Min 20 characters.").optional(),
  image: z
    .any()
    .refine((file) => file?.size <= 5000000, `Max image size is 5MB.`)
    .refine((file) => isValidFileType(file?.name), "Not a valid image.")
    .optional(),
  publishedDate: z.string().optional(),
});
