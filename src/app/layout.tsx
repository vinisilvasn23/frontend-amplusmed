import { AuthProvider } from '@/contexts/AuthContext'
import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import { Providers } from './providers'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'AmplusMed',
  description: 'Create by JL Seguro System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" suppressContentEditableWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialised',
          fontSans.variable,
        )}
      >
        <AuthProvider>
          <Providers>
            <div className="min-h-screen">{children}</div>
            <Toaster />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  )
}
