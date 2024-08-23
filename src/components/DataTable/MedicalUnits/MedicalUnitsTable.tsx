import MedicalUnitsDataTable from './MedicalUnitsDataTable'
import { cookies } from 'next/headers'

type MedicalUnitsTableProps = {
  page: number
  perPage: number
  code: string
  name: string
  fantasyName: string
}

export async function MedicalUnitsTable({
  page,
  perPage,
  code,
  name,
  fantasyName,
}: MedicalUnitsTableProps) {
  const medicalUnitsRequest = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/medicalUnits?page=${page}&perPage=${perPage}&code=${code}&name=${name}&fantasyName=${fantasyName}`,
    {
      headers: { cookie: cookies().toString() },
    },
  )

  const medicalUnits = await medicalUnitsRequest.json()

  return (
    <MedicalUnitsDataTable
      medicalUnits={medicalUnits.resource}
      total={medicalUnits.total}
    />
  )
}
