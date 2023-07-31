import React, { forwardRef } from 'react';
import { Paper } from '../interfaces/paper';

interface SelectProps extends React.ComponentProps<'select'> {
  name?: string;
  options?: Paper[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ name, id, options, className, ...rest }, ref) => {
    return (
      <label className='text-sm font-medium' htmlFor={id}>
        {name}
        <select
          ref={ref}
          {...rest}
          id={id}
          className={`bg-gray-50 border border-gray-300 text-sm font-normal rounded-lg focus:via-violet-600 focus:border-violet-600 block w-full p-2.5 outline-violet-600 ${className}`}
        >
          {options?.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </label>
    );
  }
);

Select.displayName = 'Select';
