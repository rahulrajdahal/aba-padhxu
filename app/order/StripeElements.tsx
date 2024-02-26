'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getCookie } from 'cookies-next';
import React from 'react';
import StripeCheckoutForm from '../../components/StripeCheckoutForm/StripeCheckoutForm';

export default function StripeElements() {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  );

  const [clientSecret, setClientSecret] = React.useState('');
  const cartItems = getCookie('cartItems')
    ? JSON.parse(getCookie('cartItems') as string)
    : [];

  const totalPrice = cartItems
    .map(
      (cartItem: { book: { price: number }; quantity: number }) =>
        cartItem.book.price * cartItem.quantity
    )
    .reduce((a: number, b: number) => a + b, 0);

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        total: totalPrice,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [totalPrice]);

  return (
    clientSecret && (
      <Elements
        options={{
          appearance: { theme: 'stripe' },
          clientSecret,
        }}
        stripe={stripePromise}
      >
        <StripeCheckoutForm />
      </Elements>
    )
  );
}
