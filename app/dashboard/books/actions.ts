"use server";

import { Book } from "@/generated/prisma/client/client";
import { fileUpload, removeUploadFile } from "@/lib/fileUpload";
import { logger } from "@/lib/logger";
import {
  actionWrapper,
  authActionWrapper,
  createdResponse,
  noContentResponse,
  okResponse,
  serverError,
  validationError,
} from "@/lib/responses";
import { slugify } from "@/lib/slugify";
import { revalidatePath } from "next/cache";
import { BookService } from "./books.service";
import { bookSchema, updateBookSchema } from "./books.validation";

export const addBook = authActionWrapper(
  async (prevData: unknown, formData: FormData) => {
    const body = {
      isbn13: formData.get("isbn13") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      author: formData.get("author") as string,
      publisher: formData.get("publisher") as string,
      publishedDate: formData.get("publishedDate") as string,
      genreId: formData.get("genreId") as string,
    };

    const image = formData.get("image") as File;

    if (!image || image.name === "undefined") {
      return validationError({ image: ["Image is required"] });
    }

    const validateBody = bookSchema.safeParse({ ...body, image });
    if (!validateBody.success) {
      return validationError(validateBody.error.flatten().fieldErrors);
    }

    const bookImage = (await fileUpload(image, "books", {
      transformation: { width: 60, height: 60, crop: "thumb" },
    })) as string;

    await BookService.createBook({
      ...body,
      slug: slugify(body.title),
      publishedDate: new Date(body.publishedDate),
      image: bookImage as string,
    });

    return createdResponse("Book added successfully", 201);
  },
);

export const fetchBooksCount = actionWrapper(
  async (query?: string, genre?: string) => {
    const books = await BookService.count(query, genre);

    return okResponse("Books count fetched successfully", books);
  },
);

export const fetchAllBooks = authActionWrapper(async () => {
  const books = await BookService.findAllBooks();

  return okResponse("Books fetched successfully", books);
});

export const fetchAllBooksWithGenreName = authActionWrapper(
  async (limit, offset, query?: string, genre?: string) => {
    const books = await BookService.findAllBooksWithGenreName(
      limit,
      offset,
      query,
      genre,
    );

    return okResponse("Books fetched successfully", books);
  },
);

export const fetchBookBySlug = authActionWrapper(async (slug: string) => {
  const book = await BookService.findBookBySlug(slug);

  return okResponse("Books fetched successfully", book);
});

export const fetchBookWithGenreNameBySlug = authActionWrapper(
  async (slug: string) => {
    const book = await BookService.findBookWithGenreNameBySlug(slug);

    return okResponse("Book fetched successfully", book);
  },
);

export const updateBookById = async (id: string, formData: FormData) => {
  try {
    const body: Partial<Book> = {};

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const publishedDate = formData.get("publishedDate") as string;
    const image = formData.get("image") as File;
    const author = formData.get("author") as string;
    const genre = formData.get("genre") as string;
    const isbn13 = formData.get("isbn13") as string;
    const publisher = formData.get("publisher") as string;
    const genreId = formData.get("genreId") as string;

    const validateBody = updateBookSchema.safeParse({
      title,
      description,
      publishedDate,
      author,
      genre,
      image: image?.size > 0 ? image : undefined,
      isbn13,
      publisher,
    });
    if (!validateBody.success) {
      return validationError(validateBody.error.flatten().fieldErrors);
    }

    if (title) {
      body.title = title;
    }

    if (isbn13) {
      body.isbn13 = isbn13;
    }

    if (description) {
      body.description = description;
    }
    if (publishedDate) {
      body.publishedDate = new Date(publishedDate);
    }
    if (author) {
      body.author = author;
    }
    if (genreId) {
      body.genreId = genreId;
    }

    if (image?.size > 0) {
      removeUploadFile(image.name, "books");
      body.image = (await fileUpload(image, "books", {
        transformation: { width: 60, height: 60, crop: "thumb" },
      })) as string;
    }

    await BookService.patchBookById(id, body);

    revalidatePath("/dashboard/books");
    revalidatePath("/books");

    return noContentResponse();
  } catch (error) {
    logger.error("Failed to update book", error);
    return serverError();
  }
};

export const deleteBookById = async (id: string) => {
  try {
    await BookService.deleteBookById(id);

    revalidatePath("/dashboard/books");
    revalidatePath("/books");

    return noContentResponse();
  } catch (error) {
    logger.error("Failed to delete book", error);
    return serverError();
  }
};
