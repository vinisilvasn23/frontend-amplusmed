'use client'

import { useProfessionalContext } from '@/contexts/ProfessionalContext'
import TableHeaderNavigation from '../TableHeaderNavigation'
import TableHeaderItemNavigation from '../TableHeaderItemNavigation'

export const ProfessionalsTableNavBar = () => {
  const { tab, setTab } = useProfessionalContext()

  return (
    <TableHeaderNavigation>
      <TableHeaderItemNavigation
        message="Cadastro"
        onClick={() => setTab('Cadastro')}
        isSelected={tab === 'Cadastro'}
      />
      <TableHeaderItemNavigation
        message="Gerar Escala Mensal"
        onClick={() => setTab('Gerar Escala Mensal')}
        isSelected={tab === 'Gerar Escala Mensal'}
      />{' '}
      <TableHeaderItemNavigation
        message="Lançar Ocorrência"
        onClick={() => setTab('Lançar Ocorrência')}
        isSelected={tab === 'Lançar Ocorrência'}
      />{' '}
      <TableHeaderItemNavigation
        message="Relatórios Diversos"
        onClick={() => setTab('Relatórios Diversos')}
        isSelected={tab === 'Relatórios Diversos'}
      />{' '}
      <TableHeaderItemNavigation
        message="Extrato de Plantões"
        onClick={() => setTab('Extrato de Plantões')}
        isSelected={tab === 'Extrato de Plantões'}
      />{' '}
      <TableHeaderItemNavigation
        message="Visualizar Senha"
        onClick={() => setTab('Visualizar Senha')}
        isSelected={tab === 'Visualizar Senha'}
      />
    </TableHeaderNavigation>
  )
}
