/* eslint-disable no-useless-catch */
import { api } from '@/api/api'

type SignInRequestDta = {
  email: string
  password: string
}

export async function signInRequest(data: SignInRequestDta) {
  try {
    const response = await api.post('/auth/login', data)
    const token = response.data.access_token

    api.defaults.headers.common.authorization = `Bearer ${token}`

    return {
      token,
    }
  } catch (error) {
    throw error
  }
}

export async function recoverUserInformation(id: string) {
  try {
    const response = await api.get(`/user/${id}`)
    const user = response.data.resource

    return {
      user,
    }
  } catch (error) {
    throw error
  }
}
