// components/HeroCarousel.tsx
'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Award } from 'lucide-react'

interface Slide {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  cta: string
  accent: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Shape Dream Home",
    subtitle: "Expert Interior Design & Construction",
    description: "Create beautiful, functional spaces that reflect your style and enhance your lifestyle with our award-winning team.",
    image: "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298136/Homestorey-media/Hero/hfqrz6nqcaxbwa22urgx.jpg",
    cta: "Start Your Project",
    accent: "from-red-500 to-orange-500"
  },
  {
    id: 2,
    title: "Luxury Kitchen Solutions",
    subtitle: "Where Culinary Dreams Come Alive",
    description: "Design the heart of your home with our expert kitchen renovation services that blend functionality with stunning aesthetics.",
    image: "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298138/Homestorey-media/Hero/haemuplqyv9glq1651fc.jpg",
    cta: "Explore Kitchens",
    accent: "from-red-500 to-orange-500"
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
    <div className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slides[currentSlide].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Animated Background Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30"></div>
          
          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-20 right-20 w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm"
          />
          <motion.div
            animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-32 right-32 w-16 h-16 bg-gradient-to-br from-primary-400/30 to-brick-400/30 rounded-lg backdrop-blur-sm"
          />

          <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Content */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-white space-y-6"
              >
                {/* Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className={`inline-flex items-center space-x-2 bg-gradient-to-r ${slides[currentSlide].accent} px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}
                >
                  <Award className="w-4 h-4" />
                  <span>{slides[currentSlide].subtitle}</span>
                </motion.div>

                {/* Main title: native <h1> for crawlers; animation on inner spans only */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                  {slides[currentSlide].title.split(' ').map((word, index) => (
                    <motion.span
                      key={`${currentSlide}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                      className={
                        index === 2
                          ? `block bg-gradient-to-r ${slides[currentSlide].accent} bg-clip-text text-transparent`
                          : ''
                      }
                    >
                      {word}{' '}
                    </motion.span>
                  ))}
                </h1>

                {/* Description */}
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto"
                >
                  {slides[currentSlide].description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 pt-6 justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-gradient-to-r ${slides[currentSlide].accent} text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-2xl inline-flex items-center space-x-2 justify-center`}
                  >
                    <span>{slides[currentSlide].cta}</span>
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                  
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="flex items-center justify-center space-x-6 pt-8 flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">4.5/5 Rating</span>
                  </div>
                  <div className="w-px h-6 bg-white/30 hidden sm:block"></div>
                  <div className="text-white font-semibold">300+ Projects</div>
                  <div className="w-px h-6 bg-white/30 hidden sm:block"></div>
                  <div className="text-white font-semibold">10+ Years</div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <motion.button
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 border border-white/30"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 border border-white/30"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
            className="relative group"
          >
            <div className={`w-12 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white shadow-lg' 
                : 'bg-white/50 hover:bg-white/70'
            }`}>
              {index === currentSlide && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6 }}
                  className="h-full bg-gradient-to-r from-primary-500 to-brick-500 rounded-full"
                />
              )}
            </div>
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Slide {index + 1}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <motion.div
          key={currentSlide}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-full bg-gradient-to-r from-primary-500 to-brick-500"
        />
      </div>
    </div>
  )
}

export default HeroCarousel