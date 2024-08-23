'use client'

import { ReactNode } from 'react'
import TableHeaderButton from '../TableHeaderButton'
import { useCompanyContext } from '@/contexts/CompanyContext'

type CompaniesTableButtonType = {
  children: ReactNode
}

export const CompaniesTableButton = ({
  children,
}: CompaniesTableButtonType) => {
  const { isFormModalOpened, setFormModalOpened } = useCompanyContext()

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
