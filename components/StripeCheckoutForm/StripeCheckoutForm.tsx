"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { SyntheticEvent } from "react";
import toast from "react-hot-toast";
import { Button } from "../Buttons";

export default function StripeCheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          toast.success("Payment succeded!");
          break;
        case "processing":
          toast.loading("Payment is processing");
          break;
        case "requires_payment_method":
          toast.error("Your payment was not successful, please try again.");
          break;
        default:
          toast.error("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      toast.error(error.message as string);
    } else {
      toast.error("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <div id="payment-form">
      <PaymentElement
        id="payment-element"
        options={{
          layout: "tabs",
        }}
      />
      <Button
        type="button"
        onClick={handleSubmit}
        disabled={isLoading || !stripe || !elements}
        id="submit"
        isLoading={isLoading}
        className="mt-2"
      >
        {isLoading ? "Processing..." : "Pay now"}
      </Button>
    </div>
  );
}
