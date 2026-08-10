'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AdminShell from '@/components/admin/AdminShell'
import { GalleryItem } from '@/types/galleryItem'
import { getGalleryItems, saveGalleryItem, deleteGalleryItem } from '@/lib/galleryItems'
import { getSiteSettings, saveSiteSettings } from '@/lib/settings'
import {
  Images,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Eye,
  EyeOff,
  Upload,
  HardDrive,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Save,
  LayoutGrid
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

// Admin Gallery Card with Square Carousel & Image Count Badge
function AdminGalleryCard({
  item,
  onEdit,
  onDelete,
  onToggleStatus
}: {
  item: GalleryItem
  onEdit: (item: GalleryItem) => void
  onDelete: (id: string, title: string) => void
  onToggleStatus: (item: GalleryItem) => void
}) {
  const rawImages = item.images && item.images.length > 0 ? item.images : [item.image]
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
        {/* Square Image Box with Carousel Controls */}
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
                alt={`${item.title} - ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20 pointer-events-none" style={{ zIndex: 10 }} />

          {/* Navigation Arrows */}
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
          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10" style={{ zIndex: 20 }}>
            <span className="text-[10px] uppercase font-bold text-white tracking-wider">
              {item.category}
            </span>
          </div>

          {/* Image Counter Badge */}
          <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 flex items-center space-x-1" style={{ zIndex: 20 }}>
            <Images className="w-3 h-3 text-red-400" />
            <span className="text-[10px] font-mono font-bold text-white">
              {currentImgIdx + 1} / {imagesList.length}
            </span>
          </div>

          {/* Status Badge */}
          <button
            onClick={() => onToggleStatus(item)}
            style={{ zIndex: 20 }}
            className={`absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border flex items-center space-x-1 ${
              item.published
                ? 'bg-emerald-500/90 text-white border-emerald-400'
                : 'bg-slate-800/90 text-slate-300 border-slate-700'
            }`}
          >
            {item.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            <span>{item.published ? 'Published' : 'Draft'}</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5">
          <h4 className="font-bold text-slate-900 text-base leading-snug line-clamp-1 group-hover:text-red-600 transition-colors font-serif-luxury">
            {item.title}
          </h4>

          {item.subtitle && (
            <p className="text-[11px] font-bold text-red-600 uppercase tracking-wider mt-0.5 mb-2">
              {item.subtitle}
            </p>
          )}

          {item.description && (
            <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-3 font-light">
              {item.description}
            </p>
          )}

          {/* Features Bullets */}
          {item.features && item.features.length > 0 && (
            <div className="space-y-1 pt-2.5 border-t border-gray-100">
              {item.features.slice(0, 4).map((feat, idx) => (
                <div key={idx} className="flex items-center space-x-1.5 text-[11px] text-slate-700">
                  <Check className="w-3 h-3 text-red-600 flex-shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div className="p-3 bg-slate-50 border-t border-gray-100 flex items-center justify-between">
        <span className="text-[10px] font-mono text-slate-400">ID: {item.id}</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(item)}
            className="p-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-gray-200 rounded-lg text-xs font-medium flex items-center space-x-1 transition-colors shadow-xs"
          >
            <Edit className="w-3.5 h-3.5 text-red-600" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(item.id, item.title)}
            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs font-medium transition-colors"
            title="Delete photo card"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Gallery Page Hero Mosaic State (3 Images)
  const [heroImages, setHeroImages] = useState<string[]>([])
  const [heroDriveInput, setHeroDriveInput] = useState('')
  const [savingHero, setSavingHero] = useState(false)
  const heroFileInputRef = useRef<HTMLInputElement>(null)

  // Modal Form State
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [category, setCategory] = useState('Facade & Exterior')
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [driveInput, setDriveInput] = useState('')
  const [description, setDescription] = useState('')
  const [featuresList, setFeaturesList] = useState<string[]>([])
  const [featureInput, setFeatureInput] = useState('')
  const [published, setPublished] = useState(true)
  const [saving, setSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadGalleryData = useCallback(async () => {
    setLoading(true)
    try {
      const [data, settings] = await Promise.all([
        getGalleryItems(false),
        getSiteSettings()
      ])
      setItems(data)
      if (settings.galleryHeroImages && settings.galleryHeroImages.length > 0) {
        setHeroImages(settings.galleryHeroImages)
      } else {
        setHeroImages([
          'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298136/Homestorey-media/Hero/hfqrz6nqcaxbwa22urgx.jpg',
          'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298138/Homestorey-media/Hero/haemuplqyv9glq1651fc.jpg',
          'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298165/Homestorey-media/What%20we%20create/jjhie0tfazmie9laeimu.jpg'
        ])
      }
    } catch (err) {
      console.error('Failed loading gallery items:', err)
      toast.error('Failed to load gallery items')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadGalleryData()
  }, [loadGalleryData])

  const filterGallery = useCallback(() => {
    let filtered = items

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(i =>
        i.title?.toLowerCase().includes(term) ||
        i.subtitle?.toLowerCase().includes(term) ||
        i.category?.toLowerCase().includes(term) ||
        i.description?.toLowerCase().includes(term)
      )
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(i => i.category === categoryFilter)
    }

    setFilteredItems(filtered)
  }, [items, searchTerm, categoryFilter])

  useEffect(() => {
    filterGallery()
  }, [filterGallery])

  // Handlers for Gallery Hero Mosaic Images (3 Images)
  const handleHeroFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (heroImages.length >= 3) {
      toast.error('Maximum 3 hero mosaic images allowed')
      return
    }

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return

      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        if (result) {
          setHeroImages((prev) => {
            if (prev.length < 3) return [...prev, result]
            return prev
          })
          toast.success(`Gallery Hero image added: ${file.name}`)
        }
      }
      reader.readAsDataURL(file)
    })

    if (heroFileInputRef.current) {
      heroFileInputRef.current.value = ''
    }
  }

  const handleAddHeroDriveLink = () => {
    if (!heroDriveInput.trim()) {
      toast.error('Please paste a link first')
      return
    }

    if (heroImages.length >= 3) {
      toast.error('Maximum 3 hero mosaic images allowed')
      return
    }

    const formatted = formatGoogleDriveUrl(heroDriveInput.trim())
    setHeroImages((prev) => [...prev, formatted])
    setHeroDriveInput('')
    toast.success('Gallery Hero Drive link added')
  }

  const handleRemoveHeroImage = (index: number) => {
    setHeroImages((prev) => prev.filter((_, i) => i !== index))
    toast.success(`Gallery Hero slot #${index + 1} deleted`)
  }

  const handleSaveHeroMosaic = async () => {
    setSavingHero(true)
    try {
      await saveSiteSettings({
        galleryHeroImages: heroImages
      })
      toast.success('Gallery Hero Mosaic images saved successfully!')
    } catch (err) {
      console.error('Error saving gallery hero mosaic:', err)
      toast.error('Failed to save gallery hero mosaic')
    } finally {
      setSavingHero(false)
    }
  }

  // Feature Points List Handlers
  const handleAddFeature = () => {
    if (!featureInput.trim()) return
    if (featuresList.length >= 5) {
      toast.error('Maximum 5 key feature bullet points allowed per card')
      return
    }
    setFeaturesList((prev) => [...prev, featureInput.trim()])
    setFeatureInput('')
    toast.success('Feature bullet point added')
  }

  const handleRemoveFeature = (index: number) => {
    setFeaturesList((prev) => prev.filter((_, i) => i !== index))
    toast.success('Feature bullet point removed')
  }

  // Handlers for Card Modal Form
  const openAddModal = () => {
    setEditingItem(null)
    setTitle('Facade & Exterior Architecture')
    setSubtitle('STUNNING FIRST IMPRESSIONS')
    setCategory('Facade & Exterior')
    setImageUrls([
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298133/Homestorey-media/Gallery%20page/qrvccsdngw1eemstykjc.jpg',
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298116/Homestorey-media/Gallery%20page/vptfrusn2esxnjv76h0h.jpg',
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298117/Homestorey-media/Gallery%20page/hutrz0l5g0vpipc9fja6.jpg'
    ])
    setDriveInput('')
    setDescription("Transform your home's exterior into an architectural masterpiece. From grand entrance foyers to bespoke elevation treatments, we craft outdoor spaces that command admiration.")
    setFeaturesList([
      'Modern & classical elevation design',
      'Landscaping & outdoor lounge zones',
      'Entrance foyer & door styling',
      'Architectural exterior lighting'
    ])
    setFeatureInput('')
    setPublished(true)
    setShowModal(true)
  }

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item)
    setTitle(item.title)
    setSubtitle(item.subtitle || '')
    setCategory(item.category)
    const existingImgs = item.images && item.images.length > 0 ? item.images : [item.image]
    setImageUrls(existingImgs)
    setDriveInput('')
    setDescription(item.description || '')
    setFeaturesList(item.features || [])
    setFeatureInput('')
    setPublished(item.published)
    setShowModal(true)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (imageUrls.length >= 5) {
      toast.error('Maximum 5 images allowed per gallery card')
      return
    }

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return

      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        if (result) {
          setImageUrls((prev) => {
            if (prev.length < 5) return [...prev, result]
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

  const handleAddDriveLink = () => {
    if (!driveInput.trim()) {
      toast.error('Please paste a link first')
      return
    }

    if (imageUrls.length >= 5) {
      toast.error('Maximum 5 images allowed per gallery card')
      return
    }

    const formatted = formatGoogleDriveUrl(driveInput.trim())
    setImageUrls((prev) => [...prev, formatted])
    setDriveInput('')
    toast.success('Google Drive link added to gallery card')
  }

  const handleRemoveImage = (index: number) => {
    if (imageUrls.length <= 1) {
      toast.error('At least 1 image is required per card')
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
      await saveGalleryItem({
        id: editingItem?.id,
        title,
        subtitle,
        category,
        image: cleanImages[0],
        images: cleanImages,
        description,
        features: featuresList,
        published,
        order: editingItem?.order || items.length + 1
      })
      toast.success(editingItem ? 'Gallery item updated' : 'Gallery item added')
      setShowModal(false)
      loadGalleryData()
    } catch (err) {
      console.error('Error saving gallery item:', err)
      toast.error('Failed to save gallery item')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}" from gallery?`)) return
    try {
      await deleteGalleryItem(id)
      toast.success('Gallery item deleted')
      loadGalleryData()
    } catch (err) {
      console.error('Error deleting gallery item:', err)
      toast.error('Failed to delete gallery item')
    }
  }

  const toggleStatus = async (item: GalleryItem) => {
    try {
      await saveGalleryItem({
        ...item,
        published: !item.published
      })
      toast.success(`Item ${!item.published ? 'Published' : 'Unpublished'}`)
      loadGalleryData()
    } catch (err) {
      console.error('Error toggling status:', err)
    }
  }

  return (
    <AdminShell
      title="Portfolio Gallery Management"
      subtitle="Manage public Gallery Hero Mosaic (3 images) and showcase design cards."
    >
      {/* 1. GALLERY HERO MOSAIC IMAGES SECTION (3 IMAGES) */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-sm mb-10 font-sans">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-50 border border-red-200 rounded-xl flex items-center justify-center text-red-600">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif-luxury">Gallery Page Hero Mosaic (3 Images)</h3>
              <p className="text-xs text-slate-500 font-normal">
                {heroImages.length} / 3 images configured for the public /gallery page top right section.
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={savingHero}
            onClick={handleSaveHeroMosaic}
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/20 disabled:opacity-50 transition-all hover:scale-[1.02]"
          >
            <Save className="w-4 h-4" />
            <span>{savingHero ? 'Saving Hero...' : 'Save Hero Mosaic'}</span>
          </button>
        </div>

        {/* Action Controls for Gallery Hero */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <input
            ref={heroFileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleHeroFileUpload}
            className="hidden"
          />
          <button
            type="button"
            disabled={heroImages.length >= 3}
            onClick={() => heroFileInputRef.current?.click()}
            className="flex items-center justify-center space-x-2 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Hero Image from Gallery</span>
          </button>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              disabled={heroImages.length >= 3}
              value={heroDriveInput}
              onChange={(e) => setHeroDriveInput(e.target.value)}
              placeholder="Paste Google Drive link for Hero Mosaic..."
              className="flex-1 bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 disabled:opacity-50 shadow-xs font-sans"
            />
            <button
              type="button"
              disabled={heroImages.length >= 3}
              onClick={handleAddHeroDriveLink}
              className="px-3 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-semibold border border-gray-300 transition-colors disabled:opacity-50"
            >
              Add
            </button>
          </div>
        </div>

        {/* 3 Square Preview Slots with Prominent Red Trash Delete Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {heroImages.map((url, idx) => {
            const formatted = formatGoogleDriveUrl(url)
            const labelTitle = idx === 0 ? '#1 Tall Left Hero' : idx === 1 ? '#2 Top Right Hero' : '#3 Bottom Right Hero'
            return (
              <div
                key={idx}
                className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-gray-300 group shadow-xs"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={formatted}
                  alt={`Gallery Hero ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge Label */}
                <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded-md font-bold border border-white/20 shadow-md">
                  {labelTitle}
                </span>

                {/* Always Visible Red Trash Delete Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveHeroImage(idx)}
                  className="absolute top-2 right-2 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition-transform hover:scale-110 flex items-center justify-center z-20 border border-red-400"
                  title="Delete this Hero Mosaic photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )
          })}

          {/* Empty Slots up to 3 */}
          {Array.from({ length: Math.max(0, 3 - heroImages.length) }).map((_, idx) => {
            const emptyLabel = heroImages.length + idx === 0 ? '#1 Tall Left Hero' : heroImages.length + idx === 1 ? '#2 Top Right Hero' : '#3 Bottom Right Hero'
            return (
              <div
                key={idx}
                onClick={() => heroFileInputRef.current?.click()}
                className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-red-500/50 bg-slate-50 flex flex-col items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
              >
                <Plus className="w-6 h-6 mb-1 text-slate-400" />
                <span className="text-xs font-semibold text-slate-500">{emptyLabel}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* 2. GALLERY SHOWCASE CARDS SECTION */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-serif-luxury">Gallery Showcase Cards ({filteredItems.length})</h3>
          <p className="text-xs text-slate-500 font-normal">Manage title, tagline, description, feature bullet points, and multi-images</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/20 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Gallery Card</span>
        </button>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search gallery by title, subtitle, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 shadow-xs font-sans"
            />
          </div>

          <div className="relative">
            <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-50 border border-gray-200 rounded-xl pl-10 pr-8 py-2.5 text-xs text-slate-900 appearance-none focus:outline-none focus:border-red-500 shadow-xs font-sans"
            >
              <option value="all">All Categories</option>
              <option value="Facade & Exterior">Facade & Exterior</option>
              <option value="Living & Dining">Living & Dining</option>
              <option value="Modular Kitchen">Modular Kitchen</option>
              <option value="Bedrooms">Bedrooms</option>
              <option value="Terrace & Mandir">Terrace & Mandir</option>
            </select>
          </div>
        </div>
      </div>

      {/* Gallery Items Grid */}
      {loading ? (
        <div className="py-20 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white border border-gray-200/80 rounded-2xl p-12 text-center shadow-sm">
          <Images className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h4 className="text-lg font-bold text-slate-900 mb-1 font-serif-luxury">No gallery items found</h4>
          <p className="text-xs text-slate-500 mb-6 font-light">Upload design photos to display in the showcase gallery.</p>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold shadow-sm"
          >
            Upload Photo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <AdminGalleryCard
              key={item.id}
              item={item}
              onEdit={openEditModal}
              onDelete={handleDelete}
              onToggleStatus={toggleStatus}
            />
          ))}
        </div>
      )}

      {/* Add / Edit Modal with Interactive Bullet Points Manager & Multi-Image Upload */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto">
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
              className="bg-white border border-gray-200 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl z-10 max-h-[95vh] sm:max-h-[90vh] flex flex-col font-sans my-2 sm:my-0"
            >
              <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between gap-3">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-red-50 border border-red-200 rounded-xl flex items-center justify-center text-red-600 flex-shrink-0">
                    <Images className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-lg font-bold text-slate-900 font-serif-luxury truncate">
                      {editingItem ? 'Edit Gallery Showcase Card' : 'Add Gallery Showcase Card'}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500">{imageUrls.length} / 5 images attached</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-900 rounded-lg flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 font-sans">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Card Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Facade & Exterior Architecture"
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Subtitle / Tagline (Red Header)
                    </label>
                    <input
                      type="text"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="e.g. STUNNING FIRST IMPRESSIONS"
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs"
                    >
                      <option value="Facade & Exterior">Facade & Exterior</option>
                      <option value="Living & Dining">Living & Dining</option>
                      <option value="Modular Kitchen">Modular Kitchen</option>
                      <option value="Bedrooms">Bedrooms</option>
                      <option value="Terrace & Mandir">Terrace & Mandir</option>
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
                              className="absolute top-1.5 right-1.5 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition-transform hover:scale-110 flex items-center justify-center border border-red-400"
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
                    placeholder="Detailed explanation of the showcase card..."
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs font-light"
                  />
                </div>

                {/* Interactive Key Features List Manager (Max 5 points) */}
                <div className="bg-slate-50 p-3 sm:p-4 rounded-xl border border-gray-200 space-y-3">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-red-600">
                      Bullet Points ({featuresList.length} / 5)
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">Max 5 per card</span>
                  </div>

                  {/* Add Input Row */}
                  <div className="flex gap-2">
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
                      placeholder="Type feature e.g. Entrance foyer..."
                      className="flex-1 min-w-0 bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 font-sans disabled:opacity-50 shadow-xs"
                    />
                    <button
                      type="button"
                      disabled={featuresList.length >= 5 || !featureInput.trim()}
                      onClick={handleAddFeature}
                      className="flex-shrink-0 px-3 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 disabled:opacity-50 shadow-xs whitespace-nowrap"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
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
                    {saving ? 'Saving...' : editingItem ? 'Update Gallery Card' : 'Create Gallery Card'}
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
