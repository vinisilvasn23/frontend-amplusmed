import { api } from '@/api/api'
import { CompanyResponseDTO } from '@/dtos/companyDTO'
import Cookies from 'js-cookie'

/* eslint-disable no-useless-catch */
export async function fetchCompanies(
  token: string | undefined,
): Promise<CompanyResponseDTO> {
  try {
    const response = await api.get('/company', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getCompany(id: number, token: string | undefined) {
  try {
    const response = await api.get(`/company/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function createCompanyData(data: {
  [k: string]: FormDataEntryValue
}) {
  try {
    const token = Cookies.get('access_token')
    const convertedData = {
      ...data,
      cnes: data.cnes ? Number(data.cnes.toString()) : undefined,
      phone: data.phone
        ? Number(data.phone.toString().replace(/\D/g, ''))
        : undefined,
      id_user: data.id_user ? Number(data.id_user.toString()) : undefined,
      cnpj: data.cnpj ? data.cnpj.toString() : undefined,
    }
    console.log(convertedData)
    const response = await api.post('/company', convertedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function editCompanyData(
  id: number,
  data: { [k: string]: FormDataEntryValue },
) {
  try {
    const token = Cookies.get('access_token')
    const convertedData = {
      ...data,
      status: data.status === 'true',
      cnes: data.cnes
        ? Number(data.cnes.toString().replace(/\D/g, ''))
        : undefined,
      phone: data.phone
        ? Number(data.phone.toString().replace(/\D/g, ''))
        : undefined,
      cnpj: data.cnpj ? data.cnpj.toString().replace(/\D/g, '') : undefined,
      id_user: 63,
    }
    const response = await api.put(`/company/${id}`, convertedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function deleteCompanyData(id: number | undefined) {
  try {
    const token = Cookies.get('access_token')
    const response = await api.patch(`/company/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}
