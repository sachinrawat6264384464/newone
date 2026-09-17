'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { analytics } from '@/lib/firebase'
import { logEvent } from 'firebase/analytics'

function AnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const logAnalytics = () => {
      import('@/lib/firebase').then(({ analytics }) => {
        if (pathname && analytics) {
          import('firebase/analytics').then(({ logEvent }) => {
            const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
            logEvent(analytics, 'page_view', { page_path: url })
          })
        }
      })
    }

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(logAnalytics)
    } else {
      setTimeout(logAnalytics, 4000)
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
