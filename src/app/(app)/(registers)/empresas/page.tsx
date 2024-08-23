// import { CompaniesTable } from '@/components/DataTable/Companies/CompaniesTable'
import { CompanyTableNavBar } from '@/components/DataTable/Companies/CompaniesTableNavBar'
import TableTitle from '@/components/DataTable/TableTitle'
import { Suspense } from 'react'
import Loading from '../loading'
import { CompaniesTableButton } from '@/components/DataTable/Companies/CompaniesTableButton'
import { CompaniesTable } from '@/components/DataTable/Companies/CompaniesTable'
import { useUserContext } from '@/contexts/UserContext'
import { useCompanyContext } from '@/contexts/CompanyContext'
import { CompaniesRegister } from '@/components/DataTable/Companies/CompaniesRegister'

export default async function Companies({
  searchParams,
}: {
  searchParams?: {
    page?: string
    per_page?: string
    code?: string
    name?: string
    fantasy_name?: string
  }
}) {
  const currentPage = Number(searchParams?.page) || 1
  // const perPage = Number(searchParams?.per_page) || 5
  // const code = searchParams?.code || ''
  // const name = searchParams?.name || ''
  // const fantasyName = searchParams?.fantasy_name || ''

  return (
    <div className="h-full">
      <section className="bg-[#f6f6f6] dark:bg-bg-dark-theme flex h-full">
        <div className="rounded flex flex-col w-full h-full min-w-0">
          <div className="cabecalho border-2 border-aditional-gray-600">
            <div className="mt-5 px-5 h-14 flex-col justify-between">
              <div className="flex justify-between h-10">
                <TableTitle message="Empresas" />
                <div className="flex gap-4">
                  <CompaniesTableButton>Registrar Empresa</CompaniesTableButton>
                </div>
              </div>
            </div>
            <div className="navigation overflow-auto">
              <CompanyTableNavBar />
            </div>
          </div>
          <Suspense key={currentPage} fallback={<Loading />}>
            <CompaniesTable />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
