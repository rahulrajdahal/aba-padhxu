import { actionWrapper, okResponse } from "@/lib/responses";
import { mapBookWithGenreNameDTO } from "../dashboard/books/books.dto";
import { BookService } from "../dashboard/books/books.service";

export const fetchAllBooks = actionWrapper(
  async (limit: number, offset: number, query?: string, genre?: string) => {
    const books = await BookService.findAllBooksWithGenreName(
      limit,
      offset,
      query,
      genre,
    );

    return okResponse(
      "Books fetched successfully",
      books.map((book) => mapBookWithGenreNameDTO(book)),
    );
  },
);
