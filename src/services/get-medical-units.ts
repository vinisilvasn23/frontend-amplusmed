import { api } from '@/api/api'

export const getMedicalUnits = async (page: number = 1, limit: number = 5) => {
  const medicalUnitsRequest = await api.get(
    `/medicalUnits?page=${page}&perPage=${limit}`,
    { withCredentials: true },
  )
  const medicalUnitsResponse = await medicalUnitsRequest.data

  return medicalUnitsResponse
}
