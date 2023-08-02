import React from "react";

import { Link } from "react-router-dom";

import { GiPapers } from "react-icons/gi";
import { IoMdCalculator } from "react-icons/io";

interface SideBarProps {
  children: React.ReactNode;
}

export const WithSideBar = ({ children }: SideBarProps) => {
  return (
    <div className="w-screen h-screen">
      <aside className="fixed top-0 left-0 z-10 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
        <div className="h-full px-3 py-6 overflow-y-auto border-r border-solid border-neutral-200">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 focus:outline-violet-600 group"
              >
                <GiPapers className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />

                <span className="ml-3">Papéis</span>
              </Link>
            </li>

            <li>
              <Link
                to="calculadora"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 focus:outline-violet-600 group"
              >
                <IoMdCalculator className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />

                <span className="ml-3">Calculadora</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-6 sm:ml-64">
        {children}
      </div>
    </div>
  );
};
