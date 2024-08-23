'use client'

// import { api } from '@/api/api'
import { useToast } from '@/components/ui/use-toast'
import ErrorApp from '@/erros/error'
import { signInRequest } from '@/services/Auth'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import { ReactNode, createContext, useState } from 'react'

type Props = {
  children: ReactNode
}

type SignInData = {
  email: string
  password: string
}

type IUser = {
  id: number
  type: number
  name: string
  email: string
  iat: number
  exp: number
  access_token: string
}

type AuthContextType = {
  isAuthenticated: boolean
  user: IUser | null
  signIn: (data: SignInData) => Promise<void>
  signOut: () => Promise<void>
  // isAuthToken: () => Promise<void>
  loading: boolean
  tokenUser: string | null
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<IUser | null>(null)
  const isAuthenticated = !!user
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [tokenUser, setToken] = useState(null)
  const { toast } = useToast()

  // async function isAuthToken() {
  //   try {
  //     const token = Cookies.get('access_token')
  //     if (token && window.location.pathname === '/') {
  //       router.push('/dashboard')
  //     }
  //   } catch (error) {
  //     throw error
  //   }
  // }

  // useEffect(() => {
  //   isAuthToken()
  // }, [])

  // async function getUsers() {
  //   try {
  //     const response = await api.get('/user', {
  //       withCredentials: true,
  //     })
  //     console.log(response.data)
  //     console.log('response', response)
  //   } catch (error) {
  //     throw error
  //   }
  // }

  async function signIn(dataForm: SignInData) {
    setLoading(true)
    try {
      const data = {
        email: dataForm.email.trim(),
        password: dataForm.password,
      }
      const { token } = await signInRequest(data)
      setToken(token)
      setUser(jwtDecode(token))
      Cookies.set('access_token', token, {
        expires: 30,
        path: '/',
      })
    } catch (error) {
      const isAppError = error instanceof ErrorApp
      const title = isAppError
        ? error.message
        : 'Não foi possível realizar o login, tente novamente mais tarde.'
      toast({
        title,
        description: 'Por favor, tente novamente.',
        duration: 4000,
      })
      throw error
    } finally {
      setLoading(false)
      router.push('/dashboard')
    }
  }

  async function signOut() {
    Cookies.remove('access_token')
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        signOut,
        // isAuthToken,
        tokenUser,
        loading,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
      </LocalizationProvider>
    </AuthContext.Provider>
  )
}
