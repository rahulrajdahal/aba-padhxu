"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import StripeCheckoutForm from "../../components/StripeCheckoutForm/StripeCheckoutForm";

interface StripeElementsProps {
  totalPrice: number;
}

export default function StripeElements({ totalPrice }: StripeElementsProps) {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
  );

  const [clientSecret, setClientSecret] = React.useState("");

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
          appearance: { theme: "stripe" },
          clientSecret,
        }}
        stripe={stripePromise}
      >
        <StripeCheckoutForm />
      </Elements>
    )
  );
}
