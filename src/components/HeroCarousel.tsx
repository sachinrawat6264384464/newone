// components/HeroCarousel.tsx
'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Slide {
  id: number
  tagline: string
  title: string
  subtitle: string
  image: string
}

import { getSiteSettings } from '@/lib/settings'
import { formatCloudinaryUrl } from '@/lib/cloudinary'

import Image from 'next/image'

function formatGoogleDriveUrl(url: string): string {
  if (!url) return url
  const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  if (driveMatch && driveMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`
  }
  return url
}

function getOptimizedImageUrl(url: string): string {
  if (!url) return url
  const driveFormatted = formatGoogleDriveUrl(url)
  if (driveFormatted.includes('res.cloudinary.com') && driveFormatted.includes('/upload/')) {
    // Map older low-resolution hero photos to new Full-HD 16:9 WebP slides
    if (driveFormatted.includes('hfqrz6nqcaxbwa22urgx')) {
      return 'https://res.cloudinary.com/dfjecbhki/image/upload/v1791811243/Homestorey-media/Hero/slide-1-dining.webp'
    }
    if (driveFormatted.includes('haemuplqyv9glq1651fc')) {
      return 'https://res.cloudinary.com/dfjecbhki/image/upload/v1791811243/Homestorey-media/Hero/slide-2-kitchen.webp'
    }
    if (driveFormatted.includes('vt9avmrazh3jvii5ytl9')) {
      return 'https://res.cloudinary.com/dfjecbhki/image/upload/v1791811244/Homestorey-media/Hero/slide-3-facade.webp'
    }
    if (driveFormatted.includes('jjhie0tfazmie9laeimu')) {
      return 'https://res.cloudinary.com/dfjecbhki/image/upload/v1791811245/Homestorey-media/Hero/slide-4-bedroom.webp'
    }

    // For all other Cloudinary images, deliver in high-definition WebP format
    if (!driveFormatted.includes('/f_webp') && !driveFormatted.includes('/f_auto')) {
      return driveFormatted.replace('/upload/', '/upload/f_webp,q_auto:best/')
    }
  }
  return driveFormatted
}

interface Slide {
  id: number
  tagline: string
  title: string
  subtitle: string
  image: string
}

const DEFAULT_SLIDES: Slide[] = [
  {
    id: 1,
    tagline: "CONSTRUCTION · INTERIORS · ARCHITECTURE",
    title: "Look At What We Design.",
    subtitle: "From bespoke architectural facades to functional luxury interiors, we transform spaces with precision, innovation, and timeless elegance.",
    image: "https://res.cloudinary.com/dfjecbhki/image/upload/v1791811243/Homestorey-media/Hero/slide-1-dining.webp",
  },
  {
    id: 2,
    tagline: "ARCHITECTURE · INTERIORS · TURNKEY",
    title: "Bespoke Residences. Unmatched Quality.",
    subtitle: "Transforming residential and commercial properties into architectural masterpieces tailored meticulously to your lifestyle.",
    image: "https://res.cloudinary.com/dfjecbhki/image/upload/v1791811243/Homestorey-media/Hero/slide-2-kitchen.webp",
  },
  {
    id: 3,
    tagline: "LUXURY HOMES · EXPERT EXECUTION",
    title: "Crafting Elegance. Creating Comfort.",
    subtitle: "From initial conceptual rendering to key handover, our team manages every detail of your dream build with complete transparency.",
    image: "https://res.cloudinary.com/dfjecbhki/image/upload/v1791811244/Homestorey-media/Hero/slide-3-facade.webp",
  },
  {
    id: 4,
    tagline: "SERENE BEDROOMS · MODERN KITCHENS",
    title: "Interior Refinement. Lasting Luxury.",
    subtitle: "Redefine your living environments with thoughtfully curated interiors that bring warmth, style, and functional elegance.",
    image: "https://res.cloudinary.com/dfjecbhki/image/upload/v1791811245/Homestorey-media/Hero/slide-4-bedroom.webp",
  },
]

interface HeroCarouselProps {
  siteSettings?: any
}

const HeroCarousel = ({ siteSettings }: HeroCarouselProps) => {
  const getInitialSlides = (): Slide[] => {
    if (siteSettings?.heroSlides && siteSettings.heroSlides.length > 0) {
      return siteSettings.heroSlides.map((slide: any, idx: number) => ({
        id: idx + 1,
        tagline: slide.tagline || "CONSTRUCTION · INTERIORS · ARCHITECTURE",
        title: slide.title || "Look At What We Design.",
        subtitle: slide.subtitle || "From bespoke architectural facades to functional luxury interiors...",
        image: formatGoogleDriveUrl(slide.image)
      }))
    }
    return DEFAULT_SLIDES
  }

  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<Slide[]>(getInitialSlides)

  const fetchSlides = () => {
    getSiteSettings().then(settings => {
      if (settings.heroSlides && settings.heroSlides.length > 0) {
        const mapped = settings.heroSlides.map((slide, idx) => ({
          id: idx + 1,
          tagline: slide.tagline || "CONSTRUCTION · INTERIORS · ARCHITECTURE",
          title: slide.title || "Look At What We Design.",
          subtitle: slide.subtitle || "From bespoke architectural facades to functional luxury interiors, we transform spaces with precision.",
          image: getOptimizedImageUrl(slide.image)
        }))
        setSlides(mapped)
        setCurrentSlide((prev) => (prev >= mapped.length ? 0 : prev))
      } else if (settings.heroImages && settings.heroImages.length > 0) {
        const customSlides = settings.heroImages.map((img, idx) => ({
          id: idx + 1,
          tagline: "CONSTRUCTION · INTERIORS · ARCHITECTURE",
          title: settings.heroTitle || "Look At What We Design.",
          subtitle: settings.heroSubtitle || "From bespoke architectural facades to functional luxury interiors, we transform spaces with precision.",
          image: getOptimizedImageUrl(img)
        }))
        setSlides(customSlides)
        setCurrentSlide((prev) => (prev >= customSlides.length ? 0 : prev))
      }
    })
  }

  useEffect(() => {
    fetchSlides()
    window.addEventListener('storage', fetchSlides)
    window.addEventListener('site_settings_updated', fetchSlides)
    return () => {
      window.removeEventListener('storage', fetchSlides)
      window.removeEventListener('site_settings_updated', fetchSlides)
    }
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const safeIdx = currentSlide < slides.length ? currentSlide : 0
  const activeSlide = slides[safeIdx] || slides[0] || DEFAULT_SLIDES[0]
  const slideImageUrl = getOptimizedImageUrl(activeSlide.image)

  return (
    <div className="relative h-screen min-h-screen w-full overflow-hidden bg-slate-950 flex items-center justify-center select-none">
      {/* Preload active slide image for fast LCP */}
      <link rel="preload" as="image" href={slideImageUrl} fetchPriority="high" />

      <AnimatePresence mode="wait">
        <motion.div
          key={safeIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Full Width HD Image (Clean, Bright, No Dark Tint or Blur) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={slideImageUrl}
              alt={activeSlide.title}
              fill
              priority
              sizes="100vw"
              unoptimized
              className="w-full h-full object-cover object-center z-0"
            />
          </div>

          {/* Directional Bottom-Left Gradient for Text Readability without darkening the whole image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/85 via-slate-950/30 to-transparent pointer-events-none z-0" />
          <div className="absolute bottom-0 left-0 w-full h-3/5 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none z-0" />

          {/* Luxury Left-Aligned Content Container (Matching Reference Design) */}
          <div className="container mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 h-full flex flex-col justify-end pb-20 sm:pb-24 lg:pb-28 relative z-10">
            <div className="max-w-3xl text-left space-y-5">
              {/* Main Headline (Luxury Serif Typography) */}
              <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-normal tracking-tight leading-[1.12] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] max-w-2xl">
                {activeSlide.title}
              </h1>

              {/* Refined Description Subtitle */}
              {activeSlide.subtitle && (
                <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-light drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                  {activeSlide.subtitle}
                </p>
              )}

              {/* CTA Action Buttons (Side-by-Side, Left Aligned) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3 sm:pt-4">
                <Link
                  href="/contact"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-7 py-4 rounded-md shadow-xl transition-all transform hover:scale-[1.02] inline-flex items-center justify-center space-x-2"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="https://wa.me/919625769768?text=Hi!%20I'm%20interested%20in%20Home%20Storey's%20design%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black/40 hover:bg-black/70 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider px-6 py-4 rounded-md border border-white/20 backdrop-blur-md shadow-xl transition-all transform hover:scale-[1.02] inline-flex items-center justify-center space-x-2.5"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>WhatsApp The Studio</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators with 48x48px Accessible Touch Targets */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-1">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
          >
            <span
              className={`h-2 transition-all duration-300 rounded-full block ${
                index === currentSlide
                  ? 'w-8 bg-red-500'
                  : 'w-2 bg-white/50 hover:bg-white'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default HeroCarousel