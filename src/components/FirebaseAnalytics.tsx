'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { analytics } from '@/lib/firebase'
import { logEvent } from 'firebase/analytics'

function AnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname && analytics) {
      const url = pathname + searchParams.toString()
      logEvent(analytics, 'page_view', {
        page_path: url,
      })
    }
  }, [pathname, searchParams])

  return null
}

export default function FirebaseAnalytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsTracker />
    </Suspense>
  )
}
