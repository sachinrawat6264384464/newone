'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { collection, getDocs, orderBy, query, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import AdminShell from '@/components/admin/AdminShell'
import { getServices } from '@/lib/services'
import { getProjects } from '@/lib/projects'
import { getBlogs } from '@/lib/blogs'
import {
  Sparkles,
  FolderKanban,
  FileText,
  Users,
  ArrowUpRight,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Mail,
  Phone
} from 'lucide-react'

interface ContactLead {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  projectType?: string
  status: string
  timestamp?: Timestamp
}

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalServices: 0,
    totalProjects: 0,
    totalBlogs: 0,
    totalLeads: 0,
    newLeads: 0
  })
  const [recentLeads, setRecentLeads] = useState<ContactLead[]>([])

  const loadDashboardData = useCallback(async () => {
    setLoading(true)
    try {
      const [servicesList, projectsList, blogsList] = await Promise.all([
        getServices(false),
        getProjects(false),
        getBlogs(false)
      ])

      let leadsList: ContactLead[] = []
      try {
        const contactsRef = collection(db, 'contacts')
        const contactsQuery = query(contactsRef, orderBy('timestamp', 'desc'))
        const snapshot = await getDocs(contactsQuery)
        leadsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContactLead))
      } catch (err: unknown) {
        if ((err as { code?: string })?.code !== 'permission-denied') {
          console.warn('Firestore contacts fetch error:', err)
        }
      }

      const newLeadsCount = leadsList.filter(l => l.status === 'new').length

      setStats({
        totalServices: servicesList.length,
        totalProjects: projectsList.length,
        totalBlogs: blogsList.length,
        totalLeads: leadsList.length,
        newLeads: newLeadsCount
      })
      setRecentLeads(leadsList.slice(0, 5))
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadDashboardData()
  }, [loadDashboardData])

  return (
    <AdminShell
      title="Admin Dashboard Overview"
      subtitle="Manage your services, portfolio, blog articles, and prospective client leads."
    >
      {/* Quick Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-serif-luxury">System Overview</h3>
          <p className="text-xs text-slate-500 font-light">Live operational metrics & dynamic content status</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/services"
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </Link>
          <Link
            href="/admin/projects"
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-gray-200 rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Services Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-gray-200/80 rounded-2xl p-6 relative overflow-hidden group hover:border-red-400 transition-all shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-50 border border-red-200 rounded-xl flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <Link href="/admin/services" className="text-slate-400 hover:text-slate-900 transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
          <p className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-1">
            Active Services
          </p>
          <h4 className="text-3xl font-extrabold text-slate-900">
            {loading ? '-' : stats.totalServices}
          </h4>
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Manage Offerings</span>
            <span className="text-red-600 font-semibold">Live on Home</span>
          </div>
        </motion.div>

        {/* Projects Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white border border-gray-200/80 rounded-2xl p-6 relative overflow-hidden group hover:border-red-400 transition-all shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
              <FolderKanban className="w-6 h-6" />
            </div>
            <Link href="/admin/projects" className="text-slate-400 hover:text-slate-900 transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
          <p className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-1">
            Portfolio Items
          </p>
          <h4 className="text-3xl font-extrabold text-slate-900">
            {loading ? '-' : stats.totalProjects}
          </h4>
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Design Showcase</span>
            <span className="text-amber-600 font-semibold">Gallery Sync</span>
          </div>
        </motion.div>

        {/* Blogs Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white border border-gray-200/80 rounded-2xl p-6 relative overflow-hidden group hover:border-red-400 transition-all shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <Link href="/admin/blogs" className="text-slate-400 hover:text-slate-900 transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
          <p className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-1">
            Blog Articles
          </p>
          <h4 className="text-3xl font-extrabold text-slate-900">
            {loading ? '-' : stats.totalBlogs}
          </h4>
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>SEO Content</span>
            <span className="text-blue-600 font-semibold">Published</span>
          </div>
        </motion.div>

        {/* Leads Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white border border-gray-200/80 rounded-2xl p-6 relative overflow-hidden group hover:border-red-400 transition-all shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <Link href="/admin/contacts" className="text-slate-400 hover:text-slate-900 transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
          <p className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-1">
            Total Leads Received
          </p>
          <div className="flex items-baseline space-x-2">
            <h4 className="text-3xl font-extrabold text-slate-900">
              {loading ? '-' : stats.totalLeads}
            </h4>
            {stats.newLeads > 0 && (
              <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full border border-red-200">
                {stats.newLeads} New
              </span>
            )}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Client Inquiries</span>
            <span className="text-emerald-600 font-semibold">Active Pipeline</span>
          </div>
        </motion.div>
      </div>

      {/* Recent Contact Inquiries */}
      <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-serif-luxury">Recent Client Inquiries</h3>
            <p className="text-xs text-slate-500 font-light">Submissions from contact form and consultation booking</p>
          </div>
          <Link
            href="/admin/contacts"
            className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center space-x-1"
          >
            <span>View All Leads</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 text-xs font-mono uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Client Name</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Project Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-light">
                    No lead submissions recorded yet. Submissions from the contact form will appear here.
                  </td>
                </tr>
              ) : (
                recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">
                        {lead.firstName} {lead.lastName}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5 text-xs">
                        <p className="text-slate-700 flex items-center space-x-1.5">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{lead.email}</span>
                        </p>
                        {lead.phone && (
                          <p className="text-slate-500 flex items-center space-x-1.5">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <span>{lead.phone}</span>
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700 capitalize text-xs">
                      {lead.projectType ? lead.projectType.replace('-', ' ') : 'General Inquiry'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                        lead.status === 'new'
                          ? 'bg-red-50 text-red-600 border-red-200'
                          : lead.status === 'contacted'
                          ? 'bg-amber-50 text-amber-600 border-amber-200'
                          : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                      }`}>
                        {lead.status === 'new' && <AlertCircle className="w-3 h-3" />}
                        {lead.status === 'contacted' && <Clock className="w-3 h-3" />}
                        {lead.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                        <span className="capitalize">{lead.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href="/admin/contacts"
                        className="inline-flex items-center space-x-1 text-slate-500 hover:text-slate-900 text-xs font-semibold"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  )
}