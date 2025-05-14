"use client";

import Link from "next/link";

type Variant = "filled" | "outlined" | "text";

type ButtonProps = {
  href?: string;
  variant?: Variant;
  children?: React.ReactNode;
};

export default function Button({
  variant = "filled",
  href,
  children,
  ...props
}: Readonly<ButtonProps>) {
  if (variant === "text") {
    if (href) {
      return <TextButton href={href} buttonProps={{ variant, children }} />;
    } else {
      return <TextButton buttonProps={{ children }} />;
    }
  }

  return (
    <ButtonComponent variant={variant} {...props}>
      {children}
    </ButtonComponent>
  );
}

interface ButtonComponentProps extends React.HTMLAttributes<HTMLButtonElement> {
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
      className={`${props.className} ${getVariantStyles()} rounded-[1.25rem]`}
      type="button"
    >
      {props?.children}
    </button>
  );
};

type TextButtonProps = {
  href?: string;
  buttonProps?: ButtonComponentProps;
};

const TextButton = ({ buttonProps, ...props }: TextButtonProps) => {
  return props.href ? (
    <Link {...props} href={props.href}>
      <ButtonComponent {...buttonProps} variant="text">
        {buttonProps?.children}
      </ButtonComponent>
    </Link>
  ) : (
    <ButtonComponent {...buttonProps} variant="text">
      {buttonProps?.children}
    </ButtonComponent>
  );
};
