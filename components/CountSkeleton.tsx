export default function CountSkeleton() {
  return (
    <div className="animate-pulse absolute top-0 right-0 h-4 w-4 rounded-full bg-primary-200">
      <span className="sr-only">Count Loading...</span>
    </div>
  );
}
