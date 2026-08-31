import { db } from './firebase'
import { collection, doc, getDocs, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore'
import { GalleryItem } from '@/types/galleryItem'
import { getCachedData, setCachedData, invalidateCache } from './cache'

const COLLECTION_NAME = 'gallery_items'
const CACHE_KEY = 'gallery_items_list'

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'facade-exterior',
    title: 'Facade & Exterior Architecture',
    subtitle: 'STUNNING FIRST IMPRESSIONS',
    category: 'Facade & Exterior',
    image: 'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298133/Homestorey-media/Gallery%20page/qrvccsdngw1eemstykjc.jpg',
    images: [
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298133/Homestorey-media/Gallery%20page/qrvccsdngw1eemstykjc.jpg',
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298116/Homestorey-media/Gallery%20page/vptfrusn2esxnjv76h0h.jpg',
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298117/Homestorey-media/Gallery%20page/hutrz0l5g0vpipc9fja6.jpg',
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298118/Homestorey-media/Gallery%20page/y8fzk10gfdjb8vus5jkv.jpg'
    ],
    description: "Transform your home's exterior into an architectural masterpiece. From grand entrance foyers to bespoke elevation treatments, we craft outdoor spaces that command admiration.",
    features: [
      'Modern & classical elevation design',
      'Landscaping & outdoor lounge zones',
      'Entrance foyer & door styling',
      'Architectural exterior lighting'
    ],
    published: true,
    order: 1,
    createdAt: Date.now()
  },
  {
    id: 'living-dining',
    title: 'Living & Dining Spaces',
    subtitle: 'BESPOKE GATHERING AREAS',
    category: 'Living & Dining',
    image: 'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298128/Homestorey-media/Gallery%20page/zi2wip1jxakzjqizhdgm.jpg',
    images: [
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298128/Homestorey-media/Gallery%20page/zi2wip1jxakzjqizhdgm.jpg',
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298129/Homestorey-media/Gallery%20page/caun6igvzixrok6wmnqh.jpg',
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298130/Homestorey-media/Gallery%20page/xpnzyzppx6h2c10v683v.jpg',
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298131/Homestorey-media/Gallery%20page/grl8vrpjqr1nv7iaoxnd.jpg'
    ],
    description: 'Design expansive living areas where families connect. Our approach harmonizes custom layout planning with premium materials for effortless entertaining.',
    features: [
      'Spatial layout & seating flow',
      'Custom dining tables & mood lighting',
      'Integrated media wall concepts',
      'Seamless open-plan organization'
    ],
    published: true,
    order: 2,
    createdAt: Date.now()
  },
  {
    id: 'modular-kitchen',
    title: 'Modular Kitchen & Storage',
    subtitle: 'CULINARY & FUNCTIONAL EXCELLENCE',
    category: 'Modular Kitchen',
    image: 'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298127/Homestorey-media/Gallery%20page/edk6q2gjwi5g0u2mw3pp.jpg',
    images: [
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298127/Homestorey-media/Gallery%20page/edk6q2gjwi5g0u2mw3pp.jpg',
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298126/Homestorey-media/Gallery%20page/spkd2fuj0bcyoomyi1pq.jpg',
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298125/Homestorey-media/Gallery%20page/ceecfgprdjhjobsjqcm8.jpg'
    ],
    description: 'Transform your culinary environment into an efficient, ergonomic work of art featuring German hardware, island counters, and smart storage systems.',
    features: [
      'Modular island kitchen layouts',
      'Soft-close tandem drawer systems',
      'Pantry towers & corner pull-outs',
      'Quartz & marble countertop finishes'
    ],
    published: true,
    order: 3,
    createdAt: Date.now()
  },
  {
    id: 'bedrooms-suites',
    title: 'Bedrooms & Private Suites',
    subtitle: 'PERSONAL SANCTUARIES',
    category: 'Bedrooms',
    image: 'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298115/Homestorey-media/Gallery%20page/pd3nosf13zophljmvzmf.jpg',
    images: [
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298115/Homestorey-media/Gallery%20page/pd3nosf13zophljmvzmf.jpg',
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298106/Homestorey-media/Gallery%20page/dj6mabg0bhos2uwy92xb.jpg',
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298110/Homestorey-media/Gallery%20page/cwhrf0xslkk2k3kbbkf2.jpg'
    ],
    description: 'Create serene private retreats that foster rest and comfort. From master suites to walk-in wardrobes, every detail is tailored to your personal aesthetic.',
    features: [
      'Master suite layout & headboard walls',
      'Walk-in closet & wardrobe organization',
      'Ensuite luxury bathroom designs',
      'Acoustic & warm ambient lighting'
    ],
    published: true,
    order: 4,
    createdAt: Date.now()
  },
  {
    id: 'terrace-mandir',
    title: 'Terrace, Mandir & Wellness',
    subtitle: 'SACRED & LIFESTYLE SPACES',
    category: 'Terrace & Mandir',
    image: 'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298132/Homestorey-media/Gallery%20page/lfegjcseu2kxstbqgntm.jpg',
    images: [
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298132/Homestorey-media/Gallery%20page/lfegjcseu2kxstbqgntm.jpg',
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298136/Homestorey-media/Gallery%20page/lnawan5pbjhamznuqfwa.jpg',
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298135/Homestorey-media/Gallery%20page/vvdg8lq8e2ggxhqw53b1.webp'
    ],
    description: 'Infuse unique character into your home with tranquil prayer rooms, rooftop deck entertainment areas, and dedicated wellness corners.',
    features: [
      'Custom marble Mandir room designs',
      'Terrace party decks & green pergolas',
      'Yoga & home gym wellness zones',
      'Balcony seating & planter arrangements'
    ],
    published: true,
    order: 5,
    createdAt: Date.now()
  }
]

function fetchWithTimeout<T>(promise: Promise<T>, timeoutMs = 3500): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Firestore timeout')), timeoutMs)
    )
  ]);
}

export async function getGalleryItems(publishedOnly = false, forceRefresh = false): Promise<GalleryItem[]> {
  if (!forceRefresh) {
    const cached = getCachedData<GalleryItem[]>(CACHE_KEY);
    if (cached && cached.length > 0) {
      return publishedOnly ? cached.filter(g => g.published) : cached;
    }
  }

  try {
    const galleryRef = collection(db, COLLECTION_NAME)
    const q = query(galleryRef, orderBy('order', 'asc'))
    const snapshot = await fetchWithTimeout(getDocs(q))
    
    let items: GalleryItem[] = []
    if (!snapshot.empty) {
      items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryItem))
    }

    const existingIds = new Set(items.map(i => i.id))
    const missingDefaults = INITIAL_GALLERY_ITEMS.filter(g => !existingIds.has(g.id))
    const mergedItems = [...items, ...missingDefaults].sort((a, b) => (a.order || 99) - (b.order || 99))

    setCachedData(CACHE_KEY, mergedItems);

    return publishedOnly ? mergedItems.filter(g => g.published) : mergedItems
  } catch (error: unknown) {
    if ((error as { code?: string })?.code !== 'permission-denied') {
      console.warn('Error fetching gallery items from Firestore, using initial fallback:', error)
    }
    const fallback = publishedOnly ? INITIAL_GALLERY_ITEMS.filter(g => g.published) : INITIAL_GALLERY_ITEMS;
    setCachedData(CACHE_KEY, fallback);
    return fallback;
  }
}

export async function saveGalleryItem(item: Partial<GalleryItem> & { title: string }): Promise<void> {
  const itemId = item.id || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `gallery-${Date.now()}`
  const now = Date.now()
  
  const cover = item.image || (item.images && item.images.length > 0 ? item.images[0] : '')

  const payload: GalleryItem = {
    id: itemId,
    title: item.title,
    subtitle: item.subtitle || '',
    category: item.category || 'General',
    image: cover,
    images: item.images && item.images.length > 0 ? item.images : [cover],
    description: item.description || '',
    features: item.features || [],
    published: item.published !== undefined ? item.published : true,
    order: item.order || 99,
    createdAt: item.createdAt || now,
    updatedAt: now
  }

  try {
    await setDoc(doc(db, COLLECTION_NAME, itemId), payload, { merge: true })
    invalidateCache(CACHE_KEY);
  } catch (error) {
    console.error('Error saving gallery item to Firestore:', error)
    throw error
  }
}

export async function deleteGalleryItem(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id))
    invalidateCache(CACHE_KEY);
  } catch (error) {
    console.error('Error deleting gallery item from Firestore:', error)
    throw error
  }
}
