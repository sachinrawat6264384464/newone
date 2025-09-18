// app/page.tsx
'use client'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import HeroCarousel from '../components/HeroCarousel'
import FloatingElements from '../components/FloatingElements'
import { 
  ChefHat, 
  Utensils, 
  Sofa, 
  Bed, 
  Bath, 
  Building, 
  Star,
  Quote,
  ArrowRight,
  LucideIcon,
  Award,
  Users,
  Sparkles,
  Heart
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Service {
  icon: LucideIcon
  title: string
  description: string
  image: string
  color: string
}

interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
  image: string
}

const services: Service[] = [
  {
    icon: ChefHat,
    title: "Kitchen Design",
    description: "Modern, functional kitchens that are the heart of your home",
    image: "/pic1.jpeg",
   color: "from-red-400 to-red-600 border-2 border-blue-500"

  },
  {
    icon: Utensils,
    title: "Dining Areas",
    description: "Elegant dining spaces for memorable meals and gatherings",
    image: "/pic2.jpeg",
   color: "from-red-400 to-red-600 border-2 border-blue-500"

  },
  {
    icon: Sofa,
    title: "Living Spaces",
    description: "Comfortable and stylish living areas for relaxation",
    image: "/pic3.jpeg",
    color: "from-red-400 to-red-600 border-2 border-blue-500"
 
  },
  {
    icon: Bed,
    title: "Bedrooms",
    description: "Peaceful retreats designed for rest and rejuvenation",
    image: "/pic4.jpeg",
    color: "from-red-400 to-red-600 border-2 border-blue-500"
 
  },
  {
    icon: Bath,
    title: "Bathrooms",
    description: "Spa-like bathrooms that combine luxury and functionality",
    image: "/pic5.jpeg",
   color: "from-red-400 to-red-600 border-2 border-blue-500"
 
  },
  {
    icon: Building,
    title: "Commercial Spaces",
    description: "Professional environments that enhance productivity",
    image: "/pic6.jpeg",
    color: "from-red-400 to-red-600 border-2 border-blue-500"

  }
]

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    content: "Home Storey transformed our outdated kitchen into a modern masterpiece. The attention to detail and quality of work exceeded our expectations.",
    rating: 5,
    image: "/pic4.jpeg"
  },
  {
    name: "Michael Chen",
    role: "Business Owner",
    content: "Their commercial design expertise helped us create an office space that our employees love. Professional, timely, and within budget.",
    rating: 5,
    image: "/pic5.jpeg"
  },
  {
    name: "Emily Rodriguez",
    role: "Interior Designer",
    content: "I've worked with many contractors, but Home Storey stands out for their creativity and commitment to excellence. Highly recommended!",
    rating: 5,
    image: "/pic6.jpeg"
  }
]

const stats = [
  { label: "Happy Clients", value: "250+", icon: Users },
  { label: "Projects Completed", value: "300+", icon: Award },
  { label: "Years Experience", value: "10+", icon: Star },
  { label: "Design Awards", value: "15+", icon: Sparkles }
]

export default function Home() {
  return (
    <Layout>
      {/* Floating 3D Elements */}
      <FloatingElements />
      
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Pattern */}
        
        
        
        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/3 rounded-full blur-2xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-black/90 max-w-2xl mx-auto">
              Numbers that speak for our commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              const colors = [
                'from-blue-500 to-blue-600',
                'from-red-500 to-red-600', 
                'from-blue-500 to-blue-600',
                'from-red-500 to-red-600'
              ]
              const borderColors = [
                'border-blue-400/50',
                'border-red-400/50',
                'border-blue-400/50', 
                'border-red-400/50'
              ]
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-20 h-20 bg-gradient-to-br ${colors[index % colors.length]} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl border-2 ${borderColors[index % borderColors.length]} backdrop-blur-sm`}
                  >
                    <IconComponent className="w-10 h-10 text-white drop-shadow-lg" />
                  </motion.div>
                  <motion.h3
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                    className="text-5xl md:text-6xl font-bold mb-3 text-black drop-shadow-lg"
                  >
                    {stat.value}
                  </motion.h3>
                  <p className="text-black/95 font-semibold text-lg tracking-wide">
                    {stat.label}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Meet Nidhi Section */}
    <section className="py-10 relative">
        <div className="absolute inset-0 bg-red-100/20 opacity-50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-blue-400 rounded-full opacity-30 animate-pulse"></div>
                <div className="relative">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=600&fit=crop&crop=face"
                    alt="Nidhi Mittal"
                    width={500}
                    height={600}
                    className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-red-600 text-white p-6 rounded-2xl shadow-xl">
                    <Heart className="w-10 h-10" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-red-600 font-bold text-xl tracking-wide uppercase"
                >
                  Meet Our Visionary
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-4xl md:text-6xl font-bold text-blue-600 mt-4 mb-6 leading-tight"
                >
                  Nidhi Mittal
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-2xl text-blue-700 font-bold"
                >
                  Founder & Principal Designer
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-6 text-gray-700 leading-relaxed"
              >
                <p className="text-xl">
                  With over a decade of expertise in luxury interior design, Nidhi Mittal has established HomeStorey as a premier destination for those seeking exceptional living spaces.
                </p>
                <p className="text-xl">
                  Her vision combines timeless elegance with contemporary innovation, creating spaces that reflect each client&apos;s unique lifestyle and aspirations. Nidhi&apos;s approach focuses on understanding the intricate balance between aesthetics and functionality, ensuring every project becomes a masterpiece of design excellence.
                </p>
                <p className="text-xl">
                  Under her leadership, HomeStorey has transformed countless spaces across Northern India, earning a reputation for meticulous attention to detail and unparalleled client satisfaction.
                </p>
              </motion.div>
            
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-6 pt-6"
              >
                <div className="bg-blue-100 px-6 py-3 rounded-full shadow-md">
                  <span className="text-blue-700 font-bold text-lg">10+ Years Experience</span>
                </div>
                <div className="bg-red-100 px-6 py-3 rounded-full shadow-md">
                  <span className="text-red-700 font-bold text-lg">Luxury Design Expert</span>
                </div>
                <div className="bg-green-100 px-6 py-3 rounded-full shadow-md">
                  <span className="text-green-700 font-bold text-lg">Award Winning</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="pt-6"
              >
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full shadow-xl  text-lg"
                  >
                    Book a Consultation
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-brick-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-brick-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-brick-600 font-semibold text-lg">What We Offer</span>
            <h2 className="text-5xl font-bold text-gray-800 mt-4 mb-6">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From residential renovations to commercial transformations, we bring your vision to life with unmatched creativity and precision
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className={`absolute top-6 left-6 bg-gradient-to-r ${service.color} p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-xs font-semibold text-gray-700">Premium</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                      className={`h-1 bg-gradient-to-r ${service.color} rounded-full mt-4`}
                    ></motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
     <section className="py-24 bg-red-300 relative overflow-hidden">
         <div className="absolute inset-0 bg-red-950 opacity-50"></div>
        <div className="absolute inset-0 bg-red-800 opacity-30"></div> 
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-red-400 font-semibold text-lg">Client Stories</span>
            <h2 className="text-5xl font-bold text-white mt-4 mb-6">What Our Clients Say</h2>
            <p className="text-xl text-blue-400 max-w-3xl mx-auto">
              Don&apos;t just take our word for it - hear from satisfied homeowners and businesses who trusted us with their dreams
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-8 relative border border-blue-300/30 hover:bg-white/20 transition-all duration-300"
              >
                <Quote className="w-12 h-12 text-red-400 mb-6 opacity-70" />
                <p className="text-white mb-8 italic text-lg leading-relaxed">&quot;{testimonial.content}&quot;</p>
                
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                    >
                      <Star className="w-5 h-5 text-blue-400 fill-current" />
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center">
                  <div className="relative">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4 border-2 border-red-400"
                      width={64}
                      height={64}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                    <p className="text-red-100">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-50 opacity-30"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-200 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-red-200 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-200 rounded-full animate-pulse delay-500 opacity-30"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 leading-tight">
              Ready to Transform Your 
              <span className="block text-red-600 mt-2">
                Dream Space?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Get a free consultation and let&apos;s discuss how we can bring your vision to life with our expert design team
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all duration-300 shadow-lg inline-flex items-center space-x-3"
                >
                  <span>Start Your Free Consultation</span>
                  <ArrowRight className="w-6 h-6" />
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-red-500 text-red-600 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-red-500 hover:text-white transition-all duration-300 inline-flex items-center space-x-3"
              >
                <span>View Portfolio</span>
                <Sparkles className="w-6 h-6" />
              </motion.button>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            >
              <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-white">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-lg font-semibold">Free consultation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-lg font-semibold">Quick response</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-lg font-semibold">Award-winning designs</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Bottom decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-20">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-white/10"></path>
          </svg>
        </div>
      </section>
    </Layout>
  )
}