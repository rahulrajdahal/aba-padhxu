"use client";

import React from "react";
import InputError from "./InputError/InputError";
import InputHelperText from "./InputHelperText/InputHelperText";
import InputLabel from "./InputLabel/InputLabel";
import TextField from "./TextField/TextField";

type InputProps = React.ComponentProps<"input"> & {
  label?: string;
  helperText?: string;
  errors?: string[];
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

export default function Input(props: InputProps) {
  const { label, helperText, errors, iconLeft, required, iconRight, ...rest } =
    props;

  const hasErrors = Boolean(errors && errors.length > 0);
  const inputId = React.useId();

  const inputLabel = label ? (
    <InputLabel htmlFor={inputId} required={required}>
      {label}
    </InputLabel>
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
        {iconLeft && (
          <div
            className={`absolute left-2 ${hasErrors ? "text-red-500" : "group-focus-within:text-primary-500"} transition-colors duration-300 text-gray-400`}
          >
            {iconLeft}
          </div>
        )}
        <TextField
          error={hasErrors}
          className={iconLeft ? "pl-8" : iconRight ? "pr-8" : ""}
          {...rest}
        />
        {iconRight && (
          <div
            className={`absolute right-2 ${hasErrors ? "text-red-500" : "group-focus-within:text-primary-500"} transition-colors duration-300 text-gray-400`}
          >
            {iconRight}
          </div>
        )}
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
