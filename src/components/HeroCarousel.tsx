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
    image: "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298136/Homestorey-media/Hero/hfqrz6nqcaxbwa22urgx.jpg",
  },
  {
    id: 2,
    tagline: "ARCHITECTURE · INTERIORS · TURNKEY",
    title: "Bespoke Residences. Unmatched Quality.",
    subtitle: "Transforming residential and commercial properties into architectural masterpieces tailored meticulously to your lifestyle.",
    image: "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298138/Homestorey-media/Hero/haemuplqyv9glq1651fc.jpg",
  },
  {
    id: 3,
    tagline: "LUXURY HOMES · EXPERT EXECUTION",
    title: "Crafting Elegance. Creating Comfort.",
    subtitle: "From initial conceptual rendering to key handover, our team manages every detail of your dream build with complete transparency.",
    image: "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298162/Homestorey-media/What%20we%20create/vt9avmrazh3jvii5ytl9.jpg",
  },
  {
    id: 4,
    tagline: "SERENE BEDROOMS · MODERN KITCHENS",
    title: "Interior Refinement. Lasting Luxury.",
    subtitle: "Redefine your living environments with thoughtfully curated interiors that bring warmth, style, and functional elegance.",
    image: "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298165/Homestorey-media/What%20we%20create/jjhie0tfazmie9laeimu.jpg",
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
          image: formatGoogleDriveUrl(slide.image)
        }))
        setSlides(mapped)
        setCurrentSlide((prev) => (prev >= mapped.length ? 0 : prev))
      } else if (settings.heroImages && settings.heroImages.length > 0) {
        const customSlides = settings.heroImages.map((img, idx) => ({
          id: idx + 1,
          tagline: "CONSTRUCTION · INTERIORS · ARCHITECTURE",
          title: settings.heroTitle || "Look At What We Design.",
          subtitle: settings.heroSubtitle || "From bespoke architectural facades to functional luxury interiors, we transform spaces with precision.",
          image: formatGoogleDriveUrl(img)
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

  // Auto loop removed per user request (manual slide navigation only)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const safeIdx = currentSlide < slides.length ? currentSlide : 0
  const activeSlide = slides[safeIdx] || slides[0] || DEFAULT_SLIDES[0]

  return (
    <div className="relative min-h-[90vh] lg:h-screen w-full overflow-hidden bg-slate-950 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={safeIdx}
          initial={safeIdx === 0 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {/* Optimized Hero Image */}
          <Image
            src={formatCloudinaryUrl(activeSlide.image, 800)}
            alt={activeSlide.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            quality={75}
            className="object-cover object-center z-0"
          />

          {/* Dark Overlay for Text Legibility */}
          <div className="absolute inset-0 bg-slate-950/45 z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/40 z-0" />

          {/* Main Hero Content */}
          <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10 pt-16 pb-20">
            <div className="max-w-4xl mx-auto text-center px-2">
              <div className="text-white space-y-6">
                {/* Category Tagline */}
                <div>
                  <span className="text-red-400 font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase block mb-3">
                    {activeSlide.tagline}
                  </span>
                </div>

                {/* Main Headline (Instant Render for Fast LCP) */}
                <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-normal tracking-tight leading-[1.1] max-w-5xl mx-auto drop-shadow-md">
                  {activeSlide.title}
                </h1>

                {/* Subtitle removed per user request */}

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 sm:pt-6">
                  <Link
                    href="/gallery"
                    prefetch={false}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-md shadow-lg transition-all transform hover:scale-[1.02]"
                  >
                    <span>View Projects</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons (Left/Right Arrows) */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white/80 hover:text-white p-3 min-w-[48px] min-h-[48px] rounded-full backdrop-blur-sm transition-all border border-white/10 hidden sm:flex items-center justify-center cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white/80 hover:text-white p-3 min-w-[48px] min-h-[48px] rounded-full backdrop-blur-sm transition-all border border-white/10 hidden sm:flex items-center justify-center cursor-pointer"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

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