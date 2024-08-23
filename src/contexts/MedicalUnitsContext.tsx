'use client'
import { MedicalUnitsExcluder } from '@/components/DataTable/MedicalUnits/MedicalUnitsExcluder'
import { MedicalUnitsRegister } from '@/components/DataTable/MedicalUnits/MedicalUnitsRegister'
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

type MedicalUnitiesTabs = 'units' | 'parameters' | 'sectors' | 'schedules'

type MedicalUnitsContextProps = {
  tab: MedicalUnitiesTabs
  setTab: (tab: MedicalUnitiesTabs) => void
  medicalUnits: number[]
  setMedicalUnits: Dispatch<SetStateAction<number[]>>
  isFormModalOpened: boolean
  setFormModalOpened: (isOpened: boolean) => void
  isDeleteModalConfirmOpened: boolean
  setDeleteModalCorfirmOpened: (isOpened: boolean) => void
}

const MedicalUnitsContext = createContext<MedicalUnitsContextProps>({
  tab: 'units',
} as MedicalUnitsContextProps)

export const MedicalUnitsContextProvider = ({
  tab: initialTab = 'units',
  children,
}: PropsWithChildren<{
  tab?: MedicalUnitiesTabs
}>) => {
  const [tab, setTab] = useState<MedicalUnitiesTabs>(initialTab)
  const [medicalUnits, setMedicalUnits] = useState<number[]>([])
  const [isFormModalOpened, setFormModalOpened] = useState(false)
  const [isDeleteModalConfirmOpened, setDeleteModalCorfirmOpened] =
    useState(false)

  return (
    <MedicalUnitsContext.Provider
      value={{
        tab,
        setTab,
        medicalUnits,
        setMedicalUnits,
        isFormModalOpened,
        setFormModalOpened,
        isDeleteModalConfirmOpened,
        setDeleteModalCorfirmOpened,
      }}
    >
      <Suspense fallback={<Loading />}>
        {isFormModalOpened && <MedicalUnitsRegister />}
      </Suspense>
      <Suspense fallback={<Loading />}>
        {isDeleteModalConfirmOpened && <MedicalUnitsExcluder />}
      </Suspense>
      {children}
    </MedicalUnitsContext.Provider>
  )
}

export const useMedicalUnitContext = () => {
  return useContext(MedicalUnitsContext)
}
