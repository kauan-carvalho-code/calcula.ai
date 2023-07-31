import React, { forwardRef } from "react";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, ...rest }, ref) => (
    <label
      htmlFor={id}
      className="text-sm font-medium"
    >
      {label}

      <input
        ref={ref}
        {...rest}
        id={id}
        className="bg-gray-50 border border-gray-300 text-sm font-normal rounded-lg focus:via-violet-600 focus:border-violet-600 block w-full p-2.5 outline-violet-600"
      />
    </label>
  )
);

Input.displayName = "Input";
