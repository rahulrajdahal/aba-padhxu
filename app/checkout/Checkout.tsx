"use client";

import { Input } from "@/components";
import { PublicPageLayout } from "@/components/layouts";
import { Book, CartItem, Listing } from "@/generated/prisma/client/client";
import { Card, Lock, ShieldCheck } from "@meistericons/react";
import StripeElements from "../order/StripeElements";

type CheckoutPageProps = {
  cartItems: (CartItem & {
    listing: Listing & { book: Book };
  })[];
  cartCount: number;
  wishlistCount: number;
};

export default function CheckoutPage({
  cartItems,
  cartCount,
  wishlistCount,
}: CheckoutPageProps) {
  const orderSummary = {
    itemsCount: cartItems.length,
    subtotal: cartItems
      .reduce((acc, item) => acc + item.listing.priceCents / 100, 0)
      .toFixed(2),
    shipping: 0, // Free over $35
    tax: 3.36,
    total: (
      cartItems.reduce((acc, item) => acc + item.listing.priceCents / 100, 0) +
      3.36
    ).toFixed(2),
  };

  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData((prev) => ({ ...prev, [name]: value }));
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     alert(
  //       `Thank you for your order, ${formData.firstName}! Your literary journey is on its way.`,
  //     );
  //     // Proceed with payment gateway routing / backend submission here
  //   };

  return (
    <PublicPageLayout
      cartItemsCount={Number(cartCount)}
      wishlistItemsCount={Number(wishlistCount)}
    >
      <main className="py-12 px-4 sm:px-6 lg:px-8 text-gray-800">
        <div className="max-w-6xl mx-auto">
          {/* Header/Trust Banner */}
          <div className="flex items-center justify-end gap-2 mb-8 text-sm text-gray-500 bg-yellow-50 px-3 py-1.5 rounded-full">
            <Lock size={14} className="text-green-600" />
            <span>Secure 256-Bit SSL Checkout</span>
          </div>

          <form
            //   onSubmit={handleSubmit}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Input
                      type="email"
                      name="email"
                      required
                      label="EMAIL ADDRESS"
                      placeholder="reading@lover.com"
                    />
                  </div>

                  <Input
                    label="FIRST NAME"
                    type="text"
                    name="firstName"
                    required
                  />
                  <Input
                    label="LAST NAME"
                    type="text"
                    name="lastName"
                    required
                  />

                  <Input
                    label="STREET ADDRESS"
                    type="text"
                    name="address"
                    required
                    placeholder="123 Storybook Lane"
                  />

                  <Input label="CITY" type="text" name="city" required />

                  <Input
                    label="ZIP / POSTAL CODE"
                    type="text"
                    name="zipCode"
                    required
                  />
                </div>
              </div>
              <StripeElements />
              {/* Payment Details */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="flex items-center justify-center bg-amber-700 text-white text-xs w-5 h-5 rounded-full font-sans">
                    2
                  </span>
                  Payment Method
                </h2>

                <div className="space-y-4">
                  <div className="p-4 border border-amber-600 bg-amber-50/30 rounded-md flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-900">
                      <Card size={18} className="text-amber-800" /> Credit /
                      Debit Card
                    </span>
                    <div className="flex gap-1 text-gray-400 font-bold text-xs tracking-wider">
                      VISA | MC | AMEX
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-4">
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        required
                        //   value={formData.cardName}
                        //   onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-amber-600 outline-none"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        required
                        //   maxLength="16"
                        placeholder="•••• •••• •••• ••••"
                        //   value={formData.cardNumber}
                        //   onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-amber-600 outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        required
                        placeholder="MM/YY"
                        //   value={formData.expiry}
                        //   onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-amber-600 outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                        CVC / CVV
                      </label>
                      <input
                        type="password"
                        name="cvc"
                        required
                        //   maxLength="4"
                        placeholder="•••"
                        //   value={formData.cvc}
                        //   onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-amber-600 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <OrderSummary /> */}
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
                        £
                        {cartItem.quantity *
                          (cartItem.listing.priceCents / 100)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 text-sm text-gray-400 border-t border-gray-800 pt-4">
                  <div className="flex justify-between">
                    <span>
                      Books Subtotal ({orderSummary.itemsCount} items)
                    </span>
                    <span className="text-gray-100">
                      ${orderSummary.subtotal}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Media Mail Shipping</span>
                    <span className="text-emerald-400 font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-gray-800">
                    <span>Sales Tax</span>
                    <span className="text-gray-100">
                      ${orderSummary.tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-gray-100 pt-2">
                    <span>Grand Total</span>
                    <span className="text-amber-400 text-xl">
                      ${orderSummary.total}
                    </span>
                  </div>
                </div>

                {/* Submit / Authorize Button */}
                <button
                  type="submit"
                  className="w-full mt-6 bg-amber-600 text-white font-medium py-3.5 px-4 rounded-md shadow-sm hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors flex items-center justify-center gap-2 text-base"
                >
                  <ShieldCheck size={20} /> Authorize & Pay $
                  {orderSummary.total}
                </button>

                <p className="mt-4 text-center text-xs text-gray-500">
                  By clicking Authorize & Pay, you agree to our digital
                  distribution terms.
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>
    </PublicPageLayout>
  );
}
