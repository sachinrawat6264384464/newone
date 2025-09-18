// app/admin/page.tsx
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, ArrowRight } from 'lucide-react'

export default function AdminRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to login after 2 seconds
    const timer = setTimeout(() => {
      router.push('/admin/login')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-brick-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto p-8"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 bg-gradient-to-r from-primary-600 to-brick-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <Home className="w-10 h-10 text-white" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Admin Access
        </h1>
        
        <p className="text-gray-600 mb-6">
          Redirecting to admin login page...
        </p>
        
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex items-center justify-center space-x-2 text-primary-600"
        >
          <span className="font-medium">Redirecting</span>
          <ArrowRight className="w-5 h-5" />
        </motion.div>
        
        <div className="mt-8">
          <button
            onClick={() => router.push('/admin/login')}
            className="text-sm text-gray-500 hover:text-primary-600 transition-colors underline"
          >
            Click here if not redirected automatically
          </button>
        </div>
      </motion.div>
    </div>
  )
}