export default function HeaderSkeleton() {
  return (
    <div className="animate-pulse py-16 max-w-7xl mx-auto w-full px-4">
      <div className="flex items-center gap-12 w-full">
        <div className="flex flex-col gap-4 w-full">
          <div className="h-5 w-60 bg-primary-100 rounded-full" />
          <div className="flex flex-col gap-2 w-full">
            <div className="h-16 w-full bg-primary-100 rounded-md" />
            <div className="h-16 w-[90%] bg-primary-100 rounded-md" />
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <div className="h-8 w-[90%] bg-primary-100 rounded-md" />
            <div className="h-8 w-[70%] bg-primary-100 rounded-md" />
          </div>
          <div className="flex gap-2 mt-4">
            <div className="h-16 w-52 bg-primary-100 rounded-lg" />
            <div className="h-16 w-52 bg-primary-100 rounded-lg" />
          </div>
        </div>
        <div className="bg-primary-100 rounded-3xl w-full aspect-square h-112.5 shadow-2xl" />
      </div>
      <span className="sr-only">Header loading...</span>
    </div>
  );
}
