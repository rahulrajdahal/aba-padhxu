// "use client";

// import { routes } from "@/utils/routes";
// import Link from "next/link";
// import { ComponentPropsWithoutRef } from "react";
// import styled from "styled-components";

// const Container = styled.fieldset`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
// `;

// interface IInput extends ComponentPropsWithoutRef<"fieldset"> {
//   label?: string;
//   error?: string;
//   inputProps?: ComponentPropsWithoutRef<"input">;
//   forgot?: boolean;
// }
// export default function Input({
//   label,
//   error,
//   inputProps,
//   forgot = false,
//   ...props
// }: Readonly<IInput>) {
//   return (
//     <Container {...props}>
//       {label && (
//         <div className="flex items-center justify-between">
//           <label htmlFor={inputProps?.name} className="text-base font-semibold">
//             {label}
//           </label>

//           {forgot ? (
//             <Link
//               href={routes.forgotPassword}
//               className="text-blue-600 underline text-xs"
//             >
//               Forgot Password?
//             </Link>
//           ) : null}
//         </div>
//       )}
//       <input
//         {...inputProps}
//         className="rounded-lg border border-gray-300 px-2 py-1 outline-none"
//       />
//       {error && (
//         <p className="text-sm font-medium tracking-tight text-red-400">
//           {error}
//         </p>
//       )}
//     </Container>
//   );
// }

import React from "react";
import InputError from "./InputError/InputError";
import InputLabel from "./InputLabel/InputLabel";
import TextField, { TextFieldProps } from "./TextField/TextField";

type InputProps = TextFieldProps & {
  label: string;
  errors?: string[];
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

export default function Input(props: InputProps) {
  const { label, errors, iconLeft, iconRight, ...rest } = props;

  const hasErrors = Boolean(errors && errors.length > 0);

  return (
    <fieldset className="flex flex-col gap-1 group w-full">
      <InputLabel className={`${hasErrors ? "text-red-500" : ""}`}>
        {label}
      </InputLabel>
      <div className="relative flex items-center">
        {iconLeft && (
          <div
            className={`absolute left-2 ${hasErrors ? "text-red-500" : "group-focus-within:text-primary-500"} transition-colors duration-300 text-gray-400`}
          >
            {iconLeft}
          </div>
        )}
        <TextField
          {...rest}
          aria-invalid={hasErrors}
          className={iconLeft ? "pl-8" : iconRight ? "pr-8" : ""}
        />
        {iconRight && (
          <div
            className={`absolute right-2 ${hasErrors ? "text-red-500" : "group-focus-within:text-primary-500"} transition-colors duration-300 text-gray-400`}
          >
            {iconRight}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        {hasErrors &&
          errors?.map((error, index) => (
            <InputError key={index}>{error}</InputError>
          ))}
      </div>
    </fieldset>
  );
}
