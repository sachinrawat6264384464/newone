'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BlogPost } from '@/types/blog'
import { saveBlog } from '@/lib/blogs'
import toast from 'react-hot-toast'

interface BlogEditorProps {
  initialData?: BlogPost
}

export default function BlogEditor({ initialData }: BlogEditorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState<Partial<BlogPost>>(initialData || {
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    author: 'Admin',
    published: false,
    seoTitle: '',
    seoDescription: '',
    seoKeywords: []
  })

  const [keywordInput, setKeywordInput] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Auto-generate slug from title if it's a new post and title is changed
    if (name === 'title' && !initialData) {
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      }))
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.checked }))
  }

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.seoKeywords?.includes(keywordInput.trim())) {
      setFormData(prev => ({
        ...prev,
        seoKeywords: [...(prev.seoKeywords || []), keywordInput.trim()]
      }))
      setKeywordInput('')
    }
  }

  const removeKeyword = (keywordToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      seoKeywords: prev.seoKeywords?.filter(k => k !== keywordToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.slug || !formData.content) {
      toast.error('Title, Slug, and Content are required')
      return
    }

    try {
      setLoading(true)
      await saveBlog(formData as BlogPost)
      toast.success(initialData ? 'Blog updated' : 'Blog created')
      router.push('/admin/dashboard/blogs')
    } catch (error) {
      toast.error('Failed to save blog')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow border border-gray-100">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-lux-gold focus:border-lux-gold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-lux-gold focus:border-lux-gold"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          rows={2}
          className="w-full px-4 py-2 border rounded-lg focus:ring-lux-gold focus:border-lux-gold"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Content (HTML or Markdown) *</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={15}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-lux-gold focus:border-lux-gold font-mono text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
          <input
            type="text"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-lux-gold focus:border-lux-gold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-lux-gold focus:border-lux-gold"
          />
        </div>
      </div>

      <div className="border-t pt-8 mt-8">
        <h3 className="text-xl font-semibold mb-4 text-lux-charcoal">SEO Metadata</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title (Overrides main title if set)</label>
            <input
              type="text"
              name="seoTitle"
              value={formData.seoTitle}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-lux-gold focus:border-lux-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description (Overrides excerpt if set)</label>
            <textarea
              name="seoDescription"
              value={formData.seoDescription}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2 border rounded-lg focus:ring-lux-gold focus:border-lux-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SEO Keywords</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-lux-gold focus:border-lux-gold"
                placeholder="Add keyword and press enter or click add"
              />
              <button 
                type="button" 
                onClick={addKeyword}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.seoKeywords?.map(keyword => (
                <span key={keyword} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {keyword}
                  <button type="button" onClick={() => removeKeyword(keyword)} className="text-red-500 hover:text-red-700">&times;</button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleCheckboxChange}
            className="w-5 h-5 text-lux-gold focus:ring-lux-gold rounded"
          />
          <span className="font-medium text-gray-700">Published</span>
        </label>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border rounded-lg text-gray-600 hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-lux-gold text-white rounded-lg hover:bg-lux-darkGold transition disabled:opacity-50"
        >
          {loading ? 'Saving...' : (initialData ? 'Update Blog' : 'Create Blog')}
        </button>
      </div>

    </form>
  )
}
