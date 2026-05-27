import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 md:py-section-gap px-6 md:px-margin-desktop bg-paper-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-gutter items-center">
        {/* Portrait */}
        <ScrollReveal className="md:col-span-5">
          <div className="aspect-[4/5] bg-vintage-cream overflow-hidden border border-warm-gold/10 relative max-w-sm mx-auto md:max-w-none">
            <Image
              src="/outfits/outfit-4.jpg"
              alt="Yahia Najm portrait"
              fill
              className="object-cover"
            />
          </div>
        </ScrollReveal>

        {/* Text */}
        <ScrollReveal className="md:col-span-7 flex flex-col justify-center" delay={150}>
          <h2
            className="text-[48px] md:text-[64px] leading-[1.1] tracking-[0.05em] text-deep-navy mb-8 md:mb-stack-lg uppercase"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            THE PERSON
          </h2>

          <p
            className="text-[15px] md:text-[16px] leading-[1.6] tracking-[0.01em] text-on-surface-variant max-w-xl mb-stack-md"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Yahia Najm is a 22-year-old builder and creative mind based in the vibrant heart of
            Casablanca. By day, he navigates the complex architectures of AI and modern codebases;
            by night, he curates an aesthetic universe that blends high-fashion silhouettes with
            the raw textures of everyday life.
          </p>

          <p
            className="text-[20px] md:text-[28px] leading-[1.4] text-on-surface mb-8 md:mb-stack-lg italic"
            style={{ fontFamily: "var(--font-garamond)" }}
          >
            "For me, construction and style are the same pursuit. Both require a foundation of
            logic and a finish of grace."
          </p>

          <div className="flex gap-stack-md">
            <a
              href="#contact"
              className="bg-dark-cherry text-paper-white tracking-[0.2em] uppercase text-[11px] md:text-[12px] font-bold px-8 md:px-10 py-4 hover:bg-cherry-glow transition-colors duration-300"
              style={{ fontFamily: "var(--font-dm-sans)" }}
              data-cursor-hover
            >
              WORK WITH ME
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
