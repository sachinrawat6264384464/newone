'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AdminShell from '@/components/admin/AdminShell'
import { ProjectItem } from '@/types/project'
import { getProjects, saveProject, deleteProject } from '@/lib/projects'
import {
  FolderKanban,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Eye,
  EyeOff,
  Star,
  MapPin,
  User,
  Calendar,
  Upload,
  HardDrive,
  Images,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import toast from 'react-hot-toast'

function formatGoogleDriveUrl(url: string): string {
  if (!url) return url
  const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  if (driveMatch && driveMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`
  }
  return url
}

// Admin Project Card with Square Carousel & Image Count Badge
function AdminProjectCard({
  project,
  onEdit,
  onDelete
}: {
  project: ProjectItem
  onEdit: (p: ProjectItem) => void
  onDelete: (id: string, title: string) => void
}) {
  const rawImages = project.galleryImages && project.galleryImages.length > 0 ? project.galleryImages : [project.coverImage]
  const imagesList = rawImages.map(formatGoogleDriveUrl)
  const [currentImgIdx, setCurrentImgIdx] = useState(0)

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImgIdx((prev) => (prev + 1) % imagesList.length)
  }

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImgIdx((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-red-300 transition-all shadow-sm font-sans relative isolate"
    >
      <div>
        {/* Square Image Box Preview with Navigation & Count Badge */}
        <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
          {imagesList.map((img, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-500 ease-out"
              style={{ opacity: i === currentImgIdx ? 1 : 0, zIndex: i === currentImgIdx ? 1 : 0 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={`${project.title} - ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20 pointer-events-none" style={{ zIndex: 10 }} />

          {/* Left Arrow */}
          {imagesList.length > 1 && (
            <button
              onClick={goPrev}
              style={{ zIndex: 20 }}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 backdrop-blur-md rounded-full p-2 border border-gray-200 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Right Arrow */}
          {imagesList.length > 1 && (
            <button
              onClick={goNext}
              style={{ zIndex: 20 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 backdrop-blur-md rounded-full p-2 border border-gray-200 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex items-center space-x-2" style={{ zIndex: 20 }}>
            <span className="bg-slate-900/80 backdrop-blur-md border border-white/10 text-white px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
              {project.category}
            </span>
            {project.featured && (
              <span className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center space-x-1 shadow-xs">
                <Star className="w-3 h-3 fill-slate-950" />
                <span>Featured</span>
              </span>
            )}
          </div>

          {/* Image Count Badge */}
          <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 flex items-center space-x-1.5" style={{ zIndex: 20 }}>
            <Images className="w-3.5 h-3.5 text-red-400" />
            <span className="text-xs font-mono font-bold text-white">
              {currentImgIdx + 1} / {imagesList.length} Images
            </span>
          </div>

          {/* Dot Indicators */}
          {imagesList.length > 1 && (
            <div className="absolute bottom-3 right-3 flex items-center space-x-1.5" style={{ zIndex: 20 }}>
              {imagesList.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrentImgIdx(i); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentImgIdx ? 'w-5 bg-red-600' : 'w-1.5 bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Body Details */}
        <div className="p-6">
          <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors font-serif-luxury">
            {project.title}
          </h4>
          <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs text-slate-500 mb-3 font-medium">
            {project.location && (
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                <span>{project.location}</span>
              </span>
            )}
            {project.year && (
              <span className="flex items-center space-x-1 font-mono">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{project.year}</span>
              </span>
            )}
          </div>
          <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 font-light">
            {project.description}
          </p>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="p-4 bg-slate-50 border-t border-gray-100 flex items-center justify-between">
        <span className="text-[10px] text-slate-400 uppercase font-mono">
          ID: {project.id}
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(project)}
            className="p-2 bg-white hover:bg-slate-100 text-slate-700 border border-gray-200 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors shadow-xs"
          >
            <Edit className="w-3.5 h-3.5 text-red-600" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(project.id, project.title)}
            className="p-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs font-semibold transition-colors"
            title="Delete Project"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null)

  // Form State
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Residential')
  const [location, setLocation] = useState('')
  const [clientName, setClientName] = useState('')
  const [year, setYear] = useState('2025')
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [driveInput, setDriveInput] = useState('')
  const [featured, setFeatured] = useState(false)
  const [saving, setSaving] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadProjectsList = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getProjects(false)
      setProjects(data)
    } catch (err) {
      console.error('Error loading projects:', err)
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProjectsList()
  }, [loadProjectsList])

  const openAddModal = () => {
    setEditingProject(null)
    setTitle('')
    setDescription('')
    setCategory('Residential')
    setLocation('')
    setClientName('')
    setYear('2025')
    setImageUrls([])
    setDriveInput('')
    setFeatured(false)
    setShowModal(true)
  }

  const openEditModal = (project: ProjectItem) => {
    setEditingProject(project)
    setTitle(project.title)
    setDescription(project.description)
    setCategory(project.category)
    setLocation(project.location || '')
    setClientName(project.clientName || '')
    setYear(project.year || '2025')
    const imgs = project.galleryImages && project.galleryImages.length > 0 ? project.galleryImages : [project.coverImage]
    setImageUrls(imgs)
    setDriveInput('')
    setFeatured(project.featured || false)
    setShowModal(true)
  }

  // File Upload Handler (Up to 5 images)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (imageUrls.length >= 5) {
      toast.error('Maximum 5 images allowed per project card')
      return
    }

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return

      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        if (result) {
          setImageUrls((prev) => {
            if (prev.length < 5) {
              return [...prev, result]
            }
            return prev
          })
          toast.success(`Image added: ${file.name}`)
        }
      }
      reader.readAsDataURL(file)
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Add Google Drive or Web Link (Max 5)
  const handleAddDriveLink = () => {
    if (!driveInput.trim()) {
      toast.error('Please paste a link first')
      return
    }

    if (imageUrls.length >= 5) {
      toast.error('Maximum 5 images allowed per project card')
      return
    }

    const formatted = formatGoogleDriveUrl(driveInput.trim())
    setImageUrls((prev) => [...prev, formatted])
    setDriveInput('')
    toast.success('Google Drive link added')
  }

  const handleRemoveImage = (index: number) => {
    if (imageUrls.length <= 1) {
      toast.error('At least 1 image is required per project card')
      return
    }
    setImageUrls((prev) => prev.filter((_, i) => i !== index))
    toast.success(`Image #${index + 1} deleted`)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || imageUrls.length === 0) {
      toast.error('Title and at least 1 image are required')
      return
    }

    setSaving(true)
    const cleanImages = imageUrls.map((url) => formatGoogleDriveUrl(url.trim())).filter((url) => url.length > 0)

    try {
      await saveProject({
        id: editingProject?.id,
        title,
        description,
        coverImage: cleanImages[0],
        galleryImages: cleanImages,
        category,
        location,
        clientName,
        year,
        featured
      })
      toast.success(editingProject ? 'Project updated' : 'Project created')
      setShowModal(false)
      loadProjectsList()
    } catch (err) {
      console.error('Error saving project:', err)
      toast.error('Failed to save project')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return
    try {
      await deleteProject(id)
      toast.success('Project deleted')
      loadProjectsList()
    } catch (err) {
      console.error('Error deleting project:', err)
      toast.error('Failed to delete project')
    }
  }

  return (
    <AdminShell
      title="Portfolio & Projects Management"
      subtitle="Upload up to 5 images per project card directly from device or Google Drive."
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-serif-luxury">Projects Showcase ({projects.length})</h3>
          <p className="text-xs text-slate-500 font-light">Up to 5 images per card supported with square carousels</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/20 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="py-20 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white border border-gray-200/80 rounded-2xl p-12 text-center shadow-sm">
          <FolderKanban className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h4 className="text-lg font-bold text-slate-900 mb-1 font-serif-luxury">No projects added yet</h4>
          <p className="text-xs text-slate-500 mb-6 font-light">Create your first portfolio item to display on the project gallery.</p>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold shadow-sm"
          >
            Create Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <AdminProjectCard
              key={project.id}
              project={project}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
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
              className="bg-white border border-gray-200 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col font-sans"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-50 border border-red-200 rounded-xl flex items-center justify-center text-red-600">
                    <FolderKanban className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-serif-luxury">
                      {editingProject ? 'Edit Project Details' : 'Add New Portfolio Project'}
                    </h3>
                    <p className="text-xs text-slate-500">{imageUrls.length} / 5 images attached to this project</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-900 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1 font-sans">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Modern Villa Facade & Interior"
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs"
                    >
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Hospitality">Hospitality</option>
                      <option value="Turnkey">Turnkey Civil</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Gurgaon, NCR"
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Completion Year
                    </label>
                    <input
                      type="text"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="e.g. 2025"
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs"
                    />
                  </div>
                </div>

                {/* Upload Section (Up to 5 images) */}
                <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-red-600">
                      Gallery Images ({imageUrls.length} / 5)
                    </label>
                    <span className="text-[10px] text-slate-500 font-mono">Max 5 photos per project</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={imageUrls.length >= 5}
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center justify-center space-x-2 py-2.5 px-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors disabled:opacity-50 shadow-xs"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload from Device / Gallery</span>
                    </button>

                    <div className="flex items-center space-x-1.5">
                      <input
                        type="text"
                        disabled={imageUrls.length >= 5}
                        value={driveInput}
                        onChange={(e) => setDriveInput(e.target.value)}
                        placeholder="Paste Google Drive link..."
                        className="flex-1 bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 font-sans disabled:opacity-50 shadow-xs"
                      />
                      <button
                        type="button"
                        disabled={imageUrls.length >= 5}
                        onClick={handleAddDriveLink}
                        className="px-2.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-semibold border border-gray-300 transition-colors disabled:opacity-50"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Attached Images Grid */}
                  <div className="pt-2">
                    <p className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Attached Images ({imageUrls.length})
                    </p>

                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                      {imageUrls.map((url, idx) => {
                        const formattedSrc = formatGoogleDriveUrl(url)
                        return (
                          <div
                            key={idx}
                            className="relative aspect-square rounded-xl overflow-hidden bg-slate-200 border border-gray-300 group shadow-xs"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={formattedSrc}
                              alt={`Thumbnail ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />

                            <span className="absolute top-1 left-1 bg-slate-900/80 text-white font-mono text-[9px] px-1.5 py-0.5 rounded font-bold">
                              #{idx + 1}
                            </span>

                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              className="absolute top-1.5 right-1.5 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition-transform hover:scale-110 flex items-center justify-center"
                              title="Delete image"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Comprehensive description of the architectural project..."
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs font-light"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-red-600 border-gray-300"
                    />
                    <span className="text-xs font-semibold text-slate-800">Feature on Homepage</span>
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
                    {saving ? 'Saving...' : editingProject ? 'Update Project' : 'Create Project'}
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
