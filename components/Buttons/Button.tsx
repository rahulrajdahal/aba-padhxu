"use client";

import Link, { LinkProps } from "next/link";
import { ComponentPropsWithoutRef } from "react";

type Variant = "filled" | "outlined" | "text";

export type ButtonProps = ButtonComponentProps | TextButtonProps;

export default function Button({
  variant = "filled",
  ...props
}: Readonly<ButtonProps>) {
  const isLinkTextButton = typeof props === "object" && "linkProps" in props;

  if (variant === "text") {
    if (isLinkTextButton) {
      return <TextButton {...props} linkProps={props.linkProps} />;
    } else {
      return <TextButton {...props} />;
    }
  }

  return (
    <ButtonComponent {...props} variant={variant}>
      {props?.children}
    </ButtonComponent>
  );
}

interface ButtonComponentProps extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
}

const ButtonComponent = ({
  variant = "filled",
  ...props
}: ButtonComponentProps) => {
  const getVariantStyles = () => {
    if (variant === "filled") {
      return "bg-[#1b911bd9] text-[#cddfcd] px-5 py-2";
    } else if (variant === "outlined") {
      return "border border-[#cddfcd] text-[#1b911bd9] px-5 py-2";
    } else {
      return "text-[#1b911bd9] hover:underline";
    }
  };

  return (
    <button
      {...props}
      className={`${props.className} ${getVariantStyles()} rounded-[1.25rem] disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {props?.children}
    </button>
  );
};

interface TextButtonProps extends ButtonComponentProps {
  linkProps?: LinkProps;
}

const TextButton = ({ linkProps, ...props }: TextButtonProps) => {
  return linkProps?.href ? (
    <ButtonComponent {...props} variant="text">
      <Link {...linkProps}>{props?.children}</Link>
    </ButtonComponent>
  ) : (
    <ButtonComponent {...props} variant="text">
      {props?.children}
    </ButtonComponent>
  );
};
