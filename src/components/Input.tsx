import React, { forwardRef } from "react";

interface InputProps extends React.ComponentProps<'input'> {
  label: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, id, ...rest }, ref) => (
  <label htmlFor={id}>
    {label}

    <input ref={ref} {...rest} id={id} />
  </label>
));

Input.displayName = 'Input';
