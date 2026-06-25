import { mergeClassNames } from "@/lib/mergeClassNames";
import React from "react";
import InputError from "../Input/InputError/InputError";
import InputLabel from "../Input/InputLabel/InputLabel";

type SelectProps = {
  label?: string;
  options?: { value: string; label: string }[];
  errors?: string[];
};

export default function Select({ label, options, errors }: SelectProps) {
  const inputId = React.useId();

  return (
    <fieldset className="flex flex-col gap-1 group w-full">
      {label && <InputLabel htmlFor={inputId}>{label}</InputLabel>}
      <select
        id={inputId}
        name="condition"
        required
        className={mergeClassNames(
          "w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors shadow-sm",
          errors && errors.length > 0
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus-visible:ring-primary-500 focus-visible:border-primary-500",
        )}
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors && errors.length > 0 && (
        <div className="flex flex-col gap-1 group w-full">
          {errors.map((error, idx) => (
            <InputError id={`${inputId}-error-${idx}`} key={idx}>
              {error}
            </InputError>
          ))}
        </div>
      )}
    </fieldset>
  );
}
