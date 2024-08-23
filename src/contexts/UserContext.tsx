'use client'

import { UsersExcluder } from '@/components/DataTable/Users/UsersExcluder'
import { UsersRegister } from '@/components/DataTable/Users/UsersRegister'
import Loading from '@/components/Loading/Loading'
import { UserDTO } from '@/dtos/userDTO'
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  Suspense,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import Cookies from 'js-cookie'
import { fetchUsers } from '@/services/User'

type UsersTabs = 'users' | 'profile' | 'log' | 'onlineUsers'

type UsersContextProps = {
  tab: UsersTabs
  setTab: (tab: UsersTabs) => void
  user: UserDTO | undefined
  setUser: Dispatch<SetStateAction<UserDTO | undefined>>
  usersData: UserDTO[]
  setUsersData: Dispatch<SetStateAction<UserDTO[]>>
  isFormModalOpened: boolean
  setFormModalOpened: (isOpened: boolean) => void
  setFormModalEdit: (isOpened: boolean) => void
  isDeleteModalConfirmOpened: boolean
  setDeleteModalConfirmOpened: (isOpened: boolean) => void
  token: string | undefined
  page: number | undefined
  itemsPerPage: number | undefined
  total: number | undefined
}

const UsersContext = createContext<UsersContextProps>({
  tab: 'users',
} as UsersContextProps)

export const UsersContextProvider = ({
  tab: initialTab = 'users',
  children,
}: PropsWithChildren<{
  tab?: UsersTabs
}>) => {
  const [tab, setTab] = useState<UsersTabs>(initialTab)
  const [user, setUser] = useState<UserDTO>()
  const [usersData, setUsersData] = useState<UserDTO[]>([])
  const [isFormModalOpened, setFormModalOpened] = useState(false)
  const [isFormModalEdit, setFormModalEdit] = useState(false)
  const [isDeleteModalConfirmOpened, setDeleteModalConfirmOpened] =
    useState(false)
  const [page, setPage] = useState<number>()
  const [itemsPerPage, setItemsPerPage] = useState<number>()
  const [total, setTotal] = useState<number>()
  const token = Cookies.get('access_token')

  useEffect(() => {
    async function loadUsers() {
      try {
        if (token) {
          const { users, page, itemsPerPage, total } = await fetchUsers(token)
          console.log(users)
          setUsersData(users)
          setPage(page)
          setItemsPerPage(itemsPerPage)
          setTotal(total)
        }
      } catch (err) {
        console.error(err)
      }
    }

    loadUsers()
  }, [token, user, isDeleteModalConfirmOpened])

  return (
    <UsersContext.Provider
      value={{
        tab,
        setTab,
        user,
        setUser,
        usersData,
        setUsersData,
        isFormModalOpened,
        setFormModalOpened,
        setFormModalEdit,
        isDeleteModalConfirmOpened,
        setDeleteModalConfirmOpened,
        token,
        page,
        itemsPerPage,
        total,
      }}
    >
      <Suspense fallback={<Loading />}>
        {(isFormModalOpened && <UsersRegister user={user} />) ||
          (isFormModalEdit && <UsersRegister user={user} />)}
      </Suspense>

      <Suspense fallback={<Loading />}>
        {isDeleteModalConfirmOpened && <UsersExcluder user={user} />}
      </Suspense>
      {children}
    </UsersContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UsersContext)
}
