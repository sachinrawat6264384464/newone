import { db } from './firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { SiteSettings, HeroSlideItem } from '@/types/siteSettings'

const SETTINGS_DOC_ID = 'general_settings'
const COLLECTION_NAME = 'settings'
const LOCAL_STORAGE_KEY = 'homestorey_site_settings_cache'

export const DEFAULT_HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 'hero-slide-1',
    tagline: 'CONSTRUCTION · INTERIORS · ARCHITECTURE',
    title: 'Look At What We Design.',
    subtitle: 'From bespoke architectural facades to functional luxury interiors, we transform spaces with precision, innovation, and timeless elegance.',
    image: 'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298136/Homestorey-media/Hero/hfqrz6nqcaxbwa22urgx.jpg'
  },
  {
    id: 'hero-slide-2',
    tagline: 'ARCHITECTURE · INTERIORS · TURNKEY',
    title: 'Bespoke Residences. Unmatched Quality.',
    subtitle: 'Transforming residential and commercial properties into architectural masterpieces tailored meticulously to your lifestyle.',
    image: 'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298138/Homestorey-media/Hero/haemuplqyv9glq1651fc.jpg'
  },
  {
    id: 'hero-slide-3',
    tagline: 'LUXURY HOMES · EXPERT EXECUTION',
    title: 'Crafting Elegance. Creating Comfort.',
    subtitle: 'From initial conceptual rendering to key handover, our team manages every detail of your dream build with complete transparency.',
    image: 'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298162/Homestorey-media/What%20we%20create/vt9avmrazh3jvii5ytl9.jpg'
  },
  {
    id: 'hero-slide-4',
    tagline: 'SERENE BEDROOMS · MODERN KITCHENS',
    title: 'Interior Refinement. Lasting Luxury.',
    subtitle: 'Redefine your living environments with thoughtfully curated interiors that bring warmth, style, and functional elegance.',
    image: 'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298165/Homestorey-media/What%20we%20create/jjhie0tfazmie9laeimu.jpg'
  }
]

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'Home Storey',
  heroTitle: 'Look At What We Design.',
  heroSubtitle: 'From bespoke architectural facades to functional luxury interiors, we transform spaces with precision, innovation, and timeless elegance.',
  heroImages: [
    'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298136/Homestorey-media/Hero/hfqrz6nqcaxbwa22urgx.jpg',
    'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298138/Homestorey-media/Hero/haemuplqyv9glq1651fc.jpg',
    'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298162/Homestorey-media/What%20we%20create/vt9avmrazh3jvii5ytl9.jpg',
    'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298165/Homestorey-media/What%20we%20create/jjhie0tfazmie9laeimu.jpg'
  ],
  heroSlides: DEFAULT_HERO_SLIDES,
  galleryHeroImages: [
    'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298136/Homestorey-media/Hero/hfqrz6nqcaxbwa22urgx.jpg',
    'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298138/Homestorey-media/Hero/haemuplqyv9glq1651fc.jpg',
    'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298165/Homestorey-media/What%20we%20create/jjhie0tfazmie9laeimu.jpg'
  ],
  contactEmail: 'homestorey@thenidhimittal.com',
  contactPhone: '+91 98765 43210',
  officeAddress: 'Delhi NCR, India',
  whatsappNumber: '+919876543210',
  instagramUrl: 'https://instagram.com/homestorey.noida/',
  facebookUrl: 'https://www.facebook.com/people/Home-storey/61563975190788',
  linkedinUrl: 'https://www.linkedin.com/company/homestorey',
  announcementBanner: {
    enabled: true,
    message: '✨ Book a complimentary interior design session with Nidhi Mittal today!',
    linkUrl: 'https://tidycal.com/homestorey/free-design-discussion'
  },
  updatedAt: Date.now()
}

export async function getSiteSettings(): Promise<SiteSettings> {
  let cached: SiteSettings | null = null
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (stored) {
        cached = JSON.parse(stored)
      }
    } catch (e) {
      console.warn('LocalStorage read error:', e)
    }
  }

  try {
    const docRef = doc(db, COLLECTION_NAME, SETTINGS_DOC_ID)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      const data = docSnap.data() as Partial<SiteSettings>
      
      // If cached data exists and is newer or holds custom uploaded slides, use cached data
      if (cached && cached.heroSlides && cached.heroSlides.length > 0) {
        if (!data.updatedAt || (cached.updatedAt && cached.updatedAt >= data.updatedAt)) {
          return {
            ...DEFAULT_SETTINGS,
            ...data,
            ...cached
          }
        }
      }

      let finalSlides = (cached && cached.heroSlides) ? cached.heroSlides : (data.heroSlides || null)
      if (!finalSlides && data.heroImages && data.heroImages.length > 0) {
        finalSlides = data.heroImages.map((img, idx) => ({
          id: `hero-slide-${idx + 1}`,
          tagline: DEFAULT_HERO_SLIDES[idx % DEFAULT_HERO_SLIDES.length]?.tagline || 'LUXURY HOMES',
          title: data.heroTitle || DEFAULT_HERO_SLIDES[idx % DEFAULT_HERO_SLIDES.length]?.title || 'Look At What We Design.',
          subtitle: data.heroSubtitle || DEFAULT_HERO_SLIDES[idx % DEFAULT_HERO_SLIDES.length]?.subtitle || 'From bespoke architectural facades to functional luxury interiors...',
          image: img
        }))
      }

      const result: SiteSettings = {
        ...DEFAULT_SETTINGS,
        ...data,
        heroSlides: finalSlides && finalSlides.length > 0 ? finalSlides : DEFAULT_SETTINGS.heroSlides,
        heroImages: data.heroImages || (finalSlides ? finalSlides.map(s => s.image) : DEFAULT_SETTINGS.heroImages),
        galleryHeroImages: Array.isArray(data.galleryHeroImages) ? data.galleryHeroImages : DEFAULT_SETTINGS.galleryHeroImages,
        ...(cached ? cached : {})
      }

      return result
    }

    if (cached) {
      return {
        ...DEFAULT_SETTINGS,
        ...cached
      }
    }

    return DEFAULT_SETTINGS
  } catch (error: unknown) {
    if (cached) {
      return {
        ...DEFAULT_SETTINGS,
        ...cached
      }
    }
    return DEFAULT_SETTINGS
  }
}

export async function saveSiteSettings(settings: Partial<SiteSettings>): Promise<void> {
  const payload: SiteSettings = {
    ...DEFAULT_SETTINGS,
    ...settings,
    updatedAt: Date.now()
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload))
    } catch (e) {
      console.warn('LocalStorage save error:', e)
    }
  }

  try {
    await setDoc(doc(db, COLLECTION_NAME, SETTINGS_DOC_ID), payload)
  } catch (error: any) {
    if (error?.code === 'permission-denied') {
      console.warn('Firestore write permission denied. Saved to LocalStorage cache successfully.', error)
      return
    }
    console.error('Error saving site settings to Firestore:', error)
  }
}
