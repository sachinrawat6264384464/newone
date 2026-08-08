import { db } from './firebase'
import { collection, doc, getDocs, getDoc, setDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore'
import { CustomPage } from '@/types/page'

const COLLECTION_NAME = 'pages'

export async function getCustomPages(publishedOnly = true): Promise<CustomPage[]> {
  try {
    const pagesRef = collection(db, COLLECTION_NAME)
    const q = publishedOnly 
      ? query(pagesRef, where('published', '==', true), orderBy('createdAt', 'desc'))
      : query(pagesRef, orderBy('createdAt', 'desc'))
      
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CustomPage))
  } catch (error) {
    console.error('Error fetching custom pages:', error)
    return []
  }
}

export async function getCustomPageBySlug(slug: string): Promise<CustomPage | null> {
  try {
    const pagesRef = collection(db, COLLECTION_NAME)
    const q = query(pagesRef, where('slug', '==', slug))
    const snapshot = await getDocs(q)
    
    if (snapshot.empty) return null
    
    const doc = snapshot.docs[0]
    return { id: doc.id, ...doc.data() } as CustomPage
  } catch (error) {
    console.error('Error fetching custom page by slug:', error)
    return null
  }
}

export async function saveCustomPage(page: CustomPage): Promise<void> {
  try {
    if (!page.id) {
      // Create new
      const docRef = doc(collection(db, COLLECTION_NAME))
      page.id = docRef.id
      page.createdAt = Date.now()
    }
    page.updatedAt = Date.now()
    
    await setDoc(doc(db, COLLECTION_NAME, page.id), page, { merge: true })
  } catch (error) {
    console.error('Error saving custom page:', error)
    throw error
  }
}

export async function deleteCustomPage(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id))
  } catch (error) {
    console.error('Error deleting custom page:', error)
    throw error
  }
}
