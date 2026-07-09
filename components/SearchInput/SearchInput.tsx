"use client";

import { useDebounce } from "@/hooks";
import { ActionResponse } from "@/lib/responses";
import { Notebook, Search } from "@meistericons/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Empty from "../Empty/Empty";
import Input from "../Input/Input";
import BookCard from "../Navbar/components/BookCard/BookCard";
import BookSkeleton from "../Navbar/components/BookSkeleton/BookSkeleton";

interface SearchInputProps {
  searchFunction(query: string): Promise<ActionResponse>;
}

export default function SearchInput({ searchFunction }: SearchInputProps) {
  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState("");
  const lastQuery = useDebounce(query, 500);

  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (lastQuery) {
      const getSearchResults = async () => {
        setLoading(true);
        const state = await searchFunction(lastQuery);

        if (state.type === "success") {
          setSearchResults(state.data as []);
        }

        if (state.type === "error") {
          toast.error(state.message);
        }

        setLoading(false);
      };
      getSearchResults();
    }
  }, [lastQuery]);

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
        <div className="absolute bg-primary-50 inset-x-0 top-full mt-2 w-full z-40 overflow-y-auto max-h-64 border border-gray-200 rounded-lg shadow-lg">
          {loading &&
            Array.from({ length: 2 }).map((_, index) => (
              <BookSkeleton key={index} />
            ))}
          {query === "" && (
            <Empty
              icon={<Search size={32} />}
              title="Search for a book"
              message="Type a keyword to start searching"
            />
          )}
          {query !== "" && searchResults.length === 0 && (
            <Empty
              icon={<Notebook size={32} />}
              title="No books found"
              message="Search for books by title, author, or ISBN"
            />
          )}
          {query !== "" && searchResults.length > 0 && (
            <div>
              {searchResults.map((item) => (
                <BookCard listing={item} key={item.id} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
