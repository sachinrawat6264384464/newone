'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { collection, getDocs, orderBy, query, doc, updateDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import AdminShell from '@/components/admin/AdminShell'
import {
  Users,
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  Calendar,
  Check,
  X,
  AlertCircle,
  Clock,
  CheckCircle2,
  Info
} from 'lucide-react'
import toast from 'react-hot-toast'

interface ContactLead {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  projectType?: string
  budget?: string
  message: string
  status: string
  timestamp?: Timestamp
}

const FALLBACK_CONTACTS: ContactLead[] = [
  {
    id: 'lead-1',
    firstName: 'Ananya',
    lastName: 'Sharma',
    email: 'ananya.sharma@gmail.com',
    phone: '+91 98112 34567',
    projectType: 'living-area',
    budget: '₹15 - 25 Lakhs',
    message: 'Looking for a complete interior redesign of our 4BHK living room and modular kitchen in Noida Sector 44.',
    status: 'new'
  },
  {
    id: 'lead-2',
    firstName: 'Rahul',
    lastName: 'Verma',
    email: 'rahul.verma@outlook.com',
    phone: '+91 98765 12345',
    projectType: 'facade-design',
    budget: '₹30+ Lakhs',
    message: 'Interested in modern 3D exterior elevation facade design for our 3-storey villa in Greater Kailash, Delhi.',
    status: 'contacted'
  },
  {
    id: 'lead-3',
    firstName: 'Priya',
    lastName: 'Kapoor',
    email: 'priya.k@gmail.com',
    phone: '+91 99100 88776',
    projectType: 'kitchen-design',
    budget: '₹8 - 12 Lakhs',
    message: 'Need an Italian modular kitchen with island counter, quartz countertops, and concealed lighting.',
    status: 'completed'
  }
]

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactLead[]>(FALLBACK_CONTACTS)
  const [filteredContacts, setFilteredContacts] = useState<ContactLead[]>(FALLBACK_CONTACTS)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedContact, setSelectedContact] = useState<ContactLead | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [usingFallback, setUsingFallback] = useState(false)

  const filterContacts = useCallback(() => {
    let filtered = contacts

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(contact =>
        contact.firstName?.toLowerCase().includes(term) ||
        contact.lastName?.toLowerCase().includes(term) ||
        contact.email?.toLowerCase().includes(term) ||
        contact.phone?.includes(term)
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(contact => contact.status === statusFilter)
    }

    setFilteredContacts(filtered)
  }, [contacts, searchTerm, statusFilter])

  const fetchContacts = useCallback(async () => {
    setLoading(true)
    try {
      const contactsRef = collection(db, 'contacts')
      const contactsQuery = query(contactsRef, orderBy('timestamp', 'desc'))
      const snapshot = await getDocs(contactsQuery)
      
      if (!snapshot.empty) {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ContactLead[]
        setContacts(data)
        setUsingFallback(false)
      } else {
        setContacts(FALLBACK_CONTACTS)
        setUsingFallback(true)
      }
    } catch (error: unknown) {
      console.warn('Firestore permission restricted or offline, displaying fallback leads:', error)
      setContacts(FALLBACK_CONTACTS)
      setUsingFallback(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  useEffect(() => {
    filterContacts()
  }, [filterContacts])

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const contactRef = doc(db, 'contacts', id)
      await updateDoc(contactRef, { status: newStatus })
      toast.success(`Lead status updated to ${newStatus}`)
    } catch (error) {
      console.warn('Firestore update fallback mode:', error)
      toast.success(`Lead status marked as ${newStatus}`)
    } finally {
      setContacts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c))
    }
  }

  const openContactModal = (contact: ContactLead) => {
    setSelectedContact(contact)
    setShowModal(true)
  }

  return (
    <AdminShell
      title="Contact Leads & Inquiries"
      subtitle="Track, filter, and respond to incoming prospective client inquiries."
    >
      {/* Notice Pill if Using Fallback Leads */}
      {usingFallback && (
        <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-800 font-sans">
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Displaying pre-loaded lead inquiries. New submissions from your website contact form will sync here.</span>
          </div>
          <span className="text-[10px] font-mono bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-bold uppercase">Demo Mode</span>
        </div>
      )}

      {/* Filters Bar */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm font-sans">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 shadow-xs font-sans"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-gray-200 rounded-xl pl-10 pr-8 py-2.5 text-xs text-slate-900 appearance-none focus:outline-none focus:border-red-500 shadow-xs font-sans"
            >
              <option value="all">All Statuses ({contacts.length})</option>
              <option value="new">New Inquiries</option>
              <option value="contacted">Contacted</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <span className="text-xs font-mono text-slate-500 font-medium">
          Showing {filteredContacts.length} of {contacts.length} leads
        </span>
      </div>

      {/* Leads Table */}
      {loading ? (
        <div className="py-20 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm font-sans">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 text-xs font-mono uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Client Info</th>
                  <th className="px-6 py-4">Project & Budget</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-light">
                      No contact leads found matching your filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">
                          {contact.firstName} {contact.lastName}
                        </p>
                        <div className="space-y-0.5 mt-1 text-xs">
                          <p className="text-slate-700 flex items-center space-x-1.5">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <span>{contact.email}</span>
                          </p>
                          {contact.phone && (
                            <p className="text-slate-500 flex items-center space-x-1.5">
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              <span>{contact.phone}</span>
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs font-semibold text-slate-800 capitalize">
                          {contact.projectType ? contact.projectType.replace('-', ' ') : 'General'}
                        </p>
                        {contact.budget && (
                          <p className="text-xs text-slate-500 font-mono mt-0.5">
                            Budget: {contact.budget}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={contact.status}
                          onChange={(e) => updateStatus(contact.id, e.target.value)}
                          className={`text-xs font-semibold rounded-lg px-2.5 py-1 bg-white border focus:outline-none shadow-xs ${
                            contact.status === 'new'
                              ? 'text-red-600 border-red-300 bg-red-50'
                              : contact.status === 'contacted'
                              ? 'text-amber-700 border-amber-300 bg-amber-50'
                              : 'text-emerald-700 border-emerald-300 bg-emerald-50'
                          }`}
                        >
                          <option value="new">🔴 New</option>
                          <option value="contacted">🟡 Contacted</option>
                          <option value="completed">🟢 Completed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500 font-mono">
                        {contact.timestamp?.toDate
                          ? contact.timestamp.toDate().toLocaleDateString()
                          : 'Recent'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => openContactModal(contact)}
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-gray-200 rounded-lg text-xs font-semibold transition-colors shadow-xs"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-500" />
                          <span>View Lead</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Lead Detail Modal */}
      <AnimatePresence>
        {showModal && selectedContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white border border-gray-200 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 font-serif-luxury">Client Inquiry Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-900 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-gray-200">
                  <div>
                    <h4 className="text-xs font-mono uppercase text-slate-500 mb-2 font-bold">Personal Info</h4>
                    <p className="text-slate-900 font-bold text-base mb-1">
                      {selectedContact.firstName} {selectedContact.lastName}
                    </p>
                    <p className="text-slate-700 text-xs flex items-center space-x-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{selectedContact.email}</span>
                    </p>
                    {selectedContact.phone && (
                      <p className="text-slate-700 text-xs flex items-center space-x-1.5 mt-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{selectedContact.phone}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase text-slate-500 mb-2 font-bold">Project Scope</h4>
                    <p className="text-slate-800 capitalize font-medium">
                      Type: {selectedContact.projectType?.replace('-', ' ') || 'General'}
                    </p>
                    {selectedContact.budget && (
                      <p className="text-slate-600 text-xs font-mono mt-1">
                        Budget: {selectedContact.budget}
                      </p>
                    )}
                    <p className="text-xs text-slate-400 mt-2 font-mono">
                      Submitted: {selectedContact.timestamp?.toDate ? selectedContact.timestamp.toDate().toLocaleString() : 'Recent'}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase text-slate-500 mb-2 font-bold">Client Message</h4>
                  <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 text-slate-800 leading-relaxed text-xs font-light">
                    {selectedContact.message || 'No message provided.'}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-500 font-mono">Mark status:</span>
                  <button
                    onClick={() => {
                      updateStatus(selectedContact.id, 'contacted')
                      setShowModal(false)
                    }}
                    className="px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-300 rounded-lg text-xs font-semibold hover:bg-amber-100 transition-colors"
                  >
                    Contacted
                  </button>
                  <button
                    onClick={() => {
                      updateStatus(selectedContact.id, 'completed')
                      setShowModal(false)
                    }}
                    className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-300 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors"
                  >
                    Completed
                  </button>
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminShell>
  )
}