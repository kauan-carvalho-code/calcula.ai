import React, { forwardRef } from 'react';

interface SelectProps extends React.ComponentProps<'select'> {
  label?: string;
  options?: Array<{ value: string; label: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, id, options, ...rest }, ref) => (
    <label htmlFor={id}>
      {label}

      <select ref={ref} {...rest} id={id}>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
);

Select.displayName = 'Select';
