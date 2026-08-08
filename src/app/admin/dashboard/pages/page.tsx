'use client'

import { useState, useEffect } from 'react'
import { getCustomPages, deleteCustomPage } from '@/lib/pages'
import { CustomPage } from '@/types/page'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function AdminPagesManager() {
  const [pages, setPages] = useState<CustomPage[]>([])
  const [loading, setLoading] = useState(true)
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/admin/login')
      } else {
        fetchPages()
      }
    }
  }, [user, authLoading, router])

  const fetchPages = async () => {
    try {
      setLoading(true)
      const data = await getCustomPages(false)
      setPages(data)
    } catch (error) {
      toast.error('Failed to load pages')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      try {
        await deleteCustomPage(id)
        toast.success('Page deleted successfully')
        fetchPages()
      } catch (error) {
        toast.error('Failed to delete page')
      }
    }
  }

  if (loading || status === 'loading') {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-lux-charcoal">Page Builder</h1>
        <Link 
          href="/admin/dashboard/pages/new" 
          className="bg-lux-gold text-white px-6 py-2 rounded-lg hover:bg-lux-darkGold transition"
        >
          Create New Page
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-lux-cream">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-lux-gray uppercase tracking-wider">Title / URL</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-lux-gray uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-lux-gray uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pages.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  No pages found. Create your first dynamic page!
                </td>
              </tr>
            ) : (
              pages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{page.title}</div>
                    <Link href={`/${page.slug}`} target="_blank" className="text-sm text-lux-gold hover:underline">
                      /{page.slug}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      page.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {page.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/admin/dashboard/pages/edit/${page.slug}`} className="text-lux-gold hover:text-lux-darkGold mr-4">
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(page.id!)}
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
