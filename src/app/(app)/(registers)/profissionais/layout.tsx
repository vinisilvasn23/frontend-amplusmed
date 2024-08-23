'use client'
import { ProfessionalsContextProvider } from '@/contexts/ProfessionalContext'
import { UsersContextProvider } from '@/contexts/UserContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UsersContextProvider>
      <ProfessionalsContextProvider>{children}</ProfessionalsContextProvider>
    </UsersContextProvider>
  )
}
