"use client";

import { mergeClassNames } from "@/lib/mergeClassNames";
import { routes } from "@/utils/routes";
import { Lock, LockOpen } from "@meistericons/react";
import Link from "next/link";
import React from "react";
import InputError from "../InputError/InputError";
import InputHelperText from "../InputHelperText/InputHelperText";
import InputLabel from "../InputLabel/InputLabel";

type InputPasswordProps = React.ComponentProps<"input"> & {
  label?: string;
  helperText?: string;
  errors?: string[];
  forgot?: boolean;
};

export default function PasswordInput(props: InputPasswordProps) {
  const {
    label,
    helperText,
    errors,
    required,
    forgot = false,
    ...rest
  } = props;

  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType = showPassword ? "text" : "password";
  const inputIcon = showPassword ? (
    <LockOpen onClick={togglePasswordVisibility} />
  ) : (
    <Lock onClick={togglePasswordVisibility} />
  );

  const hasErrors = Boolean(errors && errors.length > 0);
  const inputId = React.useId();

  const inputLabel = label ? (
    <div className="flex items-end justify-between">
      <InputLabel htmlFor={inputId} required={required}>
        {label}
      </InputLabel>
      {forgot && (
        <Link
          href={routes.forgotPassword}
          className="text-info hover:underline text-xs font-medium"
        >
          Forgot Password?
        </Link>
      )}
    </div>
  ) : null;

  const inputErrors =
    hasErrors && errors ? (
      <div className="flex flex-col">
        {errors.map((error, idx) => (
          <InputError id={`${inputId}-error-${idx}`} key={idx}>
            {error}
          </InputError>
        ))}
      </div>
    ) : null;

  return (
    <fieldset className="flex flex-col gap-1 group w-full">
      {inputLabel}

      <div className="relative flex items-center">
        <div
          className={mergeClassNames(
            "flex items-center rounded-lg border w-full text-lg border-gray-300 px-2 py-1 outline-none focus-visible:border-2 focus-visible:border-primary-500",
            hasErrors ? "border-error" : "",
          )}
        >
          <input
            className="outline-none w-full pr-8"
            type={inputType}
            required={required}
            aria-required={required}
            {...rest}
          />
          {inputIcon}
        </div>
      </div>
      {inputErrors}
      {helperText && !hasErrors ? (
        <InputHelperText id={`${inputId}-helper-text`}>
          {helperText}
        </InputHelperText>
      ) : null}
    </fieldset>
  );
}
