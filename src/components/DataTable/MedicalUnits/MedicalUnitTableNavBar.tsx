'use client'

import { useMedicalUnitContext } from '@/contexts/MedicalUnitsContext'
import TableHeaderNavigation from '../TableHeaderNavigation'
import TableHeaderItemNavigation from '../TableHeaderItemNavigation'

export const MedicalUnitTableNavBar = () => {
  const { tab, setTab } = useMedicalUnitContext()

  return (
    <TableHeaderNavigation>
      <TableHeaderItemNavigation
        message="Unidades"
        onClick={() => setTab('units')}
        isSelected={tab === 'units'}
      />
      <TableHeaderItemNavigation
        message="Parâmetros Impressão"
        onClick={() => setTab('parameters')}
        isSelected={tab === 'parameters'}
      />
      <TableHeaderItemNavigation
        message="Setores"
        onClick={() => setTab('sectors')}
        isSelected={tab === 'sectors'}
      />
      <TableHeaderItemNavigation
        message="Horários"
        onClick={() => setTab('schedules')}
        isSelected={tab === 'schedules'}
      />
    </TableHeaderNavigation>
  )
}
