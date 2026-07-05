import Empty from "@/components/Empty/Empty";
import { Genre } from "@/generated/prisma/client/client";
import { ArrowRight, NotebookOpen } from "@meistericons/react";

// Mock Data for the bookstore
const categories = [
  { name: "Fiction", count: "1,240 books", color: "bg-blue-50 text-blue-600" },
  {
    name: "Sci-Fi & Fantasy",
    count: "850 books",
    color: "bg-purple-50 text-purple-600",
  },
  {
    name: "Biography",
    count: "430 books",
    color: "bg-amber-50 text-amber-600",
  },
  {
    name: "Self-Help",
    count: "620 books",
    color: "bg-emerald-50 text-emerald-600",
  },
];

interface CategoriesProps {
  genres: Genre[];
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
        <a
          href="#"
          className="text-primary-600 hover:text-primary-700 text-sm font-semibold flex items-center gap-1"
        >
          See all <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {genres?.length > 0 ? (
          genres.map((category) => (
            <div
              key={category.id}
              className={`p-6 rounded-2xl cursor-pointer hover:scale-[1.02] transition-all border border-gray-100 shadow-sm bg-white`}
            >
              <div
                className={
                  "w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                }
              >
                <NotebookOpen className="text-primary-500" size={20} />
              </div>
              <h3 className="font-bold text-gray-800 text-lg">
                {category.name}
              </h3>
              <p className="text-gray-400 text-xs mt-1">
                {category._count.books} books
              </p>
            </div>
          ))
        ) : (
          <Empty icon={<NotebookOpen />} message="No categories found" />
        )}
      </div>
    </section>
  );
}
