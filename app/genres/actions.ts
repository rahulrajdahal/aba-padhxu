"use server";

import { actionWrapper, okResponse } from "@/lib/responses";
import { genresService } from "../dashboard/genres/genres.service";

export const fetchAllGenresWithBookCount = actionWrapper(
  async (limit: number, offset: number) => {
    const genres = await genresService.findAllWithBooksCount(limit, offset);

    return okResponse("All genres fetched", genres);
  },
);

export const fetchGenresCount = actionWrapper(async () => {
  const genresCount = await genresService.count();

  return okResponse("Genres count fetched", genresCount);
});
