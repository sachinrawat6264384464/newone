// app/gallery/page.tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Layout from "../../components/Layout";
import { ChevronLeft, ChevronRight, Star, ArrowRight, Home, Sparkles, Circle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ServiceCarousel {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  images: string[];
  icon: string;
  color: string;
  bgGradient: string;
}

const services: ServiceCarousel[] = [
  {
    title: "Exterior & First Impressions",
    subtitle: "Creating Stunning Curb Appeal",
    description: "Transform your home's exterior into a welcoming masterpiece that makes a lasting first impression. From elegant landscaping to architectural enhancements, we create spaces that reflect your style from the moment guests arrive.",
    features: [
      "Front yard landscaping design",
      "Entrance & porch renovations", 
      "Exterior lighting solutions",
      "Driveway & pathway design",
      "Garden & outdoor plant arrangements"
    ],
    images: ["/pic1.jpeg", "/pic2.jpeg", "/pic3.jpeg", "/pic4.jpeg", "/pic5.jpeg"],
    icon: "🏡",
    color: "text-blue-600",
    bgGradient: "from-blue-50 to-blue-100"
  },
  {
    title: "Living & Gathering Spaces",
    subtitle: "Heart of Your Home",
    description: "Design comfortable and stylish living areas where families come together. Our approach balances functionality with aesthetics, creating spaces that are perfect for both relaxation and entertaining guests.",
    features: [
      "Living room layout optimization",
      "Dining area design & furniture selection",
      "Entertainment center setup",
      "Cozy reading nooks & corners",
      "Open-plan space organization"
    ],
    images: ["/pic6.jpeg", "/pic1.jpeg", "/pic2.jpeg", "/pic3.jpeg", "/pic4.jpeg"],
    icon: "🛋️",
    color: "text-red-600", 
    bgGradient: "from-red-50 to-red-100"
  },
  {
    title: "Functional Spaces",
    subtitle: "Kitchens & Bathrooms Excellence",
    description: "Transform your most-used spaces into efficient, beautiful, and highly functional areas. We specialize in creating kitchens and bathrooms that combine luxury with practicality for everyday living.",
    features: [
      "Modern kitchen design & renovation",
      "Bathroom spa-like transformations",
      "Storage solutions & organization",
      "Appliance integration & selection",
      "Plumbing & electrical upgrades"
    ],
    images: ["/pic5.jpeg", "/pic6.jpeg", "/pic1.jpeg", "/pic2.jpeg", "/pic3.jpeg"],
    icon: "🚿",
    color: "text-blue-600",
    bgGradient: "from-blue-50 to-blue-100"
  },
  {
    title: "Lifestyle & Wellness",
    subtitle: "Bedrooms & Personal Retreats", 
    description: "Create serene and personalized bedroom spaces that promote rest and rejuvenation. From master suites to children's rooms, we design spaces that reflect individual personalities while ensuring comfort.",
    features: [
      "Master bedroom suite design",
      "Children's room creativity & safety",
      "Walk-in closet organization",
      "Bedroom lighting & ambiance",
      "Personal workspace integration"
    ],
    images: ["/pic4.jpeg", "/pic5.jpeg", "/pic6.jpeg", "/pic1.jpeg", "/pic2.jpeg"],
    icon: "🛏️",
    color: "text-red-600",
    bgGradient: "from-red-50 to-red-100"
  },
  {
    title: "Smart & Space-Saving Solutions",
    subtitle: "Innovative Design Technologies",
    description: "Incorporate cutting-edge technology and clever space-saving solutions to maximize your home's potential. Smart home integration and efficient storage make modern living effortless.",
    features: [
      "Smart home automation systems",
      "Built-in storage solutions",
      "Multi-functional furniture design",
      "Space optimization techniques",
      "Technology integration & wiring"
    ],
    images: ["/pic3.jpeg", "/pic4.jpeg", "/pic5.jpeg", "/pic6.jpeg", "/pic1.jpeg"],
    icon: "📱",
    color: "text-blue-600",
    bgGradient: "from-blue-50 to-blue-100"
  },
  {
    title: "Execution & Services",
    subtitle: "Professional Project Management",
    description: "From concept to completion, our experienced team manages every aspect of your project. We ensure quality craftsmanship, timely delivery, and seamless coordination of all trades and services.",
    features: [
      "Project timeline management",
      "Quality control & inspections",
      "Contractor coordination",
      "Material sourcing & delivery",
      "Final styling & handover"
    ],
    images: ["/pic2.jpeg", "/pic3.jpeg", "/pic4.jpeg", "/pic5.jpeg", "/pic6.jpeg"],
    icon: "⚒️",
    color: "text-red-600",
    bgGradient: "from-red-50 to-red-100"
  },
  {
    title: "Finishes & Detailing",
    subtitle: "Luxury Materials & Craftsmanship",
    description: "The perfect finishing touches that elevate your space from ordinary to extraordinary. Our attention to detail in materials, textures, and finishes ensures a truly luxurious result.",
    features: [
      "Premium material selection",
      "Custom millwork & cabinetry",
      "Paint colors & wall treatments",
      "Flooring design & installation",
      "Decorative hardware & fixtures"
    ],
    images: ["/pic1.jpeg", "/pic2.jpeg", "/pic3.jpeg", "/pic4.jpeg", "/pic5.jpeg"],
    icon: "✨",
    color: "text-blue-600",
    bgGradient: "from-blue-50 to-blue-100"
  }
];

const ImageCarousel = ({ images, currentIndex, onNext, onPrev }: {
  images: string[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}) => (
  <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl">
    <div className="relative w-full h-full">
      <Image
        src={images[currentIndex]}
        alt={`Service image ${currentIndex + 1}`}
        fill
        className="object-cover transition-all duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
    </div>
    
    {/* Navigation Arrows */}
    <button
      onClick={onPrev}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
      aria-label="Previous image"
    >
      <ChevronLeft className="w-5 h-5 text-gray-800" />
    </button>
    <button
      onClick={onNext}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
      aria-label="Next image"
    >
      <ChevronRight className="w-5 h-5 text-gray-800" />
    </button>
    
    {/* Dots Indicator */}
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      {images.map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            index === currentIndex ? 'bg-white scale-125' : 'bg-white/60'
          }`}
        ></div>
      ))}
    </div>
  </div>
);

export default function Gallery() {
  const [carouselStates, setCarouselStates] = useState<number[]>(
    new Array(services.length).fill(0)
  );

  const updateCarousel = (serviceIndex: number, direction: 'next' | 'prev') => {
    setCarouselStates(prev => {
      const newStates = [...prev];
      const currentIndex = newStates[serviceIndex];
      const maxIndex = services[serviceIndex].images.length - 1;
      
      if (direction === 'next') {
        newStates[serviceIndex] = currentIndex === maxIndex ? 0 : currentIndex + 1;
      } else {
        newStates[serviceIndex] = currentIndex === 0 ? maxIndex : currentIndex - 1;
      }
      
      return newStates;
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-white via-blue-50 to-red-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-brick-pattern"></div>
        
        <div className="container mx-auto px-6 lg:px-12 xl:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 lg:pr-8"
            >
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-block text-red-600 font-bold text-lg bg-red-100 px-6 py-3 rounded-full shadow-sm"
                >
                  Our Portfolio
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-5xl lg:text-7xl xl:text-8xl font-bold text-gray-800 mt-6 leading-tight"
                >
                  Design
                  <span className="block text-blue-600 mt-2">Gallery</span>
                </motion.h1>
              </div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-xl lg:text-2xl text-gray-600 leading-relaxed lg:pr-4"
              >
                Explore our comprehensive range of design services, from stunning exteriors to luxurious interiors. Each project represents our commitment to excellence and attention to detail.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-5 py-3 rounded-full shadow-sm border border-blue-200">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">Award-Winning Designs</span>
                </div>
                <div className="flex items-center space-x-2 bg-red-100 text-red-700 px-5 py-3 rounded-full shadow-sm border border-red-200">
                  <Home className="w-5 h-5" />
                  <span className="font-semibold">300+ Projects</span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="pt-4"
              >
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-xl transition-all duration-300 inline-flex items-center space-x-3"
                  >
                    <span>Start Your Project</span>
                    <ArrowRight className="w-6 h-6" />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Proper 4-Image Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:pl-8"
            >
              {/* Clean 2x2 Grid Layout */}
              <div className="grid grid-cols-2 gap-4 h-[500px] w-full">
                
                {/* Top Left - Kitchen */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="relative rounded-3xl overflow-hidden shadow-xl bg-white"
                >
                  <Image
                    src="/pic1.jpeg"
                    alt="Modern Kitchen Design"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold drop-shadow-lg">Kitchen</h3>
                    <p className="text-sm text-white/90 drop-shadow-md">Modern Design</p>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 border-2 border-white/70 rounded-full"></div>
                </motion.div>
                
                {/* Top Right - Bathroom */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="relative rounded-3xl overflow-hidden shadow-xl bg-white"
                >
                  <Image
                    src="/pic2.jpeg"
                    alt="Luxury Bathroom"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold drop-shadow-lg">Bathroom</h3>
                    <p className="text-sm text-white/90 drop-shadow-md">Luxury Spa</p>
                  </div>
                  <div className="absolute top-3 right-3 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                </motion.div>
                
                {/* Bottom Left - Living Room */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="relative rounded-3xl overflow-hidden shadow-xl bg-white"
                >
                  <Image
                    src="/pic3.jpeg"
                    alt="Cozy Living Room"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold drop-shadow-lg">Living</h3>
                    <p className="text-sm text-white/90 drop-shadow-md">Cozy Space</p>
                  </div>
                  <div className="absolute top-3 right-3 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                </motion.div>
                
                {/* Bottom Right - Bedroom */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="relative rounded-3xl overflow-hidden shadow-xl bg-white"
                >
                  <Image
                    src="/pic4.jpeg"
                    alt="Modern Bedroom"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold drop-shadow-lg">Bedroom</h3>
                    <p className="text-sm text-white/90 drop-shadow-md">Serene Suite</p>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 border-2 border-white/70 rounded-full"></div>
                </motion.div>
              </div>
              
              {/* Floating Decorative Elements */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-red-400/20 rounded-full blur-sm"
              ></motion.div>
              
              <motion.div
                animate={{ y: [0, 8, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 2 }}
                className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-red-400/20 to-blue-400/20 rounded-full blur-sm"
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Timeline Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-200 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 lg:px-12 xl:px-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-blue-600 font-semibold text-lg bg-blue-100 px-6 py-3 rounded-full shadow-sm">
              Our Expertise
            </span>
            <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-gray-800 mt-8 mb-6">
              Complete Design Services
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              From initial concept to final execution, we provide comprehensive design solutions for every aspect of your space
            </p>
          </motion.div>

          {/* Enhanced Timeline */}
          <div className="relative max-w-7xl mx-auto">
            {/* Main Timeline Line */}
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-red-400 transform lg:-translate-x-1/2 rounded-full shadow-lg"></div>
            
            {/* Timeline Items */}
            <div className="space-y-32 lg:space-y-40">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Timeline Node */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                    className="absolute left-2 lg:left-1/2 w-16 h-16 bg-white border-4 border-gradient-to-r from-blue-500 to-red-500 rounded-full transform lg:-translate-x-1/2 shadow-xl z-20 flex items-center justify-center text-3xl overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${service.color.includes('blue') ? '#3B82F6' : '#EF4444'} 0%, ${service.color.includes('blue') ? '#1D4ED8' : '#DC2626'} 100%)`
                    }}
                  >
                    <span className="drop-shadow-sm">{service.icon}</span>
                  </motion.div>

                  {/* Content Card */}
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ml-24 lg:ml-0 ${
                    index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
                  }`}>
                    
                    {/* Image Carousel */}
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`${index % 2 === 0 ? 'lg:pr-16' : 'lg:col-start-2 lg:pl-16'}`}
                    >
                      <div className="relative">
                        <ImageCarousel
                          images={service.images}
                          currentIndex={carouselStates[index]}
                          onNext={() => updateCarousel(index, 'next')}
                          onPrev={() => updateCarousel(index, 'prev')}
                        />
                        {/* Decorative frame */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-red-100 rounded-3xl opacity-50 -z-10 blur-sm"></div>
                      </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      className={`space-y-4 ${index % 2 === 0 ? 'lg:pl-16' : 'lg:col-start-1 lg:pr-16'}`}
                    >
                      <div className={`bg-gradient-to-br ${service.bgGradient} p-6 lg:p-7 rounded-2xl shadow-lg border border-white/50 backdrop-blur-sm relative overflow-hidden`}>
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full -translate-y-6 translate-x-6"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-4 -translate-x-4"></div>
                        
                        <div className="space-y-4 relative z-10">
                          <div className="flex items-start space-x-3">
                            <div className="text-2xl lg:text-3xl">{service.icon}</div>
                            <div>
                              <h3 className={`text-2xl lg:text-3xl font-bold ${service.color} leading-tight`}>
                                {service.title}
                              </h3>
                              <p className="text-lg text-gray-700 font-medium mt-1">
                                {service.subtitle}
                              </p>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 leading-relaxed text-base">
                            {service.description}
                          </p>
                          
                          <div className="grid grid-cols-1 gap-2 mt-4">
                            {service.features.slice(0, 3).map((feature, featureIndex) => (
                              <motion.div
                                key={featureIndex}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: featureIndex * 0.1 + 0.3 }}
                                viewport={{ once: true }}
                                whileHover={{ x: 8, scale: 1.02 }}
                                className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-white/30"
                              >
                                <div className={`w-6 h-6 ${service.color.includes('blue') ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-red-500 to-red-600'} rounded-full flex items-center justify-center flex-shrink-0 shadow-sm`}>
                                  <Sparkles className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-gray-800 font-medium text-sm">{feature}</span>
                              </motion.div>
                            ))}
                          </div>
                          
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="pt-3"
                          >
                            <Link href="/contact">
                              <button className={`${service.color.includes('blue') ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'} text-white px-6 py-3 rounded-xl font-bold text-base transition-all duration-300 shadow-lg inline-flex items-center space-x-2`}>
                                <span>Learn More</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </Link>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Connecting line decoration */}
                  {index < services.length - 1 && (
                    <div className="absolute left-8 lg:left-1/2 bottom-0 w-0.5 h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent transform lg:-translate-x-1/2 opacity-50"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-24 lg:py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"
          ></motion.div>
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"
          ></motion.div>
        </div>
        
        <div className="container mx-auto px-6 lg:px-12 xl:px-20 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto text-white"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight"
            >
              Ready to Transform
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Your Space?
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl lg:text-2xl mb-12 opacity-90 leading-relaxed max-w-3xl mx-auto"
            >
              Let's bring your vision to life with our comprehensive design services. 
              Your dream space is just one consultation away.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-white text-blue-600 px-12 py-5 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 inline-flex items-center space-x-3 border-2 border-white/20"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </Link>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/20"
              >
                <div className="flex -space-x-2">
                  {["/pic1.jpeg", "/pic2.jpeg", "/pic3.jpeg"].map((img, index) => (
                    <div key={index} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                      <Image
                        src={img}
                        alt={`Client ${index + 1}`}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-white/90 text-sm font-medium">250+ Happy Clients</p>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Statistics Row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-white/20"
            >
              {[
                { number: "10+", label: "Years Experience" },
                { number: "300+", label: "Projects Complete" },
                { number: "250+", label: "Happy Clients" },
                { number: "15+", label: "Awards Won" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white/80 text-sm lg:text-base font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}