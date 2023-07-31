import React from "react"

import { Link } from "react-router-dom"

import { GiPapers } from 'react-icons/gi'
import { PiCalculatorBold } from 'react-icons/pi'

interface SideBarProps {
  children: React.ReactNode;
}

export const SideBar = ({ children }: SideBarProps) => {
  return (
    <div className="h-screen w-screen flex">
      <nav className="h-full w-64 flex flex-col gap-2 flex-shrink-0 p-4 border-r border-solid border-neutral-200">
        <Link to="/" className="flex items-center gap-1">
          <GiPapers />

          Papéis
        </Link>

        <Link to="calculadora" className="flex items-center gap-1">
          <PiCalculatorBold />

          Calculadora
        </Link>
      </nav>

      { children }
    </div>
  )
}
