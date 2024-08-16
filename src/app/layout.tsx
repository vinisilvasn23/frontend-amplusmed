import './globals.css'
import type { Metadata } from 'next'
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
            <div className="min-h-screen">{children}</div>
          </body>
    </html>
  )
}
