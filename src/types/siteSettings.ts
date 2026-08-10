export interface HeroSlideItem {
  id: string
  tagline: string
  title: string
  subtitle: string
  image: string
}

export interface SiteSettings {
  siteName: string
  heroTitle: string
  heroSubtitle: string
  heroImages?: string[]
  heroSlides?: HeroSlideItem[]
  galleryHeroImages?: string[]
  contactEmail: string
  contactPhone: string
  officeAddress: string
  whatsappNumber?: string
  instagramUrl?: string
  facebookUrl?: string
  linkedinUrl?: string
  announcementBanner?: {
    enabled: boolean
    message: string
    linkUrl?: string
  }
  updatedAt?: number
}
