// app/contact/page.tsx - Updated with email notification and fixed warnings
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm, SubmitHandler } from 'react-hook-form'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import toast from 'react-hot-toast'
import Layout from '../../components/Layout'
import { Mail, Phone, MapPin, Clock, Send, Star, CheckCircle, Users } from 'lucide-react'

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  projectType: string
  budget?: string
  message: string
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>()

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setIsSubmitting(true)
    
    try {
      // Save to Firebase
      await addDoc(collection(db, 'contacts'), {
        ...data,
        timestamp: serverTimestamp(),
        status: 'new'
      })

      // Send email notification
      try {
        const response = await fetch('/api/send-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          const errorData = await response.json()
          console.error('Email notification failed:', errorData)
          // Don't fail the entire form submission if email fails
        } else {
          console.log('Email notification sent successfully')
        }
      } catch (emailError) {
        console.error('Email notification error:', emailError)
        // Continue with success message even if email fails
      }

      toast.success('Thank you! We\'ll get back to you within 24 hours.')
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

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-white overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 right-10 w-24 h-24 border-2 border-red-300 rounded-full"
          />
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute bottom-10 left-10 w-20 h-20 bg-blue-200 rounded-full"
          />
          
          <div className="container mx-auto px-6 text-center relative z-10 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-blue-600 font-semibold text-lg bg-blue-100 px-4 py-2 rounded-full">Ready to Start?</span>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 mt-6">Get In Touch</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
                Ready to start your dream project? Let&apos;s discuss your vision and create something extraordinary together.
              </p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center items-center gap-6"
              >
                <div className="flex items-center space-x-2 text-red-600 bg-red-100 px-4 py-2 rounded-full">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">4.5/5 Rating</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-600 bg-blue-100 px-4 py-2 rounded-full">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">250+ Happy Clients</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600 bg-green-100 px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">24hr Response</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16 relative bg-white">
          <div className="container mx-auto px-6 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-red-200 rounded-full animate-pulse"></div>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 relative z-10">
                  <h2 className="text-3xl font-bold text-blue-600 mb-6">Send Us a Message</h2>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          {...register('firstName', { required: 'First name is required' })}
                          className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white"
                          placeholder="John"
                        />
                        {errors.firstName && (
                          <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-red-500 text-sm mt-1"
                          >
                            {errors.firstName.message}
                          </motion.p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          {...register('lastName', { required: 'Last name is required' })}
                          className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white"
                          placeholder="Doe"
                        />
                        {errors.lastName && (
                          <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-red-500 text-sm mt-1"
                          >
                            {errors.lastName.message}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white"
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-red-500 text-sm mt-1"
                        >
                          {errors.email.message}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        {...register('phone')}
                        className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Project Type *
                      </label>
                      <select
                        {...register('projectType', { required: 'Please select a project type' })}
                        className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white"
                      >
                        <option value="">Select a project type</option>
                        <option value="kitchen">Kitchen Renovation</option>
                        <option value="bathroom">Bathroom Renovation</option>
                        <option value="living">Living Area Design</option>
                        <option value="bedroom">Bedroom Design</option>
                        <option value="dining">Dining Area</option>
                        <option value="commercial">Commercial Space</option>
                        <option value="full-home">Full Home Renovation</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.projectType && (
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-red-500 text-sm mt-1"
                        >
                          {errors.projectType.message}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Budget Range
                      </label>
                      <select
                        {...register('budget')}
                        className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white"
                      >
                        <option value="">Select budget range</option>
                        <option value="5-10-lakh">₹10 - ₹20 Lakh</option>
                        <option value="10-25-lakh">₹20 - ₹30 Lakh</option>
                        <option value="25-50-lakh">₹30 - ₹50 Lakh</option>
                        <option value="over-50-lakh">Over ₹50 Lakh</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        {...register('message', { required: 'Message is required' })}
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none bg-white"
                        placeholder="Tell us about your project, timeline, and any specific requirements..."
                      />
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-red-500 text-sm mt-1"
                        >
                          {errors.message.message}
                        </motion.p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <span className="text-red-600 font-semibold text-lg">Lets Connect</span>
                  <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-4">Contact Information</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Get in touch with us today to start your journey toward a beautiful, functional space that exceeds your expectations.
                  </p>
                </div>

                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg border border-gray-200"
                  >
                    <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1 text-lg">Email</h3>
                      <p className="text-gray-700 font-semibold">homestorey@thenidhimittal.com</p>
                      <p className="text-sm text-gray-500">Response within 24 hours</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg border border-gray-200"
                  >
                    <div className="bg-green-600 p-3 rounded-xl shadow-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1 text-lg">Phone</h3>
                      <p className="text-gray-700 font-semibold">+91 96257 69768</p>
                      <p className="text-sm text-gray-500">Available during business hours</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg border border-gray-200"
                  >
                    <div className="bg-purple-600 p-3 rounded-xl shadow-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1 text-lg">Office Location</h3>
                      <p className="text-gray-700 font-semibold">Delhi</p>
                      <p className="text-sm text-gray-500">Visit by appointment only</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg border border-gray-200"
                  >
                    <div className="bg-red-600 p-3 rounded-xl shadow-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1 text-lg">Business Hours</h3>
                      <div className="text-gray-700 space-y-1">
                        <p className="font-semibold">Monday - Friday: 9:00 AM - 7:00 PM</p>
                        <p className="font-semibold">Saturday: 10:00 AM - 5:00 PM</p>
                        <p className="font-semibold">Sunday: By Appointment</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Free Consultation CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-red-50 border-2 border-red-200 rounded-xl p-6 shadow-lg relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-200 rounded-full -translate-y-12 translate-x-12"></div>
                  <div className="relative">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Free Design Consultation</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Schedule a complimentary consultation to discuss your project and get expert advice from our design team.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          className="flex items-center space-x-2"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 font-medium text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all duration-300 w-full"
                    >
                      Book Free Consultation
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 bg-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-blue-500"></div>
          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center text-white"
            >
              <h3 className="text-2xl font-bold mb-8">Why Choose Home Storey?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 mb-2">10+</div>
                  <div className="text-white/80 text-sm">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">300+</div>
                  <div className="text-white/80 text-sm">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">250+</div>
                  <div className="text-white/80 text-sm">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 mb-2">15+</div>
                  <div className="text-white/80 text-sm">Design Awards</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  )
}