'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import AdminShell from '@/components/admin/AdminShell'
import { SiteSettings, HeroSlideItem } from '@/types/siteSettings'
import { getSiteSettings, saveSiteSettings, DEFAULT_HERO_SLIDES } from '@/lib/settings'
import { Settings, Save, Sparkles, Phone, Mail, MapPin, Globe, Megaphone, Images, Upload, HardDrive, Trash2, Plus, Edit } from 'lucide-react'
import toast from 'react-hot-toast'
import { uploadToCloudinary } from '@/lib/cloudinary'

function formatGoogleDriveUrl(url: string): string {
  if (!url) return url
  const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  if (driveMatch && driveMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`
  }
  return url
}

function compressImage(base64Str: string, maxWidth = 1300, quality = 0.75): Promise<string> {
  return new Promise((resolve) => {
    if (!base64Str || !base64Str.startsWith('data:image')) {
      resolve(base64Str)
      return
    }
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = base64Str
    img.onload = () => {
      let width = img.width
      let height = img.height

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width)
        width = maxWidth
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height)
        const compressed = canvas.toDataURL('image/jpeg', quality)
        resolve(compressed)
      } else {
        resolve(base64Str)
      }
    }
    img.onerror = () => resolve(base64Str)
  })
}

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [heroDriveInput, setHeroDriveInput] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState<SiteSettings>({
    siteName: 'Home Storey',
    heroTitle: '',
    heroSubtitle: '',
    heroImages: [],
    heroSlides: DEFAULT_HERO_SLIDES,
    contactEmail: '',
    contactPhone: '',
    officeAddress: '',
    whatsappNumber: '',
    instagramUrl: '',
    facebookUrl: '',
    linkedinUrl: '',
    announcementBanner: {
      enabled: true,
      message: '',
      linkUrl: ''
    }
  })

  const loadSettingsData = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getSiteSettings()
      if (!data.heroSlides || data.heroSlides.length === 0) {
        data.heroSlides = DEFAULT_HERO_SLIDES
      }
      setForm(data)
    } catch (err) {
      console.error('Error loading settings:', err)
      toast.error('Failed to load site settings')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadSettingsData()
  }, [loadSettingsData])

  // Slide Field Handler
  const updateSlideField = (index: number, field: keyof HeroSlideItem, value: string) => {
    setForm((prev) => {
      const updatedSlides = [...(prev.heroSlides || [])]
      if (updatedSlides[index]) {
        updatedSlides[index] = { ...updatedSlides[index], [field]: value }
      }
      return {
        ...prev,
        heroSlides: updatedSlides,
        heroImages: updatedSlides.map(s => s.image)
      }
    })
  }

  // File Upload for a specific Slide Background Image
  const handleSlideImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    if (!file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = async (event) => {
      const result = event.target?.result as string
      if (result) {
        toast.loading('Uploading to Cloudinary CDN...', { id: 'compress-toast' })
        const compressed = await compressImage(result)
        const imageUrl = await uploadToCloudinary(compressed)
        toast.dismiss('compress-toast')

        const currentSlides = [...(form.heroSlides || [])]
        if (currentSlides[index]) {
          currentSlides[index] = { ...currentSlides[index], image: imageUrl }
        }
        const updatedForm: SiteSettings = {
          ...form,
          heroSlides: currentSlides,
          heroImages: currentSlides.map(s => s.image)
        }
        setForm(updatedForm)
        await saveSiteSettings(updatedForm)
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('storage'))
        }
        toast.success(`Slide #${index + 1} image uploaded & saved!`)
      }
    }
    reader.readAsDataURL(file)
  }

  // Add a New Hero Slide (Max 5)
  const handleAddHeroSlide = async () => {
    const current = form.heroSlides || []
    if (current.length >= 5) {
      toast.error('Maximum 5 hero slides allowed')
      return
    }

    const newSlide: HeroSlideItem = {
      id: `hero-slide-${Date.now()}`,
      tagline: 'LUXURY INTERIORS · ARCHITECTURE',
      title: 'Bespoke Architectural Excellence',
      subtitle: 'Crafting timeless living spaces tailored meticulously to your lifestyle.',
      image: 'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298136/Homestorey-media/Hero/hfqrz6nqcaxbwa22urgx.jpg'
    }

    const updatedSlides = [...current, newSlide]
    const updatedForm: SiteSettings = {
      ...form,
      heroSlides: updatedSlides,
      heroImages: updatedSlides.map(s => s.image)
    }

    setForm(updatedForm)
    try {
      await saveSiteSettings(updatedForm)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('storage'))
      }
      toast.success(`Hero Slide #${updatedSlides.length} added and saved!`)
    } catch (e) {
      console.error(e)
    }
  }

  // Remove a Hero Slide
  const handleRemoveHeroSlide = async (index: number) => {
    const current = form.heroSlides || []
    if (current.length <= 1) {
      toast.error('At least 1 hero slide is required')
      return
    }

    const updatedSlides = current.filter((_, i) => i !== index)
    const updatedForm: SiteSettings = {
      ...form,
      heroSlides: updatedSlides,
      heroImages: updatedSlides.map(s => s.image)
    }

    setForm(updatedForm)
    try {
      await saveSiteSettings(updatedForm)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('storage'))
      }
      toast.success(`Hero Slide #${index + 1} deleted and saved!`)
    } catch (e) {
      console.error(e)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const slidesList = form.heroSlides || DEFAULT_HERO_SLIDES
      const compressedSlides = await Promise.all(
        slidesList.map(async (slide) => ({
          ...slide,
          image: await compressImage(slide.image)
        }))
      )
      const payload: SiteSettings = {
        ...form,
        heroSlides: compressedSlides,
        heroImages: compressedSlides.map(s => s.image)
      }
      setForm(payload)
      await saveSiteSettings(payload)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('storage'))
      }
      toast.success('Site settings updated successfully!')
    } catch (err) {
      console.error('Failed saving site settings:', err)
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminShell
      title="Site Settings & Global Configuration"
      subtitle="Manage homepage hero slides (texts + images), contact info, and top announcement banner."
    >
      {loading ? (
        <div className="py-20 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl font-sans">
          {/* Homepage Hero Slider & Text Content Manager (Max 5 Slides) */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-50 border border-red-200 rounded-xl flex items-center justify-center text-red-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-serif-luxury">Homepage Hero Banner Slides Manager (Max 5)</h3>
                  <p className="text-xs text-slate-500">
                    Each hero slide features its own background photo, red tagline, headline title, and description.
                  </p>
                </div>
              </div>

              <button
                type="button"
                disabled={(form.heroSlides || []).length >= 5}
                onClick={handleAddHeroSlide}
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/20 disabled:opacity-50 transition-all hover:scale-[1.02]"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Hero Slide</span>
              </button>
            </div>

            {/* List of Managed Hero Slides */}
            <div className="space-y-6">
              {(form.heroSlides || []).map((slide, idx) => (
                <div
                  key={slide.id || idx}
                  className="bg-slate-50/80 border border-gray-200/80 rounded-2xl p-5 space-y-4 shadow-xs relative group hover:border-red-300 transition-colors"
                >
                  {/* Header Row */}
                  <div className="flex items-center justify-between border-b border-gray-200/80 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="bg-red-100 text-red-700 border border-red-200 text-xs font-mono font-bold px-2.5 py-1 rounded-lg">
                        Hero Slide #{idx + 1}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveHeroSlide(idx)}
                      className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1 border border-red-200"
                      title="Delete this hero slide"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Slide</span>
                    </button>
                  </div>

                  {/* Slide Fields Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                    {/* Background Image Preview & Picker (4 Cols) */}
                    <div className="md:col-span-4 space-y-3">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        Slide Background Image
                      </label>

                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-200 border border-gray-300 shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={formatGoogleDriveUrl(slide.image)}
                          alt={`Slide #${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="space-y-2">
                        <input
                          id={`slide-file-${idx}`}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleSlideImageUpload(idx, e)}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById(`slide-file-${idx}`)?.click()}
                          className="w-full py-2 px-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center space-x-1.5"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload from Device</span>
                        </button>

                        <input
                          type="text"
                          value={slide.image}
                          onChange={(e) => updateSlideField(idx, 'image', e.target.value)}
                          placeholder="Or paste Google Drive link..."
                          className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-[11px] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 font-sans shadow-xs"
                        />
                      </div>
                    </div>

                    {/* Slide Text Content Fields (8 Cols) */}
                    <div className="md:col-span-8 space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-red-600 mb-1">
                          Top Red Tagline Text
                        </label>
                        <input
                          type="text"
                          value={slide.tagline}
                          onChange={(e) => updateSlideField(idx, 'tagline', e.target.value)}
                          placeholder="e.g. CONSTRUCTION · INTERIORS · ARCHITECTURE"
                          className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Slide Main Headline Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={slide.title}
                          onChange={(e) => updateSlideField(idx, 'title', e.target.value)}
                          placeholder="e.g. Look At What We Design."
                          className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-serif-luxury font-bold shadow-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Slide Description Paragraph
                        </label>
                        <textarea
                          rows={2}
                          value={slide.subtitle}
                          onChange={(e) => updateSlideField(idx, 'subtitle', e.target.value)}
                          placeholder="Detailed description for this slide..."
                          className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-red-500 leading-relaxed font-sans font-light shadow-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcement Banner Settings */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-center text-amber-600">
                <Megaphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif-luxury">Top Announcement Banner</h3>
                <p className="text-xs text-slate-500">Optional top notification bar across the website</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center space-x-3 cursor-pointer pb-2">
                <input
                  type="checkbox"
                  checked={form.announcementBanner?.enabled ?? true}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      announcementBanner: {
                        ...form.announcementBanner!,
                        enabled: e.target.checked
                      }
                    })
                  }
                  className="w-4 h-4 rounded text-red-600 border-gray-300 focus:ring-red-500"
                />
                <span className="text-xs font-semibold text-slate-900">Enable Top Announcement Banner</span>
              </label>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Announcement Message
                </label>
                <input
                  type="text"
                  value={form.announcementBanner?.message || ''}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      announcementBanner: {
                        ...form.announcementBanner!,
                        message: e.target.value
                      }
                    })
                  }
                  placeholder="✨ Book a complimentary interior design session with Nidhi Mittal today!"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Action Link URL
                </label>
                <input
                  type="url"
                  value={form.announcementBanner?.linkUrl || ''}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      announcementBanner: {
                        ...form.announcementBanner!,
                        linkUrl: e.target.value
                      }
                    })
                  }
                  placeholder="https://tidycal.com/homestorey/free-design-discussion"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* Contact Details & Social Links */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center text-blue-600">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif-luxury">Contact & Social Links</h3>
                <p className="text-xs text-slate-500">Business email, phone, office address, and social profiles</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Business Contact Email
                </label>
                <input
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                  placeholder="homestorey@thenidhimittal.com"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Business Phone Number
                </label>
                <input
                  type="text"
                  value={form.contactPhone}
                  onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Office Address
                </label>
                <input
                  type="text"
                  value={form.officeAddress}
                  onChange={(e) => setForm({ ...form, officeAddress: e.target.value })}
                  placeholder="Delhi NCR, India"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  value={form.whatsappNumber || ''}
                  onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                  placeholder="+919876543210"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Instagram Profile URL
                </label>
                <input
                  type="url"
                  value={form.instagramUrl || ''}
                  onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
                  placeholder="https://instagram.com/..."
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Facebook Page URL
                </label>
                <input
                  type="url"
                  value={form.facebookUrl || ''}
                  onChange={(e) => setForm({ ...form, facebookUrl: e.target.value })}
                  placeholder="https://facebook.com/..."
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  LinkedIn Page URL
                </label>
                <input
                  type="url"
                  value={form.linkedinUrl || ''}
                  onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                  placeholder="https://linkedin.com/..."
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-md shadow-red-600/20 disabled:opacity-50 transition-all hover:scale-[1.02]"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving Settings...' : 'Save All Settings'}</span>
            </button>
          </div>
        </form>
      )}
    </AdminShell>
  )
}
