import React, { forwardRef } from "react"

import { BiSearch } from 'react-icons/bi'

interface SearchBarProps extends React.ComponentProps<'input'> {}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>((props, ref) => (
  <label htmlFor="search_bar" className="h-10 w-96 flex items-center px-2 border border-solid border-violet-600 rounded-lg">
    <input ref={ref} {...props} id="search_bar" type="text" className="w-full outline-transparent" />

    <BiSearch className="text-xl text-violet-800" />
  </label>
))

SearchBar.displayName = 'SearchBar'
