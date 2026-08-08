/** Canonical site origin for metadata, Open Graph, and JSON-LD. Set in `.env` for production. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://thenidhimittal.com"
).replace(/\/$/, "");

export const siteName = "Home Storey";

export const defaultDescription =
  "Expert interior design and construction for homes and commercial spaces in Delhi NCR. Facades, kitchens, living spaces, and end-to-end execution.";
