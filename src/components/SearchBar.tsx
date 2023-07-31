import React, { forwardRef } from "react"

import { BiSearch } from 'react-icons/bi'

import { Input } from "./Input"

interface SearchBarProps extends React.ComponentProps<'input'> {}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>((props, ref) => (
  <div className="w-96 relative">
    <Input {...props} type="text" ref={ref} />

    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
      <BiSearch />
    </div>
  </div>
))

SearchBar.displayName = 'SearchBar'
