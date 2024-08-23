import { api } from '@/api/api'
import { UserResponseDTO } from '@/dtos/userDTO'
import Cookies from 'js-cookie'

/* eslint-disable no-useless-catch */
export async function fetchUsers(
  token: string | undefined,
): Promise<UserResponseDTO> {
  try {
    const response = await api.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getUserById(id: number, token: string | undefined) {
  try {
    const response = await api.get(`/users/findOne/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function createUserData(data: {
  [k: string]: FormDataEntryValue
}) {
  const token = Cookies.get('access_token')
  try {
    const convertedData = {
      ...data,
      type: data.type
        ? Number(data.type.toString().replace(/\D/g, ''))
        : undefined,
    }
    const response = await api.post('/users', convertedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function editUserData(
  userId: number,
  data: { [k: string]: FormDataEntryValue },
) {
  const token = Cookies.get('access_token')
  try {
    const convertedData = {
      ...data,
      type: data.type
        ? Number(data.type.toString().replace(/\D/g, ''))
        : undefined,
    }
    const response = await api.put(`/users/${userId}`, convertedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function deleteUserData(userId: number | undefined) {
  try {
    const token = Cookies.get('access_token')
    const response = await api.patch(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}
