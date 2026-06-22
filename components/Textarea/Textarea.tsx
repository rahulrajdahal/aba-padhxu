"use client";

import { mergeClassNames } from "@/lib/mergeClassNames";
import React from "react";
import InputError from "../Input/InputError/InputError";
import InputHelperText from "../Input/InputHelperText/InputHelperText";
import InputLabel from "../Input/InputLabel/InputLabel";

type TextareaProps = React.ComponentProps<"textarea"> & {
  label?: string;
  helperText?: string;
  errors?: string[];
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

export default function Textarea(props: TextareaProps) {
  const {
    label,
    className = "",
    helperText,
    errors,
    iconLeft,
    required,
    iconRight,
    ...rest
  } = props;

  const hasErrors = Boolean(errors && errors.length > 0);
  const textareaId = React.useId();

  const inputLabel = label ? (
    <InputLabel htmlFor={textareaId} required={required}>
      {label}
    </InputLabel>
  ) : null;

  const inputErrors =
    hasErrors && errors ? (
      <div className="flex flex-col">
        {errors.map((error, idx) => (
          <InputError id={`${textareaId}-error-${idx}`} key={idx}>
            {error}
          </InputError>
        ))}
      </div>
    ) : null;

  return (
    <fieldset className="flex flex-col gap-1 group w-full">
      {inputLabel}

      <div className="relative flex items-start border rounded-lg border-neutral-muted overflow-hidden">
        {iconLeft && (
          <div
            className={`absolute left-2 top-2 ${hasErrors ? "text-error" : "group-focus-within:text-primary-500"} transition-colors duration-300 text-gray-400`}
          >
            {iconLeft}
          </div>
        )}
        <textarea
          aria-invalid={hasErrors}
          className={mergeClassNames(
            "rounded-lg border w-full text-lg border-gray-300 px-2 py-1 outline-none focus-visible:border-2 focus-visible:border-primary-500",
            className,
            hasErrors ? "border-error" : "",
            iconLeft ? "pl-8" : iconRight ? "pr-8" : "",
          )}
          {...rest}
        />
        {iconRight && (
          <div
            className={`absolute right-2 top-2 ${hasErrors ? "text-red-500" : "group-focus-within:text-primary-500"} transition-colors duration-300 text-gray-400`}
          >
            {iconRight}
          </div>
        )}
      </div>
      {inputErrors}
      {helperText && !hasErrors ? (
        <InputHelperText id={`${textareaId}-helper-text`}>
          {helperText}
        </InputHelperText>
      ) : null}
    </fieldset>
  );
}
