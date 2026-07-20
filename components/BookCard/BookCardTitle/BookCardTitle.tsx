type BookCardTitleProps = {
  title: string;
  maxLength?: number;
};

export default function BookCardTitle({
  title,
  maxLength = 50,
}: BookCardTitleProps) {
  return (
    <strong className="line-clamp-2 font-semibold text-lg leading-6 text-gray-900">
      {title.substring(0, maxLength)}
    </strong>
  );
}
