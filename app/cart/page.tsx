import { CartCard, Navbar } from '@/components';
import { Author, Book, Genre } from '@prisma/client';
import { cookies } from 'next/headers';
import { Key } from 'react';
import Checkout from './PlaceOrder';

export default async function page() {
  const cartItems = cookies().get('cartItems')?.value
    ? JSON.parse(cookies().get('cartItems')?.value as string)
    : [];

  const totalPrice = cartItems
    .map(
      (cartItem: { book: { price: number }; quantity: number }) =>
        cartItem.book.price * cartItem.quantity
    )
    .reduce((a: number, b: number) => a + b, 0);

  return (
    <>
      <Navbar />
      <main className='mt-12 px-[12.5%]'>
        <h3 className='mb-3 text-3xl font-bold'>Cart</h3>

        {cartItems.map(
          (cartItem: {
            id: Key | null | undefined;
            book: Book & {
              genre: Genre;
            } & {
              author: Author;
            };
            quantity: number;
          }) => (
            <CartCard
              key={cartItem.id}
              book={cartItem.book}
              qty={cartItem.quantity}
            />
          )
        )}

        <div className='flex w-full justify-between border-t border-gray-400 py-4'>
          <strong className='text-lg font-semibold'>Total:</strong>
          <span className='flex flex-col gap-4'>
            <p className='text-3xl font-bold'>${totalPrice}</p>
            <Checkout />
          </span>
        </div>
      </main>
    </>
  );
}
