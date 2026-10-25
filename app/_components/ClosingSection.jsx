
"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, ArrowUpRight, Terminal } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ClosingSection() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const linesRef = useRef([]);
  const footerTextRef = useRef(null);
  const ctaRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const lines = linesRef.current.filter(Boolean);
      const glow = section.querySelector(".closing-glow");

      gsap.set(eyebrowRef.current, {
        autoAlpha: 0,
        y: 20,
      });

      gsap.set(lines, {
        autoAlpha: 0,
        yPercent: 110,
        rotateX: -35,
        transformOrigin: "left bottom",
      });

      gsap.set(footerTextRef.current, {
        autoAlpha: 0,
        y: 20,
      });

      gsap.set(ctaRef.current, {
        autoAlpha: 0,
        y: 25,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          end: "bottom 65%",
          toggleActions: "play none none reverse",
        },
      });

      timeline
        .to(eyebrowRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        })
        .to(
          lines,
          {
            autoAlpha: 1,
            yPercent: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.18,
            ease: "power4.out",
          },
          "-=0.2"
        )
        .to(
          footerTextRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.35"
        )
        .to(
          ctaRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3"
        );

      const moveGlow = (event) => {
        const bounds = section.getBoundingClientRect();

        gsap.to(glow, {
          x: event.clientX - bounds.left - 180,
          y: event.clientY - bounds.top - 180,
          duration: 0.7,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      section.addEventListener("pointermove", moveGlow);

      return () => {
        section.removeEventListener("pointermove", moveGlow);
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="closing"
      className="relative isolate w-full overflow-hidden bg-[#090909] px-5 py-28 text-[#E5E5E5] sm:px-8 sm:py-36 lg:px-14 lg:py-44"
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="closing-glow absolute left-0 top-0 h-[360px] w-[360px] rounded-full bg-[#C6FF00]/[0.07] blur-[110px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(229,229,229,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(229,229,229,0.3) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="mx-auto max-w-[1500px]">
        {/* Section label */}
        <div
          ref={eyebrowRef}
          className="mb-14 flex items-center justify-between gap-4 sm:mb-20"
        >
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#C6FF00] shadow-[0_0_15px_#C6FF00]" />

            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/60 sm:text-xs">
              The next chapter
            </span>
          </div>

          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35 sm:text-xs">
            End / Beginning
          </span>
        </div>

        {/* Main statement */}
        <div className="relative" style={{ perspective: "1000px" }}>
          <p className="mb-5 text-sm text-white/40 sm:mb-8 sm:text-base">
            You&apos;ve seen what I build.
          </p>

          <div className="overflow-hidden py-1">
            <h2
              ref={(element) => {
                linesRef.current[0] = element;
              }}
              className="text-[clamp(2.8rem,8.8vw,9rem)] font-medium leading-[0.92] tracking-[-0.075em]"
            >
              You saw the
            </h2>
          </div>

          <div className="overflow-hidden py-1">
            <h2
              ref={(element) => {
                linesRef.current[1] = element;
              }}
              className="text-[clamp(2.8rem,8.8vw,9rem)] font-medium leading-[0.92] tracking-[-0.075em] text-[#C6FF00]"
            >
              interface.
            </h2>
          </div>

          <div className="mt-5 overflow-hidden py-1 sm:mt-8">
            <h2
              ref={(element) => {
                linesRef.current[2] = element;
              }}
              className="text-[clamp(2.2rem,6.5vw,6.5rem)] font-medium leading-[0.98] tracking-[-0.065em] text-white/65"
            >
              Now find what
            </h2>
          </div>

          <div className="overflow-hidden py-1">
            <h2
              ref={(element) => {
                linesRef.current[3] = element;
              }}
              className="text-[clamp(2.2rem,6.5vw,6.5rem)] font-medium leading-[0.98] tracking-[-0.065em]"
            >
              lies <span className="text-[#C6FF00]">beneath.</span>
            </h2>
          </div>
        </div>

        {/* Bottom content */}
        <div className="mt-16 flex flex-col gap-9 border-t border-white/10 pt-7 sm:mt-24 sm:pt-9 md:flex-row md:items-end md:justify-between">
          <div ref={footerTextRef} className="max-w-md">
            <p className="text-base leading-7 text-white/55 sm:text-lg">
              Every system has another layer.
              <span className="text-white">
                {" "}
                Mine has a door you haven&apos;t opened yet.
              </span>
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/35">
              <ArrowDownRight size={15} />
              <span>A little curiosity goes a long way.</span>
            </div>
          </div>

          {/* Explore Backdoor CTA */}
          <div ref={ctaRef}>
            <Link
              href="/terminal"
              className="backdoor-cta group relative inline-flex items-center gap-5 overflow-hidden border border-[#C6FF00]/50 px-5 py-4 transition-all duration-300 hover:border-[#C6FF00] hover:bg-[#C6FF00] hover:text-[#090909] sm:px-7 sm:py-5"
            >
              <span className="absolute inset-0 -translate-x-full bg-[#C6FF00] transition-transform duration-500 ease-out group-hover:translate-x-0" />

              <span className="relative z-10 flex items-center gap-3 text-sm font-medium tracking-wide">
                <Terminal size={17} />
                EXPLORE THE BACKDOOR
              </span>

              <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C6FF00] text-[#090909] transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#090909] group-hover:text-[#C6FF00]">
                <ArrowUpRight size={19} />
              </span>
            </Link>
          </div>
        </div>

        {/* Closing signature */}
        <div className="mt-24 flex flex-col justify-between gap-3 border-t border-white/[0.07] pt-5 sm:mt-32 sm:flex-row sm:items-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
            Built with logic. Finished with obsession.
          </p>

          <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
            Always learning. Always building.
          </p>
        </div>
      </div>

      <style jsx>{`
        .closing-glow {
          will-change: transform;
        }

        .backdoor-cta {
          box-shadow: 0 0 0 rgba(198, 255, 0, 0);
          animation: cta-glow 3s ease-in-out infinite;
        }

        .backdoor-cta:hover {
          animation-play-state: paused;
          box-shadow: 0 0 35px rgba(198, 255, 0, 0.15);
        }

        @keyframes cta-glow {
          0%,
          100% {
            box-shadow: 0 0 0 rgba(198, 255, 0, 0);
          }
          50% {
            box-shadow: 0 0 22px rgba(198, 255, 0, 0.07);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .backdoor-cta {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
