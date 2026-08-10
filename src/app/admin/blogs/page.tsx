'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AdminShell from '@/components/admin/AdminShell'
import { BlogPost } from '@/types/blog'
import { getBlogs, saveBlog, deleteBlog } from '@/lib/blogs'
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Eye,
  EyeOff,
  User,
  Tag,
  Calendar,
  Sparkles
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null)

  // Form State
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [category, setCategory] = useState('Interior Design')
  const [author, setAuthor] = useState('Nidhi Mittal')
  const [published, setPublished] = useState(true)
  const [saving, setSaving] = useState(false)

  const loadBlogsList = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getBlogs(false)
      setBlogs(data)
    } catch (err) {
      console.error('Failed loading blogs:', err)
      toast.error('Failed to load blogs')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadBlogsList()
  }, [loadBlogsList])

  const openAddModal = () => {
    setEditingBlog(null)
    setTitle('')
    setSlug('')
    setExcerpt('')
    setContent('')
    setCoverImage('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80')
    setCategory('Interior Design')
    setAuthor('Nidhi Mittal')
    setPublished(true)
    setShowModal(true)
  }

  const openEditModal = (blog: BlogPost) => {
    setEditingBlog(blog)
    setTitle(blog.title)
    setSlug(blog.slug)
    setExcerpt(blog.excerpt || '')
    setContent(blog.content)
    setCoverImage(blog.coverImage)
    setCategory(blog.category || 'Interior Design')
    setAuthor(blog.author || 'Nidhi Mittal')
    setPublished(blog.published !== false)
    setShowModal(true)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setTitle(val)
    if (!editingBlog) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim() || !coverImage.trim()) {
      toast.error('Title, cover image, and content are required')
      return
    }

    setSaving(true)
    const finalSlug = slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    try {
      await saveBlog({
        id: editingBlog?.id || '',
        title,
        slug: finalSlug,
        excerpt,
        content,
        coverImage,
        category,
        author,
        published,
        createdAt: editingBlog?.createdAt || Date.now(),
        updatedAt: Date.now()
      })
      toast.success(editingBlog ? 'Blog article updated' : 'Blog article published')
      setShowModal(false)
      loadBlogsList()
    } catch (err) {
      console.error('Error saving blog:', err)
      toast.error('Failed to save blog post')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete blog "${name}"?`)) return
    try {
      await deleteBlog(id)
      toast.success('Blog deleted')
      loadBlogsList()
    } catch (err) {
      console.error('Error deleting blog:', err)
      toast.error('Failed to delete blog')
    }
  }

  return (
    <AdminShell
      title="Blog Articles Management"
      subtitle="Publish and edit blog posts, design guides, and SEO articles."
    >
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 font-sans">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-serif-luxury">Articles ({blogs.length})</h3>
          <p className="text-xs text-slate-500 font-light">SEO design blogs and advice published on the site</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/20 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Blogs List */}
      {loading ? (
        <div className="py-20 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="bg-white border border-gray-200/80 rounded-2xl p-12 text-center shadow-sm font-sans">
          <FileText className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h4 className="text-lg font-bold text-slate-900 mb-1 font-serif-luxury">No articles published yet</h4>
          <p className="text-xs text-slate-500 mb-6 font-light">Write your first blog post to engage your audience.</p>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold shadow-sm"
          >
            Create Article
          </button>
        </div>
      ) : (
        <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm font-sans">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 text-xs font-mono uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Article</th>
                  <th className="px-6 py-4">Category / Author</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Created Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="w-12 h-12 rounded-xl object-cover border border-gray-200 flex-shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900 hover:text-red-600 transition-colors line-clamp-1">
                            {blog.title}
                          </p>
                          <p className="text-xs font-mono text-slate-400">/{blog.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5 text-xs">
                        <span className="inline-block bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium border border-gray-200">
                          {blog.category || 'General'}
                        </span>
                        <p className="text-slate-500">{blog.author || 'Nidhi Mittal'}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                        blog.published
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border-gray-300'
                      }`}>
                        {blog.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{blog.published ? 'Published' : 'Draft'}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 font-mono">
                      {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => openEditModal(blog)}
                          className="p-2 bg-white hover:bg-slate-100 text-slate-700 border border-gray-200 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors shadow-xs"
                        >
                          <Edit className="w-3.5 h-3.5 text-red-600" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id || '', blog.title)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs font-semibold transition-colors"
                          title="Delete Blog"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white border border-gray-200 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col font-sans"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center text-blue-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-serif-luxury">
                      {editingBlog ? 'Edit Blog Article' : 'Write New Blog Article'}
                    </h3>
                    <p className="text-xs text-slate-500">Compose or edit SEO content</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-900 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="e.g. 10 Luxury Interior Design Trends for 2026"
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="luxury-interior-trends-2026"
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-mono text-xs shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g. Interior Design Tips"
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Nidhi Mittal"
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Cover Image URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Short Excerpt / Summary
                  </label>
                  <textarea
                    rows={2}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief 1-2 sentence preview..."
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs font-light"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Article Content *
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write article body in text or markdown..."
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-mono text-xs leading-relaxed shadow-xs"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                      className="w-4 h-4 rounded text-red-600 border-gray-300"
                    />
                    <span className="text-xs font-semibold text-slate-800">Publish Immediately</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-gray-200 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/20 disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : editingBlog ? 'Update Article' : 'Publish Article'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminShell>
  )
}
