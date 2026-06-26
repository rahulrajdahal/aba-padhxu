import { mergeClassNames } from "@/lib/mergeClassNames";
import Image, { ImageProps } from "next/image";

type CardImageProps = ImageProps & { alt: string };

export default function CardImage({
  className = "",
  alt,
  src,
  ...props
}: CardImageProps) {
  return (
    <Image
      {...props}
      src={
        process.env.NODE_ENV === "development" ? `/uploads/books/${src}` : src
      }
      alt={`Cover of Book: ${alt}`}
      width={200}
      height={200}
      className={mergeClassNames(
        "w-full h-75 rounded-xl object-cover",
        className,
      )}
    />
  );
}
