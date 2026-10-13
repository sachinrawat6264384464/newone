import type { Metadata } from 'next'
import { siteUrl, siteName } from '@/lib/site'

export const metadata: Metadata = {
  title: `Careers at Home Storey | Join Our Architecture & Interior Design Studio`,
  description: 'Explore career opportunities for 3D visualizers, interior designers, site supervisors, and project architects at Home Storey in Delhi NCR.',
  alternates: { canonical: `${siteUrl}/careers` },
  openGraph: {
    title: `Careers & Hiring | Home Storey Design Studio`,
    description: 'Join our team of creative interior designers and architectural experts.',
    url: `${siteUrl}/careers`,
    siteName,
  }
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
