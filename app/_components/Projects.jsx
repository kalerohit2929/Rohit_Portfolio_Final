
"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code2,
} from "lucide-react";

gsap.registerPlugin(useGSAP, Observer, ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "HungerBox",
    category: "Food Delivery Platform",
    description:
      "A full-stack food delivery platform featuring responsive customer and restaurant-owner dashboards, dynamic food listings, location-based filtering, and a smooth ordering experience.",
    stack: ["Next.js", "Tailwind CSS", "JWT", "MongoDB"],
    type: "food",
    accent: "#C6FF00",
    link: "#",
    label: "FULL-STACK DEVELOPMENT",
  },
  {
    number: "02",
    title: "NexBridge Intelligence",
    category: "B2B Intelligence Website",
    description:
      "A responsive multi-section website for a B2B intelligence firm serving India, APAC, and the Middle East, enhanced with GSAP animations and Web3Forms lead capture.",
    stack: ["React.js", "GSAP", "Web3Forms"],
    type: "nexbridge",
    accent: "#B7FF00",
    link: "#",
    label: "WEB DESIGN & DEVELOPMENT",
  },
  {
    number: "03",
    title: "Virtual Assistant",
    category: "MERN Stack Application",
    description:
      "A virtual assistant application built around the MERN stack, bringing together a React frontend, a Node.js and Express backend, and MongoDB data storage.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js"],
    type: "assistant",
    accent: "#C6FF00",
    link: "#",
    label: "MERN STACK DEVELOPMENT",
  },
  {
    number: "04",
    title: "K72 Inspired Website",
    category: "Creative Web Experience",
    description:
      "A creative website inspired by K72, exploring expressive typography, bold visual layouts, responsive design, and a distinctive digital experience.",
    stack: ["React.js", "Tailwind CSS"],
    type: "k72",
    accent: "#D5FF83",
    link: "#",
    label: "CREATIVE FRONTEND",
  },
];

function ProjectPreview({ type, accent }) {
  return (
    <div className={`project-preview preview-${type}`}>
      <div className="preview-topbar">
        <span className="preview-brand">
          <span style={{ background: accent }} />

          {type === "food"
            ? "hungerbox"
            : type === "nexbridge"
              ? "NEXBRIDGE"
              : type === "assistant"
                ? "VIRTUAL.AI"
                : "K72 / CREATIVE"}
        </span>

        <span className="preview-menu">
          <i />
          <i />
          <i />
        </span>
      </div>

      {/* HungerBox preview */}
      {type === "food" && (
        <div className="food-layout">
          <div className="preview-sidebar">
            <span className="sidebar-active" />
            <span />
            <span />
            <span />
          </div>

          <div className="food-content">
            <div className="preview-kicker">
              GOOD FOOD. GOOD MOOD.
            </div>

            <div className="food-headline">
              Find your
              <br />
              <span style={{ color: accent }}>next meal.</span>
            </div>

            <div className="preview-search">
              ⌕ &nbsp; Search dishes...
            </div>

            <div className="food-cards">
              {["#D9E6C5", "#E6D7C4", "#D7DBE7"].map(
                (color) => (
                  <div className="food-card" key={color}>
                    <div
                      className="food-card-image"
                      style={{ background: color }}
                    />
                    <span />
                    <i />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* NexBridge Intelligence preview */}
      {type === "nexbridge" && (
        <div className="dashboard-layout">
          <div className="dashboard-heading">
            <div>
              <span className="preview-kicker">
                INTELLIGENCE / INSIGHTS
              </span>

              <h3>
                Think
                <br />
                <span style={{ color: accent }}>beyond.</span>
              </h3>
            </div>

            <div className="dashboard-avatar">N</div>
          </div>

          <div className="dashboard-stats">
            {[
              ["Research", "01"],
              ["Strategy", "02"],
              ["Insights", "03"],
            ].map(([label, value]) => (
              <div className="dashboard-stat" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>

          <div className="dashboard-chart">
            <div className="chart-label">
              CONNECTING IDEAS / CREATING IMPACT
            </div>

            <div className="chart-bars">
              {[32, 47, 39, 64, 49, 73, 56, 84, 61, 94, 70, 100].map(
                (height, index) => (
                  <span
                    key={index}
                    style={{
                      height: `${height}%`,
                      background: index === 9 ? accent : "#343434",
                    }}
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Virtual Assistant preview */}
      {type === "assistant" && (
        <div className="portfolio-layout">
          <span className="preview-kicker">
            YOUR DIGITAL ASSISTANT
          </span>

          <h3>
            Work
            <br />
            smarter.
            <br />
            <span style={{ color: accent }}>Stay focused.</span>
          </h3>

          <div className="portfolio-bottom">
            <span>ASSIST · AUTOMATE · SIMPLIFY</span>
            <ArrowDownRight size={24} />
          </div>

          <div className="portfolio-ring" />
        </div>
      )}

      {/* K72 Inspired Website preview */}
      {type === "k72" && (
        <div className="commerce-layout">
          <div className="commerce-copy">
            <span className="preview-kicker">
              CREATIVE STUDIO / DIGITAL
            </span>

            <h3>
              Ideas
              <br />
              <span style={{ color: accent }}>without</span>
              <br />
              limits.
            </h3>

            <span className="commerce-button">
              EXPLORE THE UNEXPECTED ↗
            </span>
          </div>

          <div className="commerce-product">
            <div
              className="product-orb"
              style={{ background: accent }}
            />
            <div className="product-base" />
          </div>
        </div>
      )}

      <div className="preview-footer">
        <span>SELECTED WORKS</span>
        <span>2025 — 2026</span>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const currentIndex = useRef(0);
  const isAnimating = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;

      if (!section || !track) return;

      const cards = gsap.utils.toArray(".project-panel", track);

      if (!cards.length) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const duration = reducedMotion ? 0.01 : 0.8;

      const updateIndex = (index) => {
        currentIndex.current = index;
        setActiveIndex(index);
      };

      const moveTo = (requestedIndex) => {
        if (isAnimating.current) return;

        const nextIndex = Math.max(
          0,
          Math.min(requestedIndex, cards.length - 1)
        );

        if (nextIndex === currentIndex.current) return;

        isAnimating.current = true;
        updateIndex(nextIndex);

        gsap.to(track, {
          x: -cards[nextIndex].offsetLeft,
          duration,
          ease: "power3.inOut",
          overwrite: true,
          onComplete: () => {
            isAnimating.current = false;
          },
          onInterrupt: () => {
            isAnimating.current = false;
          },
        });

        cards.forEach((card, index) => {
          const preview = card.querySelector(".project-preview");
          const title = card.querySelector(".project-title");

          if (preview) {
            gsap.to(preview, {
              scale: index === nextIndex ? 1 : 0.96,
              duration: reducedMotion ? 0.01 : 0.7,
              ease: "power2.out",
              overwrite: true,
            });
          }

          if (title && index === nextIndex) {
            gsap.fromTo(
              title,
              { y: reducedMotion ? 0 : 18, autoAlpha: 0.65 },
              {
                y: 0,
                autoAlpha: 1,
                duration: reducedMotion ? 0.01 : 0.55,
                ease: "power2.out",
                overwrite: true,
              }
            );
          }
        });
      };

      const resizeObserver = new ResizeObserver(() => {
        gsap.set(track, {
          x: -cards[currentIndex.current].offsetLeft,
        });
      });

      resizeObserver.observe(section);

      cards.forEach((card, index) => {
        const preview = card.querySelector(".project-preview");

        if (preview) {
          gsap.set(preview, {
            scale: index === 0 ? 1 : 0.96,
          });
        }
      });

      gsap.set(track, {
        x: -cards[0].offsetLeft,
      });

      const observer = Observer.create({
        target: window,
        type: "wheel,touch",
        preventDefault: false,
        allowClicks: true,
        tolerance: 35,

        onDown: (self) => {
          if (self.event?.type !== "wheel") return;
          if (currentIndex.current >= cards.length - 1) return;

          if (self.event.cancelable) {
            self.event.preventDefault();
          }

          moveTo(currentIndex.current + 1);
        },

        onUp: (self) => {
          if (self.event?.type !== "wheel") return;
          if (currentIndex.current <= 0) return;

          if (self.event.cancelable) {
            self.event.preventDefault();
          }

          moveTo(currentIndex.current - 1);
        },

        onLeft: () => {
          if (currentIndex.current < cards.length - 1) {
            moveTo(currentIndex.current + 1);
          }
        },

        onRight: () => {
          if (currentIndex.current > 0) {
            moveTo(currentIndex.current - 1);
          }
        },
      });

      observer.disable();

      const visibilityTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        end: "bottom 25%",
        onEnter: () => observer.enable(),
        onEnterBack: () => observer.enable(),
        onLeave: () => observer.disable(),
        onLeaveBack: () => observer.disable(),
      });

      const enableObserver = () => {
        if (visibilityTrigger.isActive) observer.enable();
      };

      section.addEventListener("pointerenter", enableObserver);

      return () => {
        observer.kill();
        resizeObserver.disconnect();
        visibilityTrigger.kill();
        section.removeEventListener("pointerenter", enableObserver);
      };
    },
    { scope: sectionRef }
  );

  const goTo = (index) => {
    const track = trackRef.current;

    if (!track || isAnimating.current) return;

    const cards = track.querySelectorAll(".project-panel");

    if (!cards.length) return;

    const nextIndex = Math.max(
      0,
      Math.min(index, cards.length - 1)
    );

    if (nextIndex === currentIndex.current) return;

    currentIndex.current = nextIndex;
    setActiveIndex(nextIndex);
    isAnimating.current = true;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    gsap.to(track, {
      x: -cards[nextIndex].offsetLeft,
      duration: reducedMotion ? 0.01 : 0.8,
      ease: "power3.inOut",
      overwrite: true,
      onComplete: () => {
        isAnimating.current = false;
      },
      onInterrupt: () => {
        isAnimating.current = false;
      },
    });

    cards.forEach((card, index) => {
      const preview = card.querySelector(".project-preview");

      if (preview) {
        gsap.to(preview, {
          scale: index === nextIndex ? 1 : 0.96,
          duration: reducedMotion ? 0.01 : 0.6,
          overwrite: true,
        });
      }
    });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="projects-section"
      aria-label="Selected projects"
    >
      <div className="projects-heading">
        <div>
          <p className="projects-eyebrow">
            <span /> SELECTED WORK / 2025—2026
          </p>

          <h2>
            BUILT WITH
            <br />
            <span>INTENTION.</span>
          </h2>
        </div>

        <p className="projects-intro">
          Four projects. Different challenges. One approach:
          thoughtful design, purposeful motion, and functional code.
        </p>
      </div>

      <div className="projects-toolbar">
        <span>
          <Code2 size={15} /> DEVELOPMENT / DESIGN
        </span>

        <span className="projects-instruction">
          SCROLL OR SWIPE <span>↔</span>
        </span>
      </div>

      <div className="projects-window">
        <div className="projects-track" ref={trackRef}>
          {projects.map((project) => (
            <article
              className="project-panel"
              key={project.number}
            >
              <div className="project-card">
                <div className="project-card-top">
                  <span className="project-number">
                    ({project.number})
                  </span>

                  <span className="project-label">
                    {project.label}
                  </span>
                </div>

                <ProjectPreview
                  type={project.type}
                  accent={project.accent}
                />

                <div className="project-info">
                  <div className="project-title-group">
                    <p>{project.category}</p>

                    <h3 className="project-title">
                      {project.title}
                    </h3>
                  </div>

                  <a
                    href={project.link}
                    className="project-open"
                    aria-label={`Open ${project.title} project`}
                    onClick={(event) => {
                      if (project.link === "#") {
                        event.preventDefault();
                      }
                    }}
                  >
                    <ArrowUpRight size={23} />
                  </a>
                </div>

                <p className="project-description">
                  {project.description}
                </p>

                <div className="project-stack">
                  {project.stack.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="projects-bottom">
        <div
          className="projects-progress"
          aria-label="Project navigation"
        >
          {projects.map((project, index) => (
            <button
              key={project.number}
              type="button"
              className={`project-dot ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => goTo(index)}
              aria-label={`Go to project ${project.number}: ${project.title}`}
              aria-current={
                activeIndex === index ? "step" : undefined
              }
            >
              <span>{project.number}</span>
              <i />
            </button>
          ))}
        </div>

        <div className="projects-arrows">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous project"
          >
            <ArrowLeft size={18} />
          </button>

          <span>
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>

          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === projects.length - 1}
            aria-label="Next project"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
