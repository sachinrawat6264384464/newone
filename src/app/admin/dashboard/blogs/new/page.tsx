'use client'

import BlogEditor from '@/components/BlogEditor'

export default function NewBlogPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-lux-charcoal mb-8">Create New Blog Post</h1>
      <BlogEditor />
    </div>
  )
}
