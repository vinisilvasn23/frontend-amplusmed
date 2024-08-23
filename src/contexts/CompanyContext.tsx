'use client'
import { CompanyExcluder } from '@/components/DataTable/Companies/CompaniesExcluder'
import { CompaniesRegister } from '@/components/DataTable/Companies/CompaniesRegister'
import Loading from '@/components/Loading/Loading'
import { CompanyDTO } from '@/dtos/companyDTO'
import { fetchCompanies } from '@/services/Company'
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
import { useUserContext } from './UserContext'

type CompaniesTabs = 'companies'

type CompaniesContextProps = {
  tab: CompaniesTabs
  setTab: (tab: CompaniesTabs) => void
  company: CompanyDTO | undefined
  setCompany: Dispatch<SetStateAction<CompanyDTO | undefined>>
  isFormModalOpened: boolean
  setFormModalOpened: (isOpened: boolean) => void
  isDeleteModalConfirmOpened: boolean
  setDeleteModalConfirmOpened: (isOpened: boolean) => void
  companiesData: CompanyDTO[]
  setCompaniesData: Dispatch<SetStateAction<CompanyDTO[]>>
  setFormModalEdit: (isOpened: boolean) => void
  isFormModalEdit: boolean
  page: number | undefined
  itemsPerPage: number | undefined
  total: number | undefined
}

const CompaniesContext = createContext<CompaniesContextProps>({
  tab: 'companies',
} as CompaniesContextProps)

export const CompaniesContextProvider = ({
  tab: initialTab = 'companies',
  children,
}: PropsWithChildren<{
  tab?: CompaniesTabs
}>) => {
  const [tab, setTab] = useState<CompaniesTabs>(initialTab)
  const [company, setCompany] = useState<CompanyDTO>()
  const [companiesData, setCompaniesData] = useState<CompanyDTO[]>([])
  const [isFormModalOpened, setFormModalOpened] = useState(false)
  const [isFormModalEdit, setFormModalEdit] = useState(false)
  const [isDeleteModalConfirmOpened, setDeleteModalConfirmOpened] =
    useState(false)
  const [page, setPage] = useState<number>()
  const [itemsPerPage, setItemsPerPage] = useState<number>()
  const [total, setTotal] = useState<number>()
  const { token } = useUserContext()

  useEffect(() => {
    async function loadCompanies() {
      try {
        if (token) {
          const { company, page, itemsPerPage, total } =
            await fetchCompanies(token)
          setCompaniesData(company)
          setPage(page)
          setItemsPerPage(itemsPerPage)
          setTotal(total)
        }
      } catch (err) {
        console.error(err)
      }
    }

    loadCompanies()
  }, [token, company, isDeleteModalConfirmOpened])

  return (
    <CompaniesContext.Provider
      value={{
        tab,
        setTab,
        company,
        setCompany,
        companiesData,
        setCompaniesData,
        isFormModalOpened,
        setFormModalOpened,
        isDeleteModalConfirmOpened,
        setDeleteModalConfirmOpened,
        setFormModalEdit,
        isFormModalEdit,
        page,
        itemsPerPage,
        total,
      }}
    >
      <Suspense fallback={<Loading />}>
        {(isFormModalOpened && <CompaniesRegister company={company} />) ||
          (isFormModalEdit && <CompaniesRegister company={company} />)}
      </Suspense>

      {children}
    </CompaniesContext.Provider>
  )
}

export const useCompanyContext = () => {
  return useContext(CompaniesContext)
}
