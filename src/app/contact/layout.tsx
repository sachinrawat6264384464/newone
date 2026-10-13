import type { Metadata } from 'next'
import { siteUrl, siteName } from '@/lib/site'

export const metadata: Metadata = {
  title: `Contact Home Storey | Book Interior & Architectural Consultation in Delhi NCR`,
  description: 'Get in touch with Home Storey & Nidhi Mittal for luxury interior design, turnkey construction, and 3D architectural facade design in Delhi NCR and Noida.',
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: `Contact Home Storey | Interior & Architectural Consultation`,
    description: 'Book a complimentary 3D design discussion for turnkey construction and luxury home interiors in Delhi NCR.',
    url: `${siteUrl}/contact`,
    siteName,
  }
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
