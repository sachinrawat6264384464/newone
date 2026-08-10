// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { AuthProvider } from '../lib/auth'
import { Toaster } from 'react-hot-toast'
import { ReactNode } from 'react'
import Script from 'next/script'
import Image from 'next/image'
import { siteUrl, siteName, defaultDescription } from '@/lib/site'
import FirebaseAnalytics from '@/components/FirebaseAnalytics'

const ogImage = `${siteUrl}/logo1img.png`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${siteName} | Transform Your Space`,
  description: defaultDescription,
  applicationName: siteName,
  keywords: [
    'interior design',
    'home interior Delhi',
    'kitchen design',
    'facade design',
    'Home Storey',
    'Nidhi Mittal',
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName,
    title: `${siteName} | Transform Your Space`,
    description: defaultDescription,
    images: [
      {
        url: ogImage,
        width: 512,
        height: 512,
        alt: `${siteName} logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} | Transform Your Space`,
    description: defaultDescription,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'business',
}

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteUrl}/#business`,
  name: siteName,
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/logo1img.png`,
    width: 512,
    height: 512,
  },
  image: `${siteUrl}/logo1img.png`,
  description: defaultDescription,
  email: 'homestorey@thenidhimittal.com',
  foundingDate: '2014',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Delhi',
    addressRegion: 'Delhi',
    addressCountry: 'IN',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '17:00',
    },
  ],
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Delhi NCR',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Interior Design Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Facade Design',
          description: 'Stunning exterior designs that create lasting first impressions',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Living Area Design',
          description: 'Comfortable and stylish living spaces perfect for family gatherings',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Kitchen Design',
          description: 'Modern, functional kitchens that are the heart of your home',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Bedroom Design',
          description: 'Peaceful retreats designed for rest and rejuvenation',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Bathroom Design',
          description: 'Spa-like bathrooms combining luxury and functionality',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Home Office Design',
          description: 'Productive work-from-home spaces tailored to your needs',
        },
      },
    ],
  },
  founder: {
    '@type': 'Person',
    '@id': `${siteUrl}/#nidhi`,
    name: 'Nidhi Mittal',
    jobTitle: 'Founder & Interior Designer',
    description:
      'Interior designer with over 10 years of experience transforming homes and commercial spaces in Delhi NCR',
    url: siteUrl,
    image:
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298139/Homestorey-media/Owner/xyergldmjm9mfacihjb5.jpg',
    sameAs: [
      'https://instagram.com/homestorey.noida/',
      'https://www.linkedin.com/company/homestorey',
    ],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.5',
    reviewCount: '250',
    bestRating: '5',
    worstRating: '1',
  },
  sameAs: [
    'https://www.facebook.com/people/Home-storey/61563975190788',
    'https://instagram.com/homestorey.noida/',
    'https://www.linkedin.com/company/homestorey',
    'https://in.pinterest.com/Hstoreyin/',
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: siteName,
  url: siteUrl,
  description: defaultDescription,
  publisher: {
    '@id': `${siteUrl}/#business`,
  },
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo1img.png" type="image/png" sizes="32x32" />

        <meta
          name="p:domain_verify"
          content="1a1790fb7ce1e5bb3f196d4367d7142a"
        />
        <meta name="google-site-verification" content="jufd1vJSo-ATHiHu6zigKKAwxWM_5UIZbIV3kbp2O-o" />
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="ZVvidUlDOMv+0ah0YoWFYg" async></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />

        {/* ✅ Google Analytics (gtag.js) */}
        <Script
          id="google-gtag"
          src="https://www.googletagmanager.com/gtag/js?id=G-8C1BX4DVDH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
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
          src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          strategy="lazyOnload"
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
            fbq('init', '2437076866695197');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* ✅ noscript fallback using Next.js Image */}
        <noscript>
          <Image
            src="https://www.facebook.com/tr?id=2437076866695197&ev=PageView&noscript=1"
            height={1}
            width={1}
            alt="facebook pixel"
            style={{ display: 'none' }}
            unoptimized
          />
        </noscript>
      </head>

      <body>
        <FirebaseAnalytics />
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  )
}
