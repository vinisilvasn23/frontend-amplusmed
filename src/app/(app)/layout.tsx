import Sidebar from '@/components/Sidebar/Sidebar'
import { PrivilegeProvider } from '@/contexts/PrivilegeContext'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <PrivilegeProvider>
      <div className="flex h-screen">
        <Sidebar />
        <div className="px-6 py-20 flex-1 overflow-hidden">{children}</div>
      </div>
    </PrivilegeProvider>
  )
}

export default Layout
