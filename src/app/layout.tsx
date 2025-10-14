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
      <head>
        <link rel="icon" href="/logo1img.png" type="image/png" sizes="32x32" />

        {/* ✅ Pinterest verification meta tag */}
        <meta
          name="p:domain_verify"
          content="1a1790fb7ce1e5bb3f196d4367d7142a"
        />
      </head>

      <body>
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  )
}
