'use client'

import { useEffect, useState, use } from 'react'
import BlogEditor from '@/components/BlogEditor'
import { getBlogBySlug } from '@/lib/blogs'
import { BlogPost } from '@/types/blog'
import toast from 'react-hot-toast'

type Props = {
  params: Promise<{ slug: string }>
}

export default function EditBlogPage({ params }: Props) {
  const resolvedParams = use(params)
  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadBlog() {
      try {
        const data = await getBlogBySlug(resolvedParams.slug)
        if (data) {
          setBlog(data)
        } else {
          toast.error('Blog not found')
        }
      } catch (error) {
        toast.error('Failed to load blog')
      } finally {
        setLoading(false)
      }
    }
    loadBlog()
  }, [resolvedParams.slug])

  if (loading) return <div className="p-8">Loading...</div>
  if (!blog) return <div className="p-8">Blog not found</div>

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-lux-charcoal mb-8">Edit Blog Post</h1>
      <BlogEditor initialData={blog} />
    </div>
  )
}
