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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-7 max-w-5xl mx-auto">
          {cards.map((card, idx) => (
            <div
              key={card.id || idx}
              className="rounded-2xl p-6 sm:p-7 text-center bg-gradient-to-b from-[#1b1713] to-[#110e0c] border border-[#e5c158]/30 hover:border-[#e5c158]/70 hover:-translate-y-1.5 transition-all duration-300 group shadow-2xl flex flex-col items-center justify-between"
            >
              <div>
                <div className="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-md">{card.icon}</div>
                <span className="inline-block bg-[#e5c158]/15 border border-[#e5c158]/40 text-[#e5c158] text-[11px] sm:text-xs font-sans font-semibold tracking-wider px-3.5 py-1 rounded-full mb-3 uppercase">
                  {card.highlight}
                </span>
                <h3 className="font-display text-lg sm:text-xl text-[#f3ece4] font-semibold mb-2.5">{card.title}</h3>
                <p className="font-body text-[#a89f92] text-sm sm:text-base leading-relaxed">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Summary */}
        <div className="text-center mt-12 sm:mt-14 px-2">
          <div className="inline-block bg-[#161310] border border-[#e5c158]/30 rounded-2xl px-6 sm:px-12 py-5 sm:py-6 shadow-2xl">
            <p className="font-sans text-xs sm:text-sm text-[#a89f92] uppercase tracking-wider mb-1.5">
              Total Value: <span className="line-through text-red-400 font-semibold">{totalValue}</span>
            </p>
            <p className="font-display text-xl sm:text-2xl text-[#f3ece4]">
              Your Investment: <span className="text-gradient-gold text-3xl sm:text-4xl font-extrabold ml-2">{investment}</span>
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center mt-8 sm:mt-10 flex flex-col items-center gap-2.5 px-2">
          <button
            onClick={onOpenModal}
            type="button"
            className="w-full sm:w-auto mirror-button px-8 sm:px-14 py-4 sm:py-5 text-lg sm:text-xl font-display cursor-pointer hover:scale-105 transition-transform"
          >
            {ctaText}
          </button>
          <span className="font-display text-[#e5c158] text-sm sm:text-base md:text-lg tracking-wide mt-1.5 font-medium">
            {dateText}
          </span>
        </div>
      </div>
    </section>
  );
}
