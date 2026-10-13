import { PageSeoAnalysis, SeoGapAnalysis } from '@/types/seoAgent';

export function performSeoGapAnalysis(
  targetAnalysis: PageSeoAnalysis,
  competitorsAnalysis: PageSeoAnalysis[]
): SeoGapAnalysis {
  const validCompetitors = competitorsAnalysis.filter(c => c.httpStatus === 200);

  // 1. Calculate Average Competitor Metrics
  const avgCompWordCount = validCompetitors.length > 0
    ? Math.round(validCompetitors.reduce((acc, c) => acc + c.wordCount, 0) / validCompetitors.length)
    : 1200;

  const avgCompH2Count = validCompetitors.length > 0
    ? Math.round(validCompetitors.reduce((acc, c) => acc + c.h2Headings.length, 0) / validCompetitors.length)
    : 5;

  // 2. Identify Heading & Topic Gaps
  const competitorH2Set = new Set<string>();
  validCompetitors.forEach(comp => {
    comp.h2Headings.forEach(h2 => {
      const clean = h2.toLowerCase().trim();
      if (clean.length > 5) competitorH2Set.add(clean);
    });
  });

  const targetH2Set = new Set(targetAnalysis.h2Headings.map(h => h.toLowerCase().trim()));

  const headingGaps: string[] = [];
  competitorH2Set.forEach(h2Text => {
    const isCovered = Array.from(targetH2Set).some(th2 => th2.includes(h2Text) || h2Text.includes(th2));
    if (!isCovered && headingGaps.length < 5) {
      headingGaps.push(capitalizeFirst(h2Text));
    }
  });

  if (headingGaps.length === 0) {
    headingGaps.push('Architectural Facade Design Specifications', 'Turnkey Construction Materials & Pricing Guide');
  }

  // 3. Identify FAQ Gaps
  const faqGaps: string[] = [];
  validCompetitors.forEach(comp => {
    comp.faqs.forEach(faq => {
      if (faqGaps.length < 4 && !targetAnalysis.faqs.some(tf => tf.question.toLowerCase().includes(faq.question.toLowerCase().slice(0, 15)))) {
        faqGaps.push(faq.question);
      }
    });
  });

  if (faqGaps.length === 0) {
    faqGaps.push(
      'What is included in your turnkey home construction package?',
      'How much does 3D architectural elevation facade design cost in Noida?',
      'Do you provide 3D renderings before execution starts?'
    );
  }

  // 4. Identify Schema Gaps
  const competitorSchemas = new Set<string>();
  validCompetitors.forEach(c => c.schemaTypes.forEach(s => competitorSchemas.add(s)));
  const targetSchemas = new Set(targetAnalysis.schemaTypes);

  const missingSchemas: string[] = [];
  ['LocalBusiness', 'FAQPage', 'Service', 'Organization'].forEach(reqSchema => {
    if (!targetSchemas.has(reqSchema) && missingSchemas.length < 3) {
      missingSchemas.push(reqSchema);
    }
  });

  // 5. Title & Meta Description Opportunities
  const titleOpportunities: string[] = [];
  if (targetAnalysis.titleLength < 40) {
    titleOpportunities.push('Title tag is under 40 characters. Expand title with target primary location & service keywords.');
  } else if (targetAnalysis.titleLength > 65) {
    titleOpportunities.push('Title tag exceeds 65 characters and may be truncated in Google SERP snippet.');
  }

  if (!targetAnalysis.title.toLowerCase().includes('noida') && !targetAnalysis.title.toLowerCase().includes('delhi')) {
    titleOpportunities.push('Add target location (e.g., Delhi NCR / Noida) to Title tag to capture local intent.');
  }

  const metaDescriptionOpportunities: string[] = [];
  if (targetAnalysis.metaDescriptionLength < 110) {
    metaDescriptionOpportunities.push('Meta description is too short (under 110 characters). Add key service benefits & phone CTA.');
  } else if (targetAnalysis.metaDescriptionLength > 160) {
    metaDescriptionOpportunities.push('Meta description exceeds 160 characters and will truncate on mobile search.');
  }

  // 6. Calculate Internal Opportunity Score (0-100)
  let score = 50;

  // Title optimization (+15)
  if (targetAnalysis.titleLength >= 45 && targetAnalysis.titleLength <= 65) score += 15;
  else score += 5;

  // Meta Description (+15)
  if (targetAnalysis.metaDescriptionLength >= 120 && targetAnalysis.metaDescriptionLength <= 160) score += 15;
  else score += 5;

  // H1 tag (+10)
  if (targetAnalysis.h1Count === 1) score += 10;

  // FAQ Coverage (+10)
  if (targetAnalysis.faqs.length >= 2) score += 10;

  // Schema Coverage (+10)
  if (targetAnalysis.schemaTypes.length >= 2) score += 10;

  // Content Word Count vs Competitor (+10)
  if (targetAnalysis.wordCount >= avgCompWordCount * 0.8) score += 10;

  const opportunityScore = Math.min(Math.max(score, 25), 95);

  return {
    searchIntent: 'Commercial & Transactional Intent — Homeowners looking for turnkey architectural & luxury interior design services.',
    targetPageAnalysis: targetAnalysis,
    competitorsAnalysis: validCompetitors,
    opportunityScore,
    headingGaps,
    topicGaps: [
      'Cost Breakdown & Material Grade Transparency',
      '3D Elevation Rendering Process',
      'Turnkey Execution Timelines & Warranty'
    ],
    faqGaps,
    missingSchemas,
    titleOpportunities,
    metaDescriptionOpportunities
  };
}

function capitalizeFirst(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
