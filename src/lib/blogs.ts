import { db } from './firebase'
import { collection, doc, getDocs, getDoc, setDoc, deleteDoc, query, where, orderBy, serverTimestamp } from 'firebase/firestore'
import { BlogPost } from '@/types/blog'

const COLLECTION_NAME = 'blogs'

export async function getBlogs(publishedOnly = true): Promise<BlogPost[]> {
  try {
    const blogsRef = collection(db, COLLECTION_NAME)
    const q = publishedOnly 
      ? query(blogsRef, where('published', '==', true), orderBy('createdAt', 'desc'))
      : query(blogsRef, orderBy('createdAt', 'desc'))
      
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost))
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const blogsRef = collection(db, COLLECTION_NAME)
    const q = query(blogsRef, where('slug', '==', slug))
    const snapshot = await getDocs(q)
    
    if (snapshot.empty) return null
    
    const doc = snapshot.docs[0]
    return { id: doc.id, ...doc.data() } as BlogPost
  } catch (error) {
    console.error('Error fetching blog by slug:', error)
    return null
  }
}

export async function saveBlog(blog: BlogPost): Promise<void> {
  try {
    if (!blog.id) {
      // Create new
      const docRef = doc(collection(db, COLLECTION_NAME))
      blog.id = docRef.id
      blog.createdAt = Date.now()
    }
    blog.updatedAt = Date.now()
    
    await setDoc(doc(db, COLLECTION_NAME, blog.id), blog, { merge: true })
  } catch (error) {
    console.error('Error saving blog:', error)
    throw error
  }
}

export async function deleteBlog(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id))
  } catch (error) {
    console.error('Error deleting blog:', error)
    throw error
  }
}
