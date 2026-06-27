"use client";

import { fetchAllListings } from "@/app/actions";
import { Book, Listing } from "@/generated/prisma/client/client";
import { useDebounce } from "@/hooks";
import { routes } from "@/utils/routes";
import { Cart, Search } from "@meistericons/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Input from "../Input/Input";
import Logo from "../Logo/Logo";

interface NavbarProps {
  cartItemsCount: number;
}

export default function Navbar({ cartItemsCount }: NavbarProps) {
  const searchQuery = useSearchParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState("");
  const lastQuery = useDebounce(query, 500);

  const [searchResults, setSearchResults] = useState<
    (Listing & { book: Book })[]
  >([]);

  useEffect(() => {
    if (lastQuery) {
      const getSearchResults = async () => {
        const state = await fetchAllListings(lastQuery);
        console.log(state, "state");
        if (state.type === "success") {
          setSearchResults(state.data as (Listing & { book: Book })[]);
        }

        if (state.type === "error") {
          toast.error(state.message);
        }
      };
      getSearchResults();
    }
  }, [lastQuery, router, searchQuery]);

  const handleQueryOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 backdrop-blur-md bg-primary-100/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href={routes.home}>
          <Logo />
        </Link>

        <div className="relative max-w-md w-full">
          <Input
            type="search"
            placeholder="Search by title, author, or ISBN..."
            iconLeft={<Search size={24} />}
            className="rounded-full!"
            value={query}
            onChange={handleQueryOnChange}
            onBlur={handleOnBlur}
            onFocus={() => setOpen(true)}
            onClick={() => setOpen(true)}
          />

          {open && (
            <div className="absolute bg-gray-50 inset-x-0 top-full mt-2 w-full z-40 overflow-y-auto max-h-64 border border-gray-200 rounded-lg shadow-lg">
              {searchResults.length === 0 ? (
                <div className="p-4 text-gray-500">No results found.</div>
              ) : (
                <ul>
                  {searchResults.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center gap-4 p-4 hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.book.image}
                          alt={item.book.title}
                          className="h-20 w-20 object-cover rounded-md"
                        />
                        <div>
                          <strong className="text-sm text-gray-700 font-semibold">
                            {item.book.title}
                          </strong>
                          <p className="text-xs text-gray-600">
                            {item.book.author}
                          </p>
                        </div>
                      </div>

                      <strong className="text-sm text-gray-700 font-semibold">
                        ${(item.priceCents / 100).toFixed(2)}
                      </strong>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

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
          <Link
            href={routes.cart}
            className="relative p-2 text-gray-600 hover:text-primary-600 transition"
          >
            <Cart className="h-6 w-6" />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
