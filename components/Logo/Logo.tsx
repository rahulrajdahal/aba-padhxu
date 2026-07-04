"use client";

import { routes } from "@/utils/routes";
import { Notebook } from "@meistericons/react";

export default function Logo() {
  const handleOnClick = () => {
    const location = window.location.href;

    if (location !== routes.home) {
      globalThis.location.href = routes.home;
    }
    globalThis.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={handleOnClick}
      className="flex items-center gap-2.5 group cursor-pointer"
    >
      <div className="h-9 w-9 bg-linear-to-tr from-primary-500 via-primary-500/50 to-primary-500/35 rounded-xl flex items-center justify-center shadow-md shadow-primary-500/20 group-hover:scale-105 transition-transform">
        <Notebook color="white" />
      </div>
      <span className="text-xl font-bold tracking-tight bg-linear-to-r from-primary-500 via-primary-500/50 to-primary-500/35 bg-clip-text text-transparent">
        Aba Padhxu
      </span>
    </button>
  );
}
