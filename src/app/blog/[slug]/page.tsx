import { getBlogBySlug, getBlogs } from '@/lib/blogs'
import { siteName, siteUrl } from '@/lib/site'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 60

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    return {
      title: 'Not Found',
    }
  }

  const title = blog.seoTitle || `${blog.title} | ${siteName}`
  const description = blog.seoDescription || blog.excerpt
  const url = `${siteUrl}/blog/${blog.slug}`

  return {
    title,
    description,
    keywords: blog.seoKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: new Date(blog.createdAt).toISOString(),
      authors: [blog.author],
      images: blog.coverImage ? [blog.coverImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: blog.coverImage ? [blog.coverImage] : undefined,
    },
  }
}

export async function generateStaticParams() {
  const blogs = await getBlogs(true)
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params
  const blog = await getBlogBySlug(resolvedParams.slug)

  if (!blog) {
    notFound()
  }

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    image: blog.coverImage ? [blog.coverImage] : [],
    datePublished: new Date(blog.createdAt).toISOString(),
    dateModified: new Date(blog.updatedAt).toISOString(),
    author: [{
      '@type': 'Person',
      name: blog.author,
    }],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      
      <article className="min-h-screen pt-24 pb-16 bg-lux-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-12 text-center">
            <p className="text-lux-darkGold font-semibold tracking-wider uppercase text-sm mb-4">
              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-lux-charcoal mb-6 leading-tight">
              {blog.title}
            </h1>
            <p className="text-xl text-lux-gray max-w-2xl mx-auto">
              {blog.excerpt}
            </p>
          </header>

          {blog.coverImage && (
            <div className="w-full h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden mb-16 shadow-2xl">
              <img 
                src={blog.coverImage} 
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div 
            className="prose prose-lg md:prose-xl prose-stone max-w-none 
                       prose-headings:text-lux-charcoal prose-headings:font-bold
                       prose-a:text-lux-gold prose-a:no-underline hover:prose-a:underline
                       prose-img:rounded-xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </article>
    </>
  )
}
