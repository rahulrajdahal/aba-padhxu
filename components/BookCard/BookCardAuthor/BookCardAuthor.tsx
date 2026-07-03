type BookCardTitleProps = {
  author: string;
  maxLength?: number;
};

export default function BookCardAuthor({
  author,
  maxLength = 50,
}: BookCardTitleProps) {
  return (
    <p className="text-gray-400 text-[0.8125rem] leading-4.5 italic">
      by {author}
    </p>
  );
}
