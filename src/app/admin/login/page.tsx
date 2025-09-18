// app/admin/login/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAuth } from '../../../lib/auth'
import toast from 'react-hot-toast'
import { Lock, Mail, Shield } from 'lucide-react'

interface LoginFormData {
  email: string
  password: string
}

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    defaultValues: {
      email: 'admin@gmail.com',
      password: 'admin@123'
    }
  })

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setIsLoading(true)
    
    try {
      console.log('Attempting login with:', data.email)
      await login(data.email, data.password)
      
      toast.success('Welcome back to Home Storey Admin!')
      console.log('Login successful, redirecting to dashboard...')
      
      // Small delay to show the success message, then redirect
      setTimeout(() => {
        router.push('/admin/dashboard')
      }, 1000)
      
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Invalid credentials. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-brick-pattern opacity-5"></div>
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-200 to-red-200 rounded-full opacity-20"
      />
      <motion.div
        animate={{ rotate: -360, y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-red-200 to-blue-200 rounded-full opacity-20"
      />
      
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full space-y-8 relative z-10"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent"
          >
            Admin Portal
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-3 text-gray-600"
          >
            Secure access to Home Storey management
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/50"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                  placeholder="admin@gmail.com"
                />
                <Mail className="w-5 h-5 text-blue-500 absolute left-4 top-1/2 transform -translate-y-1/2" />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-sm mt-2"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                  placeholder="admin@123"
                />
                <Lock className="w-5 h-5 text-blue-500 absolute left-4 top-1/2 transform -translate-y-1/2" />
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-sm mt-2"
                >
                  {errors.password.message}
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>Access Dashboard</span>
                </>
              )}
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-red-50 rounded-xl border border-blue-200"
          >
            <p className="text-sm text-gray-600 text-center">
              <span className="font-semibold text-blue-600">Demo Credentials:</span><br />
              Email: admin@gmail.com<br />
              Password: admin@123
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}