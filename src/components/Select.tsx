import React, { forwardRef } from "react";
import { Paper } from "../interfaces/paper";

interface SelectProps extends React.ComponentProps<"select"> {
  label?: string;
  options: Paper[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, id, options, ...rest }, ref) => {
    return (
      <label htmlFor={id} className="text-sm font-medium">
        {label}

        <select
          ref={ref}
          {...rest}
          id={id}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:via-violet-600 focus:border-violet-600 block w-full p-2.5 outline-violet-600">
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
