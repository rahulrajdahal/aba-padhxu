import { ImageProps } from "next/image";

interface AvatarProps extends ImageProps {}
export default function Avatar(props: Readonly<AvatarProps>) {
  const { className, width = 48, height = 48, ...rest } = props;

  return (
    <img
      width={width}
      height={height}
      className={`rounded-full w-12 h-12 object-cover transition-all hover:scale-110 ${className || ""}`}
      {...rest}
    />
  );
}
