"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

type Project = {
  title: string;
  desc: string;
  images?: string[];
  bg?: string;
  label?: string;
  labelColor?: string;
  delay: number;
};

const projects: Project[] = [
  {
    title: "LE RACINE",
    desc: "Custom CMS for luxury boutiques in Casablanca, optimizing inventory management and digital storytelling.",
    images: [
      "/outfits/project-images/leracine-1.png",
      "/outfits/project-images/leracine-2.png",
      "/outfits/project-images/leracine-3.png",
    ],
    delay: 0,
  },
  {
    title: "LA MODA",
    desc: "E-commerce fashion platform focusing on luxury editorial aesthetics and high-performance React architecture.",
    images: [
      "/outfits/project-images/lamoda-1.png",
      "/outfits/project-images/lamoda-2.png",
      "/outfits/project-images/lamoda-3.png",
    ],
    delay: 100,
  },
  {
    title: "BEEHOUSE",
    desc: "A sustainable architecture visualization tool for urban planners using generative design algorithms.",
    images: [
      "/outfits/project-images/beehouse-1.png",
      "/outfits/project-images/beehouse-2.png",
      "/outfits/project-images/beehouse-3.png",
    ],
    delay: 200,
  },
];

function ProjectCard({ project }: { project: Project }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!project.images || project.images.length < 2) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % project.images!.length);
    }, 2500);
    return () => clearInterval(id);
  }, [project.images]);

  return (
    <ScrollReveal delay={project.delay}>
      <div className="group">
        {/* Image area */}
        <div className="aspect-video mb-stack-md overflow-hidden relative border border-warm-gold/20">
          {project.images ? (
            <>
              {project.images.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  fill
                  className={`object-cover transition-opacity duration-700 ${
                    i === current ? "opacity-100" : "opacity-0"
                  }`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ))}

              {/* Dot indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      i === current ? "bg-warm-gold w-4" : "bg-paper-white/60"
                    }`}
                  />
                ))}
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-deep-navy/0 group-hover:bg-deep-navy/40 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
                <span
                  className="tracking-[0.2em] uppercase text-[12px] font-bold text-paper-white border border-paper-white px-6 py-2"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  VIEW PROJECT
                </span>
              </div>
            </>
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${project.bg}`}>
              <span
                className={`text-[64px] leading-[1.1] tracking-[0.05em] ${project.labelColor} opacity-20`}
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                {project.label}
              </span>
            </div>
          )}
        </div>

        {/* Text */}
        <h3
          className="text-[32px] leading-[1.1] text-deep-navy"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          {project.title}
        </h3>
        <p
          className="text-[16px] leading-[1.6] text-on-surface-variant mt-2"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {project.desc}
        </p>
      </div>
    </ScrollReveal>
  );
}

export default function CodeSection() {
  return (
    <section
      id="code"
      className="py-section-gap px-margin-mobile md:px-margin-desktop bg-paper-white"
    >
      <ScrollReveal>
        <span
          className="text-warm-gold tracking-[0.2em] uppercase text-[12px] font-bold block mb-2"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          ENGINEERED SOLUTIONS
        </span>
      </ScrollReveal>
      <ScrollReveal delay={50}>
        <h2
          className="text-[64px] leading-[1.1] tracking-[0.05em] text-deep-navy uppercase"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          THE CODE
        </h2>
      </ScrollReveal>

      {/* Latest work label */}
      <ScrollReveal delay={80}>
        <div className="flex items-center gap-6 mt-10 mb-14">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dark-cherry opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cherry-glow" />
            </span>
            <span
              className="text-dark-cherry tracking-[0.2em] uppercase text-[11px] font-bold"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              LATEST WORK
            </span>
          </div>
          <div className="flex-1 h-px bg-warm-gold/30" />
          <p
            className="text-[22px] leading-[1.4] text-on-surface-variant italic hidden md:block"
            style={{ fontFamily: "var(--font-garamond)" }}
          >
            A few things I've built — each one a lesson in craft.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      {/* More work hint */}
      <ScrollReveal delay={80}>
        <div className="flex flex-col items-center mt-20 mb-10 gap-3">
          <p
            className="text-[28px] md:text-[36px] leading-[1.3] text-center italic text-on-surface-variant"
            style={{ fontFamily: "var(--font-garamond)" }}
          >
            This is only a glimpse —{" "}
            <span className="text-dark-cherry not-italic" style={{ fontFamily: "var(--font-bebas)", fontSize: "inherit", letterSpacing: "0.03em" }}>
              the full story lives on GitHub.
            </span>
          </p>
          <div className="flex items-center gap-2 text-warm-gold/60">
            <div className="w-8 h-px bg-warm-gold/40" />
            <span
              className="tracking-[0.2em] uppercase text-[10px]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              10+ PROJECTS · OPEN SOURCE · ONGOING
            </span>
            <div className="w-8 h-px bg-warm-gold/40" />
          </div>
        </div>
      </ScrollReveal>

      {/* CTAs */}
      <ScrollReveal delay={100}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4">
          <a
            href="https://github.com/YAHIANAJM"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="flex items-center gap-3 bg-deep-navy text-paper-white px-10 py-4 hover:bg-dark-cherry transition-colors duration-300 group"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span
              className="tracking-[0.2em] uppercase text-[12px] font-bold"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              VIEW ON GITHUB
            </span>
          </a>

          <a
            href="/full-potential"
            data-cursor-hover
            className="flex items-center gap-3 border border-deep-navy text-deep-navy px-10 py-4 hover:bg-deep-navy hover:text-paper-white transition-all duration-300 group"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-warm-gold transition-colors duration-300">
              workspace_premium
            </span>
            <span
              className="tracking-[0.2em] uppercase text-[12px] font-bold"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              SEE MY FULL POTENTIAL
            </span>
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
