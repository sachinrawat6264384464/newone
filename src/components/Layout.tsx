// components/Layout.tsx
"use client";
import { useState, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  MapPin, 
  Facebook,  
  Instagram,
  ArrowRight,
  Star,
  Heart,
  Linkedin
} from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton'

import TrustpilotReviewCollector from './TrustPilotReviewCollector';
interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Footer Component
  const Footer = () => {
    const services = [
      "Exterior & First Impressions",
      "Living & Gathering Spaces", 
      "Functional Spaces",
      "Lifestyle & Wellness",
      "Smart & Space-Saving Solutions",
      "Execution & Services",
      "Finishes & Detailing"
    ];

    const socialLinks = [
      { 
        icon: Facebook, 
        href: "https://www.facebook.com/people/Home-storey/61563975190788", 
        label: "Facebook", 
        color: "hover:text-blue-600" 
      },
      { 
        icon: Instagram, 
        href: "https://instagram.com/homestorey.ai/", 
        label: "Instagram", 
        color: "hover:text-pink-600" 
      },
      { 
        icon: Linkedin, 
        href: "https://www.linkedin.com/company/homestorey", 
        label: "LinkedIn", 
        color: "hover:text-blue-700" 
      },
      { 
        icon: ({ className }: { className?: string }) => (
          <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.372 0 12c0 4.983 3.656 9.128 8.438 10.309-.117-.875-.223-2.217.047-3.175.242-.839 1.563-5.34 1.563-5.34s-.398-.797-.398-1.976c0-1.853 1.075-3.236 2.413-3.236 1.138 0 1.687.854 1.687 1.878 0 1.144-.728 2.854-1.102 4.441-.316 1.334.67 2.422 1.986 2.422 2.383 0 4.213-2.512 4.213-6.131 0-3.202-2.303-5.442-5.592-5.442-3.808 0-6.051 2.853-6.051 5.801 0 1.144.437 2.372.984 3.039.108.131.124.246.093.377-.103.41-.336 1.303-.382 1.486-.06.242-.197.294-.456.177-1.693-.79-2.75-3.266-2.75-5.26 0-4.282 3.114-8.215 8.987-8.215 4.72 0 8.393 3.364 8.393 7.861 0 4.688-2.951 8.462-7.05 8.462-1.376 0-2.671-.714-3.113-1.561 0 0-.685 2.61-.852 3.249-.258.99-.76 1.981-1.219 2.751.974.293 2.005.452 3.076.452 6.627 0 12-5.373 12-12S18.627 0 12 0z" />
          </svg>
        ),
        href: "https://in.pinterest.com/Hstoreyin/", 
        label: "Pinterest", 
        color: "hover:text-red-600" 
      }
    ];

    return (
      <footer className="relative bg-gradient-to-br from-gray-50 via-white to-red-50 text-black overflow-hidden border-t border-gray-200">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-200/20 via-transparent to-transparent"></div>
        </div>
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              {/* Logo */}
              <motion.div 
                className="mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/logo1img.png"
                  alt="Home Storey Logo"
                  width={80}
                  height={80}
                  className="h-20 w-auto object-contain filter drop-shadow-lg"
                />
              </motion.div>
              
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                Transforming spaces into beautiful homes with expert design and
                construction services that bring your vision to life.
              </p>
              
              {/* Book Consultation Button */}
              <Link href="https://tidycal.com/homestorey/free-design-discussion" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg inline-flex items-center space-x-2"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </Link>

              {/* Rating Stars */}
              <div className="flex items-center space-x-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    {i < 4 ? (
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    ) : i === 4 ? (
                      <div className="relative">
                        <Star className="w-5 h-5 text-gray-300 fill-current" />
                        <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        </div>
                      </div>
                    ) : (
                      <Star className="w-5 h-5 text-gray-300 fill-current" />
                    )}
                  </motion.div>
                ))}
                <span className="text-gray-600 ml-2 text-sm">4.5 (250+ reviews)</span>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-black relative">
                Our Services
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
              </h3>
              
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="list-none">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="text-gray-600 hover:text-black transition-colors duration-300 cursor-pointer group flex items-center"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 text-red-500 group-hover:translate-x-1 transition-transform duration-200" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200 text-sm">
                        {service}
                      </span>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-black relative">
                Quick Links
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
              </h3>
              
              <ul className="space-y-3">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Our Work", href: "/gallery" },
                  { name: "Contact", href: "/contact" },
                  
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <Link 
                      href={link.href}
                      className="text-gray-600 hover:text-black transition-all duration-300 group flex items-center"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 text-blue-500 group-hover:translate-x-1 transition-transform duration-200" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200 text-sm">
                        {link.name}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-black relative">
                Get In Touch
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-red-500 to-blue-500 rounded-full"></div>
              </h3>
              
              <div className="space-y-4">

                <motion.a
                  href="mailto:homestorey@thenidhimittal.com"
                  className="flex items-start space-x-3 group cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-red-100 p-2 rounded-lg group-hover:bg-red-200 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-black font-semibold mb-1">Email Us</p>
                    <p className="text-gray-600 text-sm">homestorey@thenidhimittal.com</p>
                  </div>
                </motion.a>

                <motion.div 
                  className="flex items-start space-x-3 group cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-black font-semibold mb-1">Visit Us</p>
                    <p className="text-gray-600 text-sm">Delhi</p>
                  </div>
                </motion.div>
              </div>

              {/* Trustpilot Review Collector Section */}
              <div className="border-t border-gray-800 pt-8 mb-8">
                <div className="max-w-xl mx-auto text-center">
                  <h3 className="text-lg font-semibold mb-2">
                    Share Your Experience
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Already worked with us? We&apos;d love to hear from you!
                  </p>
                  <TrustpilotReviewCollector />
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h4 className="text-black font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        whileHover={{ 
                          scale: 1.2, 
                          y: -2,
                          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)"
                        }}
                        whileTap={{ scale: 0.9 }}
                        className={`bg-gray-100 hover:bg-gray-200 p-3 rounded-full text-gray-600 ${social.color} transition-all duration-300 border border-gray-200 hover:border-gray-300`}
                        aria-label={social.label}
                      >
                        <IconComponent className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="border-t border-gray-200 mt-16 pt-6"
          >
            <div className="text-center">
              <p className="text-gray-500 text-xs flex flex-wrap items-center justify-center gap-1">
                <span>© 2025 Home Storey. All rights reserved.</span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  Made with <Heart className="w-3 h-3 text-red-500 fill-current inline" /> by
                  <Link 
                    href="https://botmartz.com"
                    className="text-black font-semibold hover:text-red-500 transition-colors duration-300"
                  >
                    Botmartz IT Solutions
                  </Link>
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </footer>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 ml-10">
              <Image
                src="/logo1img.png"
                alt="Home Storey Logo"
                width={54}
                height={54}
                className="h-16 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/gallery"
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                Gallery
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                Contact
              </Link>
              <Link
                href="https://tidycal.com/homestorey/free-design-discussion"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Get Free Consultation
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4"
              >
                <div className="flex flex-col space-y-3">
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/gallery"
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Gallery
                  </Link>
                  <Link
                    href="/contact"
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  <Link
                    href="https://tidycal.com/homestorey/free-design-discussion"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Free Consultation
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        {children}
        <WhatsAppButton />
      </main>

      {/* Enhanced Footer */}
      <Footer />
    </div>
  );
};

export default Layout;