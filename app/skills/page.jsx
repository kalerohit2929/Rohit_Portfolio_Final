
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const skillScenes = [
  {
    number: "01",
    word: "BUILD",
    subtitle: "Interfaces with intention.",
    category: "FRONTEND ENGINEERING",
    skills: ["React.js", "Next.js", "JavaScript ES6+", "Tailwind CSS", "GSAP"],
    statement: "From a blank screen to a complete experience.",
  },
  {
    number: "02",
    word: "CONNECT",
    subtitle: "Make everything work together.",
    category: "BACKEND ENGINEERING",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
    statement: "Connecting interfaces to real-world logic.",
  },
  {
    number: "03",
    word: "STORE",
    subtitle: "Give every piece of data a place.",
    category: "DATABASE ENGINEERING",
    skills: ["MongoDB", "Schema Design", "CRUD Operations"],
    statement: "Organized data. Reliable applications.",
  },
  {
    number: "04",
    word: "SHIP",
    subtitle: "Turn ideas into reality.",
    category: "DEVELOPMENT WORKFLOW",
    skills: ["Git & GitHub", "API Integration", "Responsive Design", "Deployment"],
    statement: "Built to work beyond the development environment.",
  },
];

export default function Skills() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const slides = gsap.utils.toArray(".kinetic-slide", section);

      if (!slides.length) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, reduceMotion } = context.conditions;

          // Respect the visitor's reduced-motion preference.
          if (reduceMotion) return;

          const words = slides.map((slide) =>
            slide.querySelector(".kinetic-word")
          );

          const details = slides.map((slide) =>
            slide.querySelectorAll(".kinetic-detail")
          );

          gsap.set(slides, {
            autoAlpha: 0,
            y: desktop ? 65 : 25,
          });

          gsap.set(words, {
            backgroundPosition: "100% 0%",
          });

          gsap.set(slides[0], {
            autoAlpha: 1,
            y: 0,
          });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: `+=${slides.length * 100}%`,
              pin: true,
              scrub: desktop ? 0.8 : 0.5,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          slides.forEach((slide, index) => {
            const word = words[index];
            const detail = details[index];
            const start = index;

            if (index > 0) {
              timeline.to(
                slide,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.18,
                  ease: "power2.out",
                },
                start
              );
            }

            // Fill the giant word with acid lime.
            timeline.to(
              word,
              {
                backgroundPosition: "0% 0%",
                duration: 0.62,
                ease: "none",
              },
              start + 0.08
            );

            // Reveal the supporting information.
            timeline.fromTo(
              detail,
              {
                autoAlpha: 0,
                y: 20,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.25,
                stagger: 0.07,
                ease: "power2.out",
              },
              start + 0.3
            );

            // Transition into the next word.
            if (index < slides.length - 1) {
              timeline.to(
                slide,
                {
                  autoAlpha: 0,
                  y: -35,
                  duration: 0.16,
                  ease: "power1.in",
                },
                start + 0.84
              );
            }
          });

          return () => timeline.scrollTrigger?.kill();
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative h-[100svh] min-h-[600px] overflow-hidden bg-[#090909] text-[#E5E5E5]"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-1/2 h-[65vw] w-[65vw] max-h-[650px] max-w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C6FF00]/[0.035] blur-[100px]" />

        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      {/* Fixed section header */}
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-6 sm:px-8 md:px-12 md:py-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C6FF00] sm:text-xs">
            Capabilities / 002
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            Full-Stack Developer
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">
            The things I do
          </p>
          <p className="mt-1 text-xs text-[#C6FF00]">
            04 disciplines
          </p>
        </div>
      </header>

      {/* Kinetic typography scenes */}
      <div className="absolute inset-0">
        {skillScenes.map((scene, index) => (
          <article
            key={scene.number}
            className="kinetic-slide absolute inset-0 flex items-center justify-center px-5 pb-10 pt-24 sm:px-8 md:px-12"
          >
            <div className="mx-auto w-full max-w-[1500px]">
              {/* Category */}
              <div className="kinetic-detail mb-5 flex items-center gap-3 sm:mb-8">
                <span className="h-px w-8 bg-[#C6FF00]" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400 sm:text-xs sm:tracking-[0.3em]">
                  {scene.category}
                </p>
              </div>

              {/* Giant word */}
              <h1
                className="kinetic-word select-none whitespace-nowrap bg-clip-text text-[clamp(4.1rem,17.5vw,16rem)] font-black leading-[0.78] tracking-[-0.09em] text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #C6FF00 50%, #454545 50%)",
                  backgroundSize: "200% 100%",
                  backgroundPosition: "100% 0%",
                }}
              >
                {scene.word}
              </h1>

              {/* Main message */}
              <div className="mt-7 grid grid-cols-1 gap-6 sm:mt-10 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <h3 className="kinetic-detail max-w-2xl text-xl font-medium tracking-tight text-white sm:text-3xl md:text-4xl">
                    {scene.subtitle}
                  </h3>

                  <p className="kinetic-detail mt-3 max-w-lg text-sm leading-6 text-neutral-500 sm:text-base sm:leading-7">
                    {scene.statement}
                  </p>
                </div>

                {/* Technologies */}
                <div className="kinetic-detail flex max-w-xl flex-wrap gap-2 md:justify-end">
                  {scene.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-2 text-[10px] font-medium text-neutral-300 transition-colors duration-300 hover:border-[#C6FF00]/70 hover:text-[#C6FF00] sm:px-4 sm:text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Scene number */}
              <div className="kinetic-detail mt-8 flex items-center gap-3 sm:mt-12">
                <span className="text-xs font-bold text-[#C6FF00]">
                  {scene.number}
                </span>
                <span className="h-px w-12 bg-neutral-700" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-600">
                  {index === 0
                    ? "Design the experience"
                    : index === 1
                      ? "Connect the logic"
                      : index === 2
                        ? "Structure the data"
                        : "Deliver the product"}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Scroll indicator */}
      <footer className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between px-5 py-5 sm:px-8 md:px-12">
        <p className="text-[9px] uppercase tracking-[0.25em] text-neutral-600 sm:text-[10px]">
          Built with logic. Finished with obsession.
        </p>

        <div className="flex items-center gap-2">
          <span className="hidden text-[10px] uppercase tracking-widest text-neutral-500 sm:block">
            Scroll to explore
          </span>
          <span className="animate-bounce text-sm text-[#C6FF00]">↓</span>
        </div>
      </footer>
    </section>
  );
}
