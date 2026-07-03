import { Button } from "@/components";
import { Heart, StarB } from "@meistericons/react";

const featuredBooks = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    price: "$14.99",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: "$16.20",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    price: "$12.95",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 4,
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    price: "$15.00",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
  },
];

export default function FeaturedBooks() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Trending Books
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            The most talked-about books this week
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {featuredBooks.map((book) => (
          <div
            key={book.id}
            className="group relative bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition"
          >
            <div>
              <div className="relative aspect-3/4 rounded-xl overflow-hidden bg-gray-100 mb-4 group-hover:opacity-95 transition">
                <img
                  src={book.image}
                  alt={book.title}
                  width={420}
                  height={300}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                />
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm text-gray-600 hover:text-red-500 transition">
                  <Heart className="h-4 w-4" />
                </button>
              </div>

              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {book.author}
              </span>
              <h3 className="font-bold text-gray-800 text-base mt-1 line-clamp-1 group-hover:text-primary-600 transition">
                {book.title}
              </h3>

              <div className="flex items-center gap-1 mt-1 text-yellow-300">
                <StarB className="h-3.5 w-3.5" />
                <span className="text-xs font-semibold text-gray-600">
                  {book.rating}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
              <span className="text-lg font-bold text-gray-950">
                {book.price}
              </span>
              <Button size="xs">Add to Cart</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
