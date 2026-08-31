import { db } from './firebase'
import { collection, doc, getDocs, setDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore'
import { BlogPost } from '@/types/blog'
import { getCachedData, setCachedData, invalidateCache } from './cache'

const COLLECTION_NAME = 'blogs'
const CACHE_KEY = 'blogs_list'

export async function getBlogs(publishedOnly = true, forceRefresh = false): Promise<BlogPost[]> {
  const key = `${CACHE_KEY}_${publishedOnly ? 'published' : 'all'}`;
  if (!forceRefresh) {
    const cached = getCachedData<BlogPost[]>(key);
    if (cached && cached.length > 0) {
      return cached;
    }
  }

  try {
    const blogsRef = collection(db, COLLECTION_NAME)
    const snapshot = await getDocs(blogsRef)
    let items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost))
    if (publishedOnly) {
      items = items.filter(b => b.published)
    }
    items.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    setCachedData(key, items);
    return items
  } catch (error: unknown) {
    if ((error as { code?: string })?.code !== 'permission-denied') {
      console.error('Error fetching blogs:', error)
    }
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
  } catch (error: unknown) {
    if ((error as { code?: string })?.code !== 'permission-denied') {
      console.error('Error fetching blog by slug:', error)
    }
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
    invalidateCache(CACHE_KEY);
  } catch (error) {
    console.error('Error saving blog:', error)
    throw error
  }
}

export async function deleteBlog(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id))
    invalidateCache(CACHE_KEY);
  } catch (error) {
    console.error('Error deleting blog:', error)
    throw error
  }
}
