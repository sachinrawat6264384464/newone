'use client'

import { ReactNode, useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/lib/auth'
import {
  LayoutDashboard,
  Sparkles,
  FolderKanban,
  FileText,
  Users,
  Images,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Home,
  ShieldCheck,
  Bell
} from 'lucide-react'

interface AdminShellProps {
  children: ReactNode
  title?: string
  subtitle?: string
}

const NAV_ITEMS = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Services',
    href: '/admin/services',
    icon: Sparkles,
  },
  {
    name: 'Projects',
    href: '/admin/projects',
    icon: FolderKanban,
  },
  {
    name: 'Gallery',
    href: '/admin/gallery',
    icon: Images,
  },
  {
    name: 'Blogs',
    href: '/admin/blogs',
    icon: FileText,
  },
  {
    name: 'Contact Leads',
    href: '/admin/contacts',
    icon: Users,
  },
  {
    name: 'Site Settings',
    href: '/admin/settings',
    icon: Settings,
  },
]

export default function AdminShell({ children, title, subtitle }: AdminShellProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !user) {
      router.push('/admin/login')
    }
  }, [user, router, mounted])

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/admin/login')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  if (!mounted || !user) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 text-sm font-medium">Authenticating Admin Session...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 flex font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 bg-white border-r border-gray-200/80 fixed inset-y-0 left-0 z-30 shadow-sm">
        {/* Sidebar Header / Logo */}
        <div className="p-6 border-b border-gray-200/80 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-md shadow-red-600/20 group-hover:scale-105 transition-transform">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-serif-luxury text-lg font-bold text-slate-900 tracking-wide leading-none">
                Home Storey
              </h1>
              <span className="text-[10px] font-sans tracking-wider text-red-600 uppercase font-bold">
                Admin Control
              </span>
            </div>
          </Link>
        </div>

        {/* Sidebar Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 font-sans">
          <div className="px-3 pb-2 text-[10px] font-sans tracking-wider text-slate-400 uppercase font-bold">
            Management Hub
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname?.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-red-50 text-red-600 border border-red-200/80 font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-red-600' : 'text-slate-500'}`} />
                <span>{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-5 bg-red-600 rounded-full"
                  />
                )}
              </Link>
            )
          })}
        </div>

        {/* Quick External Link & Footer */}
        <div className="p-4 border-t border-gray-200/80 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 border border-gray-200 rounded-xl text-xs font-medium text-slate-700 hover:text-slate-900 transition-all group"
          >
            <span className="flex items-center space-x-2">
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-red-600" />
              <span>View Public Website</span>
            </span>
            <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-mono font-bold">Live</span>
          </Link>

          <div className="p-3 bg-slate-50 rounded-xl border border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                A
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-slate-900 truncate">{user.displayName || 'Admin'}</p>
                <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-200 z-50 flex flex-col lg:hidden shadow-xl"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center text-white">
                    <Home className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-900">Home Storey</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-slate-500 hover:text-slate-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname?.startsWith(item.href))
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-red-600 text-white font-semibold shadow-md shadow-red-600/20'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </div>

              <div className="p-4 border-t border-gray-200 space-y-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-40 px-6 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg bg-slate-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-slate-900 leading-tight font-serif-luxury">
                {title || 'Admin Dashboard'}
              </h2>
              {subtitle && (
                <p className="text-xs text-slate-500 font-light">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center space-x-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold border border-gray-200 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
              <span>Preview Site</span>
            </Link>

            <div className="h-6 w-px bg-gray-200 hidden sm:block" />

            <div className="flex items-center space-x-2 bg-red-50 border border-red-200 rounded-full py-1.5 px-3">
              <ShieldCheck className="w-4 h-4 text-red-600" />
              <span className="text-xs font-bold text-red-600">Admin Mode</span>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-6 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
