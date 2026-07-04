"use client";

import { Button } from "@/components";
import Pill from "@/components/Pill";
import { ArrowRight } from "@meistericons/react";

export default function Header() {
  const handleBrowseBooks = () => {
    const browseBooks = document.getElementById("listings");

    if (browseBooks) {
      globalThis.scrollBy({
        top: browseBooks.getBoundingClientRect().top - 40,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="relative bg-primary-100 overflow-hidden py-16 lg:py-24 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 max-w-xl">
          <Pill>✨ Mid-Year Book Sale: up to 40% off</Pill>
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
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={28}
                />
              }
              size="lg"
              className="shadow-lg shadow-primary-200 transition-all  group"
              onClick={handleBrowseBooks}
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
  );
}
