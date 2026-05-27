import ScrollReveal from "./ScrollReveal";

const interests = [
  { icon: "forest",        title: "CAMPING",    desc: "Exploring the Atlas mountains. Finding clarity in the raw stillness of the Moroccan wilderness.",                          delay: 0   },
  { icon: "potted_plant",  title: "ORIGAMI",    desc: "The discipline of a single sheet. Mastering complexity through precision folding and geometric logic.",                    delay: 50  },
  { icon: "edit",          title: "DRAWING",    desc: "Sketching silhouettes. Translating movement and structure onto paper before it ever hits the screen.",                    delay: 100 },
  { icon: "fitness_center",title: "KICKBOXING", desc: "The balance of power and restraint. Training the mind and body for resilience under pressure.",                          delay: 150 },
  { icon: "menu_book",     title: "READING",    desc: "Philosophy and fiction. Absorbing the thoughts of builders who came before me.",                                         delay: 200 },
  { icon: "psychology",    title: "AI",         desc: "The new frontier. Experimenting with LLMs and generative models to push the limits of human-machine creation.",         delay: 250 },
];

export default function BeyondSection() {
  return (
    <section
      id="beyond"
      className="py-20 md:py-section-gap px-6 md:px-margin-desktop bg-deep-navy text-paper-white"
    >
      <ScrollReveal>
        <span
          className="text-warm-gold tracking-[0.2em] uppercase text-[11px] md:text-[12px] font-bold block mb-2"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          MULTIDIMENSIONAL LIVING
        </span>
      </ScrollReveal>
      <ScrollReveal delay={50}>
        <h2
          className="text-[48px] md:text-[64px] leading-[1.1] tracking-[0.05em] mb-8 md:mb-stack-lg uppercase"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          BEYOND THE CODE
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-gutter">
        {interests.map((item) => (
          <ScrollReveal key={item.title} delay={item.delay}>
            <div className="p-5 md:p-stack-lg border border-warm-gold/20 hover:border-cherry-glow hover:bg-dark-cherry/20 transition-all duration-500 h-full">
              <span className="material-symbols-outlined text-warm-gold mb-3 md:mb-stack-md block text-[24px] md:text-[32px]">
                {item.icon}
              </span>
              <h4
                className="text-[20px] md:text-[28px] leading-[1.1] mb-2"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                {item.title}
              </h4>
              <p
                className="text-[13px] md:text-[16px] leading-[1.6] text-paper-white/60"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {item.desc}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
