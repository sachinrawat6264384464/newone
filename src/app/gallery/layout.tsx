import type { Metadata } from 'next'
import { siteUrl, siteName } from '@/lib/site'

export const metadata: Metadata = {
  title: `Design Portfolio & Gallery | Home Storey Luxury Interiors & Architecture`,
  description: 'Explore our portfolio of completed luxury villa facades, modern modular kitchens, serene bedroom suites, and turnkey construction projects in Delhi NCR.',
  alternates: { canonical: `${siteUrl}/gallery` },
  openGraph: {
    title: `Design Portfolio & Showcase | Home Storey`,
    description: 'Explore luxury home architectural facade renderings and bespoke interior designs by Home Storey.',
    url: `${siteUrl}/gallery`,
    siteName,
  }
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
