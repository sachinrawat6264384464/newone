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
  Twitter, 
  Instagram,
  ArrowRight,
  Star,
  Heart
} from 'lucide-react';

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
      { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-500" },
      { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-500" },
      { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-blue-400" }
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
              <Link href="/contact">
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
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </motion.div>
                ))}
                <span className="text-gray-600 ml-2 text-sm">5.0 (250+ reviews)</span>
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
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="text-gray-600 hover:text-black transition-colors duration-300 cursor-pointer group flex items-center"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 text-red-500 group-hover:translate-x-1 transition-transform duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {service}
                    </span>
                  </motion.li>
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
                  { name: "Services", href: "/services" },
                  { name: "Contact", href: "/contact" },
                  { name: "Blog", href: "/blog" },
                  { name: "Testimonials", href: "/testimonials" }
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
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
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
                <motion.div 
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
                </motion.div>

                <motion.div 
                  className="flex items-start space-x-3 group cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-black font-semibold mb-1">Visit Us</p>
                    <p className="text-gray-600 text-sm">Indore, Madhya Pradesh</p>
                  </div>
                </motion.div>
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
            className="border-t border-gray-200 mt-16 pt-8"
          >
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                &copy; 2025 Home Storey. All rights reserved.
              </p>
              
              <div className="flex justify-center items-center space-x-2 text-gray-600">
                <span>Made with</span>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                </motion.div>
                <span>by</span>
                <Link 
                  href="#"
                  className="text-black font-semibold hover:text-red-500 transition-colors duration-300"
                >
                  Botmartz IT Solutions
                </Link>
              </div>
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
                href="/contact"
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
                    href="/contact"
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
      <main>{children}</main>

      {/* Enhanced Footer */}
      <Footer />
    </div>
  );
};

export default Layout;