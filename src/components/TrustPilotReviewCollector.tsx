// components/TrustpilotReviewCollector.tsx
'use client'

import { useEffect } from 'react'

export default function TrustpilotReviewCollector() {
  useEffect(() => {
    // Reinitialize widget after component mounts
    if (window.Trustpilot) {
      window.Trustpilot.loadFromElement(
        document.querySelector('.trustpilot-widget'),
        true
      )
    }
  }, [])

  return (
    <div
      className="trustpilot-widget"
      data-locale="en-US"
      data-template-id="56278e9abfbbba0bdcd568bc"
      data-businessunit-id="68f93a69c950f88c5e420f96"
      data-style-height="52px"
      data-style-width="100%"
      data-token="696be5c3-4d0f-47f7-a089-3c0db12e6134"
    >

      <a
        href="https://www.trustpilot.com/review/thenidhimittal.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Trustpilot
      </a>
    </div>
  )
}

// TypeScript declaration - stays at the bottom of this same file
declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: Element | null, refresh: boolean) => void
    }
  }
}