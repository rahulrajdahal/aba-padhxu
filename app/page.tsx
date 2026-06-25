import { Button, Input } from "@/components";
import Logo from "@/components/Logo/Logo";
import { routes } from "@/utils/routes";
import {
  ArrowRight,
  Cart,
  Heart,
  NotebookOpen,
  Search,
  StarB,
} from "@meistericons/react";
import Link from "next/link";

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

export default async function page() {
  return (
    <div className="min-h-screen bg-primary-50 text-gray-900 font-sans">
      {/* 1. NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 backdrop-blur-md bg-primary-100/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href={routes.home}>
            <Logo />
          </Link>

          {/* Search Bar */}
          <Input
            type="search"
            placeholder="Search by title, author, or ISBN..."
            iconLeft={<Search size={24} />}
            className="rounded-full!"
            wrapperClassName="max-w-md"
          />

          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-primary-600 transition"
            >
              Bestsellers
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-primary-600 transition"
            >
              New Releases
            </Link>
            <button className="relative p-2 text-gray-600 hover:text-primary-600 transition">
              <Cart className="h-6 w-6" />
              <span className="absolute top-0 right-0 bg-primary-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                2
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="relative bg-primary-100 overflow-hidden py-16 lg:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-semibold tracking-wide uppercase">
              ✨ Mid-Year Book Sale: up to 40% off
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Discover Your Next{" "}
              <span className="text-primary-600">Great Adventure</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Explore thousands of curated titles, from timeless classics to
              modern bestsellers. Join our community of readers today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                rightIcon={
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                }
                size="lg"
                className="shadow-lg shadow-primary-200 transition-all  group"
              >
                Browse Books
              </Button>
              <Button size="lg" variant="outline">
                View Membership
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-linear-to-tr from-primary-100 to-purple-100 rounded-3xl transform rotate-3 scale-95 opacity-60 blur-lg"></div>
            <img
              src="https://images.unsplash.com/photo-1513001900722-370f803f498d?auto=format&fit=crop&q=80&w=800"
              alt="Cozy bookstore layout"
              className="relative rounded-3xl shadow-2xl object-cover h-[450px] w-full"
            />
          </div>
        </div>
      </header>

      {/* 3. CATEGORIES SECTION */}
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
          {categories.map((category) => (
            <div
              key={category.name}
              className={`p-6 rounded-2xl cursor-pointer hover:scale-[1.02] transition-all border border-gray-100 shadow-sm bg-white`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${category.color.split(" ")[0]}`}
              >
                <NotebookOpen
                  className={`h-5 w-5 ${category.color.split(" ")[1]}`}
                />
              </div>
              <h3 className="font-bold text-gray-800 text-lg">
                {category.name}
              </h3>
              <p className="text-gray-400 text-xs mt-1">{category.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED BOOKS / BESTSELLERS */}
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
    </div>
  );
}
