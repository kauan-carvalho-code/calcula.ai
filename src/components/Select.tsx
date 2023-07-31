import React, { forwardRef } from 'react';

interface SelectProps extends React.ComponentProps<'select'> {
  label?: string;
  options?: Array<{ value: string; label: string }>;
  variant?: 'solid' | 'ghost'
}

const defaultStyles = "flex items-center justify-center gap-2 font-medium rounded-lg text-sm px-5 py-2.5 w-full focus:outline-violet-600"


const selectVariants = {
  solid: 'text-white bg-violet-600 hover:bg-violet-700 disabled:bg-neutral-200',
  ghost: 'text-violet-600 hover:text-violet-700 hover:bg-neutral-200'
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, id, options,variant='ghost', ...rest }, ref) => (
    <label htmlFor={id}>
      {label}

      <select ref={ref} {...rest} id={id} className={`${defaultStyles} ${selectVariants[variant]}`}>
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
