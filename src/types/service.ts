export interface ServiceItem {
  id: string
  title: string
  subtitle?: string
  description: string
  coverImage: string
  images?: string[]
  category: string
  features: string[]
  priceEstimate?: string
  published: boolean
  order?: number
  updatedAt?: number
}
