'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Check, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  HelpCircle,
  Video
} from 'lucide-react'
import toast from 'react-hot-toast'
import { db } from '@/lib/firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

export default function EventLandingPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    pincode: '',
    serviceType: 'Full Home Interiors',
    budget: '₹20–40 Lakhs'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const scrollToForm = () => {
    const formElement = document.getElementById('consultation-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Save lead to Firestore / LocalStorage fallback
      const payload = {
        firstName: formData.fullName.split(' ')[0] || formData.fullName,
        lastName: formData.fullName.split(' ').slice(1).join(' ') || '',
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        pincode: formData.pincode,
        projectType: formData.serviceType,
        budget: formData.budget,
        message: `Event Consultation Request from ${formData.city} (Pincode: ${formData.pincode})`,
        status: 'new',
        createdAt: Date.now(),
        timestamp: Timestamp.now()
      }

      try {
        await addDoc(collection(db, 'contacts'), payload)
      } catch (fireErr) {
        console.warn('Firestore write warning (using fallback):', fireErr)
      }

      // Also save to LocalStorage for local leads management
      try {
        const storedLeads = JSON.parse(localStorage.getItem('homestorey_event_leads') || '[]')
        storedLeads.unshift({ id: `lead-${Date.now()}`, ...payload })
        localStorage.setItem('homestorey_event_leads', JSON.stringify(storedLeads))
      } catch (lsErr) {
        console.warn('LocalStorage save warning:', lsErr)
      }

      toast.success('🎉 Success! Your consultation slot has been requested. We will contact you shortly!')
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        pincode: '',
        serviceType: 'Full Home Interiors',
        budget: '₹20–40 Lakhs'
      })
    } catch (err) {
      console.error('Error submitting form:', err)
      toast.error('Something went wrong. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const testimonials = [
    {
      quote: "Nidhi understood our lifestyle and created a practical plan that matched our budget. Highly recommended!",
      author: "Rahul Verma",
      role: "Doctor"
    },
    {
      quote: "The consultation gave us complete clarity before starting our interiors. We avoided costly mistakes and saved both time and money.",
      author: "Priya Sharma",
      role: "CEO"
    },
    {
      quote: "Professional, honest, and extremely helpful. The planning session made our home interior journey stress-free.",
      author: "Amit Mehta",
      role: "IT Engineer"
    }
  ]

  const faqs = [
    {
      question: "1. Why should I book this consultation?",
      answer: "Our 1-on-1 consultation gives you unbiased, expert guidance from senior interior designers before you spend lakhs. We help you refine your space planning, estimate exact budgets, avoid costly execution mistakes, and get a clear 3D & material roadmap tailored to your lifestyle."
    },
    {
      question: "2. Is this consultation really 100% free with no obligations?",
      answer: "Yes, absolutely! The consultation is 100% complimentary with zero pressure or hidden obligations. We believe every homeowner deserves honest, professional advice before making major financial commitments."
    },
    {
      question: "3. How does the Google Meet session work?",
      answer: "After you submit your details, our design coordinator will connect with you on WhatsApp/Phone to confirm a time slot that suits your schedule. You will receive a Google Meet link for a private 1-on-1 video call with Nidhi or our lead designer."
    },
    {
      question: "4. What should I prepare before the call?",
      answer: "Having your basic floor plan or room measurements handy is super helpful. If you have a collection of Pinterest photos or mood boards, keep them ready so we can analyze them live during the session!"
    },
    {
      question: "5. What happens after the consultation?",
      answer: "You will receive a personalized design recommendation and custom budget breakdown. You can choose to partner with Home Storey for complete turnkey execution or take our custom plan forward at your own pace."
    }
  ]

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#C85A28] selection:text-white">
      
      {/* ── TOP HEADER BAR ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 py-3.5 px-4 sm:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group flex-shrink-0">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center border border-gray-100 shadow-sm">
              {/* Logo roof/brick representation */}
              <div className="relative flex flex-col items-center justify-center">
                <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[8px] border-b-[#004B87]" />
                <div className="w-5 h-4 bg-[#D9381E] mt-0.5 rounded-xs flex items-center justify-center text-[7px] text-white font-bold tracking-tighter">
                  HS
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif-luxury text-lg sm:text-xl font-bold text-[#D9381E] tracking-tight leading-none">
                home
              </span>
              <span className="font-sans text-xs font-semibold text-[#004B87] tracking-widest uppercase leading-none">
                storey
              </span>
            </div>
          </Link>

          {/* Center Announcement Text */}
          <div className="hidden md:block text-center flex-1 max-w-xl">
            <p className="text-sm font-medium text-slate-800 tracking-tight">
              Before you spend lakhs on interiors Let’s get the plan right
            </p>
          </div>

          {/* Header CTA Button */}
          <button
            onClick={scrollToForm}
            className="px-4 sm:px-6 py-2.5 bg-[#C85A28] hover:bg-[#b04d20] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex-shrink-0"
          >
            Help Me Plan My Home
          </button>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[90vh] bg-slate-900 overflow-hidden flex items-center py-12 lg:py-20 px-4 sm:px-8">
        
        {/* Background Image with Crisp Clear Visibility */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://res.cloudinary.com/dfjecbhki/image/upload/v1762298161/Homestorey-media/What%20we%20create/edh6sfa6zt7byruupb2b.jpg"
            alt="Luxury Interior Background"
            className="w-full h-full object-cover object-center opacity-90 scale-105 filter brightness-95 contrast-105"
          />
          {/* Left-focused gradient so text is readable while image remains bright & clear */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-slate-950/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-6 text-white text-left drop-shadow-md">
            <div className="inline-block">
              <span className="font-serif-luxury italic text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white block leading-tight drop-shadow-lg">
                &quot;Tired of the &apos;
                <span className="text-[#FF8A50] not-italic font-bold">
                  Pinterest Paralysis
                </span>
                &apos;?&quot;
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase leading-tight font-sans drop-shadow-lg">
              STOP SCROLLING AND START LIVING.
            </h1>

            <p className="text-xs sm:text-sm lg:text-base font-semibold text-gray-100 leading-relaxed uppercase tracking-wider max-w-2xl drop-shadow-md">
              WE TURN YOUR 500 SAVED PHOTOS INTO ONE COHESIVE, ACTIONABLE DESIGN PLAN THAT FITS YOUR LIFE AND YOUR BUDGET.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-semibold text-gray-100">
              <div className="flex items-center space-x-2 bg-slate-950/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#FF8A50]" />
                <span>100% Complimentary</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-950/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
                <Video className="w-4 h-4 text-[#FF8A50]" />
                <span>1-on-1 Google Meet Call</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-950/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[#FF8A50]" />
                <span>Zero Obligation</span>
              </div>
            </div>
          </div>

          {/* Right Column Floating Lead Form Card */}
          <div id="consultation-form" className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-900 border border-gray-100"
            >
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-slate-900">
                  Design Your <span className="text-[#C85A28]">Home</span> Today
                </h2>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed font-light">
                  Book your personalized consultation by filling out this short form. We&apos;ll meet on Google Meet at your selected time to discuss your goals and how we can help.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Your Full Name"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#C85A28] focus:ring-1 focus:ring-[#C85A28] transition-all shadow-xs"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your Email Address"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#C85A28] focus:ring-1 focus:ring-[#C85A28] transition-all shadow-xs"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your Phone Number"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#C85A28] focus:ring-1 focus:ring-[#C85A28] transition-all shadow-xs"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Your City"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#C85A28] focus:ring-1 focus:ring-[#C85A28] transition-all shadow-xs"
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="Enter Your Pincode"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#C85A28] focus:ring-1 focus:ring-[#C85A28] transition-all shadow-xs"
                    />
                  </div>
                  <div>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#C85A28] focus:ring-1 focus:ring-[#C85A28] transition-all shadow-xs font-medium"
                    >
                      <option value="Full Home Interiors">Full Home Interiors</option>
                      <option value="Modular Kitchen Only">Modular Kitchen Only</option>
                      <option value="Living Room Redesign">Living Room Redesign</option>
                      <option value="Master Bedroom Suite">Master Bedroom Suite</option>
                      <option value="Facade & Architecture">Facade & Architecture</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Budget */}
                <div>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#C85A28] focus:ring-1 focus:ring-[#C85A28] transition-all shadow-xs font-medium"
                  >
                    <option value="₹5–10 Lakhs">₹5–10 Lakhs</option>
                    <option value="₹10–20 Lakhs">₹10–20 Lakhs</option>
                    <option value="₹20–40 Lakhs">₹20–40 Lakhs</option>
                    <option value="₹40+ Lakhs">₹40+ Lakhs</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#C85A28] hover:bg-[#b04d20] text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 mt-2"
                >
                  {isSubmitting ? 'Booking Your Consultation...' : 'Help Me Plan My Home'}
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── MEET NIDHI SECTION ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-2xl sm:text-4xl font-bold font-serif-luxury text-slate-900 text-center uppercase tracking-tight mb-12 sm:mb-16">
            STOP OVER PAYING FOR DESIGN - MEET NIDHI
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Photo */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <img
                  src="/nidhi.jpg"
                  alt="Nidhi Mittal - Founder Home Storey"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Bio Content */}
            <div className="md:col-span-7 space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed font-light">
              <p>
                Building a home is one of the biggest financial and emotional investments of your life. Yet most homeowners feel overwhelmed by endless choices, conflicting opinions, budget overruns, and the fear of making irreversible mistakes.
              </p>
              <p>
                With over 15 years of experience, Nidhi has built Homestorey around one simple belief: every homeowner deserves clear, unbiased guidance before making life-changing decisions.
              </p>
              <p>
                She personally helps you plan every detail—from space planning and materials to lighting, storage, and execution—so your investment creates not just a beautiful home, but a home that works effortlessly for your family for years to come.
              </p>

              <div className="pt-4">
                <button
                  onClick={scrollToForm}
                  className="px-6 py-3 bg-[#C85A28] hover:bg-[#b04d20] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Help Me Plan My Home
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── PROCESS SECTION ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto text-center">
          
          <span className="text-xs font-bold uppercase tracking-widest text-[#C85A28] mb-2 block">
            PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-slate-900 tracking-tight mb-3">
            HASSLE FREE & Transparent
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-light max-w-2xl mx-auto mb-12 sm:mb-16">
            A simple and transparent process to bring your dream home to life.
          </p>

          {/* 4 Process Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
              <div className="w-14 h-14 bg-[#C85A28] text-white text-xl font-bold rounded-full flex items-center justify-center mb-6 shadow-md">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 font-serif-luxury">
                Submit Your Info
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Share your details in under 60 seconds so we can understand your needs.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
              <div className="w-14 h-14 bg-[#C85A28] text-white text-xl font-bold rounded-full flex items-center justify-center mb-6 shadow-md">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 font-serif-luxury">
                Speak With a Designer
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Book a time slot as per your convenience and meet the designer 1 to 1 on gmeet
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
              <div className="w-14 h-14 bg-[#C85A28] text-white text-xl font-bold rounded-full flex items-center justify-center mb-6 shadow-md">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 font-serif-luxury">
                Receive Your Custom Plan
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Get a detailed, no-pressure estimate with layout suggestions and timelines.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
              <div className="w-14 h-14 bg-[#C85A28] text-white text-xl font-bold rounded-full flex items-center justify-center mb-6 shadow-md">
                4
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 font-serif-luxury">
                Decide at Your Pace
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Move forward when you&apos;re ready — zero obligations, 100% clarity.
              </p>
            </div>

          </div>

          <button
            onClick={scrollToForm}
            className="px-6 py-3 bg-[#C85A28] hover:bg-[#b04d20] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          >
            Help Me Plan My Home
          </button>

        </div>
      </section>

      {/* ── THIS IS FOR YOU IF SECTION ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-slate-900 tracking-tight mb-12 sm:mb-16">
            THIS IS FOR YOU IF
          </h2>

          {/* 5 Checkmark Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
            
            {[
              "You're designing your first home and want to avoid expensive mistakes.",
              "You value thoughtful planning before execution.",
              "You want a home tailored to your family's lifestyle—not copied from Pinterest.",
              "You're investing significantly in your home and want expert guidance before making decisions.",
              "You appreciate working with a designer who challenges ideas when a better solution exists."
            ].map((text, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 bg-[#C85A28] text-white rounded-full flex items-center justify-center mb-4 shadow-sm flex-shrink-0">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {text}
                </p>
              </div>
            ))}

          </div>

          {/* Sub section: Most homeowners are overwhelmed by */}
          <div className="bg-[#FFF8F5] p-8 sm:p-10 rounded-3xl border border-[#F5E5DC]">
            <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-slate-900 mb-6">
              Most homeowners are overwhelmed by
            </h3>
            
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-semibold text-slate-800">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#C85A28] stroke-[3]" />
                <span>Too many material choices.</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#C85A28] stroke-[3]" />
                <span>Conflicting advice.</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#C85A28] stroke-[3]" />
                <span>Budget uncertainty.</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#C85A28] stroke-[3]" />
                <span>Poor space planning.</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── TESTIMONIALS SECTION ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto text-center">
          
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-slate-900 uppercase tracking-tight mb-12 sm:mb-16">
            REAL HOMES : REAL EXPERIENCES
          </h2>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {testimonials.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between text-center"
              >
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal italic mb-6">
                  &quot;{item.quote}&quot;
                </p>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 font-sans">
                    {item.author}
                  </h4>
                  <span className="text-[11px] font-semibold text-[#C85A28] uppercase tracking-wider block mt-0.5">
                    {item.role}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center space-x-1.5 mb-10">
            <span className="w-2 h-2 rounded-full bg-[#C85A28]" />
            <span className="w-2 h-2 rounded-full bg-gray-300" />
            <span className="w-2 h-2 rounded-full bg-gray-300" />
          </div>

          <button
            onClick={scrollToForm}
            className="px-6 py-3 bg-[#C85A28] hover:bg-[#b04d20] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          >
            Help Me Plan My Home
          </button>

        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-slate-900 text-center uppercase tracking-tight mb-12 sm:mb-16">
            FAQ
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx
              return (
                <div 
                  key={idx}
                  className="border border-gray-200 rounded-2xl overflow-hidden transition-all bg-white shadow-xs"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left font-serif-luxury font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-[#C85A28]' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-light border-t border-gray-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 text-white py-12 px-4 sm:px-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <div className="w-4 h-3 bg-[#D9381E] rounded-xs" />
            </div>
            <span className="font-serif-luxury text-lg font-bold tracking-wide">
              Home Storey
            </span>
          </div>

          <p className="text-xs text-slate-400 font-light">
            © {new Date().getFullYear()} Home Storey. All rights reserved. Transforming spaces with clarity & passion.
          </p>

          <button
            onClick={scrollToForm}
            className="px-5 py-2 bg-[#C85A28] hover:bg-[#b04d20] text-white text-xs font-semibold rounded-full shadow-sm transition-all"
          >
            Book Free Session
          </button>

        </div>
      </footer>

    </div>
  )
}
