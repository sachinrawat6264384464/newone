export type SerpResultType = 
  | 'direct_competitor' 
  | 'indirect_competitor' 
  | 'marketplace' 
  | 'directory' 
  | 'informational' 
  | 'social' 
  | 'official' 
  | 'other';

export interface SerpItem {
  position: number;
  title: string;
  url: string;
  domain: string;
  snippet: string;
  resultType: SerpResultType;
  sitelinks?: Array<{ title: string; link: string }>;
  richSnippet?: string;
  isTargetSite?: boolean;
}

export interface PageSeoAnalysis {
  url: string;
  domain: string;
  httpStatus: number;
  title: string;
  titleLength: number;
  metaDescription: string;
  metaDescriptionLength: number;
  canonicalUrl?: string;
  robotsMeta?: string;
  h1Count: number;
  h1Headings: string[];
  h2Headings: string[];
  h3Headings: string[];
  wordCount: number;
  faqs: Array<{ question: string; answer: string }>;
  internalLinksCount: number;
  externalLinksCount: number;
  imagesCount: number;
  imagesMissingAltCount: number;
  schemaTypes: string[];
  language?: string;
  error?: string;
}

export interface SeoGapAnalysis {
  searchIntent: string;
  targetPageAnalysis: PageSeoAnalysis;
  competitorsAnalysis: PageSeoAnalysis[];
  opportunityScore: number; // 0-100 Internal score
  headingGaps: string[];
  topicGaps: string[];
  faqGaps: string[];
  missingSchemas: string[];
  titleOpportunities: string[];
  metaDescriptionOpportunities: string[];
}

export type RecommendationCategory = 
  | 'title' 
  | 'meta_description' 
  | 'h1' 
  | 'headings' 
  | 'content' 
  | 'faq' 
  | 'schema' 
  | 'image_alt' 
  | 'internal_links';

export type RecommendationPriority = 'high' | 'medium' | 'low';

export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'modified';

export interface SeoRecommendation {
  id: string;
  category: RecommendationCategory;
  priority: RecommendationPriority;
  title: string;
  currentState: string;
  recommendedState: string;
  reason: string;
  evidence: string;
  confidence: number; // 0-100
  estimatedEffort: 'low' | 'medium' | 'high';
  expectedOpportunity: string;
  status: ApprovalStatus;
  userModifiedState?: string;
  createdAt: number;
}

export interface SeoAuditLog {
  id: string;
  recommendationId: string;
  action: 'approved' | 'rejected' | 'modified' | 'rolled_back';
  category: RecommendationCategory;
  oldValue: string;
  newValue: string;
  approver: string;
  timestamp: number;
}

export interface SeoAnalysisRun {
  id: string;
  targetUrl: string;
  targetKeyword: string;
  location: string;
  language: string;
  device: 'desktop' | 'mobile';
  timestamp: number;
  serpResults: SerpItem[];
  gapAnalysis: SeoGapAnalysis;
  recommendations: SeoRecommendation[];
}
