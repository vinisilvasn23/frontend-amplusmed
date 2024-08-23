/* eslint-disable no-useless-catch */
import { api } from '@/api/api'

interface PrivilegeProps {
  userId: number | null
  roleId: number | null
  privilegesIds: number[]
}

export async function fetchPrivilege() {
  console.log('fez a req')
  try {
    const response = await api.get('/privilege/', {
      withCredentials: true,
    })
    return response
  } catch (error) {
    throw error
  }
}

export async function vinculatePrivilege(data: PrivilegeProps) {
  console.log('fez a req')
  try {
    const response = await api.put('/privilege/', data, {
      withCredentials: true,
    })
    return response
  } catch (error) {
    throw error
  }
}
