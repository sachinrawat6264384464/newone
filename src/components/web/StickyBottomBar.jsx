"use client";

import { useState, useEffect } from "react";

export default function StickyBottomBar({ content, onOpenModal }) {
  const stickyBar = content?.stickyBar || {};

  const price = stickyBar.price || "FREE";
  const originalPrice = stickyBar.originalPrice || "₹999";
  const seatsLeft = stickyBar.seatsLeft || "47 Seats Left";
  const ctaText = stickyBar.ctaText || "ENROLL NOW";
  const defaultMinutes = Number(stickyBar.countdownMinutes) || 4;

  const [secondsLeft, setSecondsLeft] = useState(defaultMinutes * 60);
  const [deadlineText, setDeadlineText] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Dynamic deadline string
    const now = new Date();
    const formatted = now.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    setDeadlineText(`Deadline ${formatted}`);

    // Session storage countdown
    const stored = sessionStorage.getItem("countdown-end-time");
    let remaining = defaultMinutes * 60;
    if (stored) {
      const diff = Math.max(0, parseInt(stored, 10) - Date.now());
      remaining = Math.floor(diff / 1000);
    } else {
      const endTime = Date.now() + defaultMinutes * 60 * 1000;
      sessionStorage.setItem("countdown-end-time", endTime.toString());
    }

    setSecondsLeft(remaining);
    if (remaining <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [defaultMinutes]);

  if (!mounted) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    /* Clean solid luxury dark bar - ZERO BLUR, 100% mobile responsive */
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#e5c158]/30 shadow-[0_-10px_35px_rgba(0,0,0,0.85)] bg-[#13100e]/95 backdrop-blur-md"
    >
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-5 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Price & Dynamic Deadline (Tablet/Desktop) */}
        <div className="hidden md:block text-left">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl text-[#e5c158] font-bold">{price}</span>
            <span className="font-body text-[#a89f92] line-through text-sm">{originalPrice}</span>
          </div>
          <p className="font-body text-[#a89f92] text-xs" suppressHydrationWarning>
            {deadlineText || "Deadline Loading..."}
          </p>
        </div>

        {/* Real-time countdown timer */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <span className="font-display text-[11px] sm:text-xs md:text-sm text-[#a89f92] uppercase tracking-wider whitespace-nowrap">
            Seats close in
          </span>
          <div className="flex items-center gap-1">
            <div className="bg-[#e5c158]/15 border border-[#e5c158]/40 rounded-lg px-2 sm:px-2.5 py-1">
              <span
                className="font-display text-xs sm:text-base md:text-lg text-[#e5c158] font-bold tabular-nums"
                suppressHydrationWarning
              >
                {String(minutes).padStart(2, "0")}
              </span>
            </div>
            <span className="font-display text-xs sm:text-base text-[#e5c158] font-bold">:</span>
            <div className="bg-[#e5c158]/15 border border-[#e5c158]/40 rounded-lg px-2 sm:px-2.5 py-1">
              <span
                className="font-display text-xs sm:text-base md:text-lg text-[#e5c158] font-bold tabular-nums"
                suppressHydrationWarning
              >
                {String(seconds).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* Seats Scarcity & CTA Action */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center bg-[#e5c158]/15 border border-[#e5c158]/40 rounded-full px-3 py-1">
            <span className="font-display text-[11px] sm:text-xs text-[#e5c158] font-semibold whitespace-nowrap">
              {seatsLeft}
            </span>
          </div>
          <button
            onClick={onOpenModal}
            type="button"
            className="mirror-button px-4 sm:px-8 py-2.5 sm:py-3.5 text-xs sm:text-sm font-display cursor-pointer hover:scale-105 transition-transform whitespace-nowrap shadow-xl"
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
}
