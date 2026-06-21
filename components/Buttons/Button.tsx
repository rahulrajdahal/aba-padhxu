"use client";
import { ClockCircle } from "@meistericons/react";
import React from "react";

export const BUTTON_VARIANT = {
  FILLED: "filled",
  OUTLINE: "outline",
  TEXT: "text",
} as const;

type ButtonVariant = (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT];
export const BUTTON_SIZE = {
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
} as const;

type ButtonSize = (typeof BUTTON_SIZE)[keyof typeof BUTTON_SIZE];

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Loading state – shows a spinner and disables interaction */
  isLoading?: boolean;
  /** Optional icon to the left of the Button text */
  leftIcon?: React.ReactNode;
  /** Optional icon to the right of the Button text */
  rightIcon?: React.ReactNode;
}

const VARIANT_STYLE: Record<ButtonVariant, string> = {
  [BUTTON_VARIANT.FILLED]:
    "bg-brand-ink text-brand-paper-light hover:bg-brand-ink-light",
  [BUTTON_VARIANT.OUTLINE]:
    "border border-neutral-border text-neutral-text hover:bg-brand-paper-dark",
  [BUTTON_VARIANT.TEXT]: "text-brand-ink hover:underline p-0!",
};

const SIZE_MAP: Record<ButtonSize, string> = {
  [BUTTON_SIZE.XS]: "text-xs px-2 py-1 rounded-sm",
  [BUTTON_SIZE.SM]: "text-sm px-3 py-2 rounded-md",
  [BUTTON_SIZE.MD]: "text-base px-4 py-2 rounded-lg",
  [BUTTON_SIZE.LG]: "text-lg px-6 py-3 rounded-xl",
};
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = BUTTON_VARIANT.FILLED,
      size = BUTTON_SIZE.MD,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Component = "button";
    const baseClasses =
      "inline-flex items-center justify-center font-sans font-medium tracking-wide transition-all duration-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-accent-focus disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] disabled:cursor-not-allowed";

    const combinedClasses = [
      VARIANT_STYLE[variant],
      SIZE_MAP[size],
      className,
      baseClasses,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Component
        ref={ref}
        className={combinedClasses}
        disabled={disabled || isLoading}
        aria-disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && <ClockCircle className="animate-spin mr-2" />}
        {!isLoading && leftIcon && (
          <span className="mr-2 inline-flex">{leftIcon}</span>
        )}
        <span className="truncate">{children}</span>
        {!isLoading && rightIcon && (
          <span className="ml-2 inline-flex">{rightIcon}</span>
        )}
      </Component>
    );
  },
);
Button.displayName = "Button";
export default Button;
