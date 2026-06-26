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
        "absolute p-2 size-fit aspect-square rounded-full bg-white text-green-700 left-0 top-2 shadow-[-15px_15px_40px_rgba(170,53,0,0.5)] flex items-center justify-center",
        className,
      )}
      aria-label={`Price: ${price} dollars`}
      {...props}
    >
      <p className="rotate-[-38deg] text-base font-semibold">
        <sup className="text-xs">$</sup>

        {price}
      </p>
    </span>
  );
}
