"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const steps = [
  { word: "THINK", caption: "Every detail starts with an idea." },
  { word: "BUILD", caption: "Logic gives ideas their shape." },
  { word: "REVEAL", caption: "Now, experience the difference." },
];

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>_";

// Tell the rest of the page (the Hero) that the preloader is leaving
function signalPreloaderDone() {
  if (typeof window === "undefined" || window.__preloaderDone) return;
  window.__preloaderDone = true;
  window.dispatchEvent(new Event("preloader:done"));
}

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  const overlayRef = useRef(null);
  const scrambleRef = useRef(null);
  const wordRefs = useRef([]);
  const captionRef = useRef(null);
  const progressRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  useGSAP(
    () => {
      if (!visible) return;

      const overlay = overlayRef.current;
      const scrambleElement = scrambleRef.current;
      const words = wordRefs.current;
      const caption = captionRef.current;
      const progress = progressRef.current;
      const counter = counterRef.current;

      if (!overlay || !scrambleElement || words.some((word) => !word)) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) {
        // Hero doesn't animate for reduced motion, but signal anyway so nothing waits on us
        signalPreloaderDone();
        setVisible(false);
        return;
      }

      // Hide every real word before the animation starts.
      gsap.set(words, {
        autoAlpha: 0,
        y: 24,
        filter: "blur(8px)",
      });

      // Only the scramble placeholder is visible initially.
      gsap.set(scrambleElement, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
      });

      gsap.set(caption, {
        autoAlpha: 0,
        y: 10,
      });

      gsap.set(progress, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(counter, { textContent: "00" });

      const scrambleState = { progress: 0 };

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => setVisible(false),
      });

      // STEP 1 — SCRAMBLE, THEN REVEAL THINK
      timeline.to(scrambleState, {
        progress: 1,
        duration: 1.25,
        ease: "none",
        onUpdate: () => {
          const resolvedCount = Math.floor(
            scrambleState.progress * steps[0].word.length
          );

          const scrambled = steps[0].word
            .split("")
            .map((character, index) => {
              if (index < resolvedCount) return character;

              return CHARACTERS[
                Math.floor(Math.random() * CHARACTERS.length)
              ];
            })
            .join("");

          scrambleElement.textContent = scrambled;
        },
      });

      timeline
        .set(scrambleElement, { autoAlpha: 0 })
        .fromTo(
          words[0],
          {
            autoAlpha: 0,
            y: 20,
            filter: "blur(8px)",
          },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.35,
          }
        )
        .to(caption, {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
        })
        .to(progress, {
          scaleX: 0.33,
          duration: 0.4,
          ease: "power2.inOut",
        }, "<")
        .to(counter, {
          textContent: "33",
          duration: 0.4,
          snap: { textContent: 1 },
        }, "<");

      // STEP 2 — BUILD
      timeline
        .to({}, { duration: 0.15 })
        .to(words[0], {
          autoAlpha: 0,
          y: -24,
          filter: "blur(6px)",
          duration: 0.25,
        })
        .to(caption, {
          autoAlpha: 0,
          y: -8,
          duration: 0.15,
        }, "<")
        .set(words[1], {
          autoAlpha: 1,
          y: 24,
          filter: "blur(8px)",
        })
        .to(words[1], {
          y: 0,
          filter: "blur(0px)",
          duration: 0.4,
        })
        .to(caption, {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
        }, "<")
        .to(progress, {
          scaleX: 0.68,
          duration: 0.4,
          ease: "power2.inOut",
        }, "<")
        .to(counter, {
          textContent: "68",
          duration: 0.4,
          snap: { textContent: 1 },
        }, "<");

      // STEP 3 — REVEAL
      timeline
        .to({}, { duration: 0.15 })
        .to(words[1], {
          autoAlpha: 0,
          y: -24,
          filter: "blur(6px)",
          duration: 0.25,
        })
        .to(caption, {
          autoAlpha: 0,
          y: -8,
          duration: 0.15,
        }, "<")
        .set(words[2], {
          autoAlpha: 1,
          y: 24,
          filter: "blur(8px)",
        })
        .to(words[2], {
          y: 0,
          filter: "blur(0px)",
          duration: 0.4,
        })
        .to(caption, {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
        }, "<")
        .to(progress, {
          scaleX: 1,
          duration: 0.4,
          ease: "power2.inOut",
        }, "<")
        .to(counter, {
          textContent: "100",
          duration: 0.4,
          snap: { textContent: 1 },
        }, "<");

      // STEP 4 — EXIT THE SCREEN
      // The hero intro starts as the curtain begins to lift, not after it's gone.
      timeline
        .to({}, { duration: 0.2 })
        .add(signalPreloaderDone)
        .to(
          overlay,
          {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
          },
          "<+0.25"
        );
    },
    { scope: overlayRef, dependencies: [visible] }
  );

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-label="Loading portfolio experience"
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#090909] px-6 text-[#E5E5E5]"
    >
      {/* Ambient acid-lime glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[100px]"
        style={{ background: "#B7FF00" }}
      />

      <div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between gap-4 sm:mb-16">
          <span className="text-[10px] uppercase tracking-[0.28em] text-white/45 sm:text-xs">
            Independent developer
          </span>

          <span className="text-[10px] uppercase tracking-[0.22em] text-[#B7FF00] sm:text-xs">
            Portfolio / 2026
          </span>
        </div>

        {/* Scramble and main words share the same position */}
        <div className="relative flex min-h-[110px] items-center sm:min-h-[180px]">
          <h1
            ref={scrambleRef}
            aria-hidden="true"
            className="absolute left-0 text-[clamp(3.5rem,13vw,10rem)] font-semibold leading-[0.85] tracking-[-0.09em] text-[#E5E5E5]"
          >
            T8&lt;N_
          </h1>

          {steps.map((step, index) => (
            <h1
              key={step.word}
              ref={(element) => {
                wordRefs.current[index] = element;
              }}
              aria-hidden="true"
              className="absolute left-0 text-[clamp(3.5rem,13vw,10rem)] font-semibold leading-[0.85] tracking-[-0.09em]"
            >
              {step.word}
              <span className="text-[#B7FF00]">.</span>
            </h1>
          ))}
        </div>

        {/* Meaningful supporting message */}
        <p
          ref={captionRef}
          aria-live="off"
          className="mt-5 min-h-6 text-xs tracking-wide text-white/50 sm:text-sm"
        >
          Every detail starts with an idea.
        </p>

        {/* Progress bar */}
        <div className="mt-14 h-px w-full overflow-hidden bg-white/10 sm:mt-20">
          <div
            ref={progressRef}
            className="h-full w-full bg-[#B7FF00]"
          />
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.22em] text-white/30 sm:text-[10px]">
            Designed with intention
          </span>

          <span className="font-mono text-xs tabular-nums text-[#B7FF00]">
            <span ref={counterRef}>00</span>
            <span className="text-white/35"> %</span>
          </span>
        </div>
      </div>
    </div>
  );
}