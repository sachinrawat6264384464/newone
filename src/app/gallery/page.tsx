// app/gallery/page.tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Layout from "../../components/Layout";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ServiceCarousel {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  images: string[];
  color: string;
  bgGradient: string;
}

const services: ServiceCarousel[] = [
  {
    title: "Facade & Exterior Design",
    subtitle: "Creating Stunning First Impressions",
    description: "Transform your home's exterior into a welcoming masterpiece. From elegant landscaping to architectural enhancements, we create outdoor spaces that reflect your style from the moment guests arrive.",
    features: [
      "Modern & traditional facade designs",
      "Outdoor sitting & landscaping",
      "Entrance foyer & door designs",
      "Exterior lighting solutions"
    ],
    images: ["/facade1.jpg", "/facade2.jpg", "/facade3.jpg", "/facade4.jpg", "/Facade_5.jpg"],
    color: "text-blue-600",
    bgGradient: "from-blue-50 to-blue-100"
  },
  {
    title: "Living & Dining Spaces",
    subtitle: "Heart of Your Home",
    description: "Design comfortable living areas where families come together. Our approach balances functionality with aesthetics, creating spaces perfect for both relaxation and entertaining guests.",
    features: [
      "Living room layout optimization",
      "Dining area design & furniture",
      "Entertainment center setup",
      "Open-plan space organization"
    ],
    images: ["/Living_1.jpg", "/Living_2.jpg", "/Living_3.jpg", "/Living_4.jpg", "/Living_5.jpg"],
    color: "text-red-600", 
    bgGradient: "from-red-50 to-red-100"
  },
  {
    title: "Kitchen & Bathroom Design",
    subtitle: "Functional Spaces Excellence",
    description: "Transform your most-used spaces into efficient, beautiful, and highly functional areas. We specialize in creating kitchens and bathrooms that combine luxury with practicality.",
    features: [
      "Modern kitchen design & renovation",
      "Modular storage solutions",
      "Spa-like bathroom transformations",
      "Premium fixtures & finishes"
    ],
    images: ["/kitchen1.jpg", "/pic6.jpeg", "/pic1.jpeg", "/Bathroom_1.jpg", "/Bathroom_2.jpg"],
    color: "text-blue-600",
    bgGradient: "from-blue-50 to-blue-100"
  },
  {
    title: "Bedrooms & Private Spaces",
    subtitle: "Personal Sanctuaries", 
    description: "Create serene bedroom spaces that promote rest and rejuvenation. From master suites to children's rooms and home offices, we design spaces that reflect individual personalities.",
    features: [
      "Master bedroom suite design",
      "Kids room creativity & safety",
      "Work-from-home office spaces",
      "Walk-in closet organization"
    ],
    images: ["/Bedroom_1.png", "/Bedroom_2.jpg", "/Bedroom_3.jpg", "/Bedroom_4.jpeg", "/Bedroom_5.jpg"],
    color: "text-red-600",
    bgGradient: "from-red-50 to-red-100"
  },
  {
    title: "Special Features & Wellness",
    subtitle: "Unique Spaces That Inspire",
    description: "Incorporate unique elements that add character to your home. From sacred mandir spaces to wellness areas and smart terrace designs for entertainment and relaxation.",
    features: [
      "Mandir & prayer room design",
      "Wellness spaces (Gym, Yoga)",
      "Terrace party & BBQ areas",
      "Balcony & bay window designs"
    ],
    images: ["/Mandir_2.jpg", "/Mandir_3.jpg", "/bay_window.png", "/gym.jpg", "/images/Rooftop/terrace.jpg"],
    color: "text-blue-600",
    bgGradient: "from-blue-50 to-blue-100"
  },
  {
    title: "Smart Solutions & Finishing",
    subtitle: "Modern Living & Details",
    description: "Maximize space with innovative solutions and perfect your home with exquisite finishing touches. From murphy beds to false ceilings, lighting design to premium flooring.",
    features: [
      "Smart home automation",
      "Murphy bed & space savers",
      "False ceiling & lighting design",
      "Wall decor & flooring solutions"
    ],
    images: ["/pic3.jpeg", "/pic4.jpeg", "/false_ceiling.jpg", "/wall_decor.jpg"],
    color: "text-red-600",
    bgGradient: "from-red-50 to-red-100"
  },
];

const ImageCarousel = ({ images, currentIndex, onNext, onPrev }: {
  images: string[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}) => (
  <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl"> {/* Increased from h-80 to h-96 */}
    <div className="relative w-full h-full">
      <Image
        src={images[currentIndex]}
        alt={`Service image ${currentIndex + 1}`}
        fill
        className="object-cover transition-all duration-500"
        priority={currentIndex === 0}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
    </div>
    
    <button
      onClick={onPrev}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 z-10"
      aria-label="Previous image"
    >
      <ChevronLeft className="w-6 h-6 text-gray-800" /> {/* Increased icon size */}
    </button>
    <button
      onClick={onNext}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 z-10"
      aria-label="Next image"
    >
      <ChevronRight className="w-6 h-6 text-gray-800" /> {/* Increased icon size */}
    </button>
    
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10"> {/* Increased bottom spacing and dot size */}
      {images.map((_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
      <section className="py-20 lg:py-28 bg-gradient-to-br from-white via-blue-50 to-red-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-brick-pattern"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight"
            >
              Welcome Home to Your
              <span className="block text-blue-600 mt-2">Dream Design Journey</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl lg:text-2xl text-gray-600 leading-relaxed mb-8"
            >
              From the moment you step through your front door to every corner of your living space, 
              we bring your vision to life with designs that reflect who you are
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <div className="bg-white px-6 py-3 rounded-full shadow-md border border-gray-200">
                <span className="text-gray-700 font-semibold">300+ Projects</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-md border border-gray-200">
                <span className="text-gray-700 font-semibold">10+ Years Experience</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Link href="https://tidycal.com/homestorey/free-design-discussion" target="_blank" rel="noopener noreferrer">
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
        </div>
      </section>

      {/* Services Timeline Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-white">
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

          <div className="relative max-w-7xl mx-auto">
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-red-400 transform lg:-translate-x-1/2 rounded-full shadow-lg"></div>
            
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
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                    className="absolute left-2 lg:left-1/2 w-16 h-16 rounded-full transform lg:-translate-x-1/2 shadow-xl z-20 flex items-center justify-center overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${service.color.includes('blue') ? '#3B82F6' : '#EF4444'} 0%, ${service.color.includes('blue') ? '#1D4ED8' : '#DC2626'} 100%)`
                    }}
                  >
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </motion.div>

                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ml-24 lg:ml-0 ${
                    index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
                  }`}>
                    
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
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-red-100 rounded-3xl opacity-50 -z-10 blur-sm"></div>
                      </div>
                    </motion.div>

                    <motion.div
                      className={`space-y-4 ${index % 2 === 0 ? 'lg:pl-16' : 'lg:col-start-1 lg:pr-16'}`}
                    >
                      <div className={`bg-gradient-to-br ${service.bgGradient} p-6 lg:p-8 rounded-2xl shadow-lg border border-white/50 backdrop-blur-sm relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full -translate-y-6 translate-x-6"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-4 -translate-x-4"></div>
                        
                        <div className="space-y-5 relative z-10">
                          <div>
                            <h3 className={`text-2xl lg:text-3xl font-bold ${service.color} leading-tight`}>
                              {service.title}
                            </h3>
                            <p className="text-lg text-gray-700 font-medium mt-2">
                              {service.subtitle}
                            </p>
                          </div>
                          
                          <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                            {service.description}
                          </p>
                          
                          <div className="grid grid-cols-1 gap-3 mt-5">
                            {service.features.map((feature, featureIndex) => (
                              <motion.div
                                key={featureIndex}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: featureIndex * 0.1 + 0.3 }}
                                viewport={{ once: true }}
                                whileHover={{ x: 8, scale: 1.02 }}
                                className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-white/30"
                              >
                                <div className={`w-7 h-7 ${service.color.includes('blue') ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-red-500 to-red-600'} rounded-full flex items-center justify-center flex-shrink-0 shadow-sm`}>
                                  <Sparkles className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-gray-800 font-medium text-sm lg:text-base">{feature}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {index < services.length - 1 && (
                    <div className="absolute left-8 lg:left-1/2 bottom-0 w-0.5 h-20 bg-gradient-to-b from-transparent via-gray-300 to-transparent transform lg:-translate-x-1/2 opacity-50"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

            {/* Compact CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-white"
          >
            <motion.h3
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold mb-4"
            >
              Ready to Get Started?
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-lg opacity-90 mb-8 leading-relaxed"
            >
              Let&apos;s bring your vision to life with our expert design services
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link href="https://tidycal.com/homestorey/free-design-discussion" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}