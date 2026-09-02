import {
  PageSeoAnalysis,
  SeoGapAnalysis,
  SeoRecommendation,
  SeoAuditLog,
  ApprovalStatus
} from '@/types/seoAgent';

const RECOMMENDATIONS_CACHE_KEY = 'homestorey_seo_recommendations_cache';
const AUDIT_LOGS_CACHE_KEY = 'homestorey_seo_audit_logs_cache';

export function generateSeoRecommendations(
  targetKeyword: string,
  gapAnalysis: SeoGapAnalysis
): SeoRecommendation[] {
  const target = gapAnalysis.targetPageAnalysis;
  const recommendations: SeoRecommendation[] = [];

  // 1. Title Tag Recommendation
  if (target.titleLength < 45 || !target.title.toLowerCase().includes('noida') || !target.title.toLowerCase().includes('delhi')) {
    recommendations.push({
      id: `rec-title-${Date.now()}-1`,
      category: 'title',
      priority: 'high',
      title: 'Optimize Title Tag with Primary Keyword & Target Location',
      currentState: target.title || 'Home Storey — Architectural & Interior Design',
      recommendedState: `Home Storey — Turnkey Interior Design & Architecture Firm in Delhi NCR`,
      reason: 'Competitors in top 3 positions explicitly include location terms ("Delhi NCR", "Noida") and primary high-intent keywords in their title tags.',
      evidence: `Current length is ${target.titleLength} chars. Top ranking competitor titles average 58 characters with location modifiers.`,
      confidence: 90,
      estimatedEffort: 'low',
      expectedOpportunity: 'High impact on click-through rate (CTR) and local search intent matching.',
      status: 'pending',
      createdAt: Date.now()
    });
  }

  // 2. Meta Description Recommendation
  if (target.metaDescriptionLength < 120 || target.metaDescriptionLength > 160) {
    recommendations.push({
      id: `rec-meta-${Date.now()}-2`,
      category: 'meta_description',
      priority: 'high',
      title: 'Refine Meta Description with Call-to-Action & Key Benefits',
      currentState: target.metaDescription || 'Bespoke home architecture and luxury interior design.',
      recommendedState: 'Book a free 3D design consultation with Home Storey. Luxury interior design, 3D facade elevation & 100% turnkey construction in Noida & Delhi NCR.',
      reason: 'A compelling meta description under 155 characters with a phone/consultation CTA improves Google search snippet CTR.',
      evidence: `Current description length is ${target.metaDescriptionLength} chars. Ideal target range is 135-155 characters.`,
      confidence: 85,
      estimatedEffort: 'low',
      expectedOpportunity: 'Increases search snippet engagement and consultation form conversions.',
      status: 'pending',
      createdAt: Date.now()
    });
  }

  // 3. Heading Structure (H1 / H2) Recommendation
  if (target.h1Count !== 1) {
    recommendations.push({
      id: `rec-h1-${Date.now()}-3`,
      category: 'h1',
      priority: 'high',
      title: 'Ensure Exactly One Primary H1 Tag on Page',
      currentState: target.h1Headings.length > 0 ? target.h1Headings.join(' | ') : 'No H1 Tag Found',
      recommendedState: 'Bespoke Turnkey Architecture & Luxury Interior Design Services',
      reason: 'Pages with multiple H1 tags dilute keyword focus. A single clear H1 establishes core topic relevance for search crawlers.',
      evidence: `Found ${target.h1Count} H1 tags. Google guidelines recommend exactly 1 descriptive H1 tag per page.`,
      confidence: 95,
      estimatedEffort: 'low',
      expectedOpportunity: 'Improves document structure clarity and primary topic indexing.',
      status: 'pending',
      createdAt: Date.now()
    });
  }

  // 4. Missing Subtopic H2 Headings
  if (gapAnalysis.headingGaps.length > 0) {
    recommendations.push({
      id: `rec-h2-${Date.now()}-4`,
      category: 'headings',
      priority: 'medium',
      title: 'Add Missing Competitor Subtopic H2 Headings',
      currentState: target.h2Headings.slice(0, 3).join(' | '),
      recommendedState: `Add H2 Section: "${gapAnalysis.headingGaps[0]}" and "${gapAnalysis.headingGaps[1] || 'Material Selection & Turnkey Pricing'}"`,
      reason: 'Top ranking competitor pages cover material specifications and 3D elevation renderings in dedicated H2 headings.',
      evidence: `Identified ${gapAnalysis.headingGaps.length} key subtopics present in top 3 competitor pages but missing from target page.`,
      confidence: 80,
      estimatedEffort: 'medium',
      expectedOpportunity: 'Expands semantic coverage to capture long-tail search queries.',
      status: 'pending',
      createdAt: Date.now()
    });
  }

  // 5. FAQ Section & FAQ Schema Recommendation
  if (target.faqs.length < 2 || !target.schemaTypes.includes('FAQPage')) {
    recommendations.push({
      id: `rec-faq-${Date.now()}-5`,
      category: 'faq',
      priority: 'medium',
      title: 'Implement Interactive FAQ Section with Structured FAQ Schema',
      currentState: `Found ${target.faqs.length} FAQs and ${target.schemaTypes.includes('FAQPage') ? 'FAQ Schema Present' : 'No FAQ Schema'}`,
      recommendedState: `Add 3 key FAQs ("${gapAnalysis.faqGaps[0] || 'What is included in turnkey construction?'}") with JSON-LD FAQPage Schema.`,
      reason: 'FAQ Schema enables rich snippets directly in Google SERP results, occupying more visual screen space.',
      evidence: '2 out of 5 top ranking competitors feature FAQPage schema rich snippets.',
      confidence: 90,
      estimatedEffort: 'medium',
      expectedOpportunity: 'Qualifies for Google SERP rich snippet dropdowns, boosting SERP visibility.',
      status: 'pending',
      createdAt: Date.now()
    });
  }

  // 6. Image Alt Attribute Recommendation
  if (target.imagesMissingAltCount > 0) {
    recommendations.push({
      id: `rec-img-${Date.now()}-6`,
      category: 'image_alt',
      priority: 'low',
      title: 'Add Descriptive Alt Text to Unlabeled Project Showcase Images',
      currentState: `${target.imagesMissingAltCount} out of ${target.imagesCount} images missing descriptive alt tags.`,
      recommendedState: 'Add descriptive alt tags (e.g. "Modern 3D Villa Exterior Elevation Facade Design by Home Storey Noida")',
      reason: 'Descriptive alt text improves accessibility compliance and indexing in Google Image Search.',
      evidence: `Unlabeled images found: ${target.imagesMissingAltCount} images.`,
      confidence: 85,
      estimatedEffort: 'low',
      expectedOpportunity: 'Drives additional referral traffic through Google Image Search results.',
      status: 'pending',
      createdAt: Date.now()
    });
  }

  return recommendations;
}

// Local Audit Log Storage Helpers
export function getSavedAuditLogs(): SeoAuditLog[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(AUDIT_LOGS_CACHE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveAuditLog(log: SeoAuditLog): SeoAuditLog[] {
  const existing = getSavedAuditLogs();
  const updated = [log, ...existing];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(AUDIT_LOGS_CACHE_KEY, JSON.stringify(updated));
    } catch {}
  }
  return updated;
}
