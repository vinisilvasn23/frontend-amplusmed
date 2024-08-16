'use client'

import AddressForm from "@/components/addressForm/addressForm"
import BankForm from "@/components/bankForm/bankForm"
import ProfessionalForm from "@/components/professionalForm/professionalFrom"
import { Button } from "@/components/ui/button"

export default function Dashboard() {

  return (
    <div className="bg-[#f6f6f6] dark:bg-bg-dark-theme gap-4 flex flex-col  m-8 p-8 dark:text-white">
      <div className="w-full"><Button>Salvar</Button></div>
      <div className="flex gap-16">
      <ProfessionalForm/>
      <AddressForm/>
      <BankForm/>
      </div>
    </div>
  )
}
