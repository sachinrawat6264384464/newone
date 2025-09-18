// app/admin/contacts/page.tsx - Fixed all issues
'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { collection, getDocs, orderBy, query, doc, updateDoc, Timestamp } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import { useAuth } from '../../../lib/auth'
import { 
  Home, 
  Search, 
  Filter, 
  Eye, 
  Mail, 
  Phone, 
  Calendar,
  ArrowLeft,
  Check,
  X
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface Contact {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  projectType?: string
  budget?: string
  message: string
  status: string
  timestamp: Timestamp
}

export default function AdminContacts() {
  const { user } = useAuth()
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [showModal, setShowModal] = useState(false)

  const filterContacts = useCallback(() => {
    let filtered = contacts

    if (searchTerm) {
      filtered = filtered.filter(contact =>
        contact.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone?.includes(searchTerm)
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(contact => contact.status === statusFilter)
    }

    setFilteredContacts(filtered)
  }, [contacts, searchTerm, statusFilter])

  const fetchContacts = useCallback(async () => {
    try {
      const contactsRef = collection(db, 'contacts')
      const contactsQuery = query(contactsRef, orderBy('timestamp', 'desc'))
      const contactsSnapshot = await getDocs(contactsQuery)
      
      const contactsData = contactsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Contact[]

      setContacts(contactsData)
    } catch (error) {
      console.error('Error fetching contacts:', error)
      toast.error('Error loading contacts')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!user) {
      router.push('/admin/login')
      return
    }

    fetchContacts()
  }, [user, router, fetchContacts])

  useEffect(() => {
    filterContacts()
  }, [filterContacts])

  const updateContactStatus = async (contactId: string, newStatus: string) => {
    try {
      const contactRef = doc(db, 'contacts', contactId)
      await updateDoc(contactRef, { status: newStatus })
      
      setContacts(contacts.map(contact => 
        contact.id === contactId ? { ...contact, status: newStatus } : contact
      ))
      
      toast.success(`Contact marked as ${newStatus}`)
    } catch (error) {
      console.error('Error updating contact status:', error)
      toast.error('Error updating contact status')
    }
  }

  const openContactModal = (contact: Contact) => {
    setSelectedContact(contact)
    setShowModal(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="text-gray-600 hover:text-primary-600">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Contact Management</h1>
                <p className="text-sm text-gray-600">{filteredContacts.length} contacts</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full md:w-64"
                />
              </div>
              
              <div className="relative">
                <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
                  aria-label="Filter contacts by status"
                  title="Filter contacts by status"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {contact.firstName} {contact.lastName}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center space-x-2">
                            <Mail className="w-4 h-4" />
                            <span>{contact.email}</span>
                          </div>
                          {contact.phone && (
                            <div className="text-sm text-gray-500 flex items-center space-x-2">
                              <Phone className="w-4 h-4" />
                              <span>{contact.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="font-medium capitalize">
                          {contact.projectType?.replace('-', ' ') || 'Not specified'}
                        </div>
                        {contact.budget && (
                          <div className="text-gray-500">Budget: {contact.budget}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={contact.status}
                        onChange={(e) => updateContactStatus(contact.id, e.target.value)}
                        className={`text-xs font-semibold rounded-full px-3 py-1 border-0 ${
                          contact.status === 'new' 
                            ? 'bg-red-100 text-red-800' 
                            : contact.status === 'contacted'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                        aria-label={`Update status for ${contact.firstName} ${contact.lastName}`}
                        title={`Update status for ${contact.firstName} ${contact.lastName}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{contact.timestamp?.toDate().toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => openContactModal(contact)}
                        className="text-primary-600 hover:text-primary-900 flex items-center space-x-1"
                        aria-label={`View details for ${contact.firstName} ${contact.lastName}`}
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredContacts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No contacts found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>

      {/* Contact Detail Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Contact Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close modal"
                title="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Personal Information</h4>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {selectedContact.firstName} {selectedContact.lastName}</p>
                    <p><span className="font-medium">Email:</span> {selectedContact.email}</p>
                    {selectedContact.phone && (
                      <p><span className="font-medium">Phone:</span> {selectedContact.phone}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Project Information</h4>
                  <div className="space-y-2">
                    <p><span className="font-medium">Type:</span> {selectedContact.projectType?.replace('-', ' ') || 'Not specified'}</p>
                    {selectedContact.budget && (
                      <p><span className="font-medium">Budget:</span> {selectedContact.budget}</p>
                    )}
                    <p><span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedContact.status === 'new' 
                          ? 'bg-red-100 text-red-800' 
                          : selectedContact.status === 'contacted'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {selectedContact.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Message</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">{selectedContact.message}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Submission Details</h4>
                <p className="text-sm text-gray-600">
                  Submitted on {selectedContact.timestamp?.toDate().toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  updateContactStatus(selectedContact.id, 'contacted')
                  setShowModal(false)
                }}
                className="px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Check className="w-4 h-4" />
                <span>Mark as Contacted</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}