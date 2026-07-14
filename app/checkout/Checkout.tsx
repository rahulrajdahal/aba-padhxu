"use client";

import { Button } from "@/components";
import {
  Book,
  CartItem,
  Listing,
  UserAddress,
} from "@/generated/prisma/client/client";
import { Cross, Lock, ShieldCheck } from "@meistericons/react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { calculateTax } from "../cart/components/OrderSummary/OrderSummary";
import {
  confirmOrderPaymentAction,
  fetchOrderDetailsByPaymentIntent,
  placeOrderAction,
} from "./actions";
import ShippingForm from "./components/ShippingForm";
import ShippingRadioGroup from "./components/ShippingRadioGroup";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

type CheckoutPageProps = {
  cartItems: (CartItem & {
    listing: Listing & { book: Book };
  })[];
  shippingAddresses: UserAddress[];
};

function calculateOrderSummary(cartItems: CheckoutPageProps["cartItems"]) {
  const itemsCount = cartItems.length;
  const subtotalVal = cartItems.reduce(
    (acc, item) => acc + (item.listing.pricePennies * item.quantity) / 100,
    0,
  );
  const tax = calculateTax(subtotalVal);
  const totalVal = subtotalVal + tax;

  return {
    itemsCount,
    subtotal: subtotalVal.toFixed(2),
    tax: tax.toFixed(2),
    total: totalVal.toFixed(2),
  };
}

function SuccessScreen({ order }: { order: any }) {
  const formattedTotal = (order.totalAmountCents / 100).toFixed(2);
  return (
    <main className="py-16 px-4 sm:px-6 lg:px-8 text-gray-800 animate-fadeIn">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-500 mb-8">
          Thank you for your purchase. Your order has been successfully
          processed and is on its way.
        </p>

        {/* Order Details Grid */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left space-y-4">
          <div className="flex justify-between text-sm border-b border-gray-200 pb-3">
            <span className="text-gray-500">Order ID</span>
            <span className="font-semibold text-gray-900">{order.id}</span>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Shipping To
            </h3>
            <div className="text-sm text-gray-600">
              <p className="font-semibold text-gray-900">
                {order.shippingAddress.recipientName}
              </p>
              <p>{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && (
                <p>{order.shippingAddress.addressLine2}</p>
              )}
              <p>
                {order.shippingAddress.city},{" "}
                {order.shippingAddress.stateProvince}{" "}
                {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.countryCode}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Items Purchased
            </h3>
            <div className="divide-y divide-gray-150">
              {order.orderItems.map((item: any) => (
                <div
                  key={item.id}
                  className="flex justify-between py-2 text-sm"
                >
                  <span className="text-gray-800 font-serif">
                    {item.historicalTitle}{" "}
                    <span className="text-xs text-amber-600">
                      x{item.quantity}
                    </span>
                  </span>
                  <span className="font-medium text-gray-900">
                    £{(item.priceAtPurchasePennies / 100).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-3 flex justify-between text-base font-serif font-bold text-gray-900">
            <span>Total Paid</span>
            <span className="text-amber-700 text-lg">£{formattedTotal}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="bg-amber-600 hover:bg-amber-500 text-white font-medium py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
          >
            Continue Shopping
          </a>
          <a
            href="/dashboard"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </main>
  );
}

function CheckoutForm({
  cartItems,
  shippingAddresses,
  paymentIntentId,
}: {
  cartItems: CheckoutPageProps["cartItems"];
  shippingAddresses: UserAddress[];
  paymentIntentId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [selectedAddressId, setSelectedAddressId] = useState(
    shippingAddresses.find((shippingAddress) => shippingAddress.isDefault)
      ?.id ||
      shippingAddresses[0]?.id ||
      "",
  );

  const [isLoading, setIsLoading] = useState(false);
  const orderSummary = calculateOrderSummary(cartItems);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAddressId) {
      toast.error("Please add and select a shipping address.");
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      // 1. Create PENDING order and OrderItems in the database
      const orderRes = await placeOrderAction(
        selectedAddressId,
        paymentIntentId,
      );
      if (!orderRes.success) {
        throw new Error("Failed to place order.");
      }

      // 2. Confirm payment with Stripe
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout`,
        },
      });

      if (error) {
        if (error.type === "card_error" || error.type === "validation_error") {
          toast.error(error.message as string);
        } else {
          toast.error("An unexpected payment error occurred.");
        }
      }
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.message || "An unexpected error occurred during checkout.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header/Trust Banner */}
      <div className="flex items-center justify-end gap-2 mb-8 text-sm text-gray-500 bg-yellow-50 px-3 py-1.5 rounded-full w-fit ml-auto">
        <Lock size={14} className="text-green-600" />
        <span>Secure 256-Bit SSL Checkout</span>
      </div>

      <form
        onSubmit={handlePay}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left Column: Shipping & Payment Info */}
        <div className="lg:col-span-7 space-y-6">
          {/* Contact & Shipping Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center bg-amber-700 text-white text-xs w-5 h-5 rounded-full font-sans">
                1
              </span>
              Shipping Address
            </h2>

            {shippingAddresses?.length > 0 ? (
              <ShippingRadioGroup
                shippingAddresses={shippingAddresses}
                selectedAddressId={selectedAddressId}
                setSelectedAddressId={setSelectedAddressId}
              />
            ) : (
              <p className="text-gray-500 text-sm mb-4">
                No shipping addresses found. Please add one below.
              </p>
            )}

            <Dialog.Root>
              <Dialog.Trigger asChild className="mt-4">
                <Button type="button" size="sm">
                  Add Address
                </Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm data-[state=open]:animate-fade-in-up" />
                <Dialog.Content
                  onInteractOutside={(e) => e.preventDefault()}
                  className="fixed top-1/2 left-1/2 max-h-[90vh] w-[90vw] max-w-200 -translate-x-1/2 -translate-y-1/2 rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%/35%)_0_10px_30px_-10px,hsl(206_22%_7%/20%)_0_0_0_1px] focus:outline-none data-[state=open]:animate-contentShow"
                >
                  <ShippingForm />
                  <Dialog.Close className="absolute top-4 right-4">
                    <Cross size={16} />
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>

          {/* Payment Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center bg-amber-700 text-white text-xs w-5 h-5 rounded-full font-sans">
                2
              </span>
              Payment Method
            </h2>

            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
          </div>
        </div>

        {/* Right Column: Sticky Order Summary */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-serif font-bold border-b border-gray-800 pb-4 mb-4 tracking-wide">
              Review Your Order
            </h2>

            {/* Quick Item Previews */}
            <div className="max-h-40 overflow-y-auto space-y-3 mb-6 pr-2 divide-y divide-gray-800">
              {cartItems.map((cartItem) => (
                <div
                  key={cartItem.id}
                  className="flex justify-between items-center text-sm pt-2"
                >
                  <div className="text-gray-300 font-serif flex items-center gap-2">
                    <span className="flex flex-col gap-0.5">
                      <b>{cartItem.listing.book.title}</b>
                      <i>by {cartItem.listing.book.author}</i>
                    </span>
                    <span className="text-xs text-amber-500 border border-amber-500 px-1 rounded-md">
                      x{cartItem.quantity}
                    </span>
                  </div>
                  <span className="font-medium">
                    £{cartItem.quantity * (cartItem.listing.pricePennies / 100)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm text-gray-400 border-t border-gray-800 pt-4">
              <div className="flex justify-between">
                <span>Books Subtotal ({orderSummary.itemsCount} items)</span>
                <span className="text-gray-100">£{orderSummary.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Media Mail Shipping</span>
                <span className="text-emerald-400 font-medium">FREE</span>
              </div>
              <div className="flex justify-between pb-4 border-b border-gray-800">
                <span>Sales Tax</span>
                <span className="text-gray-100">£{orderSummary.tax}</span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-gray-100 pt-2">
                <span>Grand Total</span>
                <span className="text-amber-400 text-xl">
                  £{orderSummary.total}
                </span>
              </div>
            </div>

            {/* Submit / Authorize Button */}
            <Button
              type="submit"
              disabled={isLoading || !stripe || !elements}
              isLoading={isLoading}
              className="w-full mt-6 bg-amber-600 text-white font-medium py-3.5 px-4 rounded-md shadow-sm hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors flex items-center justify-center gap-2 text-base cursor-pointer"
              leftIcon={<ShieldCheck size={20} />}
            >
              Authorize & Pay £{orderSummary.total}
            </Button>

            <p className="mt-4 text-center text-xs text-gray-500">
              By clicking Authorize & Pay, you agree to our digital distribution
              terms.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

function CheckoutContent({ cartItems, shippingAddresses }: CheckoutPageProps) {
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams.get("payment_intent");
  const clientSecretParam = searchParams.get("payment_intent_client_secret");

  const [clientSecret, setClientSecret] = useState("");
  const [stripePIId, setStripePIId] = useState("");
  const [successOrder, setSuccessOrder] = useState<any>(null);
  const [confirmingPayment, setConfirmingPayment] = useState(false);

  // If redirecting back after success
  useEffect(() => {
    if (paymentIntentId && clientSecretParam) {
      setConfirmingPayment(true);
      confirmOrderPaymentAction(paymentIntentId)
        .then(() => fetchOrderDetailsByPaymentIntent(paymentIntentId))
        .then((order) => {
          setSuccessOrder(order);
          setConfirmingPayment(false);
        })
        .catch((err) => {
          console.error(err);
          setConfirmingPayment(false);
        });
    }
  }, [paymentIntentId, clientSecretParam]);

  // Create PaymentIntent on load (if not in success redirect flow)
  useEffect(() => {
    if (!paymentIntentId && cartItems.length > 0) {
      const orderSummary = calculateOrderSummary(cartItems);
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          total: Math.round(Number(orderSummary.total) * 100),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
          setStripePIId(data.id);
        })
        .catch((err) => console.error("Error creating payment intent:", err));
    }
  }, [cartItems, paymentIntentId]);

  if (confirmingPayment) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">
          Confirming your payment and creating your order...
        </p>
      </div>
    );
  }

  if (successOrder) {
    return <SuccessScreen order={successOrder} />;
  }

  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 text-gray-800">
      {clientSecret && stripePIId ? (
        <Elements
          options={{ clientSecret, appearance: { theme: "stripe" } }}
          stripe={stripePromise}
        >
          <CheckoutForm
            cartItems={cartItems}
            shippingAddresses={shippingAddresses}
            paymentIntentId={stripePIId}
          />
        </Elements>
      ) : (
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          {cartItems.length === 0 ? (
            <div className="text-center">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                Your Cart is Empty
              </h2>
              <p className="text-gray-600 mb-6">
                Add some books to your cart before checking out.
              </p>
              <a
                href="/"
                className="inline-block bg-amber-600 text-white font-medium py-2.5 px-6 rounded-md hover:bg-amber-500 transition-colors"
              >
                Browse Books
              </a>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-lg font-medium text-gray-700">
                Initializing secure checkout...
              </p>
            </>
          )}
        </div>
      )}
    </main>
  );
}

export default function CheckoutPage(props: CheckoutPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <CheckoutContent {...props} />
    </Suspense>
  );
}
