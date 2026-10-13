// components/RightContactCard.tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm, SubmitHandler } from 'react-hook-form'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import toast from 'react-hot-toast'
import { X, Send, Phone, Mail, User, MessageSquare } from 'lucide-react'

interface ContactCardFormData {
  name: string
  email: string
  phone: string
  message: string
}

interface RightContactCardProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function RightContactCard({ isOpen = false, onClose = () => {} }: RightContactCardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactCardFormData>()

  const onSubmit: SubmitHandler<ContactCardFormData> = async (data) => {
    setIsSubmitting(true)

    // Save lead to local cache for instant admin sync
    const newLead = {
      id: 'lead-' + Date.now(),
      firstName: data.name,
      lastName: '',
      email: data.email,
      phone: data.phone,
      message: data.message,
      status: 'new',
      timestamp: { toDate: () => new Date() }
    }
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('homestorey_contact_leads_cache')
        const existing = stored ? JSON.parse(stored) : []
        localStorage.setItem('homestorey_contact_leads_cache', JSON.stringify([newLead, ...existing]))
        window.dispatchEvent(new Event('contact_leads_updated'))
      } catch (e) {
        console.warn('LocalStorage save lead error:', e)
      }
    }

    try {
      await addDoc(collection(db, 'contacts'), {
        firstName: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        timestamp: serverTimestamp(),
        status: 'new'
      })

      try {
        await fetch('/api/send-notification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
      } catch (e) {
        console.error('Email notification failed:', e)
      }

      toast.success("Thank you! We will get back to you shortly.")
      reset()
      onClose()
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50"
          />

          {/* Right Floating Card Form */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white text-slate-900 z-50 shadow-2xl overflow-y-auto flex flex-col border-l border-gray-100"
          >
            {/* Header with Cross (X) button */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-slate-950 text-white">
              <div>
                <span className="text-red-500 text-xs font-semibold tracking-widest uppercase block">Get In Touch</span>
                <h3 className="text-xl font-serif-luxury font-bold">Contact Us</h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close Contact Form"
                className="p-2 text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <div className="p-6 flex-1">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="John Doe"
                    />
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                      })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="john@example.com"
                    />
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      {...register('phone', { required: 'Phone is required' })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="+91 98765 43210"
                    />
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    Message *
                  </label>
                  <div className="relative">
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      rows={4}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                      placeholder="Tell us about your project requirements..."
                    />
                    <MessageSquare className="w-4 h-4 text-gray-400 absolute left-3 top-4" />
                  </div>
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-red-600/20 disabled:opacity-50 mt-4 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
