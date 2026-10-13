export default function SessionDetailsSection({ content, onOpenModal }) {
  const session = content?.session || {};

  const eyebrow = session.eyebrow || "In This 2-Hour Session";
  const title = session.title || "You'll Walk Away With";
  const titleGold = session.titleGold || "Everything";
  const titleSuffix = session.titleSuffix || "You Need";
  const description =
    session.description || "No fluff. No theory. Just a complete, actionable plan you can execute immediately.";
  const cards = session.cards || [
    {
      id: "1",
      icon: "📅",
      highlight: "Worth ₹25,000",
      title: "Your 2026 Calendar",
      description: "Complete quarterly roadmap with weekly action items — ready to execute",
    },
    {
      id: "2",
      icon: "💎",
      highlight: "Worth ₹50,000",
      title: "1 Scalable Offer",
      description: "A high-ticket offer designed to generate ₹1L+ per sale consistently",
    },
    {
      id: "3",
      icon: "🎯",
      highlight: "Worth ₹15,000",
      title: "Revenue Calculator",
      description: "Know exactly how many clients you need and when to hit ₹1 Crore",
    },
  ];
  const totalValue = session.totalValue || "₹90,000";
  const investment = session.investment || "FREE";
  const ctaText = session.ctaText || "Reserve My Spot Now →";
  const dateText = session.dateText || "📅 17th January, 7 PM";

  return (
    <section className="py-20 bg-card relative" id="features">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-50 pointer-events-none" />
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 relative z-10">
        <p className="font-display text-primary text-center text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4">
          {eyebrow}
        </p>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-center text-foreground mb-3 sm:mb-4 px-2">
          {title} <span className="text-gradient-gold">{titleGold}</span> {titleSuffix}
        </h2>
        <p className="font-body text-muted-foreground text-center max-w-2xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base md:text-lg px-2">
          {description}
        </p>

        {/* Feature Cards Grid (Dynamic, Crisp, Clean - NO BLUR) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {cards.map((card, idx) => (
            <div
              key={card.id || idx}
              className="border-gradient-gold rounded-xl p-5 sm:p-6 text-center bg-[#1d1916] hover:scale-[1.02] transition-transform duration-300 group shadow-lg"
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">{card.icon}</div>
              <span className="inline-block bg-primary/20 text-primary text-[11px] sm:text-xs font-display tracking-wider px-3 py-1 rounded-full mb-3">
                {card.highlight}
              </span>
              <h3 className="font-display text-base sm:text-lg text-foreground mb-2">{card.title}</h3>
              <p className="font-body text-muted-foreground text-xs sm:text-sm leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing Summary */}
        <div className="text-center mt-8 sm:mt-10 px-2">
          <p className="font-body text-muted-foreground text-xs sm:text-sm mb-1 sm:mb-2">
            Total Value: <span className="line-through">{totalValue}</span>
          </p>
          <p className="font-display text-xl sm:text-2xl text-primary">
            Your Investment: <span className="text-gradient-gold text-2xl sm:text-3xl">{investment}</span>
          </p>
        </div>

        {/* Action Button */}
        <div className="text-center mt-6 sm:mt-8 flex flex-col items-center gap-2 px-2">
          <button
            onClick={onOpenModal}
            type="button"
            className="w-full sm:w-auto max-w-md mirror-button px-6 sm:px-10 py-3.5 sm:py-5 text-base sm:text-lg font-display text-primary-foreground border-0 rounded-xl cursor-pointer hover:scale-105 transition-transform"
          >
            {ctaText}
          </button>
          <span className="font-display text-primary text-sm sm:text-base md:text-lg tracking-wide mt-1">
            {dateText}
          </span>
        </div>
      </div>
    </section>
  );
}
