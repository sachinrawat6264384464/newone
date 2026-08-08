import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteUrl, siteName } from "@/lib/site";

const title = `Gallery | ${siteName}`;
const description =
  "Explore Home Storey interior design gallery: facades, living spaces, kitchens, bedrooms, and bespoke spaces across Delhi NCR.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/gallery`,
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/gallery`,
    siteName,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GalleryLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
