import React from 'react';
import Avatar from '../Avatar/Avatar';

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
      <Avatar src={avatar} alt={`Portrait of ${name} doing something`} width={48} height={48} />
      <p className='text-lg font-medium text-gray-600'>{name}</p>
    </span>
  );
}
