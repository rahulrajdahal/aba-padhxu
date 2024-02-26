import { cookies } from 'next/headers';
import Order from './Order';

export default async function page() {
  const cartItems = cookies().get('cartItems')?.value
    ? JSON.parse(cookies().get('cartItems')?.value as string)
    : [];

  return <Order cartItems={cartItems} />;
}
