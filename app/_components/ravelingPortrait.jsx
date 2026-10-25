
"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, MotionPathPlugin, ScrollTrigger);

export default function TravelingPortrait() {
  const rootRef = useRef(null);
  const portraitRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const portrait = portraitRef.current;
      const page = document.querySelector("#portfolio-content");

      if (!root || !portrait || !page) return;

      const path = root.querySelector("#portrait-motion-path");

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
        },
        (context) => {
          const { desktop } = context.conditions;

          // Keep the same portrait element throughout the journey.
          gsap.set(portrait, {
            xPercent: -50,
            yPercent: -50,
            transformOrigin: "center center",
          });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: page,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline.to(portrait, {
            motionPath: {
              path,
              align: path,
              alignOrigin: [0.5, 0.5],
              autoRotate: false,
              start: 0,
              end: 1,
            },
            scale: desktop ? 0.42 : 0.3,
            ease: "none",
          });

          return () => timeline.kill();
        }
      );

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
    >
      {/* The SVG provides the portrait's travel path. */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          id="portrait-motion-path"
          d="M 82 28 C 95 34, 18 47, 24 59 S 83 73, 87 91"
          fill="none"
          stroke="none"
        />
      </svg>

      <div
        ref={portraitRef}
        className="absolute left-0 top-0 h-40 w-32 sm:h-56 sm:w-44"
      >
        <Image
          src="/images/profile.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 767px) 128px, 176px"
          className="object-contain drop-shadow-[0_0_24px_rgba(198,255,0,0.12)]"
        />
      </div>
    </div>
  );
}
