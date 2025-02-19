'use client';

import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  title?: string;
  onClose?: () => void; 
  fixedBottomComponent?: React.ReactElement;
  children: React.ReactElement;
};

export default function Modal({ isOpen, title = 'Modal Title', onClose, children, fixedBottomComponent }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 cursor-pointer p-4 sm:p-6" onClick={onClose}>
      <div 
        className="bg-white rounded-lg w-full max-w-lg max-h-[90dvh] flex flex-col m-4 cursor-auto relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-center p-6 pb-4 text-black">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 text-xl hover:text-gray-800">&times;</button>
        </div>

        <div className="overflow-y-scroll flex- px-6 mb-20 mr-4 max-h-[80dvh] scrollbar-always-visible">
          {children}
        </div>

        {fixedBottomComponent && (
          <div className="absolute bottom-0 left-0 w-full p-4 controlled-bounce">
            {fixedBottomComponent}
          </div>
        )}
      </div>
    </div>
  );
}

