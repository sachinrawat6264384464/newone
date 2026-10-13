// components/MobileNav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/97 backdrop-blur-md border-t border-white/10" aria-label="Mobile Navigation">
      <div className="flex items-center justify-around px-4 py-2">
        {/* Home */}
        <Link
          href="/"
          prefetch={false}
          className={`flex flex-col items-center gap-0.5 px-5 py-2 rounded-xl transition-all duration-200 min-h-[48px] min-w-[48px] justify-center ${
            pathname === '/' ? 'text-red-400 font-semibold' : 'text-slate-400'
          }`}
          aria-label="Home page"
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
          className={`flex flex-col items-center gap-0.5 px-5 py-2 rounded-xl transition-all duration-200 min-h-[48px] min-w-[48px] justify-center ${
            pathname === '/gallery' ? 'text-red-400 font-semibold' : 'text-slate-400'
          }`}
          aria-label="Gallery page"
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
          className={`flex flex-col items-center gap-0.5 px-5 py-2 rounded-xl transition-all duration-200 min-h-[48px] min-w-[48px] justify-center ${
            pathname === '/contact' ? 'text-red-400 font-semibold' : 'text-slate-400'
          }`}
          aria-label="Contact page"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.23 1.22 2 2 0 012.22 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.59-.59a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z"/>
          </svg>
          <span className="text-[10px] font-semibold">Contact</span>
          {pathname === '/contact' && <div className="w-1 h-1 bg-red-500 rounded-full" />}
        </Link>
      </div>
    </nav>
  )
}
