'use client'

import FormAddress from "@/components/formAddress/formAddress";
import FormProfessional from "@/components/formProfessional/formProfessional"
import Modal from "@/components/Modal/modalForm";
import { Button } from "@/components/ui/button"
import { useState } from "react";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const handleNext = () => {
    if (currentIndex < forms.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const forms = [
    <FormProfessional key="formProfessional" onNext={handleNext} onPrev={handlePrevious} />,
    <FormAddress key="formAddress" onNext={handleNext} onPrev={handlePrevious} />,
  ];

  return (
    <div className="bg-[#f6f6f6] dark:bg-bg-dark-theme  w-full m-0 p-0 dark:text-white">
      <Button onClick={openModal}>Cadastrar</Button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Cadastro"
        forms={forms}
        onNext={handleNext}
        onPrevious={handlePrevious}
        currentIndex={currentIndex}
      />
    </div>
  )
}
