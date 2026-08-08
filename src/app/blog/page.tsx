import { getBlogs } from '@/lib/blogs'
import { siteName, siteUrl } from '@/lib/site'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: `Blog | ${siteName}`,
  description: 'Read the latest articles on interior design, architecture, and luxury living.',
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function BlogPage() {
  const blogs = await getBlogs(true)

  return (
    <div className="min-h-screen pt-24 pb-16 bg-lux-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lux-heading mb-4">Our Journal</h1>
          <p className="text-lg text-lux-gray max-w-2xl mx-auto">
            Discover insights, inspiration, and the latest trends in luxury interior design.
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center text-lux-gray py-20">
            <p>No articles published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((blog) => (
              <Link href={`/blog/${blog.slug}`} key={blog.id} className="group cursor-pointer">
                <article className="glass-card h-full flex flex-col overflow-hidden hover:-translate-y-2 transition-transform duration-300">
                  {blog.coverImage && (
                    <div className="relative h-64 w-full overflow-hidden">
                      <img 
                        src={blog.coverImage} 
                        alt={blog.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-8 flex flex-col flex-grow">
                    <p className="text-lux-darkGold text-sm font-semibold mb-3">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    <h2 className="text-2xl font-bold text-lux-charcoal mb-4 group-hover:text-lux-gold transition-colors">
                      {blog.title}
                    </h2>
                    <p className="text-lux-gray mb-6 flex-grow line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <span className="text-lux-gold font-medium group-hover:underline mt-auto inline-block">
                      Read Article &rarr;
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
