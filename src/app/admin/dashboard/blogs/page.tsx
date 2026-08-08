'use client'

import { useState, useEffect } from 'react'
import { getBlogs, deleteBlog } from '@/lib/blogs'
import { BlogPost } from '@/types/blog'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/admin/login')
      } else {
        fetchBlogs()
      }
    }
  }, [user, authLoading, router])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      // fetch all blogs including unpublished
      const data = await getBlogs(false) 
      setBlogs(data)
    } catch (error) {
      toast.error('Failed to load blogs')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlog(id)
        toast.success('Blog deleted successfully')
        fetchBlogs()
      } catch (error) {
        toast.error('Failed to delete blog')
      }
    }
  }

  if (loading || status === 'loading') {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-lux-charcoal">Blog Manager</h1>
        <Link 
          href="/admin/dashboard/blogs/new" 
          className="bg-lux-gold text-white px-6 py-2 rounded-lg hover:bg-lux-darkGold transition"
        >
          Create New Post
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-lux-cream">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-lux-gray uppercase tracking-wider">Title</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-lux-gray uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-lux-gray uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-lux-gray uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No blog posts found. Create your first one!
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                    <div className="text-sm text-gray-500">/{blog.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      blog.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/admin/dashboard/blogs/edit/${blog.slug}`} className="text-lux-gold hover:text-lux-darkGold mr-4">
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(blog.id!)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
