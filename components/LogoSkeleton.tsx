export default function LogoSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center gap-2">
        <div className="bg-primary-100 rounded-md w-12 h-12" />
        <div className="bg-primary-100 rounded-md w-32 h-12" />
      </div>
      <span className="sr-only">Logo Loading...</span>
    </div>
  );
}
