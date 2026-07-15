import Empty from "@/components/Empty/Empty";
import { Genre } from "@/generated/prisma/client/client";
import { routes } from "@/utils/routes";
import { ArrowRight, NotebookOpen } from "@meistericons/react";
import Link from "next/link";
import GenreCard from "./GenreCard";

interface CategoriesProps {
  genres: (Genre & { _count: { books: number } })[];
}

export default function Categories({ genres }: CategoriesProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Explore Categories
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Find exactly what you're in the mood for
          </p>
        </div>
        <Link
          href={routes.genres}
          className="text-primary-600 hover:text-primary-700 text-sm font-semibold flex items-center gap-1"
        >
          See all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {genres?.length > 0 ? (
          genres.map((genre) => (
            <Link key={genre.id} href={`${routes.books}?genre=${genre.id}`}>
              <GenreCard
                genre={{ name: genre.name, bookCount: genre._count.books }}
              />
            </Link>
          ))
        ) : (
          <Empty icon={<NotebookOpen />} message="No categories found" />
        )}
      </div>
    </section>
  );
}
