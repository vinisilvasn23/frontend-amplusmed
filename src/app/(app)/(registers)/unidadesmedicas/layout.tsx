import { UsersContextProvider } from '@/contexts/UserContext'
import { MedicalUnitsContextProvider } from '@/contexts/MedicalUnitsContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UsersContextProvider>
      <MedicalUnitsContextProvider>{children}</MedicalUnitsContextProvider>
    </UsersContextProvider>
  )
}
