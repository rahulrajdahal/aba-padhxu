import { mergeClassNames } from "@/lib/mergeClassNames";
import React from "react";

type PriceBadgeProps = Omit<React.ComponentProps<"span">, "children"> & {
  price: number;
};

export default function PriceBadge({
  price,
  className = "",
  ...props
}: PriceBadgeProps) {
  return (
    <span
      className={mergeClassNames(
        "absolute h-15 w-15 rounded-full bg-white text-green-700 left-5 top-14 shadow-[-15px_15px_40px_rgba(170,53,0,0.5)] flex items-center justify-center p-0.75",
        className,
      )}
      aria-label={`Price: ${price} dollars`}
      {...props}
    >
      <p className="rotate-[-38deg] text-[1.75rem] leading-8">
        <sup className="text-sm">$</sup>

        {price}
      </p>
    </span>
  );
}
