// components/HeroCarousel.tsx
'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Star, Award } from 'lucide-react'

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
    title: "Transform Your Dream Home",
    subtitle: "Expert Interior Design & Construction",
    description: "Create beautiful, functional spaces that reflect your style and enhance your lifestyle with our award-winning team.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&h=1080&fit=crop",
    cta: "Start Your Project",
    accent: "from-red-500 to-orange-500"
  },
  {
    id: 2,
    title: "Luxury Kitchen Solutions",
    subtitle: "Where Culinary Dreams Come Alive",
    description: "Design the heart of your home with our expert kitchen renovation services that blend functionality with stunning aesthetics.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&h=1080&fit=crop",
    cta: "Explore Kitchens",
    accent: "from-red-500 to-orange-500"
  },
  {
    id: 3,
    title: "Commercial Excellence",
    subtitle: "Inspiring Professional Environments",
    description: "Transform your business environment with our commercial design expertise that enhances productivity and impresses clients.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop",
    cta: "View Commercial",
    accent: "from-red-500 to-orange-500"
  }
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

          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
              {/* Content Side */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
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

                {/* Main Title */}
                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-5xl md:text-7xl font-bold leading-tight"
                >
                  {slides[currentSlide].title.split(' ').map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className={index === 2 ? `block bg-gradient-to-r ${slides[currentSlide].accent} bg-clip-text text-transparent` : ''}
                    >
                      {word}{' '}
                    </motion.span>
                  ))}
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="text-xl text-gray-200 leading-relaxed max-w-lg"
                >
                  {slides[currentSlide].description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-gradient-to-r ${slides[currentSlide].accent} text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-2xl inline-flex items-center space-x-2`}
                  >
                    <span>{slides[currentSlide].cta}</span>
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white hover:text-gray-900 transition-all duration-300 inline-flex items-center space-x-2"
                  >
                    <Play className="w-5 h-5" />
                    <span>Watch Portfolio</span>
                  </motion.button>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="flex items-center space-x-6 pt-6"
                >
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">4.9/5 Rating</span>
                  </div>
                  <div className="w-px h-6 bg-white/30"></div>
                  <div className="text-white font-semibold">300+ Projects</div>
                  <div className="w-px h-6 bg-white/30"></div>
                  <div className="text-white font-semibold">10+ Years</div>
                </motion.div>
              </motion.div>

              {/* Visual Side */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="hidden lg:block relative"
              >
                <div className="relative">
                  {/* Decorative Elements */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-10 -right-10 w-20 h-20 border-2 border-white/30 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-10 -left-10 w-16 h-16 bg-gradient-to-br from-primary-400/30 to-brick-400/30 rounded-lg backdrop-blur-sm"
                  />
                  
                  {/* Main Visual Container */}
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-bold text-xl">Project Preview</h3>
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>
                      </div>
                      <div className="h-48 bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="text-white/70 text-center"
                        >
                          <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                            <Play className="w-8 h-8" />
                          </div>
                          <p className="font-semibold">Interactive Preview</p>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
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