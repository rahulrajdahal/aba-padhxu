"use client";

import Empty from "@/components/Empty/Empty";
import { Genre } from "@/generated/prisma/client/client";
import { routes } from "@/utils/routes";
import { useInView } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import GenreCard from "../components/GenreCard";
import { fetchAllGenresWithBookCount } from "./actions";

type GenresProps = {
  genres: (Genre & { _count: { books: number } })[];
  totalGenres: number;
};

export default function Genres({ genres, totalGenres }: GenresProps) {
  const loadMoreRef = useRef(null);
  const loadMoreInView = useInView(loadMoreRef);

  const [pageParams, setPageParams] = useState({ limit: 2, offset: 2 });
  const [allGenres, setAllGenres] =
    useState<(Genre & { _count: { books: number } })[]>(genres);

  useEffect(() => {
    if (loadMoreInView && totalGenres > allGenres.length) {
      const fetchGenres = async () => {
        const { data } = await fetchAllGenresWithBookCount(
          pageParams.limit,
          pageParams.offset,
        );
        setAllGenres((prev) => [
          ...prev,
          ...(data as (Genre & { _count: { books: number } })[]),
        ]);
        setPageParams((prev) => ({
          limit: prev.limit,
          offset: prev.offset + 2,
        }));
      };
      fetchGenres();
    }
  }, [loadMoreInView, pageParams]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto max-w-7xl px-4 py-12">
      {allGenres?.length > 0 ? (
        allGenres?.map((genre) => (
          <Link key={genre.id} href={`${routes.books}?genre=${genre.id}`}>
            <GenreCard
              genre={{ name: genre.name, bookCount: genre._count.books }}
            />
          </Link>
        ))
      ) : (
        <Empty message="Could not find Genres." />
      )}
      <div ref={loadMoreRef}>
        {loadMoreInView && totalGenres > allGenres.length && "Loading..."}
      </div>
    </div>
  );
}
