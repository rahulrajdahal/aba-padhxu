import { Notebook } from "@meistericons/react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2.5 group cursor-pointer">
      <div className="h-9 w-9 bg-linear-to-tr from-brand-ink via-brand-ink/50 to-brand-ink/35 rounded-xl flex items-center justify-center shadow-md shadow-brand-ink/20 group-hover:scale-105 transition-transform">
        <Notebook color="white" />
      </div>
      <span className="text-xl font-bold tracking-tight bg-linear-to-r from-brand-ink via-brand-ink/50 to-brand-ink/35 bg-clip-text text-transparent">
        Aba Padhxu
      </span>
    </div>
  );
}
