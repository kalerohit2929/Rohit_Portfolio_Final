
"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Syne } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const nameFont = Syne({
  subsets: ["latin"],
  weight: ["800"],
});

const FIRST = "ROHIT";
const LAST = "KALE";
const TOOLS = ["React", "Next.js", "Node.js", "GSAP", "MongoDB"];
const FALLBACK_MS = 9000;

const Hero = () => {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      const root = heroRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: "power3.out" },
        });

        const glow = root.querySelector(".h-glow");

        const breathe = gsap.to(glow, {
          scale: 1.04,
          opacity: 0.75,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          paused: true,
        });

        tl.from(glow, {
          opacity: 0,
          scale: 0.85,
          duration: 1.4,
        }, 0)
          .from(
            root.querySelectorAll(".h-letter"),
            {
              yPercent: 115,
              rotate: 9,
              transformOrigin: "0% 100%",
              duration: 1,
              stagger: 0.07,
              ease: "power4.out",
            },
            0.2
          )
          .from(
            root.querySelector(".h-photo"),
            {
              clipPath: "inset(100% 0% 0% 0%)",
              scale: 1.08,
              transformOrigin: "50% 100%",
              duration: 1.3,
              ease: "power4.inOut",
            },
            0.7
          )
          .from(
            root.querySelectorAll(".h-role"),
            {
              letterSpacing: "0.25em",
              opacity: 0,
              duration: 1.1,
              stagger: 0.12,
            },
            1.3
          )
          .from(
            root.querySelectorAll(".h-reveal"),
            {
              y: 24,
              opacity: 0,
              duration: 0.7,
              stagger: 0.1,
            },
            1.4
          )
          .add(() => breathe.play(), 1.6);

        let fallbackTimer;

        const start = () => {
          clearTimeout(fallbackTimer);
          window.removeEventListener("preloader:done", start);
          tl.play();
          ScrollTrigger.refresh();
        };

        if (window.__preloaderDone) {
          start();
        } else {
          window.addEventListener("preloader:done", start);
          fallbackTimer = setTimeout(start, FALLBACK_MS);
        }

        const scrollTrigger = {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        };

        gsap.to(root.querySelector(".p-name"), {
          y: -110,
          ease: "none",
          scrollTrigger: scrollTrigger,
        });

        gsap.to(root.querySelector(".p-roles"), {
          y: -60,
          ease: "none",
          scrollTrigger: scrollTrigger,
        });

        gsap.to(root.querySelector(".p-photo"), {
          y: 50,
          ease: "none",
          scrollTrigger: scrollTrigger,
        });

        return () => {
          clearTimeout(fallbackTimer);
          window.removeEventListener("preloader:done", start);
          breathe.kill();
        };
      });

      mm.add(
        "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
        () => {
          const name = root.querySelector(".p-name");
          const photo = root.querySelector(".p-photo");
          const roles = root.querySelector(".p-roles");

          const nameX = gsap.quickTo(name, "x", {
            duration: 0.9,
            ease: "power3.out",
          });

          const photoX = gsap.quickTo(photo, "x", {
            duration: 0.9,
            ease: "power3.out",
          });

          const rolesX = gsap.quickTo(roles, "x", {
            duration: 0.9,
            ease: "power3.out",
          });

          const move = (event) => {
            const rect = root.getBoundingClientRect();
            const relativeX =
              ((event.clientX - rect.left) / rect.width - 0.5) * 2;

            nameX(relativeX * -12);
            photoX(relativeX * 8);
            rolesX(relativeX * -6);
          };

          const leave = () => {
            nameX(0);
            photoX(0);
            rolesX(0);
          };

          root.addEventListener("mousemove", move);
          root.addEventListener("mouseleave", leave);

          return () => {
            root.removeEventListener("mousemove", move);
            root.removeEventListener("mouseleave", leave);
          };
        }
      );

      return () => mm.revert();
    },
    { scope: heroRef }
  );

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative isolate flex min-h-[max(100svh,720px)] w-full max-w-full flex-col overflow-x-clip overflow-y-hidden bg-[#090909] text-[#E5E5E5] md:min-h-svh"
    >
      {/* Glowing arc */}
      <div
        aria-hidden="true"
        className="h-glow pointer-events-none absolute inset-x-0 bottom-[-28%] z-0 mx-auto h-[75%] w-full max-w-[1300px] rounded-[50%] border border-[#C6FF00]/25 bg-[radial-gradient(ellipse_at_50%_20%,#C6FF0030,transparent_65%)] md:w-[95%]"
      />

      {/* Name */}
      <div className="p-name pointer-events-none absolute inset-x-0 top-[11%] z-0 flex max-w-full justify-center overflow-hidden px-2 md:top-[7%] md:px-3">
        <h1
          aria-label={`${FIRST} ${LAST}`}
          className={`${nameFont.className} flex max-w-full select-none flex-col items-center text-[clamp(48px,15vw,110px)] font-extrabold leading-[0.9] tracking-[-0.04em] text-white sm:text-[clamp(52px,16vw,110px)] md:flex-row md:gap-[0.2em] md:text-[clamp(40px,9.5vw,190px)] md:leading-none`}
        >
          {[FIRST, LAST].map((word, wordIndex) => (
            <span
              key={word}
              aria-hidden="true"
              className={`flex overflow-hidden pb-[0.08em] ${
                wordIndex === 1 ? "text-[#C6FF00]" : ""
              }`}
            >
              {word.split("").map((character, index) => (
                <span key={index} className="h-letter inline-block">
                  {character}
                </span>
              ))}
            </span>
          ))}
        </h1>
      </div>

      {/* Profile photo */}
      <div className="p-photo pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-[76%] max-w-full justify-center overflow-hidden">
        <Image
          src="/images/profile1.webp"
          alt="Rohit Kale, Full-Stack Developer"
          width={1128}
          height={1394}
          priority
          sizes="(max-width: 768px) 90vw, 55vw"
          draggable={false}
          className="h-photo h-full w-auto max-w-full object-contain object-bottom"
        />
      </div>

      {/* Photo fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-[42%] bg-gradient-to-t from-[#090909] via-[#090909]/80 to-transparent md:h-1/3 md:via-[#090909]/70"
      />

      {/* Role labels */}
      <div className="p-roles pointer-events-none absolute inset-x-0 top-[60%] z-20 flex min-w-0 max-w-full items-center justify-between gap-2 overflow-hidden px-3 text-[clamp(11px,3.2vw,20px)] font-medium tracking-[0.06em] text-white sm:px-5 sm:text-[clamp(14px,4vw,20px)] md:top-[38%] md:justify-center md:gap-[clamp(40px,18vw,300px)] md:px-0 md:text-[clamp(15px,3.4vw,56px)] md:tracking-[0.1em]">
        <span className="h-role shrink-0 text-[#C6FF00]">
          FULL-STACK
        </span>
        <span className="h-role shrink-0">DEVELOPER</span>
      </div>

      {/* Bottom content */}
      <div className="relative z-30 flex min-w-0 flex-1 flex-col px-4 pb-6 pt-5 sm:px-5 md:px-[clamp(20px,4vw,72px)] md:py-7">
        <div className="flex-1" />

        <div className="grid min-w-0 items-end gap-5 md:grid-cols-3 md:gap-6">
          <div className="w-full min-w-0 max-w-[340px] md:max-w-[300px]">
            <span className="h-reveal mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-[#262626] bg-[#141414]/80 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur md:mb-4">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C6FF00] shadow-[0_0_10px_#C6FF00aa]" />
              Open for opportunities
            </span>

            <p className="h-reveal break-words text-[13px] leading-[1.65] text-[#D4D4D4] md:text-[14px] md:leading-[1.7]">
              Hey there! I&apos;m a{" "}
              <span className="font-semibold text-white">
                full-stack developer
              </span>{" "}
              who turns ideas into{" "}
              <span className="font-semibold text-[#C6FF00]">
                fast, interactive
              </span>{" "}
              and thoughtfully designed products.
            </p>

            <a
              href="#contact"
              className="h-reveal mt-4 inline-flex rounded-full bg-[#C6FF00] px-6 py-3 text-[13px] font-bold text-[#090909] transition hover:-translate-y-0.5 hover:bg-[#dcff70] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6FF00] md:mt-5"
            >
              Let&apos;s talk
            </a>
          </div>

          <div className="hidden md:block" />

          <ul className="h-reveal flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-[#D4D4D4] sm:gap-x-5 md:justify-end md:gap-x-6 md:gap-y-2 md:text-[12px]">
            {TOOLS.map((tool) => (
              <li key={tool} className="flex items-center gap-2">
                <span className="h-1 w-1 shrink-0 rounded-full bg-[#C6FF00]" />
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;
