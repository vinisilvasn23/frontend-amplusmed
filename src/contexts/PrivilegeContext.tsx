'use client'
import { PrivilegeDTO } from '@/dtos/privilegeDTO'
import { fetchPrivilege, vinculatePrivilege } from '@/services/Privileges'

import { ReactNode, createContext, useState } from 'react'

type Props = {
  children: ReactNode
}

type PrivilegeContext = {
  privilegesUser: PrivilegeDTO[]
  privileges: any[]
  checkSelected: number[]
  usersSelected: number[]
  handleGetPrivileges: () => Promise<void>
  handleCreatePrivilege: (
    userId: number | null,
    roleId: number | null,
    privilegesIds: number[],
  ) => Promise<void>
  updateCheckSelected: (ids: number[]) => void
  updateUsersSelected: (ids: number[]) => void
  updatePrivilegesUser: (privileges: PrivilegeDTO[]) => void
}

export const PrivilegeContext = createContext({} as PrivilegeContext)

export function PrivilegeProvider({ children }: Props) {
  const [privilegesUser, setPrivilegesUser] = useState<PrivilegeDTO[]>(
    [] as PrivilegeDTO[],
  )
  const [checkSelected, setCheckSelected] = useState<number[]>([])
  const [usersSelected, setUsersSelected] = useState<number[]>([])
  const [privileges, setPrivileges] = useState<any[]>([])

  const updateCheckSelected = (ids: number[]) => {
    setCheckSelected(ids)
  }

  const updateUsersSelected = (ids: number[]) => {
    setUsersSelected(ids)
  }

  const updatePrivilegesUser = (privileges: PrivilegeDTO[]) => {
    setPrivilegesUser(privileges)
  }
  async function handleGetPrivileges() {
    try {
      const response = await fetchPrivilege()
      setPrivileges(response.data.resource)
    } catch (error) {
      throw error
    }
  }

  async function handleCreatePrivilege(
    userId: number | null,
    roleId: number | null,
    privilegesIds: number[],
  ) {
    try {
      const response = await vinculatePrivilege({
        userId,
        privilegesIds,
        roleId,
      })
      setPrivileges((oldValues) => [response, ...oldValues])
    } catch (error) {
      throw error
    }
  }

  return (
    <PrivilegeContext.Provider
      value={{
        privileges,
        checkSelected,
        usersSelected,
        privilegesUser,
        updatePrivilegesUser,
        updateUsersSelected,
        handleGetPrivileges,
        handleCreatePrivilege,
        updateCheckSelected,
      }}
    >
      {children}
    </PrivilegeContext.Provider>
  )
}
