'use client'

import PageEditor from '@/components/PageEditor'

export default function NewPageBuilder() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-lux-charcoal mb-8">Build New Page</h1>
      <PageEditor />
    </div>
  )
}
