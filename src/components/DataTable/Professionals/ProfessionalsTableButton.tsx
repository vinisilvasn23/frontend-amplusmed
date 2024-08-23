'use client'

import { ReactNode } from 'react'
import TableHeaderButton from '../TableHeaderButton'
import { useProfessionalContext } from '@/contexts/ProfessionalContext'

type ProfessionalsTableButtonType = {
  children: ReactNode
}

export const ProfessionalsTableButton = ({
  children,
}: ProfessionalsTableButtonType) => {
  const { isFormModalOpened, setFormModalOpened } = useProfessionalContext()

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
