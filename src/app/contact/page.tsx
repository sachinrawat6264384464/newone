// app/contact/page.tsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm, SubmitHandler } from 'react-hook-form'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import toast from 'react-hot-toast'
import Layout from '../../components/Layout'
import { Mail, MapPin, Clock, Send, CheckCircle, ArrowRight } from 'lucide-react'
import TrustpilotReviewCollector from '@/components/TrustPilotReviewCollector'
import Link from 'next/link'

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  propertyAddress: string
  pinCode: string
  houseType: string
  requirements: string
  preferredContact: string
  projectType: string
  budget?: string
  message: string
}

const inputClass =
  'w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200'

const labelClass = 'block text-xs font-semibold text-slate-600 tracking-wider uppercase mb-1.5'

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>()

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setIsSubmitting(true)

    // Sync to local cache so new lead shows up instantly in Admin Contact Leads
    const newLead = {
      id: 'lead-' + Date.now(),
      ...data,
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
        ...data,
        timestamp: serverTimestamp(),
        status: 'new'
      })
      try {
        const response = await fetch('/api/send-notification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        if (!response.ok) {
          const errorData = await response.json()
          console.error('Email notification failed:', errorData)
        }
      } catch (emailError) {
        console.error('Email notification error:', emailError)
      }
      toast.success("Thank you! We'll get back to you within 24 hours.")
      reset()
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const features = [
    "Free initial consultation",
    "3D design visualization",
    "Premium quality materials",
    "Experienced design team",
    "Project timeline guarantee",
    "Post-completion support"
  ]

  const stats = [
    { value: "10+", label: "Years Experience" },
    { value: "300+", label: "Designs Created" },
    { value: "250+", label: "Happy Clients" },
    { value: "4.5★", label: "Avg Rating" },
  ]

  return (
    <Layout>
      <div className="min-h-screen bg-[#FAF8F5]">

        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative pt-32 pb-20 bg-[#FAF8F5] overflow-hidden">
          {/* Subtle grid bg */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

          <div className="container mx-auto px-6 text-center relative z-10 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-red-500 font-semibold text-xs tracking-[0.28em] uppercase block mb-4">
                LET'S CONNECT
              </span>
              <h1 className="font-serif-luxury text-5xl md:text-6xl font-semibold text-slate-900 leading-tight mb-5">
                Start Your Dream<br />
                <span className="italic text-red-500">Design Journey.</span>
              </h1>
              <div className="w-12 h-px bg-red-500 mx-auto mb-6" />
              <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-light">
                Ready to transform your space? Tell us about your vision and our expert team will craft a personalised design plan just for you.
              </p>

              {/* Stat pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-3 mt-8"
              >
                {[
                  { label: "4.5/5 Rating", icon: "★" },
                  { label: "250+ Happy Clients", icon: "✦" },
                  { label: "24hr Response", icon: "✓" },
                ].map((pill) => (
                  <span
                    key={pill.label}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 bg-white border border-gray-200 px-4 py-1.5 rounded-full shadow-sm"
                  >
                    <span className="text-red-500">{pill.icon}</span>
                    {pill.label}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Form + Info ───────────────────────────────── */}
        <section className="py-16 bg-[#FAF8F5]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-6xl mx-auto">

              {/* ── Contact Form (3 cols) */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-3"
              >
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-8">
                  <span className="text-red-500 text-xs font-semibold tracking-[0.22em] uppercase block mb-1">Enquiry Form</span>
                  <h2 className="font-serif-luxury text-2xl font-semibold text-slate-900 mb-6">Send Us a Message</h2>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>First Name *</label>
                        <input type="text" {...register('firstName', { required: 'Required' })}
                          className={inputClass} placeholder="Nidhi" />
                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>Last Name *</label>
                        <input type="text" {...register('lastName', { required: 'Required' })}
                          className={inputClass} placeholder="Mittal" />
                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className={labelClass}>Email Address *</label>
                      <input type="email" {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                      })} className={inputClass} placeholder="you@example.com" />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className={labelClass}>Phone Number *</label>
                      <input type="tel" {...register('phone', { required: 'Phone is required' })}
                        className={inputClass} placeholder="+91 98765 43210" />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>

                    {/* Property Address */}
                    <div>
                      <label className={labelClass}>Property Address *</label>
                      <input type="text" {...register('propertyAddress', { required: 'Address is required' })}
                        className={inputClass} placeholder="Street, Area, City, State" />
                      {errors.propertyAddress && <p className="text-red-500 text-xs mt-1">{errors.propertyAddress.message}</p>}
                    </div>

                    {/* Pin Code */}
                    <div>
                      <label className={labelClass}>Pin Code *</label>
                      <input type="text" {...register('pinCode', {
                        required: 'Pin code is required',
                        pattern: { value: /^\d{6}$/, message: '6-digit pin code required' }
                      })} className={inputClass} placeholder="110001" maxLength={6} />
                      {errors.pinCode && <p className="text-red-500 text-xs mt-1">{errors.pinCode.message}</p>}
                    </div>

                    {/* House Type + Requirements */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Type of House *</label>
                        <select {...register('houseType', { required: 'Required' })} className={inputClass}>
                          <option value="">Select type</option>
                          <option value="3bhk">3 BHK</option>
                          <option value="4bhk">4 BHK</option>
                          <option value="villa">Villa</option>
                          <option value="penthouse">Penthouse</option>
                          <option value="independent-house">Independent House</option>
                        </select>
                        {errors.houseType && <p className="text-red-500 text-xs mt-1">{errors.houseType.message}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>Requirements *</label>
                        <select {...register('requirements', { required: 'Required' })} className={inputClass}>
                          <option value="">Select requirement</option>
                          <option value="full-home-design">Full Home Design</option>
                          <option value="partial-home-design">Partial Home Design</option>
                          <option value="renovation-required">Renovation</option>
                        </select>
                        {errors.requirements && <p className="text-red-500 text-xs mt-1">{errors.requirements.message}</p>}
                      </div>
                    </div>

                    {/* Preferred Contact + Budget */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Best Way to Reach *</label>
                        <select {...register('preferredContact', { required: 'Required' })} className={inputClass}>
                          <option value="">Select method</option>
                          <option value="whatsapp">WhatsApp</option>
                          <option value="call">Call</option>
                          <option value="email">Email</option>
                        </select>
                        {errors.preferredContact && <p className="text-red-500 text-xs mt-1">{errors.preferredContact.message}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>Budget Range</label>
                        <select {...register('budget')} className={inputClass}>
                          <option value="">Select budget</option>
                          <option value="20-30-lakh">₹20 – ₹30 Lakh</option>
                          <option value="30-40-lakh">₹30 – ₹40 Lakh</option>
                          <option value="40-50-lakh">₹40 – ₹50 Lakh</option>
                          <option value="50-plus-lakh">₹50+ Lakh</option>
                        </select>
                      </div>
                    </div>

                    {/* Specific Area */}
                    <div>
                      <label className={labelClass}>Specific Area Focus (Optional)</label>
                      <select {...register('projectType')} className={inputClass}>
                        <option value="">Select area</option>
                        <option value="kitchen">Kitchen</option>
                        <option value="bathroom">Bathroom</option>
                        <option value="living">Living Area</option>
                        <option value="bedroom">Bedroom</option>
                        <option value="dining">Dining Area</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className={labelClass}>Additional Message *</label>
                      <textarea {...register('message', { required: 'Message is required' })}
                        rows={4} className={`${inputClass} resize-none`}
                        placeholder="Tell us about your project, timeline, and specific requirements..." />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.01, boxShadow: '0 8px 24px rgba(239,68,68,0.3)' }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 px-6 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                          <span>Sending...</span>
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

              {/* ── Info Sidebar (2 cols) */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="lg:col-span-2 space-y-6"
              >
                {/* Heading */}
                <div>
                  <span className="text-red-500 text-xs font-semibold tracking-[0.22em] uppercase block mb-1">Contact Details</span>
                  <h2 className="font-serif-luxury text-2xl font-semibold text-slate-900 mb-2">Contact Information</h2>
                  <div className="w-8 h-px bg-red-500 mb-3" />
                  <p className="text-slate-500 text-sm leading-relaxed font-light">
                    Get in touch with us today to start your journey toward a beautiful, functional space that exceeds your expectations.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-3">
                  {[
                    {
                      icon: <Mail className="w-5 h-5" />,
                      title: "Email",
                      value: "homestorey@thenidhimittal.com",
                      sub: "Response within 24 hours",
                      href: "mailto:homestorey@thenidhimittal.com"
                    },
                    {
                      icon: <MapPin className="w-5 h-5" />,
                      title: "Office Location",
                      value: "Delhi, India",
                      sub: "Visit by appointment only"
                    },
                    {
                      icon: <Clock className="w-5 h-5" />,
                      title: "Business Hours",
                      value: "Mon–Fri: 9 AM – 7 PM",
                      sub: "Sat: 10 AM – 5 PM • Sun: Appointment"
                    },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 4 }}
                      className="flex items-start gap-4 bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm"
                    >
                      <div className="bg-red-50 border border-red-100 p-2.5 rounded-lg text-red-500 flex-shrink-0">
                        {card.icon}
                      </div>
                      <div>
                        <p className="text-slate-900 font-semibold text-sm">{card.title}</p>
                        {card.href ? (
                          <a href={card.href} className="text-red-500 hover:text-red-600 text-xs font-medium">{card.value}</a>
                        ) : (
                          <p className="text-slate-700 text-xs font-medium">{card.value}</p>
                        )}
                        <p className="text-slate-400 text-xs mt-0.5">{card.sub}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>


              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Stats Bar ─────────────────────────────────── */}
        <section className="py-14 bg-slate-950 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto text-center">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl font-bold text-red-400 mb-1 font-serif-luxury">{s.value}</div>
                  <div className="text-slate-400 text-xs tracking-wider uppercase">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </Layout>
  )
}