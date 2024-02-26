import { Navbar } from '@/components';
import { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className='px-[12.5%]'>{children}</main>
    </>
  );
}
