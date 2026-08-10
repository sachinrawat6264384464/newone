export interface GalleryItem {
  id: string
  title: string
  subtitle?: string
  category: string
  image: string
  images?: string[]
  description?: string
  features?: string[]
  published: boolean
  order?: number
  createdAt?: number
  updatedAt?: number
}
