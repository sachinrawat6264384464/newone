export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or HTML content
  coverImage: string;
  author: string;
  category?: string;
  createdAt: number;
  updatedAt: number;
  published: boolean;
  // SEO Metadata
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}
