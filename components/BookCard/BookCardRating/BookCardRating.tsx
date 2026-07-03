type BookCardRatingProps = {
  rating: number;
};

export default function BookCardRating({ rating }: BookCardRatingProps) {
  return (
    <span className="mt-1 text-primary-700 px-2 py-1 rounded text-sm font-semibold">
      {rating} ⭐
    </span>
  );
}
