export default function TickerSection() {
  const items =
    "DEVELOPER · FASHION · ORIGAMI · AI LEARNER · CAMPER · TECHERMANOS · KICKBOXING · CASABLANCA · ";

  return (
    <section className="py-6 md:py-10 bg-dark-cherry border-y border-cherry-glow/30 overflow-hidden">
      <div className="ticker-wrap">
        <div className="ticker">
          {[0, 1].map((n) => (
            <span
              key={n}
              className="mx-4 md:mx-8 inline-block"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(32px, 6vw, 64px)",
                lineHeight: "1.1",
                letterSpacing: "0.05em",
              }}
            >
              {items.split(" · ").map((word, i, arr) => (
                <span key={i}>
                  <span className="text-paper-white">{word}</span>
                  {i < arr.length - 1 && (
                    <span className="text-warm-gold"> · </span>
                  )}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
