import { ShieldCheck } from "@meistericons/react";

export default function OrderSummary() {
  return (
    <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
      <div className="bg-gray-900 text-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-serif font-bold border-b border-gray-800 pb-4 mb-4 tracking-wide">
          Review Your Order
        </h2>

        {/* Quick Item Previews */}
        {/* <div className="max-h-40 overflow-y-auto space-y-3 mb-6 pr-2 divide-y divide-gray-800">
          <div className="flex justify-between items-center text-sm pt-2">
            <span className="text-gray-300 font-serif">
              The Midnight Library{" "}
              <span className="text-xs text-amber-500">x1</span>
            </span>
            <span className="font-medium">$16.99</span>
          </div>
          <div className="flex justify-between items-center text-sm pt-2">
            <span className="text-gray-300 font-serif">
              Dune <span className="text-xs text-amber-500">x2</span>
            </span>
            <span className="font-medium">$25.00</span>
          </div>
        </div> */}
        {/* 
        <div className="space-y-3 text-sm text-gray-400 border-t border-gray-800 pt-4">
          <div className="flex justify-between">
            <span>Books Subtotal ({orderSummary.itemsCount} items)</span>
            <span className="text-gray-100">
              ${orderSummary.subtotal.toFixed(2)}
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
              ${orderSummary.total.toFixed(2)}
            </span>
          </div>
        </div> */}

        {/* Submit / Authorize Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-amber-600 text-white font-medium py-3.5 px-4 rounded-md shadow-sm hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors flex items-center justify-center gap-2 text-base"
        >
          <ShieldCheck size={20} /> Authorize & Pay $
          {/* {orderSummary.total.toFixed(2)} */}
        </button>

        <p className="mt-4 text-center text-xs text-gray-500">
          By clicking Authorize & Pay, you agree to our digital distribution
          terms.
        </p>
      </div>
    </div>
  );
}
