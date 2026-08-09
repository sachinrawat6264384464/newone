import { getCustomPageBySlug, getCustomPages } from '@/lib/pages'
import { siteName, siteUrl } from '@/lib/site'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 60 // Revalidate every 60 seconds

type Props = {
  params: Promise<{ slug: string }>
}

const IGNORED_SLUGS = ['admin', 'contact', 'gallery', 'blog', 'robots.txt', 'sitemap.xml', 'favicon.ico']

const isIgnoredSlug = (slug: string) => {
  return IGNORED_SLUGS.includes(slug) || slug.includes('.')
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  
  if (isIgnoredSlug(slug)) {
    return {}
  }
  
  const page = await getCustomPageBySlug(slug)

  if (!page) {
    return {
      title: 'Not Found',
    }
  }

  const title = page.seoTitle || `${page.title} | ${siteName}`
  const description = page.seoDescription || `Discover more about ${page.title} at ${siteName}.`
  const url = `${siteUrl}/${page.slug}`

  return {
    title,
    description,
    keywords: page.seoKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: page.ogImage ? [page.ogImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: page.ogImage ? [page.ogImage] : undefined,
    },
  }
}

export async function generateStaticParams() {
  const pages = await getCustomPages(true)
  return pages
    .filter(page => !isIgnoredSlug(page.slug))
    .map((page) => ({
      slug: page.slug,
    }))
}

export default async function DynamicCustomPage({ params }: Props) {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  
  if (isIgnoredSlug(slug)) {
    notFound()
  }
  
  const page = await getCustomPageBySlug(slug)

  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-lux-cream">
      {/* Dynamic User Content */}
      <div 
        className="prose prose-lg md:prose-xl prose-stone max-w-none 
                   prose-headings:text-lux-charcoal prose-headings:font-bold
                   prose-a:text-lux-gold prose-a:no-underline hover:prose-a:underline
                   prose-img:rounded-xl prose-img:shadow-lg px-4 sm:px-6 lg:px-8 mx-auto"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  )
}
