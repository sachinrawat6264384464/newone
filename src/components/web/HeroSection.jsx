export default function HeroSection({ content, onOpenModal }) {
  const hero = content?.hero || {};

  const badge = hero.badge || "NO REPLAYS (CONFIDENTIAL)";
  const preheading = hero.preheading || "Would You Trade Just 2 Hours...?";
  const headlineLive = hero.headlineLive || "LIVE:";
  const headlineMain1 = hero.headlineMain1 || "Build Your";
  const headlineGold = hero.headlineGold || "₹1 CRORE";
  const headlineMain2 = hero.headlineMain2 || "Profit Plan For 2026";
  const description =
    hero.description ||
    "We'll Map Your Entire Calendar, Design Your Scalable Offer & Create Your Complete Revenue Roadmap — LIVE";
  const ctaText = hero.ctaText || "🔥 Claim Your FREE Seat Now";
  const dateText = hero.dateText || "📅 17th January, 7 PM";
  const noticeText = hero.noticeText || "⚡ Takes only 30 seconds to register";
  const hostName = hero.hostName || "Shubh Jain";
  const hostTagline = hero.hostTagline || "The Mafia Behind The Biggest Coaches Of 🇮🇳";
  const hostImage = hero.hostImage || "/assets/shubh-jain-BAGpkc-R.webp";
  const bgVideo = hero.bgVideo || "/assets/roman-hero-bg-BAaz7ED8.mp4";
  const videoOpacity = hero.videoOpacity ? Number(hero.videoOpacity) / 100 : 0.75;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12 sm:pt-16 pb-12" id="hero">
      {/* Crisp Roman Architecture Video Background - NO BLUR */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{ opacity: videoOpacity }}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src={bgVideo} type="video/mp4" />
        <source src="https://2026.launchatscale.com/assets/roman-hero-bg-BAaz7ED8.mp4" type="video/mp4" />
      </video>

      {/* Clean crisp gradient overlay - NO BLUR, high clarity */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-[#161412] pointer-events-none" />

      {/* Hero Content */}
      <div className="container mx-auto px-3 sm:px-4 text-center relative z-10 max-w-4xl pt-2 sm:pt-4">
        {/* Pill Badge */}
        <div
          className="inline-flex items-center gap-1.5 sm:gap-2 bg-destructive/20 border border-destructive/40 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
          <span className="font-display text-xs sm:text-sm text-destructive tracking-wide uppercase">
            {badge}
          </span>
        </div>

        {/* Pre-heading */}
        <p
          className="font-sans text-sm sm:text-xl md:text-2xl text-primary tracking-[0.05em] sm:tracking-[0.1em] uppercase mb-3 sm:mb-4 animate-fade-in font-semibold"
          style={{ animationDelay: "0.2s" }}
        >
          {preheading}
        </p>

        {/* Main H1 Headline */}
        <h1
          className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <span className="text-gradient-gold">{headlineLive}</span> {headlineMain1}
          <br />
          <span className="text-gradient-gold">{headlineGold}</span> {headlineMain2}
        </h1>

        {/* Description */}
        <p
          className="font-body text-base sm:text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto mb-6 sm:mb-6 leading-relaxed animate-fade-in px-2"
          style={{ animationDelay: "0.5s" }}
        >
          {description}
        </p>

        {/* CTA Button Block */}
        <div className="animate-fade-in flex flex-col items-center gap-1 w-full px-2" style={{ animationDelay: "0.6s" }}>
          <button
            onClick={onOpenModal}
            type="button"
            className="w-full sm:w-auto mirror-button px-6 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-lg sm:text-xl md:text-2xl font-display text-primary-foreground border-0 rounded-lg hover:scale-105 transition-transform cursor-pointer"
          >
            {ctaText}
          </button>
          <span className="font-display text-primary text-sm sm:text-base md:text-lg tracking-wide mt-2">
            {dateText}
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground font-body">
            {noticeText}
          </span>
        </div>

        {/* Host Avatar Preview */}
        <div className="flex flex-col items-center gap-3 sm:gap-4 mt-8 sm:mt-12 animate-fade-in" style={{ animationDelay: "0.9s" }}>
          <div
            style={{ width: "112px", height: "112px", maxWidth: "112px", maxHeight: "112px" }}
            className="rounded-full overflow-hidden border-2 border-primary glow-gold shadow-xl flex-shrink-0"
          >
            <img
              src={hostImage}
              alt={`${hostName} - Workshop Host`}
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
              width={112}
              height={112}
            />
          </div>
          <p className="font-display text-foreground text-lg sm:text-xl md:text-2xl">
            Hosted by <span className="text-primary font-semibold">{hostName}</span>
          </p>
          <p className="font-body text-muted-foreground text-sm sm:text-base md:text-lg italic px-2">
            {hostTagline}
          </p>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
