export default function CardSkeleton() {
  return (
    <div className="animate-pulse relative flex flex-col gap-2 w-full">
      <div className="h-70 w-full max-w-64 bg-primary-100 rounded-lg" />
      <div className="absolute h-20 w-20 -top-4 -left-4 bg-primary-200 rounded-full" />
      <div className="absolute h-10 w-10 -top-4 right-1 bg-primary-200 rounded-full" />
      <div className="h-6 w-full max-w-40 bg-primary-100 rounded-md" />
      <div className="h-2 w-full max-w-24 bg-primary-100 rounded-md" />
      <div className="h-2 w-full max-w-32 bg-primary-100 rounded-md" />
      <div className="flex items-center gap-1">
        <div className="h-4 w-8 bg-primary-100 rounded-md" />
        <div className="h-4 w-4 bg-primary-100" />
      </div>
      <div className="h-8 w-32 bg-primary-100 rounded-md" />

      <span className="sr-only">Card Loading...</span>
    </div>
  );
}
