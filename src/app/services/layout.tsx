import type { Metadata } from 'next'
import { siteUrl, siteName } from '@/lib/site'

export const metadata: Metadata = {
  title: `Turnkey Architecture & Interior Design Services | Home Storey`,
  description: 'End-to-end residential construction with material, 3D architectural elevation facade design, modular kitchens, and luxury home interior execution.',
  alternates: { canonical: `${siteUrl}/services` },
  openGraph: {
    title: `Our Services | Turnkey Construction & Interior Architecture`,
    description: 'Bespoke architectural facade design, turnkey construction, and luxury home interiors by Home Storey.',
    url: `${siteUrl}/services`,
    siteName,
  }
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
