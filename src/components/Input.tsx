import React, { forwardRef } from "react";

import { twMerge } from "tailwind-merge";

const defaultLabelStyles = 'w-full text-sm font-medium'

const defaultInputStyles =
  "bg-gray-50 border border-gray-300 text-sm font-normal rounded-lg focus:via-violet-600 focus:border-violet-600 block w-full p-2.5 outline-violet-600";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, className, ...rest }, ref) => (
    <label htmlFor={id} className={twMerge(defaultLabelStyles, className)}>
      {label}

      <input
        ref={ref}
        {...rest}
        id={id}
        className={defaultInputStyles}
      />
    </label>
  )
);

Input.displayName = "Input";
