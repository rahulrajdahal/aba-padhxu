import { Button, Input } from "@/components";
import { routes } from "@/utils/routes";
import Link from "next/link";

export const calculateTax = (total: number) => total * 0.08;

interface OrderSummaryProps {
  subTotal: number;
}

export default function OrderSummary({ subTotal }: OrderSummaryProps) {
  const estimatedTax = calculateTax(subTotal);
  const total = subTotal + estimatedTax;

  return (
    <div className="lg:col-span-4 sticky top-20 h-fit space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-serif font-bold text-gray-900 border-b border-gray-200 pb-4 mb-4">
          Order Summary
        </h2>

        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-medium text-gray-900">
              £{subTotal.toFixed(2)}
            </span>
          </div>
          {/* {discount > 0 && (
                           <div className="flex justify-between text-emerald-700 font-medium">
                             <span>Discount (15%)</span>
                             <span>-${discount.toFixed(2)}</span>
                           </div>
                         )} */}
          {/* <div className="flex justify-between">
                           <span>Shipping</span>
                           <span className="font-medium text-gray-900">
                             {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                           </span>
                         </div> */}
          <div className="flex justify-between pb-4 border-b border-gray-200">
            <span>Estimated Tax</span>
            <span className="font-medium text-gray-900">
              £{estimatedTax.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-base font-serif font-bold text-gray-900 pt-2">
            <span>Order Total</span>
            <span>£{total.toFixed(2)}</span>
          </div>
        </div>

        <Link href={routes.checkout}>
          <Button className="w-full mt-6">Proceed to Checkout</Button>
        </Link>

        {/* Shipping Notice */}
        {/* {shipping > 0 && (
                         <p className="mt-4 text-xs text-center text-gray-500 italic">
                           Add ${(35 - subtotal).toFixed(2)} more to your cart for
                           Free Shipping!
                         </p>
                       )} */}
      </div>

      {/* Promo Code Box */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <form
          // onSubmit={applyPromoCode}
          className="flex gap-2"
        >
          <Input
            type="text"
            placeholder="Promo code (Try: BOOKWORM)"
            required
          />
          <button
            type="submit"
            className="bg-gray-200 text-gray-800 px-4 py-1.5 text-sm font-medium rounded-md hover:bg-gray-300 transition-colors"
          >
            Apply
          </button>
        </form>
      </div>
    </div>
  );
}
