
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const cards = [
  {
    number: "01",
    label: "THE FOUNDATION",
    title: "BUILT WITH",
    accent: "LOGIC.",
    note: "Think deeply. Build intentionally.",
    style: "bg-[#C6FF00] text-black",
    shape: "logic",
  },
  {
    number: "02",
    label: "THE MINDSET",
    title: "DRIVEN BY",
    accent: "CURIOSITY.",
    note: "Stay curious. Keep breaking boundaries.",
    style: "bg-[#E5E5E5] text-black",
    shape: "curiosity",
  },
  {
    number: "03",
    label: "THE CRAFT",
    title: "FINISHED WITH",
    accent: "OBSESSION.",
    note: "Details turn good work into great work.",
    style: "bg-[#181818] text-white",
    shape: "craft",
  },
  {
    number: "04",
    label: "THE PURPOSE",
    title: "HERE TO BUILD",
    accent: "WHAT'S NEXT.",
    note: "The future is something we create.",
    style: "bg-[#C6FF00] text-black",
    shape: "future",
  },
];

function CardArtwork({ shape }) {
  if (shape === "logic") {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-8 -top-8 h-52 w-52 rounded-full border-[30px] border-black/10 sm:h-72 sm:w-72" />
        <div className="absolute right-12 top-12 h-32 w-32 rotate-45 border border-black/30 sm:right-20 sm:top-16 sm:h-48 sm:w-48" />
        <div className="absolute bottom-8 right-8 font-mono text-7xl font-black tracking-tighter opacity-15 sm:text-9xl">
          {"{ }"}
        </div>
      </div>
    );
  }

  if (shape === "curiosity") {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-12 top-4 h-52 w-52 rounded-full bg-[#C6FF00] sm:h-72 sm:w-72" />
        <div className="absolute right-8 top-12 flex h-36 w-36 items-center justify-center rounded-full border border-black/20 sm:right-16 sm:top-16 sm:h-52 sm:w-52">
          <span className="text-7xl font-black sm:text-9xl">?</span>
        </div>
        <span className="absolute bottom-5 right-6 font-mono text-xs tracking-[0.3em]">
          KEEP ASKING
        </span>
      </div>
    );
  }

  if (shape === "craft") {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full border border-[#C6FF00]/40 sm:h-80 sm:w-80" />
        <div className="absolute right-4 top-4 h-52 w-52 rounded-full border border-[#C6FF00]/30 sm:h-64 sm:w-64" />
        <div className="absolute right-16 top-16 h-28 w-28 rounded-full bg-[#C6FF00] sm:right-24 sm:top-24 sm:h-40 sm:w-40" />
        <div className="absolute bottom-7 right-7 font-mono text-5xl font-black text-[#C6FF00]/20 sm:text-8xl">
          DETAIL
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -right-12 -top-20 h-64 w-64 rotate-12 border-[35px] border-black/10 sm:h-96 sm:w-96" />
      <div className="absolute right-10 top-12 h-36 w-36 rounded-full border-2 border-black/30 sm:right-20 sm:top-16 sm:h-52 sm:w-52" />
      <span className="absolute bottom-5 right-6 text-7xl font-black opacity-15 sm:text-9xl">
        ↗
      </span>
    </div>
  );
}

export default function Manifesto() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const intro = section.querySelector(".manifesto-intro");
      const word = section.querySelector(".manifesto-intro-word");
      const cardElements = gsap.utils.toArray(
        ".thought-card",
        section
      );

      // Set the initial states before the animation starts.
      gsap.set(cardElements, {
        yPercent: 120,
        rotation: (index) => (index % 2 === 0 ? -5 : 5),
        autoAlpha: 0,
        scale: 0.92,
      });

      gsap.set(word, {
        yPercent: 110,
        autoAlpha: 0,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=3200",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Opening text appears first.
      timeline.to(word, {
        yPercent: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power3.out",
      });

      // Keep the opening statement on screen.
      timeline.to({}, { duration: 0.6 });

      // Fade the intro slightly as the cards enter.
      timeline.to(
        intro,
        {
          autoAlpha: 0.22,
          scale: 0.94,
          duration: 0.5,
        },
        "+=0.1"
      );

      // Cards rise one after another and overlap.
      cardElements.forEach((card, index) => {
        timeline.to(
          card,
          {
            yPercent: 0,
            rotation: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
          },
          index === 0 ? "<" : "+=0.15"
        );

        // Pause briefly to let each statement land.
        timeline.to({}, { duration: 0.35 });
      });

      // The last card remains visible before the pin releases.
      timeline.to({}, { duration: 0.5 });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative isolate h-screen min-h-[600px] w-full overflow-hidden bg-[#090909] text-[#E5E5E5]"
    >
      {/* Subtle background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(#555 1px, transparent 1px), linear-gradient(90deg, #555 1px, transparent 1px)",
          backgroundSize: "55px 55px",
        }}
      />

      {/* Header */}
      <div className="absolute left-5 right-5 top-6 z-30 flex items-center justify-between sm:left-10 sm:right-10 sm:top-8">
        <span className="font-mono text-[10px] tracking-[0.2em] text-[#C6FF00] sm:text-xs">
          DEVELOPER / MINDSET
        </span>

        <span className="font-mono text-[10px] tracking-widest text-neutral-500">
          SCROLL TO EXPLORE ↓
        </span>
      </div>

      {/* Intro stays behind the cards */}
      <div className="manifesto-intro absolute inset-0 z-10 flex items-center justify-center px-5">
        <div className="max-w-5xl">
          <p className="mb-5 font-mono text-xs tracking-[0.3em] text-neutral-500 sm:mb-8">
            A PERSONAL MANIFESTO
          </p>

          <h2 className="overflow-hidden text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] sm:text-7xl md:text-8xl lg:text-[9rem]">
            <span className="manifesto-intro-word inline-block text-[#E5E5E5]">
              BUILT WITH
              <br />
              <span className="text-[#C6FF00]">LOGIC.</span>
            </span>
          </h2>

          <p className="mt-8 max-w-sm text-sm leading-7 text-neutral-400 sm:text-base">
            Not just writing code. Creating something
            meaningful, one detail at a time.
          </p>
        </div>
      </div>

      {/* Layered thought cards */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {cards.map((card, index) => (
          <article
            key={card.number}
            className={`thought-card absolute left-1/2 top-1/2 h-[52vh] min-h-[330px] max-h-[540px] w-[88%] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl p-6 shadow-[0_30px_100px_rgba(0,0,0,0.5)] sm:h-[58vh] sm:w-[76%] sm:rounded-3xl sm:p-10 md:p-14 ${card.style}`}
            style={{ zIndex: index + 1 }}
          >
            <CardArtwork shape={card.shape} />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] tracking-[0.2em] opacity-70 sm:text-xs">
                  {card.number} / {card.label}
                </span>

                <span className="text-2xl font-light sm:text-4xl">
                  ↗
                </span>
              </div>

              <div className="relative z-10">
                <p className="mb-4 font-mono text-[10px] tracking-[0.18em] opacity-60 sm:text-xs">
                  A PRINCIPLE TO LIVE BY
                </p>

                <h3 className="max-w-3xl text-4xl font-black uppercase leading-[0.9] tracking-[-0.07em] sm:text-6xl md:text-7xl lg:text-8xl">
                  {card.title}
                  <br />
                  {card.accent}
                </h3>

                <div className="mt-6 h-px w-full bg-current opacity-20" />

                <p className="mt-4 max-w-md text-xs leading-6 opacity-75 sm:text-sm sm:leading-7">
                  {card.note}
                </p>
              </div>

              <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.15em] opacity-60 sm:text-[10px]">
                <span>THOUGHT INTO ACTION</span>
                <span>MMXXVI</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-5 right-5 z-30 flex justify-between font-mono text-[9px] tracking-widest text-neutral-500 sm:bottom-8 sm:left-10 sm:right-10 sm:text-[10px]">
        <span>THINK. CREATE. REPEAT.</span>
        <span>BUILT WITH INTENT.</span>
      </div>
    </section>
  );
}
