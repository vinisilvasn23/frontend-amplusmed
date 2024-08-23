import ProfessionalsDataTable from './ProfessionalsDataTable'
import { cookies } from 'next/headers'

type ProfessionalsTableProps = {
  name: string
  page: number
  perPage: number
  code: string
  situation: string
  seniority: string
  fullName: string
  bondType: string
  speciality: string
  cellphoneNumber: string
  admissionDate: string
  validated: string
  fantasyName: string
}

export async function ProfessionalsTable({
  name,
  page,
  perPage,
  code,
  situation,
  seniority,
  fullName,
  bondType,
  speciality,
  cellphoneNumber,
  admissionDate,
  validated,
  fantasyName,
}: ProfessionalsTableProps) {
  const professionalsRequest = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/professionals?page=${page}&perPage=${perPage}&code=${code}&name=${name}&fullName=${fullName}&situation=${situation}&seniority=${seniority}&bondType=${bondType}&speciality=${speciality}&cellphoneNumber=${cellphoneNumber}&admissionDate=${admissionDate}&validated=${validated}&fantasyName=${fantasyName}`,
    {
      headers: { cookie: cookies().toString() },
    },
  )

  const professionals = await professionalsRequest.json()

  return (
    <ProfessionalsDataTable
      professionals={professionals.resource}
      total={professionals.total}
    />
  )
}
