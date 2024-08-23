// import { UsersTable } from '@/components/DataTable/Users/UsersTable'
import { UserNavBar } from '@/components/DataTable/Users/UsersTableNavBar'
import TableTitle from '@/components/DataTable/TableTitle'
import { Suspense } from 'react'
import Loading from '../loading'
import { UsersTableButton } from '@/components/DataTable/Users/UsersTableButton'
import { UsersTable } from '@/components/DataTable/Users/UsersTable'

export default async function Users({
  searchParams,
}: {
  searchParams?: {
    page?: string
    per_page?: string
    name?: string
    email?: string
    login?: string
  }
}) {
  const currentPage = Number(searchParams?.page) || 1
  // const perPage = Number(searchParams?.per_page) || 5
  // const name = searchParams?.name || ''
  // const email = searchParams?.email || ''
  // const login = searchParams?.login || ''

  return (
    <div className="h-full">
      <section className="bg-[#f6f6f6] dark:bg-bg-dark-theme flex h-full">
        <div className="rounded flex flex-col w-full h-full min-w-0">
          <div className="cabecalho border-2 border-additional-gray-600">
            <div className="mt-5 px-5 h-14 flex-col justify-between">
              <div className="flex justify-between h-10">
                <TableTitle message="Usuários" />
                <div className="flex gap-4">
                  <UsersTableButton>Registrar Usuário</UsersTableButton>
                </div>
              </div>
            </div>
            <div className="navigation overflow-auto">
              <UserNavBar />
            </div>
          </div>
          <Suspense key={currentPage} fallback={<Loading />}>
            <UsersTable />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
