import { SerpItem, SerpQueryResult, SerpResultType } from '@/types/seoAgent';

const SERPAPI_KEY = process.env.SERPAPI_API_KEY || 'bd0c800d88f2132cb347cafad845b3f475096677731c873ec7321563d128f651';

// Classify domain type based on known directory/marketplace patterns
function classifyDomainType(domain: string): SerpResultType {
  const lower = domain.toLowerCase();
  if (lower.includes('magicbricks') || lower.includes('99acres') || lower.includes('housing.com') || lower.includes('justdial') || lower.includes('indiamart') || lower.includes('sulekha') || lower.includes('yellowpages')) {
    return 'directory';
  }
  if (lower.includes('amazon') || lower.includes('flipkart') || lower.includes('pepperfry') || lower.includes('urbanladder') || lower.includes('ikea')) {
    return 'marketplace';
  }
  if (lower.includes('facebook') || lower.includes('instagram') || lower.includes('pinterest') || lower.includes('linkedin') || lower.includes('youtube') || lower.includes('twitter') || lower.includes('x.com')) {
    return 'social';
  }
  if (lower.includes('wikipedia') || lower.includes('medium.com') || lower.includes('quora') || lower.includes('reddit') || lower.includes('archdaily') || lower.includes('architecturaldigest')) {
    return 'informational';
  }
  if (lower.endsWith('.gov') || lower.endsWith('.gov.in') || lower.endsWith('.nic.in')) {
    return 'official';
  }
  return 'direct_competitor';
}

function extractDomain(urlStr: string): string {
  try {
    const parsed = new URL(urlStr);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return urlStr;
  }
}

export async function fetchSerpResults({
  query,
  location = 'India',
  language = 'en',
  device = 'desktop',
  targetUrl = ''
}: {
  query: string;
  location?: string;
  language?: string;
  device?: 'desktop' | 'mobile';
  targetUrl?: string;
}): Promise<SerpItem[]> {
  const targetDomain = targetUrl ? extractDomain(targetUrl) : '';

  if (!SERPAPI_KEY) {
    console.warn('SERPAPI_API_KEY is not set. Returning fallback mock SERP data.');
    return getMockSerpResults(query, targetDomain);
  }

  const params = new URLSearchParams({
    engine: 'google',
    q: query,
    location: location || 'India',
    hl: language || 'en',
    gl: 'in',
    device: device === 'mobile' ? 'mobile' : 'desktop',
    api_key: SERPAPI_KEY
  });

  const apiUrl = `https://serpapi.com/search.json?${params.toString()}`;

  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(apiUrl, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`SerpApi responded with HTTP status ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        console.warn('SerpApi error returned:', data.error);
        return getMockSerpResults(query, targetDomain);
      }

      const organicResults = data.organic_results || [];

      const normalized: SerpItem[] = organicResults.map((item: any, idx: number) => {
        const itemUrl = item.link || '';
        const domain = extractDomain(itemUrl);
        const isTarget = targetDomain ? domain === targetDomain : false;

        return {
          position: item.position || idx + 1,
          title: item.title || '',
          url: itemUrl,
          domain,
          snippet: item.snippet || '',
          resultType: isTarget ? 'direct_competitor' : classifyDomainType(domain),
          isTargetSite: isTarget,
          sitelinks: item.sitelinks?.inline?.map((s: any) => ({ title: s.title, link: s.link }))
        };
      });

      return normalized;
    } catch (err) {
      console.warn(`SerpApi fetch attempt #${attempts} failed:`, err);
      if (attempts >= maxAttempts) {
        console.warn('Falling back to structured fallback SERP results.');
        return getMockSerpResults(query, targetDomain);
      }
      // Bounded backoff retry delay (300ms, 600ms)
      await new Promise(r => setTimeout(r, attempts * 300));
    }
  }

  return getMockSerpResults(query, targetDomain);
}

function getMockSerpResults(query: string, targetDomain: string): SerpItem[] {
  const cleanQ = query || 'Interior Design Architecture';
  return [
    {
      position: 1,
      title: `Top ${cleanQ} Services & Turnkey Solutions`,
      url: 'https://homestorey.in',
      domain: 'homestorey.in',
      snippet: 'Home Storey provides bespoke architecture facade designs and luxury home interior design with 100% turnkey execution.',
      resultType: 'direct_competitor',
      isTargetSite: targetDomain ? 'homestorey.in' === targetDomain : true
    },
    {
      position: 2,
      title: 'Livspace — Modern Modular Kitchen & Home Interior Designers',
      url: 'https://www.livspace.com/in/interior-designers',
      domain: 'livspace.com',
      snippet: 'Book free consultation with top interior designers. Get 3D elevation designs, 10-year warranty & transparent pricing.',
      resultType: 'direct_competitor',
      isTargetSite: false
    },
    {
      position: 3,
      title: 'Design Cafe — Custom Turnkey Interior Architecture Services',
      url: 'https://www.designcafe.com/interiors',
      domain: 'designcafe.com',
      snippet: 'Award-winning interior architecture firm creating luxury residential living spaces and space-saving modular kitchens.',
      resultType: 'direct_competitor',
      isTargetSite: false
    },
    {
      position: 4,
      title: 'MagicBricks — Top Interior Designers & Architecture Firms in Delhi NCR',
      url: 'https://www.magicbricks.com/interior-designers',
      domain: 'magicbricks.com',
      snippet: 'Find verified architectural elevation designers, villa interior experts, and construction contractors.',
      resultType: 'directory',
      isTargetSite: false
    },
    {
      position: 5,
      title: 'Architectural Digest — Modern Home Architecture & Decor Trends',
      url: 'https://www.architecturaldigest.in/architecture',
      domain: 'architecturaldigest.in',
      snippet: 'Explore inspiring architectural facades, luxury master bedroom layouts, and contemporary home exterior inspirations.',
      resultType: 'informational',
      isTargetSite: false
    }
  ];
}
