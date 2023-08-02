import React, { forwardRef } from "react";

import { twMerge } from "tailwind-merge";

// Interfaces
import { Paper } from "../interfaces/paper";

const defaultStyles = "w-full text-sm font-medium";

interface SelectProps extends React.ComponentProps<"select"> {
  label?: string;
  options: Paper[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, id, options, className, ...rest }, ref) => {
    return (
      <label htmlFor={id} className={twMerge(defaultStyles, className)}>
        {label}

        <select
          ref={ref}
          {...rest}
          id={id}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:via-violet-600 focus:border-violet-600 block w-full p-2.5 outline-violet-600"
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </label>
    );
  }
);

Select.displayName = "Select";
