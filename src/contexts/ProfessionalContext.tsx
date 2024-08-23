'use client'
import { ProfessionalExcluder } from '@/components/DataTable/Professionals/ProfessionalsExcluder'
import { ProfessionalsRegister } from '@/components/DataTable/Professionals/ProfessionalsRegister'
import Loading from '@/components/Loading/Loading'
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  Suspense,
  createContext,
  useContext,
  useState,
} from 'react'

type ProfessionalsTabs =
  | 'Cadastro'
  | 'Gerar Escala Mensal'
  | 'Lançar Ocorrência'
  | 'Relatórios Diversos'
  | 'Extrato de Plantões'
  | 'Visualizar Senha'

type ProfessionalsContextProps = {
  tab: ProfessionalsTabs
  setTab: (tab: ProfessionalsTabs) => void
  professionals: number[]
  setProfessionals: Dispatch<SetStateAction<number[]>>
  isFormModalOpened: boolean
  setFormModalOpened: (isOpened: boolean) => void
  isDeleteModalConfirmOpened: boolean
  setDeleteModalConfirmOpened: (isOpened: boolean) => void
}

const ProfessionalsContext = createContext<ProfessionalsContextProps>({
  tab: 'Cadastro',
} as ProfessionalsContextProps)

export const ProfessionalsContextProvider = ({
  tab: initialTab = 'Cadastro',
  children,
}: PropsWithChildren<{
  tab?: ProfessionalsTabs
}>) => {
  const [tab, setTab] = useState<ProfessionalsTabs>(initialTab)
  const [professionals, setProfessionals] = useState<number[]>([])
  const [isFormModalOpened, setFormModalOpened] = useState(false)
  const [isDeleteModalConfirmOpened, setDeleteModalConfirmOpened] =
    useState(false)

  return (
    <ProfessionalsContext.Provider
      value={{
        tab,
        setTab,
        professionals,
        setProfessionals,
        isFormModalOpened,
        setFormModalOpened,
        isDeleteModalConfirmOpened,
        setDeleteModalConfirmOpened,
      }}
    >
      <Suspense fallback={<Loading />}>
        {isFormModalOpened && <ProfessionalsRegister />}
      </Suspense>
      <Suspense fallback={<Loading />}>
        {isDeleteModalConfirmOpened && <ProfessionalExcluder />}
      </Suspense>
      {children}
    </ProfessionalsContext.Provider>
  )
}

export const useProfessionalContext = () => {
  return useContext(ProfessionalsContext)
}
