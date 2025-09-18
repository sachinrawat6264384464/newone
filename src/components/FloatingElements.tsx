// components/FloatingElements.tsx
'use client'
import { motion } from 'framer-motion'
import { Home, Palette, Lightbulb, Ruler, Hammer, Paintbrush } from 'lucide-react'

const FloatingElements = () => {
  const elements = [
    { Icon: Home, delay: 0, x: '10%', y: '20%', color: 'text-primary-400' },
    { Icon: Palette, delay: 0.5, x: '80%', y: '30%', color: 'text-brick-400' },
    { Icon: Lightbulb, delay: 1, x: '15%', y: '70%', color: 'text-yellow-400' },
    { Icon: Ruler, delay: 1.5, x: '85%', y: '80%', color: 'text-green-400' },
    { Icon: Hammer, delay: 2, x: '50%', y: '15%', color: 'text-purple-400' },
    { Icon: Paintbrush, delay: 2.5, x: '25%', y: '85%', color: 'text-pink-400' },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element, index) => {
        const { Icon, delay, x, y, color } = element
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ 
              opacity: [0, 0.3, 0.1, 0.2],
              scale: [0, 1.2, 0.8, 1],
              rotate: [0, 360],
              y: [0, -20, 0, -10, 0]
            }}
            transition={{
              duration: 20,
              delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute"
            style={{ left: x, top: y }}
          >
            <div className={`${color} opacity-20 transform rotate-12 hover:opacity-40 transition-opacity duration-300`}>
              <Icon size={40} />
            </div>
          </motion.div>
        )
      })}
      
      {/* Geometric shapes */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 right-1/4 w-20 h-20 border-2 border-primary-200 rounded-lg opacity-20"
      />
      
      <motion.div
        animate={{
          rotate: [360, 0],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/3 left-1/5 w-16 h-16 bg-gradient-to-br from-brick-300 to-primary-300 rounded-full opacity-20"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-2/3 right-1/3 w-24 h-24 border border-brick-300 transform rotate-45 opacity-15"
      />
    </div>
  )
}

export default FloatingElements