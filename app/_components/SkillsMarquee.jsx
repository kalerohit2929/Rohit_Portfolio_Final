
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const skills = [
  "REACT.JS",
  "NEXT.JS",
  "JAVASCRIPT",
  "TAILWIND CSS",
  "NODE.JS",
  "EXPRESS.JS",
  "MONGODB",
  "REST APIs",
  "GIT & GITHUB",
];

export default function SkillsMarquee() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const tween = gsap.to(track, {
        xPercent: -50,
        duration: 24,
        ease: "none",
        repeat: -1,
      });

      tweenRef.current = tween;

      return () => {
        tween.kill();
        tweenRef.current = null;
      };
    },
    { scope: sectionRef }
  );

  const handleEnter = () => {
    tweenRef.current?.timeScale(0.35);
  };

  const handleLeave = () => {
    tweenRef.current?.timeScale(1);
  };

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden border-y border-[#292929] bg-[#090909] py-10 sm:py-14"
    >
      <div className="mb-6 flex items-center justify-between px-6 sm:px-12">
        <p className="font-mono text-[10px] tracking-[0.2em] text-neutral-500 sm:text-xs">
          THE TOOLS BEHIND THE THINKING
        </p>
        <span className="font-mono text-[10px] text-[#C6FF00]">
          SKILLS / 001—009
        </span>
      </div>

      <div
        className="group overflow-hidden"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <div
          ref={trackRef}
          className="flex w-max items-center"
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center"
              aria-hidden={copy === 1}
            >
              {skills.map((skill, index) => (
                <span
                  key={`${copy}-${skill}`}
                  className="skill-marquee-item group/skill mx-4 flex cursor-pointer items-center gap-5 whitespace-nowrap text-4xl font-black tracking-[-0.06em] text-neutral-600 transition-colors duration-300 hover:text-[#C6FF00] sm:mx-7 sm:text-6xl lg:text-7xl"
                >
                  <span className="transition-transform duration-300 group-hover/skill:scale-110">
                    {skill}
                  </span>
                  <span className="text-xl text-[#C6FF00] sm:text-3xl">
                    ✳
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-end px-6 sm:px-12">
        <p className="text-xs text-neutral-600">
          BUILT WITH LOGIC. FINISHED WITH OBSESSION.
        </p>
      </div>
    </section>
  );
}
