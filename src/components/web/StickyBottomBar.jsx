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

  useEffect(() => {
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

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    /* Clean solid luxury dark bar - ZERO BLUR, 100% mobile responsive */
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border shadow-2xl"
      style={{ backgroundColor: "#161412" }}
    >
      <div className="w-full max-w-6xl mx-auto px-2.5 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Price & Dynamic Deadline (Tablet/Desktop) */}
        <div className="hidden md:block text-left">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl text-primary font-bold">{price}</span>
            <span className="font-body text-muted-foreground line-through text-sm">{originalPrice}</span>
          </div>
          <p className="font-body text-muted-foreground text-xs" suppressHydrationWarning>
            {deadlineText || "Deadline Loading..."}
          </p>
        </div>

        {/* Real-time countdown timer */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <span className="font-display text-[10px] sm:text-xs md:text-sm text-muted-foreground uppercase tracking-wide whitespace-nowrap">
            Seats close in
          </span>
          <div className="flex items-center gap-1">
            <div className="bg-primary/20 border border-primary/40 rounded px-1.5 sm:px-2 py-0.5 sm:py-1">
              <span
                className="font-display text-xs sm:text-base md:text-lg text-primary tabular-nums"
                suppressHydrationWarning
              >
                {String(minutes).padStart(2, "0")}
              </span>
            </div>
            <span className="font-display text-xs sm:text-base text-primary">:</span>
            <div className="bg-primary/20 border border-primary/40 rounded px-1.5 sm:px-2 py-0.5 sm:py-1">
              <span
                className="font-display text-xs sm:text-base md:text-lg text-primary tabular-nums"
                suppressHydrationWarning
              >
                {String(seconds).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* Seats Scarcity & CTA Action */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <div className="hidden sm:flex items-center bg-primary/20 border border-primary/40 rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1">
            <span className="font-display text-[11px] sm:text-xs text-primary font-semibold whitespace-nowrap">
              {seatsLeft}
            </span>
          </div>
          <button
            onClick={onOpenModal}
            type="button"
            className="bg-destructive hover:bg-destructive/90 px-3.5 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base font-display text-white border-0 rounded-lg cursor-pointer transition-colors font-bold shadow-lg whitespace-nowrap"
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
}
