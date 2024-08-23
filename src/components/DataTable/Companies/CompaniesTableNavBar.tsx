'use client'

import { useCompanyContext } from '@/contexts/CompanyContext'
import TableHeaderNavigation from '../TableHeaderNavigation'
import TableHeaderItemNavigation from '../TableHeaderItemNavigation'

export const CompanyTableNavBar = () => {
  const { tab, setTab } = useCompanyContext()

  return (
    <TableHeaderNavigation>
      <TableHeaderItemNavigation
        message="Empresas"
        onClick={() => setTab('companies')}
        isSelected={tab === 'companies'}
      />
    </TableHeaderNavigation>
  )
}
