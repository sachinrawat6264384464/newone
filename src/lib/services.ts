import { db } from './firebase'
import { collection, doc, getDocs, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore'
import { ServiceItem } from '@/types/service'

const COLLECTION_NAME = 'services'

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'facade-design',
    title: 'Facade Design',
    subtitle: 'Luxury Exterior Architecture',
    description: 'Stunning exterior designs that create lasting first impressions with premium materials and lighting.',
    coverImage: 'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298162/Homestorey-media/What%20we%20create/vt9avmrazh3jvii5ytl9.jpg',
    images: [
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298162/Homestorey-media/What%20we%20create/vt9avmrazh3jvii5ytl9.jpg',
      '/What_we_create/Facade.jpg',
      '/Facade_1.jpg'
    ],
    category: 'Exterior',
    features: ['3D Elevation Rendering', 'Material Specification', 'Architectural Lighting', 'Structure Optimization'],
    priceEstimate: 'Custom Quote',
    published: true,
    order: 1,
    updatedAt: Date.now()
  },
  {
    id: 'living-area',
    title: 'Living Area',
    subtitle: 'Bespoke Social & Family Spaces',
    description: 'Comfortable and stylish living spaces perfect for family gatherings, entertaining guests, and relaxing.',
    coverImage: 'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298165/Homestorey-media/What%20we%20create/jjhie0tfazmie9laeimu.jpg',
    images: [
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298165/Homestorey-media/What%20we%20create/jjhie0tfazmie9laeimu.jpg',
      '/What_we_create/Living-area.jpg',
      '/Living_1.jpg'
    ],
    category: 'Interior',
    features: ['Custom Sofa & Seating', 'TV Wall & Accent Panels', 'Ambient Ceiling Lights', 'Spatial Layout Planning'],
    priceEstimate: 'Custom Quote',
    published: true,
    order: 2,
    updatedAt: Date.now()
  },
  {
    id: 'kitchen-design',
    title: 'Kitchen Design',
    subtitle: 'Modular & High-Function Kitchens',
    description: 'Modern, highly functional modular kitchens engineered to be the warm, vibrant heart of your home.',
    coverImage: 'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298164/Homestorey-media/What%20we%20create/t6w21ualgsjkz6ifc8bo.jpg',
    images: [
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298164/Homestorey-media/What%20we%20create/t6w21ualgsjkz6ifc8bo.jpg',
      '/What_we_create/Kitchen.jpeg',
      '/kitchen1.jpg'
    ],
    category: 'Interior',
    features: ['Italian Hardware & Pull-outs', 'Quartz Countertops', 'Pantry & Storage Units', 'Ergonomic Work Triangle'],
    priceEstimate: 'Custom Quote',
    published: true,
    order: 3,
    updatedAt: Date.now()
  },
  {
    id: 'bedroom-design',
    title: 'Bedroom Design',
    subtitle: 'Peaceful Sanctuary & Suites',
    description: 'Peaceful, luxurious bedroom retreats designed for rest, deep sleep, and personalized comfort.',
    coverImage: 'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298161/Homestorey-media/What%20we%20create/edh6sfa6zt7byruupb2b.jpg',
    images: [
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298161/Homestorey-media/What%20we%20create/edh6sfa6zt7byruupb2b.jpg',
      '/What_we_create/Bedroom.jpeg',
      '/Bedroom_1.png'
    ],
    category: 'Interior',
    features: ['Upholstered Headboards', 'Walk-in Wardrobe Design', 'Acoustic Soundproofing', 'Mood Lighting Controls'],
    priceEstimate: 'Custom Quote',
    published: true,
    order: 4,
    updatedAt: Date.now()
  },
  {
    id: 'bathroom-design',
    title: 'Bathroom Design',
    subtitle: 'Spa & Wellness Sanctuaries',
    description: 'Spa-like master bathrooms combining luxury stone finishes, rainfall showers, and seamless functionality.',
    coverImage: 'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298160/Homestorey-media/What%20we%20create/wqnxhezwbtsnivywxqej.jpg',
    images: [
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298160/Homestorey-media/What%20we%20create/wqnxhezwbtsnivywxqej.jpg',
      '/What_we_create/Bathroom.jpg',
      '/Bathroom_1.jpg'
    ],
    category: 'Interior',
    features: ['Glass Enclosures', 'Concealed Sanitary Fittings', 'Anti-skid Marble Tiles', 'Vanity & LED Mirror Setup'],
    priceEstimate: 'Custom Quote',
    published: true,
    order: 5,
    updatedAt: Date.now()
  },
  {
    id: 'home-office',
    title: 'Home Office Design',
    subtitle: 'Productive Workspaces',
    description: 'Productive, ergonomically designed work-from-home spaces tailored to focus, creativity, and privacy.',
    coverImage: 'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298163/Homestorey-media/What%20we%20create/hqflyynqrv1uccqarkmf.jpg',
    images: [
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298163/Homestorey-media/What%20we%20create/hqflyynqrv1uccqarkmf.jpg',
      '/What_we_create/Home-office.jpeg',
      '/home_office1.jpg'
    ],
    category: 'Commercial / WFH',
    features: ['Ergonomic Desk & Storage', 'Integrated Cable Management', 'Acoustic Wall Panels', 'Video Call Backdrop'],
    priceEstimate: 'Custom Quote',
    published: true,
    order: 6,
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

export async function getServices(publishedOnly = false): Promise<ServiceItem[]> {
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
      // Auto-seed missing default services to Firestore so they persist
      Promise.all(
        missingDefaults.map(s => setDoc(doc(db, COLLECTION_NAME, s.id), s, { merge: true }))
      ).catch(err => console.warn('Auto-seed services error:', err))
    }

    const mergedItems = [...items, ...missingDefaults].sort((a, b) => (a.order || 99) - (b.order || 99))

    return publishedOnly ? mergedItems.filter(s => s.published) : mergedItems
  } catch (error: unknown) {
    if ((error as { code?: string })?.code !== 'permission-denied') {
      console.warn('Error fetching services from Firestore, using initial fallback:', error)
    }
    return publishedOnly ? INITIAL_SERVICES.filter(s => s.published) : INITIAL_SERVICES
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
  } catch (error) {
    console.error('Error saving service to Firestore:', error)
    throw error
  }
}

export async function deleteService(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id))
  } catch (error) {
    console.error('Error deleting service from Firestore:', error)
    throw error
  }
}
