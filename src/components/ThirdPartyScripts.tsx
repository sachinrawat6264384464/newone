// components/ThirdPartyScripts.tsx
'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

export default function ThirdPartyScripts() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Load third-party analytics after 7s or on user interaction to protect initial load performance
    const timer = setTimeout(() => {
      setShouldLoad(true)
    }, 7000)

    const handleInteraction = () => {
      setShouldLoad(true)
      cleanup()
    }

    const cleanup = () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleInteraction)
      window.removeEventListener('mousemove', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
    }

    window.addEventListener('scroll', handleInteraction, { passive: true })
    window.addEventListener('mousemove', handleInteraction, { passive: true })
    window.addEventListener('touchstart', handleInteraction, { passive: true })

    return cleanup
  }, [])

  if (!shouldLoad) return null

  return (
    <>
      {/* ✅ Ahrefs Analytics */}
      <Script
        id="ahrefs-analytics"
        src="https://analytics.ahrefs.com/analytics.js"
        data-key="ZVvidUlDOMv+0ah0YoWFYg"
        strategy="lazyOnload"
      />

      {/* ✅ Google Analytics (gtag.js) */}
      <Script
        id="google-gtag"
        src="https://www.googletagmanager.com/gtag/js?id=G-8C1BX4DVDH"
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-8C1BX4DVDH');
        `}
      </Script>

      {/* ✅ Trustpilot Script */}
      <Script
        id="trustpilot-script"
        src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        strategy="lazyOnload"
      />

      {/* ✅ Meta Pixel Code */}
      <Script id="meta-pixel" strategy="lazyOnload">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '2437076866695197');
          fbq('track', 'PageView');
        `}
      </Script>
    </>
  )
}
