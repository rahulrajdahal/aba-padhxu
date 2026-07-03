import CardSkeleton from "./components/CardSkeleton";
import HeaderSkeleton from "./components/HeaderSkeleton";

export default function loading() {
  return (
    <>
      <HeaderSkeleton />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-center place-items-center">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}
