'use client'

import { ReactNode } from 'react'
import TableHeaderButton from '../TableHeaderButton'
import { useUserContext } from '@/contexts/UserContext'

type UsersTableButtonType = {
  children: ReactNode
}

export const UsersTableButton = ({ children }: UsersTableButtonType) => {
  const { isFormModalOpened, setFormModalOpened } = useUserContext()

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
