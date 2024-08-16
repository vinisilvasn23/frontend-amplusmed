// components/ui/Modal.tsx
import React, { useState } from 'react';
import { Button } from '../ui/button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  forms: React.ReactNode[];
  onNext: () => void;
  onPrevious: () => void;
  currentIndex: number;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, forms, onNext, onPrevious, currentIndex }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white dark:bg-gray-800 w-2/5 p-6 rounded shadow-lg relative">
      <div className="absolute top-0 w-full left-0 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold dark:text-white">{title}</h2>
          <Button onClick={onClose} className="text-red-500">X</Button>
        </div>
      </div>
      <div className="mt-16">
        {forms[currentIndex]}
      </div>
    </div>
  </div>
  );
};

export default Modal;
