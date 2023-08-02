import { forwardRef } from "react";

import { Link, LinkProps } from "react-router-dom";

import { twMerge } from "tailwind-merge";

const defaultStyles =
  "font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none";

const anchorVariants = {
  solid: "text-white bg-violet-600 hover:bg-violet-700",
  ghost: "text-violet-600 hover:text-violet-700 hover:bg-neutral-200",
};

interface AnchorProps extends LinkProps {
  variant?: keyof typeof anchorVariants;
}

export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ children, variant = "solid", className, ...rest }, ref) => (
    <Link
      ref={ref}
      {...rest}
      className={twMerge(defaultStyles, anchorVariants[variant], className)}
    >
      {children}
    </Link>
  )
);

Anchor.displayName = "Anchor";
