import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host') || ''

  // Skip static assets, APIs, and direct file requests
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/assets') ||
    url.pathname.startsWith('/uploads') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Detect if requested from Webinar site (via env var or domain name)
  const isWebinarSite =
    process.env.NEXT_PUBLIC_SITE === 'web' ||
    hostname.includes('webinar') ||
    hostname.includes('launchatscale') ||
    hostname.includes('2026')

  if (isWebinarSite) {
    // Silently rewrite to /web routes so URL stays clean
    if (!url.pathname.startsWith('/web')) {
      const rewrittenUrl = url.clone()
      rewrittenUrl.pathname = `/web${url.pathname === '/' ? '' : url.pathname}`
      return NextResponse.rewrite(rewrittenUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
