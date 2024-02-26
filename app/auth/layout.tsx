import { ReactNode } from 'react';

type ILayout = Readonly<{ children: ReactNode }>;

export default function layout({ children }: ILayout) {
  return (
    <main className='relative flex max-h-screen w-full items-center justify-center'>
      <div className='mt-[15rem] flex  h-full w-[35rem] flex-col rounded-xl border border-gray-300 px-6 py-2'>
        {children}
      </div>
    </main>
  );
}
