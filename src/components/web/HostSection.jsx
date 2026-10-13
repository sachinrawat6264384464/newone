export default function HostSection({ content }) {
  const host = content?.host || {};

  const eyebrow = host.eyebrow || "Your Host";
  const title = host.title || "Meet";
  const titleGold = host.titleGold || "Shubh Jain";
  const tagline = host.tagline || "The Mafia Behind The Biggest Coaches Of 🇮🇳";
  const bio1 =
    host.bio1 ||
    "Shubh Jain has helped 48,000+ coaches and consultants of India build hyper profitable 8 figure companies using his IPs and self-built systems.";
  const bio2 =
    host.bio2 ||
    "His clients (The Biggest Names You Admire In This Country) have collectively generated over ₹210 Crores in last 1 year, and now he is sharing his exact blueprint with you — for free.";
  const hostImage = host.hostImage || "/assets/shubh-jain-BAGpkc-R.webp";
  const stats = host.stats || [
    { id: "1", value: "48,000+", label: "Coaches Trained" },
    { id: "2", value: "₹210Cr+", label: "Client Revenue (1 Year)" },
    { id: "3", value: "8 Figure", label: "Companies Built" },
  ];

  return (
    <section className="py-10 sm:py-16 bg-background relative" id="about-host">
      <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 relative z-10">
        <p className="font-display text-primary text-center text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4">
          {eyebrow}
        </p>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-center text-foreground mb-8 sm:mb-12">
          {title} <span className="text-gradient-gold">{titleGold}</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12">
          {/* Portrait Frame */}
          <div className="flex-shrink-0">
            <div
              style={{ maxWidth: "220px", aspectRatio: "1/1" }}
              className="w-44 h-44 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-gradient-gold glow-gold shadow-2xl mx-auto"
            >
              <img
                src={hostImage}
                alt={`${titleGold} - The Mafia Behind The Biggest Coaches`}
                className="w-full h-full object-cover"
                loading="lazy"
                width={256}
                height={256}
              />
            </div>
          </div>

          {/* Description & Numbers */}
          <div className="text-center md:text-left flex-1 min-w-0">
            <p className="font-display text-primary text-base sm:text-lg mb-2 italic">
              {tagline}
            </p>
            <div className="space-y-3 sm:space-y-4 font-body text-foreground/80 leading-relaxed text-sm sm:text-base md:text-lg">
              <p>{bio1}</p>
              <p>{bio2}</p>
            </div>

            {/* Dynamic Stat Counters (Mobile Adaptive) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6">
              {stats.map((stat, idx) => (
                <div
                  key={stat.id || idx}
                  className="bg-card border border-border rounded-lg p-2 sm:p-3 text-center min-w-0"
                >
                  <p className="font-display text-primary text-sm sm:text-lg md:text-xl font-bold truncate">
                    {stat.value}
                  </p>
                  <p className="font-body text-muted-foreground text-[10px] sm:text-xs leading-tight mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
