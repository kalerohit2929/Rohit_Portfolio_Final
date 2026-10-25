
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  {
    number: "01",
    title: "HungerBox",
    description:
      "A full-stack food delivery platform with customer and restaurant-owner dashboards, dynamic food listings, location-based filtering, and a smooth ordering experience.",
    tech: ["Next.js", "Tailwind CSS", "JWT", "MongoDB"],
    // image: "/images/projects/project1.webp",
    theme: "bg-[#C6FF00] text-[#090909]",
    link: "https://hunger-box-eta.vercel.app/",
  },
  {
    number: "02",
    title: "NexBridge Intelligence",
    description:
      "A responsive multi-section B2B intelligence website with GSAP motion and Web3Forms lead-capture email notifications.",
    tech: ["React.js", "GSAP", "Web3Forms"],
    // image: "/images/projects/project2.webp",
    theme: "bg-[#171717] text-white",
    link: "https://nexbridgeintelligence.in/",
  },
  {
    number: "03",
    title: "Virtual Assistant",
    description:
      "A MERN-stack virtual assistant application combining a React frontend, Node.js and Express services, and MongoDB data storage.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js"],
    image: null,
    theme: "bg-[#E5E5E5] text-[#090909]",
    link: "#",
  },
  {
    number: "04",
    title: "K72 Inspired Website",
    description:
      "A creative web experience exploring expressive typography, bold layouts, responsive design, and smooth interactions.",
    tech: ["React", "Tailwind CSS"],
    image: null,
    theme: "bg-[#242424] text-white",
    link: "#",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray(".project-panel", sectionRef.current);

      // Keep the last panel as the final visible panel.
      panels.pop();

      panels.forEach((panel) => {
        const inner = panel.querySelector(".project-inner");

        const getMeasurements = () => {
          const contentHeight = inner.scrollHeight;
          const viewportHeight = window.innerHeight;
          return {
            contentHeight,
            viewportHeight,
            difference: Math.max(0, contentHeight - viewportHeight),
          };
        };

        const initial = getMeasurements();

        // Extra space gives long content time to scroll before the next panel.
        if (initial.difference > 0) {
          panel.style.marginBottom = `${initial.difference}px`;
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "bottom bottom",
            end: () => {
              const { difference } = getMeasurements();
              return difference > 0
                ? `+=${inner.scrollHeight}`
                : "bottom top";
            },
            pin: true,
            pinSpacing: false,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        if (initial.difference > 0) {
          timeline.to(inner, {
            y: () => -getMeasurements().difference,
            ease: "none",
            duration: 1,
          });
        }

        timeline
          .to(
            panel,
            {
              scale: 0.88,
              opacity: 0.55,
              ease: "none",
              duration: 0.9,
            },
            initial.difference > 0 ? ">": 0
          )
          .to(panel, {
            opacity: 0,
            ease: "none",
            duration: 0.1,
          });
      });
    },
    { scope: sectionRef, revertOnUpdate: true }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-clip bg-[#090909] px-3 pb-8 pt-20 text-[#E5E5E5] sm:px-5 md:pt-24"
    >
      {/* Intro heading */}
      <div className="mx-auto mb-10 max-w-7xl px-2 md:mb-14">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#C6FF00]">
          04 / Selected Work
        </p>

        <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
          Made with
          <br />
          <span className="text-[#C6FF00]">intention.</span>
        </h1>

        <p className="mt-6 max-w-lg text-sm leading-7 text-neutral-400 sm:text-base">
          A few things I&apos;ve built, problems I&apos;ve solved, and ideas
          I&apos;ve brought to life.
        </p>
      </div>

      {/* Stacked project panels */}
      <div className="project-list mx-auto max-w-7xl">
        {projects.map((project, index) => (
          <article
            key={project.number}
            className={`project-panel relative mb-4 h-[calc(100svh-5rem)] overflow-hidden rounded-2xl sm:h-[calc(100svh-6rem)] ${project.theme}`}
          >
            <div className="project-inner flex h-full flex-col overflow-hidden">
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 pb-4 pt-5 sm:px-8 sm:pt-8">
                <span className="text-xs font-bold uppercase tracking-[0.25em] opacity-70">
                  Project / {project.number}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest opacity-60">
                  0{index + 1} — 0{projects.length}
                </span>
              </div>

              {/* Main content */}
              <div className="grid flex-1 grid-cols-1 content-start items-center gap-6 px-5 pb-8 sm:px-8 md:grid-cols-2 md:gap-10">
                <div className="order-2 flex flex-col items-start md:order-1">
                  <h3 className="max-w-2xl text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl lg:text-7xl">
                    {project.title}
                  </h3>

                  <p className="mt-5 max-w-md text-sm leading-7 opacity-75 sm:text-base">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-current/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider sm:text-xs"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  {project.link && project.link !== "#" ? (
                    <Link
                      href={project.link}
                      target={project.link.startsWith("http") ? "_blank" : undefined}
                      rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="mt-8 inline-flex items-center gap-3 border-b border-current pb-2 text-sm font-bold transition-all duration-300 hover:gap-5"
                    >
                      View project <span aria-hidden="true">↗</span>
                    </Link>
                  ) : (
                    <span className="mt-8 inline-flex cursor-not-allowed items-center gap-3 border-b border-current/30 pb-2 text-sm font-bold opacity-45" aria-label="Project link not yet available">
                      Case study coming soon
                    </span>
                  )}
                </div>

                {/* Project image */}
                <div className="order-1 relative h-[30vh] min-h-44 overflow-hidden rounded-xl bg-black/10 sm:h-[36vh] md:order-2 md:h-[55vh]">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 767px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(198,255,0,0.12),transparent_55%)] p-6">
                      <span className="text-center text-4xl font-black uppercase tracking-[-0.06em] text-white/80 sm:text-6xl">{project.title}</span>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>

              {/* Bottom label */}
              <div className="flex items-center justify-between px-5 pb-5 sm:px-8 sm:pb-8">
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] opacity-60">
                  Design / Development
                </span>
                <span className="text-lg font-light" aria-hidden="true">
                  ↗
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-2 py-8 text-[10px] uppercase tracking-[0.25em] text-neutral-500">
        <span>End of selected work</span>
        <span className="text-[#C6FF00]">Keep creating. ↓</span>
      </div>
    </section>
  );
}
