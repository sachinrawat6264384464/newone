export interface ProjectItem {
  id: string
  title: string
  category: string // e.g. 'Facade', 'Living Area', 'Kitchen', 'Bedroom', 'Commercial'
  location?: string
  clientName?: string
  coverImage: string
  galleryImages?: string[]
  description: string
  featured: boolean
  published: boolean
  year?: string
  createdAt?: number
  updatedAt?: number
}
