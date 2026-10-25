


"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Observer, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Observer, ScrollTrigger, useGSAP);

const stories = [
  {
    label: "01 / THE HUMAN",
    title: ["CURIOUS BY", "DEFAULT."],
    description:
      "I'm Rohit Kale — a full-stack developer driven by curiosity, creative problem-solving, and the satisfaction of making ideas real.",
    detail: "A MIND THAT NEVER STOPS EXPLORING",
    type: "person",
  },
  {
    label: "02 / THE CREATOR",
    title: ["PIXELS WITH", "PURPOSE."],
    description:
      "I create responsive interfaces, deliberate layouts, and smooth interactions. I believe a good interface should feel as good as it looks.",
    detail: "REACT.JS / NEXT.JS / TAILWIND / GSAP",
    type: "frontend",
  },
  {
    label: "03 / THE ENGINEER",
    title: ["BEAUTY ISN'T", "ENOUGH."],
    description:
      "I connect the visual experience with the logic underneath it: REST APIs, authentication, backend services, and database design.",
    detail: "NODE.JS / EXPRESS / MONGODB",
    type: "backend",
  },
  {
    label: "04 / THE BUILDER",
    title: ["IDEAS INTO", "REALITY."],
    description:
      "HungerBox explores food delivery workflows. NexBridge Intelligence brings a B2B website to life with motion and lead capture.",
    detail: "REAL PROJECTS. REAL PROBLEMS.",
    type: "projects",
  },
  {
    label: "05 / THE NEXT MOVE",
    title: ["ALWAYS", "EVOLVING."],
    description:
      "I'm learning, experimenting, and pushing beyond what I already know. My next goal is to keep building products that solve meaningful problems.",
    detail: "BUILT WITH LOGIC. FINISHED WITH OBSESSION.",
    type: "future",
  },
];

function Visual({ type }) {
  if (type === "person") {
    return (
      
<div className="relative flex min-h-[420px] w-full items-end justify-center overflow-hidden bg-[#101010] sm:min-h-[520px] md:min-h-[380px] lg:min-h-[480px]">
  <Image
    src="/images/profile2.webp"
    alt="Rohit Kale"
    width={420}
    height={520}
    sizes="(max-width: 768px) 90vw, 40vw"
    className="story-photo relative z-10 h-auto w-full max-w-[300px] rounded-3xl object-contain object-bottom sm:max-w-[360px] md:max-h-[420px] md:w-auto md:max-w-full lg:max-h-[460px]"
  />

  <span className="absolute left-4 top-4 z-20 text-[10px] tracking-[0.2em] text-[#B7FF00]">
    ROHIT.EXE
  </span>

  <span className="absolute bottom-4 right-4 z-20 text-right text-[10px] tracking-widest text-white/40">
    FULL-STACK DEVELOPER
  </span>
</div>

    );
  }

  if (type === "frontend") {
    return (
      <div className="relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden bg-[#B7FF00] p-6 text-black sm:min-h-[380px] sm:p-9">
        <div className="flex justify-between text-[10px] font-bold tracking-[0.2em]">
          <span>INTERFACE LAB</span>
          <span>02—05</span>
        </div>

        <div className="story-art mx-auto flex aspect-square w-full max-w-[260px] items-center justify-center border border-black/40">
          <div className="relative flex aspect-square w-[72%] items-center justify-center rounded-full border border-black">
            <div className="absolute inset-4 rounded-full border border-black/50" />
            <div className="absolute inset-9 rounded-full border border-black/30" />
            <span className="text-7xl font-black tracking-[-0.1em]">UI</span>
          </div>
        </div>

        <p className="text-[10px] font-bold tracking-[0.16em]">
          DESIGN IS HOW IT WORKS.
        </p>
      </div>
    );
  }

  if (type === "backend") {
    return (
      <div className="flex h-full min-h-[260px] flex-col justify-between overflow-hidden bg-[#141414] p-6 font-mono sm:min-h-[380px] sm:p-9">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 text-xs text-white/50">
          <span className="h-2 w-2 rounded-full bg-[#B7FF00]" />
          server.js
          <span className="ml-auto text-[#B7FF00]">RUNNING</span>
        </div>

        <div className="story-code space-y-4 py-8 text-xs leading-relaxed sm:text-sm">
          <p className="text-white/35">// systems that make it work</p>
          <p>
            <span className="text-[#B7FF00]">const</span> developer = {"{"}
          </p>
          <p className="pl-4">
            frontend: <span className="text-[#B7FF00]">"creative"</span>,
          </p>
          <p className="pl-4">
            backend: <span className="text-[#B7FF00]">"reliable"</span>,
          </p>
          <p className="pl-4">
            mindset: <span className="text-[#B7FF00]">"always learning"</span>
          </p>
          <p>{"};"}</p>
        </div>

        <div className="border-t border-white/10 pt-4 text-[10px] tracking-widest text-white/40">
          REQUEST → LOGIC → RESPONSE
        </div>
      </div>
    );
  }

  if (type === "projects") {
    return (
      <div className="flex h-full min-h-[260px] flex-col justify-between bg-[#151515] p-5 sm:min-h-[380px] sm:p-8">
        <div className="flex justify-between text-[10px] tracking-[0.2em] text-[#B7FF00]">
          <span>SELECTED WORK</span>
          <span>2026</span>
        </div>

        <div className="story-projects space-y-3">
          <div className="border border-white/15 bg-[#0B0B0B] p-5">
            <p className="text-xl font-semibold">HungerBox ↗</p>
            <p className="mt-2 text-[10px] tracking-widest text-white/40">
              FOOD DELIVERY / FULL STACK
            </p>
          </div>

          <div className="ml-6 border border-white/15 bg-[#0B0B0B] p-5">
            <p className="text-xl font-semibold">NexBridge ↗</p>
            <p className="mt-2 text-[10px] tracking-widest text-white/40">
              B2B INTELLIGENCE / WEB
            </p>
          </div>
        </div>

        <p className="text-[10px] tracking-widest text-white/40">
          CONCEPT → CODE → EXPERIENCE
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[260px] flex-col justify-between overflow-hidden bg-[#B7FF00] p-6 text-black sm:min-h-[380px] sm:p-9">
      <div className="flex justify-between text-[10px] font-bold tracking-[0.2em]">
        <span>STATUS: EVOLVING</span>
        <span>05—05</span>
      </div>

      <div className="story-future">
        <p className="text-[clamp(3rem,7vw,6rem)] font-black leading-[0.82] tracking-[-0.09em]">
          NEXT
          <br />
          VERSION
          <br />
          LOADING<span className="animate-pulse">_</span>
        </p>

        <div className="mt-8 h-1 w-full bg-black/20">
          <div className="h-full w-[78%] bg-black" />
        </div>
      </div>

      <p className="text-[10px] font-bold tracking-[0.16em]">
        MORE TO BUILD. MORE TO LEARN.
      </p>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const activeIndex = useRef(0);
  const animating = useRef(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const cards = cardsRef.current.filter(Boolean);

      if (!section || cards.length !== stories.length) return;

      const total = cards.length;
      const cardContents = cards.map((card) =>
        card.querySelector(".story-card-inner")
      );

      let observer;
      let pinTrigger;

      // Initial composition: only the first card is visible.
      cards.forEach((card, index) => {
        gsap.set(card, {
          autoAlpha: index === 0 ? 1 : 0,
          y: index === 0 ? 0 : 90,
          zIndex: index + 1,
          pointerEvents: index === 0 ? "auto" : "none",
        });

        gsap.set(cardContents[index], {
          scale: 1,
          rotation: 0,
          clipPath:
            index === 0
              ? "inset(0% 0% 0% 0%)"
              : "inset(0% 0% 100% 0%)",
        });
      });

      // Every card is straight. The next card reveals with a vertical wipe.
      function showCard(nextIndex, direction) {
        if (
          animating.current ||
          nextIndex < 0 ||
          nextIndex >= total ||
          nextIndex === activeIndex.current
        ) {
          return;
        }

        animating.current = true;

        const previousIndex = activeIndex.current;
        const previousCard = cards[previousIndex];
        const nextCard = cards[nextIndex];
        const previousInner = cardContents[previousIndex];
        const nextInner = cardContents[nextIndex];

        const outgoingY = direction > 0 ? -65 : 65;
        const incomingY = direction > 0 ? 85 : -85;

        gsap.set(nextCard, {
          autoAlpha: 1,
          y: 0,
          zIndex: total + 1,
          pointerEvents: "auto",
        });

        gsap.set(nextInner, {
          clipPath:
            direction > 0
              ? "inset(0% 0% 100% 0%)"
              : "inset(100% 0% 0% 0%)",
          scale: 0.97,
          rotation: 0,
        });

        const timeline = gsap.timeline({
          defaults: { overwrite: "auto" },
          onComplete: () => {
            gsap.set(previousCard, {
              autoAlpha: 0,
              y: 0,
              zIndex: previousIndex + 1,
              pointerEvents: "none",
            });

            gsap.set(previousInner, {
              clipPath: "inset(0% 0% 100% 0%)",
              scale: 1,
            });

            gsap.set(nextCard, {
              zIndex: nextIndex + 1,
            });

            activeIndex.current = nextIndex;
            animating.current = false;
          },
        });

        // The outgoing card retreats, while the next one wipes into view.
        timeline.to(
          previousInner,
          {
            scale: 0.96,
            clipPath:
              direction > 0
                ? "inset(0% 0% 100% 0%)"
                : "inset(100% 0% 0% 0%)",
            duration: 0.55,
            ease: "power3.inOut",
          },
          0
        );

        timeline.to(
          previousCard,
          {
            y: outgoingY,
            duration: 0.55,
            ease: "power3.inOut",
          },
          0
        );

        timeline.to(
          nextCard,
          {
            y: 0,
            duration: 0.7,
            ease: "power4.out",
          },
          0.08
        );

        timeline.to(
          nextInner,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 0.8,
            ease: "power4.inOut",
          },
          0.08
        );

        // Animate the active card's content independently.
        const titleLines = nextCard.querySelectorAll(".story-title-line");
        const description = nextCard.querySelector(".story-description");
        const detail = nextCard.querySelector(".story-detail");
        const visual = nextCard.querySelector(".story-visual");

        timeline.fromTo(
          titleLines,
          { yPercent: 115, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.65,
            ease: "power4.out",
          },
          0.28
        );

        timeline.fromTo(
          description,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
          },
          0.45
        );

        timeline.fromTo(
          detail,
          { x: -15, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          0.53
        );

        timeline.fromTo(
          visual,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.85,
            ease: "power4.inOut",
          },
          0.16
        );
      }

      // Start the pinned story only when the section enters the viewport.
      pinTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * (total - 1)}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: () => observer && observer.enable(),
        onEnterBack: () => observer && observer.enable(),
        onLeave: () => observer && observer.disable(),
        onLeaveBack: () => observer && observer.disable(),
      });

      // Observer intercepts wheel and touch input while the story is pinned.
      observer = Observer.create({
        target: window,
        type: "wheel,touch,pointer",
        wheelSpeed: 1,
        tolerance: 45,
        preventDefault: true,
        allowClicks: true,
        onDown: () => {
          // Scroll down: next card.
          if (activeIndex.current < total - 1) {
            showCard(activeIndex.current + 1, 1);
          } else {
            // Last card: let the page continue scrolling.
            observer.disable();
            pinTrigger.scroll(pinTrigger.end + 2);
          }
        },
        onUp: () => {
          // Scroll up: previous card.
          if (activeIndex.current > 0) {
            showCard(activeIndex.current - 1, -1);
          } else {
            // First card: let the page return to the previous section.
            observer.disable();
            pinTrigger.scroll(pinTrigger.start - 2);
          }
        },
      });

      observer.disable();

      // Keep the story synced with the pinned section.
      ScrollTrigger.refresh();

      return () => {
        observer && observer.kill();
        pinTrigger && pinTrigger.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative flex h-[100svh] min-h-[620px] flex-col overflow-hidden bg-[#090909] px-5 pb-8 pt-8 text-[#E5E5E5] sm:px-8 sm:pb-10 sm:pt-10 lg:px-12"
    >
      {/* Header */}
      <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#B7FF00] shadow-[0_0_12px_#B7FF00]" />
          <span className="text-[10px] tracking-[0.22em] text-[#B7FF00] sm:text-xs">
            THE HUMAN BEHIND THE CODE
          </span>
        </div>

        <span className="font-mono text-[10px] text-white/40">
          ABOUT / 05
        </span>
      </header>

      {/* Main storytelling stage */}
      <div className="relative mx-auto mt-6 w-full max-w-7xl flex-1">
        <div className="absolute inset-0">
          {stories.map((story, index) => (
            <article
              // key={story.number}
              key={story.id ?? story.number ?? index}
              ref={(element) => {
                cardsRef.current[index] = element;
              }}
              className="absolute inset-0"
              aria-label={story.label}
            >
              <div className="story-card-inner grid h-full grid-rows-[auto_1fr] overflow-hidden border border-white/10 bg-[#101010] md:grid-cols-[1.02fr_0.98fr] md:grid-rows-1">
                {/* Text */}
                <div className="flex min-h-0 flex-col justify-between overflow-hidden p-5 sm:p-8 lg:p-12">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.2em] text-[#B7FF00] sm:text-xs">
                      {story.label}
                    </span>
                    <span className="font-mono text-[10px] text-white/35">
                      {story.number} / 05
                    </span>
                  </div>

                  <div className="py-5 md:py-8">
                    <h2 className="text-[clamp(2.65rem,7vw,6.7rem)] font-semibold leading-[0.86] tracking-[-0.08em]">
                      {story.title.map((line, lineIndex) => (
                        <span
                          key={line}
                          className="block overflow-hidden pb-1"
                        >
                          <span
                            className={`story-title-line block ${
                              lineIndex === 1 || story.type === "future"
                                ? "text-[#B7FF00]"
                                : "text-[#E5E5E5]"
                            }`}
                          >
                            {line}
                          </span>
                        </span>
                      ))}
                    </h2>

                    <p className="story-description mt-5 max-w-lg text-xs leading-6 text-[#A3A3A3] sm:mt-7 sm:text-sm sm:leading-7 lg:text-base">
                      {story.description}
                    </p>
                  </div>

                  <div className="story-detail flex items-center gap-3 border-t border-white/10 pt-4">
                    <span className="h-px w-7 shrink-0 bg-[#B7FF00]" />
                    <span className="text-[9px] leading-5 tracking-[0.12em] text-white/45 sm:text-[10px]">
                      {story.detail}
                    </span>
                  </div>
                </div>

                {/* Visual panel */}
                <div className="story-visual relative min-h-0 overflow-hidden border-t border-white/10 md:border-l md:border-t-0">
                  <Visual type={story.type} />
                </div>

                {/* Accent corner */}
                <div className="pointer-events-none absolute right-0 top-0 h-9 w-9 border-r border-t border-[#B7FF00]/60 sm:h-12 sm:w-12" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Footer / progress */}
      <footer className="relative z-20 mx-auto mt-5 flex w-full max-w-7xl items-center gap-4">
        <span className="whitespace-nowrap text-[9px] tracking-[0.18em] text-white/40">
          SCROLL TO EXPLORE
        </span>

        <div className="h-px flex-1 overflow-hidden bg-white/10">
          <div className="h-full w-full origin-left scale-x-0 bg-[#B7FF00]" />
        </div>

        <span className="whitespace-nowrap text-[9px] tracking-[0.18em] text-white/40">
          ROHIT KALE
        </span>
      </footer>
    </section>
  );
}
