// app/layout.tsx
import './globals.css'
import { AuthProvider } from '../lib/auth'
import { Toaster } from 'react-hot-toast'
import { ReactNode } from 'react'
import Script from 'next/script'
import Image from 'next/image'

export const metadata = {
  title: 'Home Storey - Transform Your Space',
  description:
    'Expert design and construction services for beautiful homes and commercial spaces',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo1img.png" type="image/png" sizes="32x32" />

        <meta
          name="p:domain_verify"
          content="1a1790fb7ce1e5bb3f196d4367d7142a"
        />

        {/* ✅ Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8C1BX4DVDH"
          strategy="afterInteractive"
          async
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8C1BX4DVDH');
          `}
        </Script>

        {/* ✅ Trustpilot Script - Loads once for entire site */}
        <Script
          id="trustpilot-script"
          src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          strategy="lazyOnload"
          async
        />

        {/* ✅ Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '419405604519953');
            fbq('track', 'PageView');
          `}
        </Script>

        <noscript>
          <Image
            src="https://www.facebook.com/tr?id=419405604519953&ev=PageView&noscript=1"
            height={1}
            width={1}
            alt="facebook pixel"
            style={{ display: 'none' }}
            unoptimized
          />
        </noscript>
      </head>

      <body>
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  )
}