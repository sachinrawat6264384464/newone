import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteUrl, siteName } from "@/lib/site";

const title = `Contact | ${siteName}`;
const description =
  "Get in touch with Home Storey for a free design consultation. Share your project details and we will respond within 24 hours.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/contact`,
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

export default function ContactLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
