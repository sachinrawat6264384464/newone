// types/firebase.ts - Add proper Firebase types
import { Timestamp } from 'firebase/firestore'

export interface ContactData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  projectType: string
  budget?: string
  message: string
  timestamp: Timestamp
  status: 'new' | 'contacted' | 'completed'
}

export interface Contact extends ContactData {
  id: string
}

export interface Stats {
  totalContacts: number
  newContacts: number
  thisWeek: number
  thisMonth: number
}

