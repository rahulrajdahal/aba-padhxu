import Image from 'next/image';
import React from 'react';

interface IAvatarWithName extends React.ComponentPropsWithoutRef<'span'> {
  /**
   * Name of the avatar.
   */
  name: string;
  /**
   * Image url for the avatar.
   */
  avatar: string;
}
export default function AvatarWithName({
  name,
  avatar,
  ...props
}: Readonly<IAvatarWithName>) {
  return (
    <span className='flex items-center gap-4 ' {...props}>
      <Image
        src={avatar}
        alt={name}
        width={48}
        height={48}
        className='h-12 w-12 rounded-full  object-cover 
                transition-all hover:scale-110'
      />
      <p className='text-lg font-medium text-gray-600'>{name}</p>
    </span>
  );
}
