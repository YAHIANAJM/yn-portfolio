"use client";

import { useRef } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const outfitImages = [
  { src: "/outfits/outfit-4.jpg",  height: "h-[340px] md:h-[500px]", mt: "mt-16 md:mt-20" },
  { src: "/outfits/outfit-17.jpg", height: "h-[420px] md:h-[650px]", mt: "" },
  { src: "/outfits/outfit-8.jpg",  height: "h-[380px] md:h-[550px]", mt: "mt-8 md:mt-10" },
  { src: "/outfits/outfit-2.jpg",  height: "h-[420px] md:h-[600px]", mt: "mt-16 md:mt-24" },
  { src: "/outfits/outfit-5.jpg",  height: "h-[340px] md:h-[520px]", mt: "" },
  { src: "/outfits/outfit-16.jpg", height: "h-[460px] md:h-[700px]", mt: "mt-10 md:mt-12" },
  { src: "/outfits/outfit-1.jpg",  height: "h-[340px] md:h-[500px]", mt: "mt-20 md:mt-32" },
  { src: "/outfits/outfit-11.jpg", height: "h-[400px] md:h-[620px]", mt: "mt-4 md:mt-6" },
  { src: "/outfits/outfit-9.jpg",  height: "h-[360px] md:h-[540px]", mt: "mt-12 md:mt-16" },
  { src: "/outfits/outfit-3.jpg",  height: "h-[420px] md:h-[650px]", mt: "mt-20 md:mt-28" },
  { src: "/outfits/outfit-13.jpg", height: "h-[370px] md:h-[560px]", mt: "" },
  { src: "/outfits/outfit-6.jpg",  height: "h-[440px] md:h-[660px]", mt: "mt-6 md:mt-8" },
  { src: "/outfits/outfit-15.jpg", height: "h-[340px] md:h-[510px]", mt: "mt-14 md:mt-20" },
  { src: "/outfits/outfit-10.jpg", height: "h-[390px] md:h-[590px]", mt: "mt-3 md:mt-4" },
  { src: "/outfits/outfit-7.jpg",  height: "h-[450px] md:h-[680px]", mt: "mt-10 md:mt-14" },
  { src: "/outfits/outfit-14.jpg", height: "h-[340px] md:h-[530px]", mt: "mt-24 md:mt-36" },
  { src: "/outfits/outfit-12.jpg", height: "h-[410px] md:h-[630px]", mt: "mt-1 md:mt-2" },
];

export default function FitsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ isDown: false, startX: 0, scrollLeft: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    const el = sliderRef.current;
    if (!el) return;
    drag.current = { isDown: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!drag.current.isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    sliderRef.current.scrollLeft = drag.current.scrollLeft - (x - drag.current.startX) * 1.5;
  };
  const stopDrag = () => { drag.current.isDown = false; };

  return (
    <section className="py-20 md:py-section-gap bg-vintage-cream overflow-hidden" id="fits">
      <div className="px-6 md:px-margin-desktop mb-8 md:mb-12 flex justify-between items-end">
        <ScrollReveal>
          <span
            className="text-warm-gold tracking-[0.2em] uppercase text-[11px] md:text-[12px] font-bold block mb-2"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            CURATED GALLERY
          </span>
          <h2
            className="text-[48px] md:text-[64px] leading-[1.1] tracking-[0.05em] text-deep-navy uppercase"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            THE FITS
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p
            className="text-[18px] md:text-[28px] leading-[1.4] text-deep-navy max-w-[160px] md:max-w-xs italic text-right hidden sm:block"
            style={{ fontFamily: "var(--font-garamond)" }}
          >
            "Fashion isn't vanity. It's a language."
          </p>
        </ScrollReveal>
      </div>

      <div
        ref={sliderRef}
        className="flex gap-3 md:gap-gutter overflow-x-auto no-scrollbar px-6 md:px-margin-desktop pb-10 md:pb-12 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {outfitImages.map((img, i) => (
          <div key={i} className={`flex-none w-40 sm:w-56 md:w-80 ${img.height} ${img.mt} overflow-hidden`}>
            <Image
              src={img.src}
              alt={`Outfit ${i + 1}`}
              width={320}
              height={700}
              className="w-full h-full object-cover pointer-events-none hover:scale-105 transition-transform duration-700"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
