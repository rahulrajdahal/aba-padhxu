export default function BookSkeleton() {
  return (
    <div className="flex justify-between items-center gap-4 p-4 hover:bg-gray-100">
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 rounded-md bg-gray-200" />
        <div className="flex flex-col gap-2">
          <div className="w-30 h-5 bg-gray-200 rounded-md"></div>
          <div className="w-20 h-5 bg-gray-200 rounded-md"></div>
        </div>
      </div>

      <div className="w-10 h-5 bg-gray-200 rounded-md"></div>
    </div>
  );
}
