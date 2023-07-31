import React, { forwardRef } from "react";

import { CgSpinner } from 'react-icons/cg'

const defaultStyles = "flex items-center justify-center gap-2 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-violet-600"

const buttonVariants = {
  solid: 'text-white bg-violet-600 hover:bg-violet-700 disabled:bg-neutral-200',
  ghost: 'text-violet-600 hover:text-violet-700 hover:bg-neutral-200'
}

interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: keyof typeof buttonVariants
  responsive?: boolean
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, variant = "solid", responsive, isLoading, ...rest }, ref) => (
  <button ref={ref} {...rest} className={`${defaultStyles} ${buttonVariants[variant]} ${responsive ? 'w-full' : 'w-auto'}`}>
    {isLoading ? <CgSpinner className="text-lg animate-spin" /> : null}

    {children}
  </button>
));

Button.displayName = 'Button';
