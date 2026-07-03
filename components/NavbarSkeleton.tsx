import LogoSkeleton from "./LogoSkeleton";

export default function NavbarSkeleton() {
  return (
    <div className="animate-pulse max-w-7xl w-full mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <LogoSkeleton />

        <div className="bg-primary-100 rounded-md w-full max-w-md h-16" />

        <div className="flex items-center gap-2">
          <div className="bg-primary-100 rounded-2xl w-8 h-8" />
          <div className="bg-primary-100 rounded-2xl w-8 h-8" />
        </div>
      </div>
      <span className="sr-only">Navbar Loading...</span>
    </div>
  );
}
