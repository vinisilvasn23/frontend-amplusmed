'use client'

import { useUserContext } from '@/contexts/UserContext'
import TableHeaderNavigation from '../TableHeaderNavigation'
import TableHeaderItemNavigation from '../TableHeaderItemNavigation'

export const UserNavBar = () => {
  const { tab, setTab } = useUserContext()

  return (
    <TableHeaderNavigation>
      <TableHeaderItemNavigation
        message="Usuários"
        onClick={() => setTab('users')}
        isSelected={tab === 'users'}
      />{' '}
      <TableHeaderItemNavigation
        message="Perfil"
        onClick={() => setTab('profile')}
        isSelected={tab === 'profile'}
      />{' '}
      <TableHeaderItemNavigation
        message="Log"
        onClick={() => setTab('log')}
        isSelected={tab === 'log'}
      />{' '}
      <TableHeaderItemNavigation
        message="Usuários Online"
        onClick={() => setTab('onlineUsers')}
        isSelected={tab === 'onlineUsers'}
      />
    </TableHeaderNavigation>
  )
}
