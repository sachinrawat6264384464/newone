'use client'

import { useEffect, useState, use } from 'react'
import PageEditor from '@/components/PageEditor'
import { getCustomPageBySlug } from '@/lib/pages'
import { CustomPage } from '@/types/page'
import toast from 'react-hot-toast'

type Props = {
  params: Promise<{ slug: string }>
}

export default function EditCustomPage({ params }: Props) {
  const resolvedParams = use(params)
  const [page, setPage] = useState<CustomPage | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPage() {
      try {
        const data = await getCustomPageBySlug(resolvedParams.slug)
        if (data) {
          setPage(data)
        } else {
          toast.error('Page not found')
        }
      } catch (error) {
        toast.error('Failed to load page')
      } finally {
        setLoading(false)
      }
    }
    loadPage()
  }, [resolvedParams.slug])

  if (loading) return <div className="p-8">Loading...</div>
  if (!page) return <div className="p-8">Page not found</div>

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-lux-charcoal mb-8">Edit Custom Page</h1>
      <PageEditor initialData={page} />
    </div>
  )
}
