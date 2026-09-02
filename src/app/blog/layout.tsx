import type { Metadata } from 'next'
import { siteUrl, siteName } from '@/lib/site'

export const metadata: Metadata = {
  title: `Interior Design & Architecture Blog | Home Storey Insights`,
  description: 'Read expert design guides, 3D elevation trends, home renovation advice, and interior decoration tips by Nidhi Mittal & Home Storey.',
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    title: `Home Storey Design Blog & Insights`,
    description: 'Expert interior design tips, architectural trends, and turnkey construction insights.',
    url: `${siteUrl}/blog`,
    siteName,
  }
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
