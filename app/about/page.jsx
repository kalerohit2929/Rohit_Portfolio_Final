
"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const technologies = [
  { name: "React.js", category: "UI DEVELOPMENT", symbol: "⚛" },
  { name: "Next.js", category: "WEB FRAMEWORK", symbol: "N" },
  { name: "JavaScript", category: "CORE LANGUAGE", symbol: "JS" },
  { name: "Tailwind CSS", category: "STYLING", symbol: "TW" },
  { name: "Node.js", category: "RUNTIME", symbol: "N" },
  { name: "Express.js", category: "BACKEND", symbol: "EX" },
  { name: "MongoDB", category: "DATABASE", symbol: "DB" },
  { name: "REST APIs", category: "INTEGRATION", symbol: "</>" },
];

const signals = [
  {
    title: "Logic",
    subtitle: "Think before building",
    symbol: "01",
    detail:
      "I break complex problems into smaller, manageable pieces and build solutions with clear structure and purpose.",
  },
  {
    title: "Design",
    subtitle: "Function meets feeling",
    symbol: "02",
    detail:
      "I care about the details that make an interface feel right: spacing, typography, responsiveness, and meaningful interactions.",
  },
  {
    title: "Curiosity",
    subtitle: "Always exploring",
    symbol: "03",
    detail:
      "I keep learning, experimenting with new approaches, and improving the way I write and deliver code.",
  },
];

const workflow = [
  {
    number: "01",
    title: "IDEA",
    description:
      "Understand the problem, identify the goal, and define what the experience should achieve.",
  },
  {
    number: "02",
    title: "ARCHITECTURE",
    description:
      "Plan the components, data flow, user journey, and technical structure before building.",
  },
  {
    number: "03",
    title: "CODE",
    description:
      "Build responsive interfaces and connect them with reliable backend logic and APIs.",
  },
  {
    number: "04",
    title: "EXPERIENCE",
    description:
      "Refine the details, test different screen sizes, and make the final product feel polished.",
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const dnaRef = useRef(null);
  const workflowRef = useRef(null);
  const toolsRef = useRef(null);
  const orbitRef = useRef(null);

  const [activeSignal, setActiveSignal] = useState(0);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      gsap.fromTo(
        headingRef.current,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.to(orbitRef.current, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      gsap.fromTo(
        dnaRef.current?.querySelectorAll(".dna-card") || [],
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: dnaRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        workflowRef.current?.querySelectorAll(".workflow-card") || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: workflowRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        toolsRef.current?.querySelectorAll(".tool-card") || [],
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: toolsRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden bg-[#090909] px-5 py-24 text-[#E5E5E5] sm:px-8 md:py-32 lg:px-12"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 -z-10 h-96 w-96 rounded-full bg-[#C6FF00]/[0.04] blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 -z-10 h-full w-full opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#A3A3A3 1px, transparent 1px), linear-gradient(90deg, #A3A3A3 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="mx-auto w-full max-w-7xl">
        {/* Section label */}
        <div className="mb-12 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#A3A3A3]">
          <span className="h-2 w-2 rounded-full bg-[#C6FF00]" />
          <span>System / 01</span>
          <span className="text-[#444]">—</span>
          <span>The builder</span>
        </div>

        {/* Main introduction */}
        <div
          ref={headingRef}
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16"
        >
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-[#C6FF00]">
              A little about how I work
            </p>

            <h2 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-5xl md:text-6xl lg:text-7xl">
              NOT JUST CODE.
              <br />
              <span className="text-[#C6FF00]">CREATION.</span>
            </h2>

            <p className="mt-8 max-w-2xl text-base leading-8 text-[#A3A3A3] sm:text-lg">
              I&apos;m a Full-Stack Developer who enjoys turning ideas into
              thoughtful digital experiences. From building responsive
              interfaces to connecting backend services, I focus on making
              every part of a product work together.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-8 text-[#A3A3A3] sm:text-lg">
              For me, good development is more than making something work.
              It&apos;s about creating something intuitive, maintainable,
              and worth using.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-[#292929] px-4 py-2 font-mono text-xs text-[#E5E5E5]">
                FRONTEND
              </span>
              <span className="rounded-full border border-[#292929] px-4 py-2 font-mono text-xs text-[#E5E5E5]">
                BACKEND
              </span>
              <span className="rounded-full border border-[#292929] px-4 py-2 font-mono text-xs text-[#E5E5E5]">
                CREATIVE THINKING
              </span>
            </div>
          </div>

          {/* Decorative monogram */}
          <div className="relative mx-auto flex aspect-square w-full max-w-[320px] items-center justify-center sm:max-w-[380px]">
            <div className="absolute inset-4 rounded-full border border-[#292929]" />

            <div
              ref={orbitRef}
              className="absolute inset-0 rounded-full border border-dashed border-[#C6FF00]/30"
            >
              <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-[#C6FF00] shadow-[0_0_20px_#C6FF00]" />
            </div>

            <div className="absolute inset-12 rounded-full border border-[#292929]" />

            <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-[#C6FF00]/30 bg-[#151515] shadow-[0_0_80px_rgba(198,255,0,0.06)] sm:h-44 sm:w-44">
              <span className="text-5xl font-semibold tracking-[-0.08em] text-[#C6FF00] sm:text-6xl">
                RK<span className="text-[#E5E5E5]">.</span>
              </span>
            </div>

            <span className="absolute left-0 top-1/4 font-mono text-[9px] tracking-[0.2em] text-[#666]">
              BUILD
            </span>

            <span className="absolute bottom-1/4 right-0 font-mono text-[9px] tracking-[0.2em] text-[#666]">
              REPEAT
            </span>

            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.25em] text-[#A3A3A3]">
              HUMAN THINKING / MACHINE LOGIC
            </span>
          </div>
        </div>

        {/* Philosophy */}
        <div className="my-24 border-y border-[#292929] py-10 sm:my-32 sm:py-14">
          <p className="max-w-5xl text-2xl font-medium leading-relaxed tracking-tight sm:text-3xl md:text-4xl">
            Built with logic.
            <span className="text-[#C6FF00]"> Finished with obsession.</span>
            <span className="text-[#666]">
              {" "}
              Every detail has a purpose. Every interaction tells a story.
            </span>
          </p>
        </div>

        {/* Developer DNA */}
        <div ref={dnaRef} className="mb-24 sm:mb-32">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-[#C6FF00]">
                // Developer DNA
              </p>

              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                What drives the build?
              </h3>
            </div>

            <p className="max-w-md text-sm leading-6 text-[#A3A3A3]">
              The principles behind the decisions I make and the products I
              create.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {signals.map((signal, index) => {
              const isActive = activeSignal === index;

              return (
                <button
                  type="button"
                  key={signal.title}
                  onClick={() => setActiveSignal(index)}
                  aria-pressed={isActive}
                  className={`dna-card group min-h-[220px] rounded-xl border p-6 text-left transition-all duration-300 sm:p-7 ${
                    isActive
                      ? "border-[#C6FF00]/70 bg-[#C6FF00]/[0.055]"
                      : "border-[#292929] bg-[#151515] hover:border-[#555]"
                  }`}
                >
                  <div className="mb-8 flex items-center justify-between">
                    <span
                      className={`font-mono text-xs ${
                        isActive ? "text-[#C6FF00]" : "text-[#666]"
                      }`}
                    >
                      / {signal.symbol}
                    </span>

                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs transition-all ${
                        isActive
                          ? "border-[#C6FF00] text-[#C6FF00]"
                          : "border-[#333] text-[#666]"
                      }`}
                    >
                      {isActive ? "↗" : "+"}
                    </span>
                  </div>

                  <h4
                    className={`text-2xl font-semibold transition-colors ${
                      isActive ? "text-[#C6FF00]" : "text-[#E5E5E5]"
                    }`}
                  >
                    {signal.title}
                  </h4>

                  <p className="mt-2 text-sm text-[#A3A3A3]">
                    {signal.subtitle}
                  </p>

                  <div
                    className={`grid transition-all duration-300 ${
                      isActive
                        ? "mt-5 grid-rows-[1fr] opacity-100"
                        : "mt-0 grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm leading-6 text-[#A3A3A3]">
                        {signal.detail}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Workflow timeline */}
        <div ref={workflowRef} className="mb-24 sm:mb-32">
          <div className="mb-10">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-[#C6FF00]">
              // From thought to product
            </p>

            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              How I bring ideas to life.
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {workflow.map((step) => (
              <div
                key={step.number}
                className="workflow-card group relative min-h-[220px] overflow-hidden rounded-xl border border-[#292929] bg-[#111111] p-6 transition-colors duration-300 hover:border-[#C6FF00]/60"
              >
                <span className="font-mono text-xs text-[#C6FF00]">
                  STEP / {step.number}
                </span>

                <h4 className="mt-10 text-lg font-semibold tracking-wide transition-colors group-hover:text-[#C6FF00]">
                  {step.title}
                </h4>

                <p className="mt-3 text-sm leading-6 text-[#A3A3A3]">
                  {step.description}
                </p>

                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C6FF00] transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Tools in my workflow */}
        <div ref={toolsRef} className="mb-24 sm:mb-32">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-[#C6FF00]">
                // My toolkit
              </p>

              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Tools in my{" "}
                <span className="text-[#C6FF00]">workflow.</span>
              </h3>

              <p className="mt-3 max-w-lg text-sm leading-6 text-[#A3A3A3]">
                The technologies I use to turn ideas into reliable,
                interactive web experiences.
              </p>
            </div>

            <span className="font-mono text-xs text-[#A3A3A3]">
              08 TOOLS / ALWAYS LEARNING
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {technologies.map((tool, index) => (
              <div
                key={tool.name}
                className="tool-card group relative min-h-[135px] overflow-hidden rounded-xl border border-[#292929] bg-[#151515] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#C6FF00]/70 hover:bg-[#1b1d13] sm:p-5"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-[#292929] bg-[#090909] px-2 font-mono text-sm font-bold text-[#C6FF00] transition-colors duration-300 group-hover:border-[#C6FF00]/50">
                    {tool.symbol}
                  </span>

                  <span className="font-mono text-xs text-[#555] transition-colors group-hover:text-[#C6FF00]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-[#E5E5E5] transition-colors duration-300 group-hover:text-[#C6FF00] sm:text-base">
                  {tool.name}
                </h4>

                <p className="mt-2 font-mono text-[9px] tracking-[0.12em] text-[#777] sm:text-[10px]">
                  {tool.category}
                </p>

                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C6FF00] transition-all duration-300 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Closing statement */}
        <div className="relative overflow-hidden rounded-2xl border border-[#292929] bg-[#111111] p-7 sm:p-10 md:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full bg-[#C6FF00]/[0.06] blur-[90px]"
          />

          <div className="relative">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[#C6FF00]">
              // Current mindset
            </p>

            <h3 className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl md:text-5xl">
              Always building.
              <br />
              Always getting better.
            </h3>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-[#A3A3A3]">
              <span className="h-2 w-2 rounded-full bg-[#C6FF00]" />
              Open to learning, collaboration, and meaningful challenges.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
