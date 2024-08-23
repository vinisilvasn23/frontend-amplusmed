// import { MedicalUnitsTable } from '@/components/DataTable/MedicalUnits/MedicalUnitsTable'
import { MedicalUnitTableNavBar } from '@/components/DataTable/MedicalUnits/MedicalUnitTableNavBar'
import TableTitle from '@/components/DataTable/TableTitle'
import { Suspense } from 'react'
import Loading from '../loading'
import { MedicalUnitsTableButton } from '@/components/DataTable/MedicalUnits/MedicalUnitsTableButton'

export default async function MedicalUnits({
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
                <TableTitle message="Unidades Médicas" />
                <div className="flex gap-4">
                  <MedicalUnitsTableButton>
                    Criar unidade
                  </MedicalUnitsTableButton>
                </div>
              </div>
            </div>
            <div className="navigation overflow-auto">
              <MedicalUnitTableNavBar />
            </div>
          </div>
          <Suspense key={currentPage} fallback={<Loading />}>
            {/* <MedicalUnitsTable
              page={currentPage}
              perPage={perPage}
              code={code}
              name={name}
              fantasyName={fantasyName}
            /> */}
          </Suspense>
        </div>
      </section>
    </div>
  )
}
