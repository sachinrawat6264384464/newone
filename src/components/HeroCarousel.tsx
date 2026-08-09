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

const slides: Slide[] = [
  {
    id: 1,
    tagline: "CONSTRUCTION · INTERIORS · ARCHITECTURE",
    title: "Designing Spaces. Building Dreams.",
    subtitle: "A studio practice spanning architecture, interior design, and turnkey civil construction — delivering a single, accountable team from first sketch to final handover.",
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
    image: "/Facade_3.jpg",
  },
  {
    id: 4,
    tagline: "SERENE BEDROOMS · MODERN KITCHENS",
    title: "Interior Refinement. Lasting Luxury.",
    subtitle: "Redefine your living environments with thoughtfully curated interiors that bring warmth, style, and functional elegance.",
    image: "/Living_3.jpg",
  },
]

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative min-h-[90vh] lg:h-screen w-full overflow-hidden bg-slate-950 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.65)), url(${slides[currentSlide].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Subtle vignette gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/60" />

          {/* Main Hero Content */}
          <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10 pt-16 pb-20">
            <div className="max-w-4xl mx-auto text-center px-2">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-white space-y-6"
              >
                {/* Category Tagline */}
                <motion.div
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <span className="text-red-400 font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase block mb-3">
                    {slides[currentSlide].tagline}
                  </span>
                </motion.div>

                {/* Main Headline (Luxury Serif) */}
                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-normal tracking-tight leading-[1.1] max-w-5xl mx-auto drop-shadow-md"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                {/* Subtitle / Paragraph */}
                <motion.p
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="text-gray-200/90 text-sm sm:text-base md:text-lg lg:text-xl font-light max-w-3xl mx-auto leading-relaxed"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 sm:pt-6"
                >
                  <Link
                    href="/gallery"
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-md shadow-lg transition-all transform hover:scale-[1.02]"
                  >
                    <span>View Projects</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="https://tidycal.com/homestorey/free-design-discussion"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center border border-white/40 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-medium text-sm sm:text-base px-7 py-3.5 rounded-md transition-all"
                  >
                    <span>Get Free Consultation</span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons (Left/Right Arrows) */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white/80 hover:text-white p-3 rounded-full backdrop-blur-sm transition-all border border-white/10 hidden sm:flex items-center justify-center"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white/80 hover:text-white p-3 rounded-full backdrop-blur-sm transition-all border border-white/10 hidden sm:flex items-center justify-center"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-8 bg-red-500'
                : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroCarousel