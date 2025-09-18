// app/layout.tsx
import './globals.css'
import { AuthProvider } from '../lib/auth'
import { Toaster } from 'react-hot-toast'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Home Storey - Transform Your Space',
  description: 'Expert design and construction services for beautiful homes and commercial spaces',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  )
}