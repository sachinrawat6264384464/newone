'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AdminShell from '@/components/admin/AdminShell'
import { ServiceItem } from '@/types/service'
import { getServices, saveService, deleteService } from '@/lib/services'
import {
  Wrench,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Eye,
  EyeOff,
  Upload,
  HardDrive,
  Images,
  ChevronLeft,
  ChevronRight,
  Sparkles
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

// Admin Service Card with Square Carousel & Image Count Badge
function AdminServiceCard({
  service,
  onEdit,
  onDelete,
  onToggleStatus
}: {
  service: ServiceItem
  onEdit: (s: ServiceItem) => void
  onDelete: (id: string, title: string) => void
  onToggleStatus: (s: ServiceItem) => void
}) {
  const rawImages = service.images && service.images.length > 0 ? service.images : [service.coverImage]
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
        {/* Image Box Preview with Navigation & Count Badge (Compact 4:3 Ratio) */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          {imagesList.map((img, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-500 ease-out"
              style={{ opacity: i === currentImgIdx ? 1 : 0, zIndex: i === currentImgIdx ? 1 : 0 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={`${service.title} - ${i + 1}`}
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
              className="absolute left-2.5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 backdrop-blur-md rounded-full p-1.5 border border-gray-200 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Right Arrow */}
          {imagesList.length > 1 && (
            <button
              onClick={goNext}
              style={{ zIndex: 20 }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 backdrop-blur-md rounded-full p-1.5 border border-gray-200 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Category Badge */}
          <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/10" style={{ zIndex: 20 }}>
            <span className="text-[10px] uppercase font-bold text-white tracking-wider">
              {service.category}
            </span>
          </div>

          {/* Image Count Badge */}
          <div className="absolute bottom-2.5 left-2.5 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/20 flex items-center space-x-1.5" style={{ zIndex: 20 }}>
            <Images className="w-3 h-3 text-red-400" />
            <span className="text-[11px] font-mono font-bold text-white">
              {currentImgIdx + 1} / {imagesList.length} Images
            </span>
          </div>

          {/* Status Badge */}
          <button
            onClick={() => onToggleStatus(service)}
            style={{ zIndex: 20 }}
            className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border flex items-center space-x-1 ${
              service.published
                ? 'bg-emerald-500/90 text-white border-emerald-400'
                : 'bg-slate-800/90 text-slate-300 border-slate-700'
            }`}
          >
            {service.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            <span>{service.published ? 'Published' : 'Draft'}</span>
          </button>
        </div>

        {/* Body Details */}
        <div className="p-5">
          <h4 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-red-600 transition-colors font-serif-luxury">
            {service.title}
          </h4>
          {service.subtitle && (
            <p className="text-[11px] font-bold uppercase tracking-wider text-red-600 mb-2">
              {service.subtitle}
            </p>
          )}
          <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-4 font-light">
            {service.description}
          </p>

          {/* Features Bullets */}
          {service.features && service.features.length > 0 && (
            <div className="space-y-1.5 pt-3 border-t border-gray-100">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs text-slate-700">
                  <Check className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="p-4 bg-slate-50 border-t border-gray-100 flex items-center justify-between">
        <span className="text-[10px] text-slate-400 uppercase font-mono">
          ID: {service.id}
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(service)}
            className="p-2 bg-white hover:bg-slate-100 text-slate-700 border border-gray-200 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors shadow-xs"
          >
            <Edit className="w-3.5 h-3.5 text-red-600" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(service.id, service.title)}
            className="p-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs font-semibold transition-colors"
            title="Delete Service"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingService, setEditingService] = useState<ServiceItem | null>(null)

  // Form State
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [driveInput, setDriveInput] = useState('')
  const [category, setCategory] = useState('Interior')
  const [priceEstimate, setPriceEstimate] = useState('')
  const [published, setPublished] = useState(true)
  const [featuresList, setFeaturesList] = useState<string[]>([])
  const [featureInput, setFeatureInput] = useState('')
  const [saving, setSaving] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadServicesList = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getServices(false)
      setServices(data)
    } catch (err) {
      console.error('Error loading services:', err)
      toast.error('Failed to load services')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadServicesList()
  }, [loadServicesList])

  const openAddModal = () => {
    setEditingService(null)
    setTitle('')
    setSubtitle('')
    setDescription('')
    setImageUrls([])
    setDriveInput('')
    setCategory('Interior')
    setPriceEstimate('')
    setPublished(true)
    setFeaturesList([])
    setFeatureInput('')
    setShowModal(true)
  }

  const openEditModal = (service: ServiceItem) => {
    setEditingService(service)
    setTitle(service.title)
    setSubtitle(service.subtitle || '')
    setDescription(service.description)
    const imgs = service.images && service.images.length > 0 ? service.images : [service.coverImage]
    setImageUrls(imgs)
    setDriveInput('')
    setCategory(service.category || 'Interior')
    setPriceEstimate(service.priceEstimate || '')
    setPublished(service.published !== false)
    setFeaturesList(service.features || [])
    setFeatureInput('')
    setShowModal(true)
  }

  // File Upload Handler (Up to 5 images)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (imageUrls.length >= 5) {
      toast.error('Maximum 5 images allowed per service card')
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
      toast.error('Maximum 5 images allowed per service card')
      return
    }

    const formatted = formatGoogleDriveUrl(driveInput.trim())
    setImageUrls((prev) => [...prev, formatted])
    setDriveInput('')
    toast.success('Google Drive link added')
  }

  const handleRemoveImage = (index: number) => {
    if (imageUrls.length <= 1) {
      toast.error('At least 1 image is required per service card')
      return
    }
    setImageUrls((prev) => prev.filter((_, i) => i !== index))
    toast.success(`Image #${index + 1} deleted`)
  }

  // Feature Bullet Point Handlers
  const handleAddFeature = () => {
    if (!featureInput.trim()) return
    if (featuresList.length >= 5) {
      toast.error('Maximum 5 key feature bullet points allowed per card')
      return
    }
    setFeaturesList((prev) => [...prev, featureInput.trim()])
    setFeatureInput('')
    toast.success('Feature point added')
  }

  const handleRemoveFeature = (index: number) => {
    setFeaturesList((prev) => prev.filter((_, i) => i !== index))
    toast.success('Feature point deleted')
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
      await saveService({
        id: editingService?.id,
        title,
        subtitle,
        description,
        coverImage: cleanImages[0],
        images: cleanImages,
        category,
        priceEstimate,
        published,
        features: featuresList
      })
      toast.success(editingService ? 'Service updated' : 'Service created')
      setShowModal(false)
      loadServicesList()
    } catch (err) {
      console.error('Error saving service:', err)
      toast.error('Failed to save service')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return
    try {
      await deleteService(id)
      toast.success('Service deleted')
      loadServicesList()
    } catch (err) {
      console.error('Error deleting service:', err)
      toast.error('Failed to delete service')
    }
  }

  const toggleStatus = async (service: ServiceItem) => {
    try {
      await saveService({
        ...service,
        published: !service.published
      })
      toast.success(`Service ${!service.published ? 'Published' : 'Drafted'}`)
      loadServicesList()
    } catch (err) {
      console.error('Error toggling status:', err)
    }
  }

  return (
    <AdminShell
      title="Services Management"
      subtitle="Upload up to 5 images per service card directly from device or Google Drive."
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-serif-luxury">Services List ({services.length})</h3>
          <p className="text-xs text-slate-500 font-light">Up to 5 images per card supported with square carousels</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/20 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="py-20 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : services.length === 0 ? (
        <div className="bg-white border border-gray-200/80 rounded-2xl p-12 text-center shadow-sm">
          <Wrench className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h4 className="text-lg font-bold text-slate-900 mb-1 font-serif-luxury">No services added yet</h4>
          <p className="text-xs text-slate-500 mb-6 font-light">Create your first service to display on the services page.</p>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold shadow-sm"
          >
            Create Service
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <AdminServiceCard
              key={service.id}
              service={service}
              onEdit={openEditModal}
              onDelete={handleDelete}
              onToggleStatus={toggleStatus}
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
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-serif-luxury">
                      {editingService ? 'Edit Service Card & Gallery' : 'Add New Service Card'}
                    </h3>
                    <p className="text-xs text-slate-500">{imageUrls.length} / 5 images attached to this card</p>
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
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Turnkey Architecture & Construction"
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Subtitle / Tagline
                    </label>
                    <input
                      type="text"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="e.g. End-to-end design & execution"
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs"
                    >
                      <option value="Interior">Interior Design</option>
                      <option value="Architecture">Architecture</option>
                      <option value="Modular">Modular Kitchen & Wardrobe</option>
                      <option value="Renovation">Turnkey Renovation</option>
                      <option value="Commercial">Commercial Workspace</option>
                    </select>
                  </div>
                </div>

                {/* Upload Section (Up to 5 images) */}
                <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-red-600">
                      Card Images ({imageUrls.length} / 5)
                    </label>
                    <span className="text-[10px] text-slate-500 font-mono">Max 5 photos per card</span>
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
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Detailed explanation of the design service..."
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs font-light"
                  />
                </div>

                {/* Interactive Key Features List Manager (Max 5 points) */}
                <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-red-600">
                      Key Features Bullet Points ({featuresList.length} / 5)
                    </label>
                    <span className="text-[10px] text-slate-500 font-mono">Max 5 points per service</span>
                  </div>

                  {/* Add Input Row */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      disabled={featuresList.length >= 5}
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleAddFeature()
                        }
                      }}
                      placeholder="Type feature e.g. 3D Elevation Rendering..."
                      className="flex-1 bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 font-sans disabled:opacity-50 shadow-xs"
                    />
                    <button
                      type="button"
                      disabled={featuresList.length >= 5 || !featureInput.trim()}
                      onClick={handleAddFeature}
                      className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 disabled:opacity-50 shadow-xs"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Point</span>
                    </button>
                  </div>

                  {/* List of Feature Items with Red Trash Buttons */}
                  <div className="space-y-2 pt-1">
                    {featuresList.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 group hover:border-gray-300 shadow-xs"
                      >
                        <div className="flex items-center space-x-2 truncate">
                          <Sparkles className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                          <span className="truncate font-medium">{feat}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(idx)}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors ml-2 flex-shrink-0 border border-red-200"
                          title="Delete feature point"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                      className="w-4 h-4 rounded text-red-600 border-gray-300"
                    />
                    <span className="text-xs font-semibold text-slate-800">Publish on Website</span>
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
                    {saving ? 'Saving...' : editingService ? 'Update Service Card' : 'Create Service Card'}
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
