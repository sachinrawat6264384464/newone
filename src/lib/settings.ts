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

export const DEFAULT_FEATURED_SERVICES: FeaturedServiceCard[] = [
  {
    id: 'feat-service-1',
    tag: 'CONSTRUCTION',
    title: 'End to End Construction',
    subtitle: 'TURNKEY CONSTRUCTION WITH MATERIAL',
    linkUrl: '/services/end-to-end-construction'
  },
  {
    id: 'feat-service-2',
    tag: 'EXTERIOR',
    title: 'Facade Design',
    subtitle: 'LUXURY EXTERIOR ARCHITECTURE',
    linkUrl: '/services/facade-design'
  },
  {
    id: 'feat-service-3',
    tag: 'INTERIOR',
    title: 'Full Home Interiors',
    subtitle: 'BESPOKE LUXURY INTERIOR DESIGN',
    linkUrl: '/services/full-home-interiors'
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
  featuredServiceCards: DEFAULT_FEATURED_SERVICES,
  galleryHeroImages: [
    'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298136/Homestorey-media/Hero/hfqrz6nqcaxbwa22urgx.jpg',
    'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298138/Homestorey-media/Hero/haemuplqyv9glq1651fc.jpg',
    'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298165/Homestorey-media/What%20we%20create/jjhie0tfazmie9laeimu.jpg'
  ],
  galleryHeroTagline: 'DESIGN PORTFOLIO',
  galleryHeroTitle: 'Welcome to Your Dream home Design Journey.',
  galleryHeroSubtext: 'From the moment you step through your front door to every corner of your living space, we bring your architectural vision to life.',

  // Dynamic Section Headings across Website
  servicesTagline: 'SERVICES WE OFFER',
  servicesTitle: 'Choose As Per Your Requirement.',

  problemsTagline: 'SOLUTIONS THAT MATTER',
  problemsTitle: 'We help you avoid costly mistakes',
  problemsSubtext: 'Our bespoke turnkey approach saves you from the typical stress, delays, and cost overruns in home construction.',

  processTagline: 'HOW WE WORK',
  processTitle: 'Our Process.',
  processSubtext: 'A transparent, 5-step journey from initial consultation to final handover and 3 months warranty support.',

  testimonialsTagline: 'CLIENT STORIES',
  testimonialsTitle: 'What Our Clients Say.',
  testimonialsSubtext: 'Hear from satisfied homeowners who trusted us with their architectural and interior dreams.',

  ctaTagline: "LET'S BUILD TOGETHER",
  ctaTitle: 'Ready To Transform Your Dream Space?',
  ctaSubtext: 'Book a complimentary design discussion and discover how we turn your architectural vision into reality.',

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

function fetchWithTimeout<T>(promise: Promise<T>, timeoutMs = 3500): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Firestore timeout')), timeoutMs)
    )
  ]);
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
    const docSnap = await fetchWithTimeout(getDoc(docRef))
    
    if (docSnap.exists()) {
      const data = docSnap.data() as Partial<SiteSettings>
      
      let finalSlides = data.heroSlides || cached?.heroSlides || null
      if (!finalSlides && data.heroImages && data.heroImages.length > 0) {
        finalSlides = data.heroImages.map((img, idx) => ({
          id: `hero-slide-${idx + 1}`,
          tagline: DEFAULT_HERO_SLIDES[idx % DEFAULT_HERO_SLIDES.length]?.tagline || 'LUXURY HOMES',
          title: data.heroTitle || DEFAULT_HERO_SLIDES[idx % DEFAULT_HERO_SLIDES.length]?.title || 'Look At What We Design.',
          subtitle: data.heroSubtitle || DEFAULT_HERO_SLIDES[idx % DEFAULT_HERO_SLIDES.length]?.subtitle || 'From bespoke architectural facades to functional luxury interiors...',
          image: img
        }))
      }

      const merged: SiteSettings = {
        ...DEFAULT_SETTINGS,
        ...cached,
        ...data,
        heroSlides: Array.isArray(data.heroSlides) && data.heroSlides.length > 0
          ? data.heroSlides
          : (cached?.heroSlides || DEFAULT_SETTINGS.heroSlides),
        heroImages: data.heroImages || (data.heroSlides ? data.heroSlides.map(s => s.image) : (cached?.heroImages || DEFAULT_SETTINGS.heroImages)),
        featuredServiceCards: Array.isArray(data.featuredServiceCards) && data.featuredServiceCards.length > 0
          ? data.featuredServiceCards
          : (cached?.featuredServiceCards || DEFAULT_SETTINGS.featuredServiceCards),
        galleryHeroImages: Array.isArray(data.galleryHeroImages) && data.galleryHeroImages.length > 0
          ? data.galleryHeroImages
          : (cached?.galleryHeroImages || DEFAULT_SETTINGS.galleryHeroImages),
        galleryHeroTagline: data.galleryHeroTagline || cached?.galleryHeroTagline || DEFAULT_SETTINGS.galleryHeroTagline,
        galleryHeroTitle: data.galleryHeroTitle || cached?.galleryHeroTitle || DEFAULT_SETTINGS.galleryHeroTitle,
        galleryHeroSubtext: data.galleryHeroSubtext || cached?.galleryHeroSubtext || DEFAULT_SETTINGS.galleryHeroSubtext,
      }

      if (cached && (cached.updatedAt || 0) > (data.updatedAt || 0)) {
        return {
          ...merged,
          ...cached
        }
      }

      return merged
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
  const existing = await getSiteSettings().catch(() => DEFAULT_SETTINGS)
  const payload: SiteSettings = {
    ...DEFAULT_SETTINGS,
    ...existing,
    ...settings,
    updatedAt: Date.now()
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload))
      window.dispatchEvent(new Event('site_settings_updated'))
      window.dispatchEvent(new Event('storage'))
    } catch (e) {
      console.warn('LocalStorage save error:', e)
    }
  }

  try {
    await setDoc(doc(db, COLLECTION_NAME, SETTINGS_DOC_ID), payload, { merge: true })
  } catch (error: any) {
    if (error?.code === 'permission-denied') {
      console.warn('Firestore write permission denied. Saved to LocalStorage cache successfully.', error)
      return
    }
    console.error('Error saving site settings to Firestore:', error)
  }
}
