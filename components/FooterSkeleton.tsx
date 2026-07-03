import LogoSkeleton from "./LogoSkeleton";

export default function FooterSkeleton() {
  return (
    <div className="animate-pulse max-w-7xl w-full mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col space-y-4">
          <LogoSkeleton />
          <div className="flex flex-col gap-2">
            <div className="bg-primary-100 rounded-md max-w-24 w-full h-4" />
            <div className="bg-primary-100 rounded-md max-w-20 w-full h-4" />
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-primary-100 rounded-lg w-4 h-4" />
            <div className="bg-primary-100 rounded-lg w-4 h-4" />
            <div className="bg-primary-100 rounded-lg w-4 h-4" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-primary-100 rounded-md max-w-32 w-full h-8" />

          <div className="flex flex-col gap-2">
            <div className="bg-primary-100 rounded-md max-w-24 w-full h-4" />
            <div className="bg-primary-100 rounded-md max-w-32 w-full h-4" />
            <div className="bg-primary-100 rounded-md max-w-24 w-full h-4" />
            <div className="bg-primary-100 rounded-md max-w-36 w-full h-4" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-primary-100 rounded-md max-w-32 w-full h-8" />

          <div className="flex flex-col gap-2">
            <div className="bg-primary-100 rounded-md max-w-24 w-full h-4" />
            <div className="bg-primary-100 rounded-md max-w-32 w-full h-4" />
            <div className="bg-primary-100 rounded-md max-w-24 w-full h-4" />
            <div className="bg-primary-100 rounded-md max-w-36 w-full h-4" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-primary-100 rounded-md max-w-64 w-full h-8" />

          <div className="flex flex-col gap-0.5">
            <div className="bg-primary-100 rounded-md max-w-20 w-full h-4" />
            <div className="bg-primary-100 rounded-md max-w-40 w-full h-4" />
            <div className="bg-primary-100 rounded-md max-w-24 w-full h-4" />
            <div className="flex items-center gap-1 mt-2">
              <div className="bg-primary-100 rounded-md max-w-24 w-full h-10" />
              <div className="bg-primary-100 rounded-md max-w-24 w-full h-10" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
        <div className="flex w-full items-center gap-1">
          <div className="bg-primary-100 rounded-md w-4 h-4" />
          <div className="bg-primary-100 rounded-md max-w-40 w-full h-4" />
          <div className="bg-primary-100 rounded-md max-w-32 w-full h-4" />
        </div>
        <div className="bg-primary-100 rounded-md max-w-76 w-full h-4" />
      </div>
      <span className="sr-only">Footer Loading...</span>
    </div>
  );
}
