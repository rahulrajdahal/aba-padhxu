import Image from "next/image";

interface AvatarGroupProps {
  avatars: string[];
}

export default function AvatarGroup(props: Readonly<AvatarGroupProps>) {
  const { avatars, ...rest } = props;

  return (
    <div className="flex items-center -space-x-4" {...rest}>
      {avatars.map((avatar, index) => (
        <Image
          key={index}
          src={avatar}
          alt={avatar}
          width={40}
          height={40}
          className="rounded-full border-2 border-white object-cover transition-all hover:scale-110"
        />
      ))}
    </div>
  );
}
