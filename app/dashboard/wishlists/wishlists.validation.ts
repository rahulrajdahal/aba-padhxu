import z from "zod";

export const addWishlistSchema = z.object({
  bookId: z.string().min(1, "Book is required"),
});
