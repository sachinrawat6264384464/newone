// components/Layout.tsx
"use client";
import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  Linkedin,
  Youtube
} from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton'
import TrustpilotReviewCollector from './TrustPilotReviewCollector';
import RightContactCard from './RightContactCard';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactCardOpen, setIsContactCardOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        color: "hover:text-red-600" 
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
        color: "hover:text-red-700" 
      },
      { 
        icon: Youtube, 
        href: "https://youtube.com/@homestorey.interiors?si=Hiz-DJl8cY_iRPsI", 
        label: "YouTube", 
        color: "hover:text-red-600" 
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
      <footer className="relative bg-slate-950 text-white overflow-hidden border-t border-white/10">
        {/* Subtle red glow top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 py-20 relative z-10">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="flex flex-col items-start mb-5">
                <Image
                  src="/logo1img.png"
                  alt="Home Storey Logo"
                  width={64}
                  height={64}
                  className="h-11 sm:h-14 w-auto object-contain"
                />
                <span className="text-[9px] sm:text-[10px] tracking-[0.3em] text-red-500 uppercase font-bold mt-1.5">BUILD · DESIGN · LIVE</span>
              </div>

              <p className="text-slate-400 leading-relaxed mb-6 text-sm font-light">
                Transforming spaces into beautiful homes with expert design and
                construction services that bring your vision to life.
              </p>

              <Link href="https://tidycal.com/homestorey/free-design-discussion" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 10px 30px rgba(239, 68, 68, 0.35)" }}
                  whileTap={{ scale: 0.96 }}
                  className="group bg-red-600 hover:bg-red-700 text-white font-semibold text-sm py-2.5 px-5 rounded-lg transition-all duration-300 inline-flex items-center gap-2"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </Link>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-slate-600 fill-current'}`} />
                ))}
                <span className="text-slate-400 ml-1.5 text-xs">4.5 (250+ reviews)</span>
              </div>
            </motion.div>

            {/* Our Services Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-semibold text-sm tracking-[0.18em] uppercase mb-1">Our Services</h4>
              <div className="w-8 h-0.5 bg-red-500 rounded-full mb-5" />
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.07, duration: 0.4 }}
                      className="text-slate-400 hover:text-red-400 transition-colors duration-200 cursor-pointer group flex items-center gap-2 text-sm"
                    >
                      <div className="w-1 h-1 rounded-full bg-red-500/60 group-hover:bg-red-400 transition-colors" />
                      <span>{service}</span>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Links Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-semibold text-sm tracking-[0.18em] uppercase mb-1">Quick Links</h4>
              <div className="w-8 h-0.5 bg-red-500 rounded-full mb-5" />
              <ul className="space-y-3">
                {[
                  { name: "Home", href: "/" },
                  { name: "Design Gallery", href: "/gallery" },
                  { name: "Contact Us", href: "/contact" },
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.07, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-red-400 transition-colors duration-200 group flex items-center gap-2 text-sm"
                    >
                      <div className="w-1 h-1 rounded-full bg-red-500/60 group-hover:bg-red-400 transition-colors" />
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Get In Touch Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-semibold text-sm tracking-[0.18em] uppercase mb-1">Get In Touch</h4>
              <div className="w-8 h-0.5 bg-red-500 rounded-full mb-5" />

              <div className="space-y-4 mb-7">
                <motion.a
                  href="mailto:homestorey@thenidhimittal.com"
                  className="flex items-start gap-3 group cursor-pointer"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-red-500/10 border border-red-500/20 p-2 rounded-lg group-hover:bg-red-500/20 transition-colors mt-0.5">
                    <Mail className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Email Us</p>
                    <p className="text-slate-400 text-xs mt-0.5">homestorey@thenidhimittal.com</p>
                  </div>
                </motion.a>

                <motion.div
                  className="flex items-start gap-3 group cursor-pointer"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-red-500/10 border border-red-500/20 p-2 rounded-lg group-hover:bg-red-500/20 transition-colors mt-0.5">
                    <MapPin className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Visit Us</p>
                    <p className="text-slate-400 text-xs mt-0.5">Delhi, India</p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-slate-500 text-xs tracking-widest uppercase mb-3">Follow Us</p>
                <div className="flex gap-2.5">
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
                        whileHover={{ scale: 1.15, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 p-2.5 rounded-lg text-slate-400 hover:text-red-400 transition-all duration-300"
                        aria-label={social.label}
                      >
                        <IconComponent className="w-4 h-4" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Trustpilot */}
              <div className="mt-5 pt-5 border-t border-white/10">
                <p className="text-slate-500 text-xs mb-2">Loved our work? Leave a review!</p>
                <TrustpilotReviewCollector />
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="border-t border-white/10 mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          >
            <p className="text-slate-500 text-xs">© 2026 HomeStorey. All rights reserved.</p>
            <p className="text-slate-600 text-xs flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-500 fill-current" /> by
              <Link
                href="https://botmartz.com"
                className="text-slate-400 hover:text-red-400 font-semibold transition-colors duration-200 ml-0.5"
              >
                Botmartz Ai solution pvt ltd
              </Link>
            </p>
          </motion.div>
        </div>
      </footer>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || pathname !== '/'
          ? "bg-slate-950/95 backdrop-blur-md shadow-lg py-2.5 border-b border-white/10 text-white"
          : "bg-transparent py-4 text-white"
      }`}>
        <nav className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex flex-col items-start justify-center group">
              <Image
                src="/logo1img.png"
                alt="Home Storey Logo"
                width={70}
                height={70}
                className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                priority
              />
              <span className="text-[8px] sm:text-[9.5px] tracking-[0.3em] text-red-500 uppercase font-bold mt-1">
                BUILD · DESIGN · LIVE
              </span>
            </Link>

            {/* Right Side: Desktop Menu Links + CTA Button */}
            <div className="hidden lg:flex items-center space-x-10">
              <div className="flex items-center space-x-8 mr-4">
                <Link
                  href="/"
                  prefetch={false}
                  className={`relative text-sm font-semibold tracking-wider uppercase transition-colors duration-200 py-1 ${
                    pathname === '/' ? "text-red-500 font-bold" : "text-gray-200 hover:text-white"
                  }`}
                >
                  <span>Home</span>
                  {pathname === '/' && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-500 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>

                <Link
                  href="/gallery"
                  prefetch={false}
                  className={`relative text-sm font-semibold tracking-wider uppercase transition-colors duration-200 py-1 ${
                    pathname === '/gallery' ? "text-red-500 font-bold" : "text-gray-200 hover:text-white"
                  }`}
                >
                  <span>Gallery</span>
                  {pathname === '/gallery' && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-500 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>

                <Link
                  href="/contact"
                  prefetch={false}
                  className={`relative text-sm font-semibold tracking-wider uppercase transition-colors duration-200 py-1 ${
                    pathname === '/contact' ? "text-red-500 font-bold" : "text-gray-200 hover:text-white"
                  }`}
                >
                  <span>Contact</span>
                  {pathname === '/contact' && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-500 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </div>

              {/* CTA Button */}
              <Link
                href="https://tidycal.com/homestorey/free-design-discussion"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(239, 68, 68, 0.35)" }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold tracking-wide uppercase px-5 py-2.5 rounded-md transition-all shadow-md"
                >
                  Get Free Consultation
                </motion.button>
              </Link>
            </div>

            {/* Mobile only: Book button in navbar right */}
            <Link
              href="https://tidycal.com/homestorey/free-design-discussion"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:hidden"
            >
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 text-white text-[11px] font-bold tracking-wide uppercase px-3 py-2 rounded-lg shadow-md"
              >
                Book Free
              </motion.button>
            </Link>

          </div>
        </nav>
      </header>

      {/* Main Content — extra bottom padding on mobile for bottom nav */}
      <main className="pb-16 lg:pb-0">
        {children}
        <WhatsAppButton />
      </main>

      {/* Enhanced Footer */}
      <Footer />

      {/* Right Side Floating Contact Form Card */}
      <RightContactCard
        isOpen={isContactCardOpen}
        onClose={() => setIsContactCardOpen(false)}
      />

      {/* ── Mobile Bottom Navigation Bar ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/97 backdrop-blur-md border-t border-white/10">
        <div className="flex items-center justify-around px-4 py-3">

          {/* Home */}
          <Link
            href="/"
            className={`flex flex-col items-center gap-0.5 px-5 py-1 rounded-xl transition-all duration-200 ${
              pathname === '/' ? 'text-red-400' : 'text-slate-400'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
              <path d="M9 21V12h6v9"/>
            </svg>
            <span className="text-[10px] font-semibold">Home</span>
            {pathname === '/' && <div className="w-1 h-1 bg-red-500 rounded-full" />}
          </Link>

          {/* Gallery */}
          <Link
            href="/gallery"
            prefetch={false}
            className={`flex flex-col items-center gap-0.5 px-5 py-1 rounded-xl transition-all duration-200 ${
              pathname === '/gallery' ? 'text-red-400' : 'text-slate-400'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
            <span className="text-[10px] font-semibold">Gallery</span>
            {pathname === '/gallery' && <div className="w-1 h-1 bg-red-500 rounded-full" />}
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            prefetch={false}
            className={`flex flex-col items-center gap-0.5 px-5 py-1 rounded-xl transition-all duration-200 ${
              pathname === '/contact' ? 'text-red-400' : 'text-slate-400'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.23 1.22 2 2 0 012.22 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.59-.59a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z"/>
            </svg>
            <span className="text-[10px] font-semibold">Contact</span>
            {pathname === '/contact' && <div className="w-1 h-1 bg-red-500 rounded-full" />}
          </Link>

        </div>
      </nav>
    </div>
  );
};

export default Layout;