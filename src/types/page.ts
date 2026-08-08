export interface CustomPage {
  id?: string;
  slug: string; // The URL slug
  title: string; // Page Title
  content: string; // HTML/Markdown Content for the page
  published: boolean;
  createdAt: number;
  updatedAt: number;
  // SEO Metadata
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  ogImage?: string;
}
