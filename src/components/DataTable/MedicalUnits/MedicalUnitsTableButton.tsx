'use client'

import { ReactNode } from 'react'
import TableHeaderButton from '../TableHeaderButton'
import { useMedicalUnitContext } from '@/contexts/MedicalUnitsContext'

type MedicalUnitsTableButtonType = {
  children: ReactNode
}

export const MedicalUnitsTableButton = ({
  children,
}: MedicalUnitsTableButtonType) => {
  const { isFormModalOpened, setFormModalOpened } = useMedicalUnitContext()

  const handleClick = () => {
    setFormModalOpened(!isFormModalOpened)
  }

  return (
    <TableHeaderButton
      className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold font-sans"
      onClick={handleClick}
    >
      {children}
    </TableHeaderButton>
  )
}
