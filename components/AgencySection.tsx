import ScrollReveal from "./ScrollReveal";

export default function AgencySection() {
  return (
    <section
      id="agency"
      className="py-20 md:py-section-gap px-6 md:px-margin-desktop bg-black text-paper-white overflow-hidden relative"
    >
      {/* Watermark — hidden on small phones */}
      <div
        className="absolute -right-10 md:-right-20 top-1/2 -translate-y-1/2 text-[100px] md:text-[200px] leading-none text-paper-white/5 pointer-events-none select-none hidden sm:block"
        style={{ fontFamily: "var(--font-bebas)" }}
        aria-hidden
      >
        AGENCY
      </div>

      <div className="max-w-4xl relative z-10">
        <ScrollReveal>
          <span
            className="text-warm-gold tracking-[0.2em] uppercase text-[11px] md:text-[12px] font-bold block mb-2"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            PARTNERSHIP
          </span>
        </ScrollReveal>
        <ScrollReveal delay={50}>
          <h2
            className="text-[56px] sm:text-[72px] md:text-[120px] leading-none tracking-[-0.02em] mb-4 md:mb-stack-md"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            TEC HERMANOS
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p
            className="text-[18px] md:text-[28px] leading-[1.4] text-paper-white/80 italic mb-8 md:mb-stack-lg"
            style={{ fontFamily: "var(--font-garamond)" }}
          >
            A digital boutique for high-end web experiences. We don't just build websites; we
            craft digital identities for the bold.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="flex flex-col md:flex-row gap-6 md:gap-gutter">
            <div className="flex-1 border-l-2 border-cherry-glow pl-4 md:pl-stack-md py-4">
              <h5
                className="text-warm-gold tracking-[0.2em] uppercase text-[11px] md:text-[12px] font-bold mb-2"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                VISION
              </h5>
              <p className="text-[14px] md:text-[16px] leading-[1.6] text-paper-white/60" style={{ fontFamily: "var(--font-dm-sans)" }}>
                Elevating Moroccan digital standards to a global editorial level.
              </p>
            </div>
            <div className="flex-1 border-l-2 border-cherry-glow pl-4 md:pl-stack-md py-4">
              <h5
                className="text-warm-gold tracking-[0.2em] uppercase text-[11px] md:text-[12px] font-bold mb-2"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                CRAFT
              </h5>
              <p className="text-[14px] md:text-[16px] leading-[1.6] text-paper-white/60" style={{ fontFamily: "var(--font-dm-sans)" }}>
                Pixel-perfect execution, performance-first code, and timeless design.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
