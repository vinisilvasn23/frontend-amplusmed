// import { ProfessionalsTable } from '@/components/DataTable/Professionals/ProfessionalsTable'
import { ProfessionalsTableNavBar } from '@/components/DataTable/Professionals/ProfessionalsTableNavBar'
import TableTitle from '@/components/DataTable/TableTitle'
import { Suspense } from 'react'
import Loading from '../loading'
import { ProfessionalsTableButton } from '@/components/DataTable/Professionals/ProfessionalsTableButton'

export default async function Professionals({
  searchParams,
}: {
  searchParams?: {
    page?: string
    per_page?: string
    code?: string
    name?: string
    situation?: string
    seniority?: string
    fullName?: string
    bondType?: string
    speciality?: string
    cellphoneNumber?: string
    admissionDate?: string
    validated?: string
    fantasy_name?: string
  }
}) {
  const currentPage = Number(searchParams?.page) || 1
  // const perPage = Number(searchParams?.per_page) || 5
  // const code = searchParams?.code || ''
  // const name = searchParams?.name || ''
  // const situation = searchParams?.situation || ''
  // const seniority = searchParams?.seniority || ''
  // const fullName = searchParams?.fullName || ''
  // const bondType = searchParams?.bondType || ''
  // const speciality = searchParams?.speciality || ''
  // const cellphoneNumber = searchParams?.cellphoneNumber || ''
  // const admissionDate = searchParams?.admissionDate || ''
  // const validated = searchParams?.validated || ''
  // const fantasyName = searchParams?.fantasy_name || ''

  return (
    <div className="h-full">
      <section className="bg-[#f6f6f6] dark:bg-bg-dark-theme flex h-full">
        <div className="rounded flex flex-col w-full h-full min-w-0">
          <div className="cabecalho border-2 border-additional-gray-600">
            <div className="mt-5 px-5 h-14 flex-col justify-between">
              <div className="flex justify-between h-10">
                <TableTitle message="Profissionais" />
                <div className="flex gap-4">
                  <ProfessionalsTableButton>
                    Registrar Profissional
                  </ProfessionalsTableButton>
                </div>
              </div>
            </div>
            <div className="navigation overflow-auto">
              <ProfessionalsTableNavBar />
            </div>
          </div>
          <Suspense key={currentPage} fallback={<Loading />}>
            {/* <ProfessionalsTable
              page={currentPage}
              perPage={perPage}
              code={code}
              name={name}
              situation={situation}
              seniority={seniority}
              fullName={fullName}
              bondType={bondType}
              speciality={speciality}
              cellphoneNumber={cellphoneNumber}
              admissionDate={admissionDate}
              validated={validated}
              fantasyName={fantasyName}
            /> */}
          </Suspense>
        </div>
      </section>
    </div>
  )
}
