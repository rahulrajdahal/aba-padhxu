"use client";

import { fetchAllGenres } from "@/app/dashboard/genres/actions";
import { Genre } from "@/generated/prisma/client/client";
import { redirect, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Select from "./Select/Select";

export default function GenreSelect() {
  const searchParams = useSearchParams();

  const handleGenreOnChange: React.ChangeEventHandler<
    HTMLSelectElement,
    HTMLSelectElement
  > = (e) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("genre", e.target.value);
    if (params.get("genre") === "") params.delete("genre");
    redirect(`?${params.toString()}`);
  };

  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchAllGenres();
      setGenres((prev) => [...prev, ...(data as Genre[])]);
    };

    fetchData();
  }, []);

  const defaultGenre = searchParams.get("genre") || "";

  return (
    <Select
      label="Genre"
      options={[
        { label: "All Genres", value: "" },
        ...genres.map((genre) => ({
          label: genre.name,
          value: genre.name,
        })),
      ]}
      defaultValue={defaultGenre}
      onChange={handleGenreOnChange}
    />
  );
}
