// components/Layout.tsx
import { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import MobileNav from './MobileNav'
import WhatsAppButton from './WhatsAppButton'
import RightContactCard from './RightContactCard'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      <main className="pb-16 lg:pb-0">
        {children}
        <WhatsAppButton />
      </main>
      <Footer />
      <RightContactCard />
      <MobileNav />
    </div>
  )
}