"use client";

import { NotebookOpen } from "@meistericons/react";

type GenreCardProps = {
  genre: {
    name: string;
    bookCount: number;
  };
};

export default function GenreCard({ genre }: GenreCardProps) {
  return (
    <div
      className={`p-6 rounded-2xl cursor-pointer hover:scale-[1.02] transition-all border border-gray-100 shadow-sm bg-white`}
    >
      <div
        className={"w-10 h-10 rounded-xl flex items-center justify-center mb-4"}
      >
        <NotebookOpen className="text-primary-500" size={20} />
      </div>
      <h3 className="font-bold text-gray-800 text-lg">{genre.name}</h3>
      <p className="text-gray-400 text-xs mt-1">{genre.bookCount} books</p>
    </div>
  );
}
