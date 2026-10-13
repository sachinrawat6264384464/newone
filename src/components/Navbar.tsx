// components/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isTransparent = !scrolled && pathname === '/'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent py-4 text-white'
          : 'bg-slate-950/95 backdrop-blur-md shadow-lg py-2.5 border-b border-white/10 text-white'
      }`}
    >
      <nav className="container mx-auto px-4 py-3" aria-label="Main Navigation">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" prefetch={false} className="flex flex-col items-start justify-center group" aria-label="Home Storey Homepage">
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
                  pathname === '/' ? 'text-red-500 font-bold' : 'text-gray-200 hover:text-white'
                }`}
              >
                <span>Home</span>
                {pathname === '/' && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>

              <Link
                href="/gallery"
                prefetch={false}
                className={`relative text-sm font-semibold tracking-wider uppercase transition-colors duration-200 py-1 ${
                  pathname === '/gallery' ? 'text-red-500 font-bold' : 'text-gray-200 hover:text-white'
                }`}
              >
                <span>Gallery</span>
                {pathname === '/gallery' && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>

              <Link
                href="/contact"
                prefetch={false}
                className={`relative text-sm font-semibold tracking-wider uppercase transition-colors duration-200 py-1 ${
                  pathname === '/contact' ? 'text-red-500 font-bold' : 'text-gray-200 hover:text-white'
                }`}
              >
                <span>Contact</span>
                {pathname === '/contact' && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </div>

            {/* CTA Button */}
            <Link
              href="https://tidycal.com/homestorey/free-design-discussion"
              target="_blank"
              rel="noopener noreferrer"
              prefetch={false}
            >
              <button
                className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold tracking-wide uppercase px-5 py-2.5 rounded-md transition-all shadow-md cursor-pointer"
              >
                Get Free Consultation
              </button>
            </Link>
          </div>

          {/* Mobile only: Book button in navbar right */}
          <Link
            href="https://tidycal.com/homestorey/free-design-discussion"
            target="_blank"
            rel="noopener noreferrer"
            prefetch={false}
            className="lg:hidden"
          >
            <button
              className="bg-red-600 text-white text-[11px] font-bold tracking-wide uppercase px-3.5 py-2.5 rounded-lg shadow-md min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            >
              Book Free
            </button>
          </Link>
        </div>
      </nav>
    </header>
  )
}
