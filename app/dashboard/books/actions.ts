"use server";

import { authUserId } from "@/app/(auth)/middleware";
import { fileUpload, removeUploadFile } from "@/lib/fileUpload";
import { logger } from "@/lib/logger";
import {
  createdResponse,
  noContentResponse,
  notFoundError,
  serverError,
  validationError,
} from "@/lib/responses";
import { slugify } from "@/lib/slugify";
import { Book } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/client";
import { revalidatePath } from "next/cache";
import { createBook, deleteBookById, patchBookById } from "./books.service";
import { bookSchema, updateBookSchema } from "./books.validation";

export const addBook = async (prevData: unknown, formData: FormData) => {
  try {
    const body = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      publishedDate: formData.get("publishedDate") as string,
      price: formData.get("price") as string,
      quantity: Number(formData.get("quantity") as string),
      author: formData.get("author") as string,
      genre: formData.get("genre") as string,
      isbn13: formData.get("isbn13") as string,
      publisher: formData.get("publisher") as string,
    };

    const sellerId = await authUserId();

    const image = formData.get("image") as unknown as File;

    const validateBody = bookSchema.safeParse({ ...body, image });
    if (!validateBody.success) {
      return validationError(validateBody.error.flatten().fieldErrors);
    }

    if (!image || image.name === "undefined") {
      return notFoundError("Image not found");
    }
    const bookImage = await fileUpload(image, "books", {
      transformation: { width: 60, height: 60, crop: "thumb" },
    });

    await createBook({
      ...body,
      slug: slugify(body.title),
      publishedDate: new Date(body.publishedDate),
    });

    return createdResponse("Book added successfully", 201);
  } catch (error) {
    logger.error("Error adding book", error);
    return serverError();
  }
};

export const updateBook = async (prevState: unknown, formData: FormData) => {
  try {
    const id = formData.get("id") as string;

    const body: Partial<Book & { author?: never; genre?: never }> = {};

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const publishedDate = formData.get("publishedDate") as string;
    const image = formData.get("image") as unknown as File;
    const author = formData.get("author") as string;
    const genre = formData.get("genre") as string;
    const price = formData.get("price") as string;
    const quantity = formData.get("quantity") as string;
    const isbn13 = formData.get("isbn13") as string;
    const publisher = formData.get("publisher") as string;

    const validateBody = updateBookSchema.safeParse({
      name,
      description,
      publishedDate,
      author,
      genre,
      image,
      isbn13,
      publisher,
    });
    if (!validateBody.success) {
      return validationError(validateBody.error.flatten().fieldErrors);
    }

    if (name) {
      body.name = name;
    }

    if (price) {
      body.price = new Decimal(price);
    }

    if (quantity) {
      body.quantity = quantity;
    }

    if (description) {
      body.description = description;
    }
    if (publishedDate) {
      body.publishedDate = publishedDate;
    }
    if (author) {
      body.author = author;
    }
    if (genre) {
      body.genre = genre;
    }

    if (image?.name !== "undefined") {
      removeUploadFile(image.name, "books");
      body.image = await fileUpload(image, "books", {
        transformation: { width: 60, height: 60, crop: "thumb" },
      });
    }

    await patchBookById(id, body);

    revalidatePath("/dashboard/books");
    revalidatePath("/books");

    return noContentResponse();
  } catch (error) {
    logger.error("Failed to update book", error);
    return serverError();
  }
};

export const deleteBook = async (id: string) => {
  try {
    await deleteBookById(id);

    revalidatePath("/dashboard/books");
    revalidatePath("/books");

    return noContentResponse();
  } catch (error) {
    logger.error("Failed to delete book", error);
    return serverError();
  }
};
