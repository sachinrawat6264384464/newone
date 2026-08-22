import { db } from './firebase'
import { collection, doc, getDocs, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore'
import { ServiceItem } from '@/types/service'
import { getCachedData, setCachedData, invalidateCache } from './cache'

const COLLECTION_NAME = 'services'
const CACHE_KEY = 'services_list'

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'end-to-end-construction',
    title: 'End to End Construction',
    subtitle: 'TURNKEY CONSTRUCTION WITH MATERIAL',
    description: 'Complete end-to-end turnkey construction service including high-grade material management, architectural facade design, and phase planning of plot.',
    coverImage: 'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298162/Homestorey-media/What%20we%20create/vt9avmrazh3jvii5ytl9.jpg',
    images: [
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298162/Homestorey-media/What%20we%20create/vt9avmrazh3jvii5ytl9.jpg'
    ],
    category: 'Construction',
    features: [
      'Construction with material',
      'Architectural & Facade design',
      'Phase planning of plot',
      'Structural supervision'
    ],
    priceEstimate: 'Custom Quote',
    published: true,
    order: 1,
    updatedAt: Date.now()
  },
  {
    id: 'facade-design',
    title: 'Facade Design',
    subtitle: 'LUXURY EXTERIOR ARCHITECTURE',
    description: 'Stunning exterior designs that create lasting first impressions with premium materials, 3D elevation rendering, and architectural lighting.',
    coverImage: 'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298138/Homestorey-media/Hero/haemuplqyv9glq1651fc.jpg',
    images: [
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298138/Homestorey-media/Hero/haemuplqyv9glq1651fc.jpg'
    ],
    category: 'Exterior',
    features: [
      '3D Elevation Rendering',
      'Material Specification',
      'Architectural Lighting',
      'Structure Optimization'
    ],
    priceEstimate: 'Custom Quote',
    published: true,
    order: 2,
    updatedAt: Date.now()
  },
  {
    id: 'full-home-interiors',
    title: 'Full Home Interiors',
    subtitle: 'BESPOKE LUXURY INTERIOR DESIGN',
    description: 'Complete interior design & execution including modular kitchens, living area styling, bedroom suites, and customized woodwork.',
    coverImage: 'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298165/Homestorey-media/What%20we%20create/jjhie0tfazmie9laeimu.jpg',
    images: [
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298165/Homestorey-media/What%20we%20create/jjhie0tfazmie9laeimu.jpg'
    ],
    category: 'Interior',
    features: [
      'Modular Kitchens & Wardrobes',
      'Living & Bedroom Aesthetics',
      'False Ceiling & Ambient Lighting',
      'Turnkey Execution'
    ],
    priceEstimate: 'Custom Quote',
    published: true,
    order: 3,
    updatedAt: Date.now()
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

export async function getServices(publishedOnly = false, forceRefresh = false): Promise<ServiceItem[]> {
  // 1. Check TTL cache if forceRefresh is false
  if (!forceRefresh) {
    const cached = getCachedData<ServiceItem[]>(CACHE_KEY);
    if (cached && cached.length > 0) {
      return publishedOnly ? cached.filter(s => s.published) : cached;
    }
  }

  try {
    const servicesRef = collection(db, COLLECTION_NAME)
    const q = query(servicesRef, orderBy('order', 'asc'))
    const snapshot = await fetchWithTimeout(getDocs(q))
    
    let items: ServiceItem[] = []
    if (!snapshot.empty) {
      items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ServiceItem))
    }

    // Check if any default services are missing in Firestore, and auto-seed them
    const existingIds = new Set(items.map(i => i.id))
    const missingDefaults = INITIAL_SERVICES.filter(s => !existingIds.has(s.id))
    
    if (missingDefaults.length > 0) {
      Promise.all(
        missingDefaults.map(s => setDoc(doc(db, COLLECTION_NAME, s.id), s, { merge: true }))
      ).catch(err => console.warn('Auto-seed services error:', err))
    }

    const mergedItems = [...items, ...missingDefaults].sort((a, b) => (a.order || 99) - (b.order || 99))

    // Store in cache
    setCachedData(CACHE_KEY, mergedItems);

    return publishedOnly ? mergedItems.filter(s => s.published) : mergedItems
  } catch (error: unknown) {
    if ((error as { code?: string })?.code !== 'permission-denied') {
      console.warn('Error fetching services from Firestore, using initial fallback:', error)
    }
    const fallback = publishedOnly ? INITIAL_SERVICES.filter(s => s.published) : INITIAL_SERVICES;
    setCachedData(CACHE_KEY, fallback);
    return fallback;
  }
}

export async function saveService(service: Partial<ServiceItem> & { title: string }): Promise<void> {
  const serviceId = service.id || service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `service-${Date.now()}`
  const now = Date.now()
  
  const cover = service.coverImage || (service.images && service.images.length > 0 ? service.images[0] : 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80')

  const payload: ServiceItem = {
    id: serviceId,
    title: service.title,
    subtitle: service.subtitle || '',
    description: service.description || '',
    coverImage: cover,
    images: service.images && service.images.length > 0 ? service.images : [cover],
    category: service.category || 'General',
    features: service.features || [],
    priceEstimate: service.priceEstimate || 'Custom Quote',
    published: service.published !== undefined ? service.published : true,
    order: service.order || 99,
    updatedAt: now
  }

  try {
    await setDoc(doc(db, COLLECTION_NAME, serviceId), payload, { merge: true })
    invalidateCache(CACHE_KEY);
  } catch (error) {
    console.error('Error saving service to Firestore:', error)
    throw error
  }
}

export async function deleteService(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id))
    invalidateCache(CACHE_KEY);
  } catch (error) {
    console.error('Error deleting service from Firestore:', error)
    throw error
  }
}
