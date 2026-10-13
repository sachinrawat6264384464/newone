export default function FinalCtaSection({ content, onOpenModal }) {
  const finalCta = content?.finalCta || {};

  const scarcityBadge = finalCta.scarcityBadge || "⚠️ Only 47 Seats Left — Workshop Starts Soon";
  const quote = finalCta.quote || "2025 gave you lessons. 2026 is where you turn them into crores.";
  const attribution = finalCta.attribution || "— Shubh Jain";
  const heading = finalCta.heading || "Stop Watching. Start Building.";
  const description =
    finalCta.description ||
    "You have 2 choices: Close this tab and stay stuck, or register now and finally build the coaching business you deserve.";
  const ctaText = finalCta.ctaText || "🔥 Claim Your FREE Seat Now";
  const dateText = finalCta.dateText || "📅 17th January, 7 PM";
  const guarantee = finalCta.guarantee || "100% Free • No Credit Card Required • Instant Access";
  const copyright = finalCta.copyright || "© 2026 Shubh Jain. All Rights Reserved.";

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-card to-background" id="final-cta">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="w-full max-w-3xl mx-auto px-3 sm:px-6 text-center">
        {/* Scarcity Badge */}
        <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-3 sm:p-4 mb-8 sm:mb-10 inline-block max-w-full">
          <p className="font-display text-destructive text-xs sm:text-sm tracking-wide">
            {scarcityBadge}
          </p>
        </div>

        {/* Quote */}
        <blockquote className="font-body text-lg sm:text-xl md:text-2xl italic text-foreground/80 max-w-2xl mx-auto mb-4 sm:mb-6 px-2">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <p className="font-display text-primary tracking-wider mb-8 sm:mb-10 text-xs sm:text-sm">{attribution}</p>

        <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4 px-2">
          {heading}
        </h2>
        <p className="font-body text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base px-2">
          {description}
        </p>

        {/* Final CTA Button */}
        <div className="flex flex-col items-center gap-2 px-2 w-full">
          <button
            onClick={onOpenModal}
            type="button"
            className="w-full sm:w-auto max-w-md mirror-button px-6 sm:px-12 py-4 sm:py-6 text-base sm:text-xl md:text-2xl font-display text-primary-foreground border-0 rounded-xl hover:scale-105 transition-transform cursor-pointer"
          >
            {ctaText}
          </button>
          <span className="font-display text-primary text-sm sm:text-base md:text-lg tracking-wide mt-1">
            {dateText}
          </span>
        </div>

        <p className="font-body text-muted-foreground mt-6 text-xs">
          {guarantee}
        </p>
        <p className="font-body text-muted-foreground mt-12 text-sm">
          {copyright}
        </p>
      </div>
    </section>
  );
}
