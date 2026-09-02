import { NextRequest, NextResponse } from 'next/server';
import { fetchSerpResults } from '@/lib/serpapi';
import { analyzePublicPage } from '@/lib/seoAnalyzer';
import { performSeoGapAnalysis } from '@/lib/seoGapAnalysis';
import { generateSeoRecommendations } from '@/lib/seoRecommendations';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      targetUrl = 'https://homestorey.in',
      targetKeyword = 'interior designer in noida',
      location = 'India',
      language = 'en',
      device = 'desktop'
    } = body;

    if (!targetKeyword || !targetKeyword.trim()) {
      return NextResponse.json({ error: 'Target keyword is required' }, { status: 400 });
    }

    // 1. Fetch SERP Results via SerpApi
    const serpResults = await fetchSerpResults({
      query: targetKeyword.trim(),
      location: location.trim(),
      language: language.trim(),
      device: device === 'mobile' ? 'mobile' : 'desktop',
      targetUrl: targetUrl.trim()
    });

    // 2. Analyze Target Page
    const targetAnalysis = await analyzePublicPage(targetUrl.trim());

    // 3. Analyze Top 3 Competitor Pages
    const topCompetitorItems = serpResults.filter(item => !item.isTargetSite).slice(0, 3);
    const competitorAnalyses = await Promise.all(
      topCompetitorItems.map(comp => analyzePublicPage(comp.url))
    );

    // 4. Perform SEO Gap Analysis
    const gapAnalysis = performSeoGapAnalysis(targetAnalysis, competitorAnalyses);

    // 5. Generate Prioritized Recommendations
    const recommendations = generateSeoRecommendations(targetKeyword.trim(), gapAnalysis);

    return NextResponse.json({
      success: true,
      data: {
        id: `run-${Date.now()}`,
        targetUrl,
        targetKeyword,
        location,
        language,
        device,
        timestamp: Date.now(),
        serpResults,
        targetAnalysis,
        competitorAnalyses,
        gapAnalysis,
        recommendations
      }
    });
  } catch (error: any) {
    console.error('Error executing SEO Agent analysis:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to execute SEO Agent analysis' },
      { status: 500 }
    );
  }
}
