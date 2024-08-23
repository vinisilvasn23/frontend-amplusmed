'use client'
import { PrivilegeProvider } from '@/contexts/PrivilegeContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PrivilegeProvider>{children}</PrivilegeProvider>
}
