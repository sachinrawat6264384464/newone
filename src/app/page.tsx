import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";
import { siteUrl, siteName, defaultDescription } from "@/lib/site";

const title = `${siteName} | Interior Design & Construction`;

export const metadata: Metadata = {
  title,
  description: defaultDescription,
  keywords: [
    "interior design",
    "home interior",
    "Delhi NCR",
    "kitchen design",
    "facade design",
    "Home Storey",
  ],
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${siteUrl}/`,
    siteName,
    title,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
