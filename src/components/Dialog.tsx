import React from "react";

import { GrClose } from 'react-icons/gr'

interface DialogProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const Dialog = ({ children, onClose }: DialogProps) => (
  <div
    id="dialog_overlay"
    className="fixed overflow-hidden mx-auto w-screen h-screen inset-0 bg-black bg-opacity-50 z-10"
    onClick={onClose}
  >
    <div
      id="dialog_content"
      role="dialog"
      className="flex flex-col gap-8 w-[512px] h-max p-4 bg-white absolute inset-0 m-auto rounded-xl"
      onClick={(event) => event.stopPropagation()}
    >
      <button type="button" onClick={onClose} className="flex items-center justify-center p-2 absolute top-4 right-4 rounded-full hover:bg-neutral-200 focus:outline-violet-600">
        <GrClose />
      </button>

      {children}
    </div>
  </div>
);
