import React, { forwardRef } from "react";

interface ButtonProps extends React.ComponentProps<'button'> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...rest }, ref) => (
  <button ref={ref} {...rest} className="h-10 text-white bg-violet-600 hover:bg-violet-700 px-4 py-1 rounded-lg">
    {children}
  </button>
));

Button.displayName = 'Button';
