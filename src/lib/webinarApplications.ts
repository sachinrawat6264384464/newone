// lib/webinarApplications.ts
import { db } from '@/lib/firebase'
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp,
  updateDoc
} from 'firebase/firestore'

export const WEBINAR_COLLECTION = 'webinar_applications'

export interface WebinarApplication {
  id?: string
  name: string
  email: string
  phone: string
  identity: string
  coachingGoal: string
  confidentialAck: string
  liveCommitment: string
  status?: 'new' | 'contacted' | 'registered' | 'rejected'
  createdAt: number
  submittedAtFormatted?: string
  source?: string
}

// Save a new application
export async function saveWebinarApplication(data: Omit<WebinarApplication, 'id' | 'createdAt'>): Promise<string> {
  const now = new Date()
  const payload = {
    ...data,
    status: data.status || 'new',
    createdAt: Date.now(),
    submittedAtFormatted: now.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
    timestamp: Timestamp.now()
  }

  const docRef = await addDoc(collection(db, WEBINAR_COLLECTION), payload)
  return docRef.id
}

// Fetch all applications ordered by newest first
export async function getWebinarApplications(): Promise<WebinarApplication[]> {
  try {
    const q = query(collection(db, WEBINAR_COLLECTION), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data()
    })) as WebinarApplication[]
  } catch (err) {
    // Fallback if index isn't created yet or ordered query fails
    const snapshot = await getDocs(collection(db, WEBINAR_COLLECTION))
    const list = snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data()
    })) as WebinarApplication[]
    return list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
  }
}

// Delete an application
export async function deleteWebinarApplication(id: string): Promise<void> {
  await deleteDoc(doc(db, WEBINAR_COLLECTION, id))
}

// Update application status
export async function updateApplicationStatus(id: string, status: string): Promise<void> {
  await updateDoc(doc(db, WEBINAR_COLLECTION, id), { status })
}
