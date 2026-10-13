"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ThankYouPage() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (typeof window !== "undefined" && window.fbq) {
      try {
        window.fbq("track", "Lead", {});
      } catch (_) {}
    }

    fetch("/api/content")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setContent(data);
      })
      .catch((err) => console.error("Error loading content:", err));
  }, []);

  const thankYou = content?.thankYou || {};
  const whatsappUrl = thankYou.whatsappUrl || "https://lp1.launchatscale.com/Joinwhatsapp";
  const workshopDate = thankYou.workshopDate || "17th January 2025";
  const workshopTime = thankYou.workshopTime || "7:00 PM IST";
  const copyright = thankYou.copyright || "© 2024 Shubh Jain. All Rights Reserved.";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 text-foreground">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon Circle */}
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 border-2 border-primary">
            {/* CircleCheckBig SVG */}
            <svg
              className="w-12 h-12 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.801 10A10 10 0 1 1 17 3.335" />
              <path d="m9 11 3 3L22 4" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1
          className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          You&apos;re <span className="text-gradient-gold">In!</span>
        </h1>

        {/* Primary WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-display bg-[#25D366] hover:bg-[#20BD5A] text-white animate-fade-in w-full text-base sm:text-lg py-4 sm:py-5 px-4 sm:px-6 rounded-lg font-semibold transition-colors shadow-lg text-center"
          style={{ animationDelay: "0.15s", textDecoration: "none" }}
        >
          Join WhatsApp Community
        </a>

        {/* Confirmation Paragraph */}
        <p
          className="font-body text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Your seat has been reserved for the LIVE workshop. Check your email &amp; WhatsApp for details.
        </p>

        {/* Workshop Details Card */}
        <div
          className="border-gradient-gold rounded-xl p-6 bg-card mb-8 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="font-display text-xl text-foreground mb-4">Workshop Details</h2>
          <div className="space-y-3">
            {/* Date */}
            <div className="flex items-center justify-center gap-3 text-foreground">
              <svg
                className="w-5 h-5 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
              </svg>
              <span className="font-body text-lg">{workshopDate}</span>
            </div>
            {/* Time */}
            <div className="flex items-center justify-center gap-3 text-foreground">
              <svg
                className="w-5 h-5 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="font-body text-lg">{workshopTime}</span>
            </div>
          </div>
          <p className="font-body text-sm text-muted-foreground mt-4">
            Mark your calendar — this is a LIVE session with no replays!
          </p>
        </div>

        {/* Important Notice Box */}
        <div
          className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-8 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <p className="font-display text-primary text-sm tracking-wide mb-2 font-semibold">📌 IMPORTANT</p>
          <p className="font-body text-foreground text-sm">
            Add this to your calendar and set a reminder. We&apos;ll send you the joining link before the session.
          </p>
        </div>

        {/* Secondary WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-display bg-[#25D366] hover:bg-[#20BD5A] text-white animate-fade-in w-full text-base sm:text-lg py-4 sm:py-5 px-4 sm:px-6 rounded-lg font-semibold transition-colors shadow-lg text-center"
          style={{ animationDelay: "0.5s", textDecoration: "none" }}
        >
          Join WhatsApp Community
        </a>

        {/* Footer Copyright */}
        <p className="font-body text-muted-foreground mt-12 text-sm">
          {copyright}
        </p>

        <div className="mt-4">
          <Link href="/" className="text-xs text-primary/70 hover:text-primary transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
