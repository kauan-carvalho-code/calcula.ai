import { forwardRef } from "react";

import { Link, LinkProps } from "react-router-dom";

const defaultStyles = "font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"

const anchorVariants = {
  solid: 'text-white bg-violet-600 hover:bg-violet-700',
  ghost: 'text-violet-600 hover:text-violet-700 hover:bg-neutral-200'
}

interface AnchorProps extends LinkProps {
  variant?: keyof typeof anchorVariants
  responsive?: boolean
}

export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(({ children, variant = "solid", responsive, ...rest }, ref) => (
  <Link ref={ref} {...rest} className={`${defaultStyles} ${anchorVariants[variant]} ${responsive ? 'w-full' : 'w-auto'}`}>
    {children}
  </Link>
));

Anchor.displayName = 'Anchor';
