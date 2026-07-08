"use server";

import {
  authActionWrapper,
  createdResponse,
  noContentResponse,
  okResponse,
} from "@/lib/responses";
import { routes } from "@/utils/routes";
import { revalidatePath } from "next/cache";
import { genresService } from "./genres.service";

export const addGenre = authActionWrapper(
  async (prevState: unknown, formData: FormData) => {
    const body = {
      name: formData.get("name") as string,
      description: (formData.get("description") as string) ?? "",
    };

    const genreId = await genresService.create(body);

    return createdResponse("Genre created successfully", genreId);
  },
);

export const fetchAllGenres = authActionWrapper(async () => {
  const genres = await genresService.findAll();

  return okResponse("Genres fetched successfully", genres);
});

export const fetchGenreById = authActionWrapper(async (id: string) => {
  const genre = await genresService.findById(id);

  return okResponse("Genre fetched successfully", genre);
});

export const updateGenreById = authActionWrapper(
  async (id: string, formData: FormData) => {
    const body = {
      name: (formData.get("name") as string) ?? "",
      description: (formData.get("description") as string) ?? "",
    };

    await genresService.updateById(id, body);

    return noContentResponse();
  },
);

export const deleteGenreById = authActionWrapper(async (id: string) => {
  await genresService.deleteById(id);

  revalidatePath(`${routes.dashboard}${routes.genres}`);
  return noContentResponse();
});
