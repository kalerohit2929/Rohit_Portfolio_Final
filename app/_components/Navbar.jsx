"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, Menu, X, MoveUpRight } from "lucide-react";
import gsap from "gsap";

const navLinks = [
  { number: "01", label: "Home", href: "#home", detail: "Back to the beginning" },
  { number: "02", label: "About", href: "/about", detail: "A little about me" },
  { number: "03", label: "Skills", href: "/skills", detail: "Things I work with" },
  { number: "04", label: "Projects", href: "/projects", detail: "Selected work" },
  { number: "05", label: "Contact", href: "/contact", detail: "Let's build something" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  const overlayRef = useRef(null);
  const linksRef = useRef([]);
  const eyebrowRef = useRef(null);
  const footerRef = useRef(null);
  const timelineRef = useRef(null);

  const router = useRouter();
  const pathname = usePathname();

  // Set initial positions for the menu.
  useEffect(() => {
    const panel = panelRef.current;
    const overlay = overlayRef.current;

    if (!panel || !overlay) return;

    gsap.set(panel, { xPercent: 100 });
    gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });

    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  // Animate the menu open and closed.
  useEffect(() => {
    const panel = panelRef.current;
    const overlay = overlayRef.current;

    if (!panel || !overlay) return;

    timelineRef.current?.kill();

    if (isOpen) {
      timelineRef.current = gsap.timeline();

      timelineRef.current
        .set(overlay, { pointerEvents: "auto" })
        .to(
          overlay,
          {
            autoAlpha: 1,
            duration: 0.35,
            ease: "power2.out",
          },
          0
        )
        .to(
          panel,
          {
            xPercent: 0,
            duration: 0.9,
            ease: "power4.inOut",
          },
          0
        )
        .fromTo(
          eyebrowRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
          },
          0.48
        )
        .fromTo(
          linksRef.current.filter(Boolean),
          { y: 70, opacity: 0, rotateX: -12 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.65,
            stagger: 0.09,
            ease: "power4.out",
          },
          0.38
        )
        .fromTo(
          footerRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
          },
          0.85
        );
    } else {
      timelineRef.current = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, {
            autoAlpha: 0,
            pointerEvents: "none",
          });
        },
      });

      timelineRef.current
        .to(
          linksRef.current.filter(Boolean),
          {
            y: -15,
            opacity: 0,
            duration: 0.2,
            stagger: 0.025,
            ease: "power2.in",
          },
          0
        )
        .to(
          panel,
          {
            xPercent: 100,
            duration: 0.7,
            ease: "power4.inOut",
          },
          0.08
        )
        .to(
          overlay,
          {
            autoAlpha: 0,
            duration: 0.4,
            ease: "power2.in",
          },
          0.22
        );
    }

    return () => {
      timelineRef.current?.kill();
    };
  }, [isOpen]);

  // Close the menu with Escape.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scrolling while the menu is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  // Scroll to homepage sections without a full browser reload.
  const handleNavClick = (event, href) => {
    setIsOpen(false);

    if (href.startsWith("#")) {
      event.preventDefault();

      if (pathname !== "/") {
        // Navigate to the homepage with the section hash.
        router.push(`/${href}`);
        return;
      }

      const target = document.querySelector(href);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else if (href === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      return;
    }

    // Use Next.js client-side navigation for separate pages.
    event.preventDefault();
    router.push(href);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav
        className="relative z-[70] flex w-full items-center justify-between bg-[#090909] px-[5%] py-5"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(event) => handleNavClick(event, "#home")}
          aria-label="Go to homepage"
          className="text-xl font-black tracking-tight text-[#E5E5E5]"
        >
        <span className="text-[#C6FF00]">rk<span className="text-[#E5E5E5]">_.</span>dev</span>
        </a>

        {/* Hamburger menu button */}
        <button
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="portfolio-menu"
          className="flex h-12 w-12 items-center justify-center rounded-full text-[#E5E5E5] transition-colors duration-300 hover:text-[#C6FF00]"
        >
          <span className="relative flex h-7 w-7 items-center justify-center">
            <Menu
              size={28}
              strokeWidth={1.8}
              className={`absolute transition-all duration-300 ${isOpen
                  ? "rotate-90 scale-0 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
                }`}
            />
            <X
              size={27}
              strokeWidth={1.8}
              className={`absolute transition-all duration-300 ${isOpen
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-0 opacity-0"
                }`}
            />
          </span>
        </button>
      </nav>

      {/* Background overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
        aria-hidden="true"
        onClick={closeMenu}
      />

      {/* Full-screen sliding panel */}
      <aside
        ref={panelRef}
        id="portfolio-menu"
        aria-label="Portfolio menu"
        aria-hidden={!isOpen}
        className="fixed inset-0 z-[90] flex h-[100dvh] w-full flex-col overflow-y-auto bg-[#090909] text-[#E5E5E5]"
      >
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-[#C6FF00]/[0.07] blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#C6FF00]/[0.04] blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:60px_60px]" />
          <span className="absolute bottom-8 right-[-1rem] select-none text-[30vw] font-black leading-none text-white/[0.025] sm:text-[24vw]">
            DEV
          </span>
        </div>

        {/* Panel header */}
        <div className="relative flex items-center justify-between border-b border-white/10 px-[5%] py-5">
          <a
            href="#home"
            onClick={(event) => handleNavClick(event, "#home")}
            className="text-xl font-black tracking-tight"
          >
            DEV<span className="text-[#C6FF00]">+</span>
          </a>

          <div className="flex items-center gap-4">
            <span className="hidden text-[10px] uppercase tracking-[0.2em] text-white/40 sm:block">
              Navigation / 01—05
            </span>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close navigation"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-all duration-300 hover:rotate-90 hover:border-[#C6FF00] hover:bg-[#C6FF00] hover:text-black"
            >
              <X size={21} />
            </button>
          </div>
        </div>

        {/* Navigation links */}
        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-[7%] py-12 sm:px-[10%]">
          <p
            ref={eyebrowRef}
            className="mb-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/45 sm:text-xs"
          >
            <span className="h-px w-8 bg-[#C6FF00]" />
            Where would you like to go?
          </p>

          <div className="flex flex-col">
            {navLinks.map((link, index) => (
              <a
                key={link.number}
                ref={(element) => {
                  linksRef.current[index] = element;
                }}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                tabIndex={isOpen ? 0 : -1}
                className="group relative flex items-center justify-between gap-4 border-b border-white/10 py-4 sm:py-5"
              >
                <div className="flex min-w-0 items-center gap-4 sm:gap-8">
                  <span className="w-5 shrink-0 pt-2 text-[10px] tracking-widest text-[#C6FF00]/70 sm:w-8 sm:text-xs">
                    {link.number}
                  </span>

                  <div className="min-w-0">
                    <span className="block origin-left text-3xl font-semibold tracking-tight transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#C6FF00] sm:text-5xl md:text-6xl lg:text-7xl">
                      {link.label}
                    </span>
                    <span className="mt-1 block text-[10px] tracking-wide text-white/35 transition-colors duration-300 group-hover:text-white/65 sm:text-xs">
                      {link.detail}
                    </span>
                  </div>
                </div>

                <MoveUpRight
                  size={23}
                  className="shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#C6FF00] sm:h-7 sm:w-7"
                />

                <span className="absolute bottom-[-1px] left-0 h-px w-0 bg-[#C6FF00] transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Panel footer */}
          <div
            ref={footerRef}
            className="mt-8 flex flex-col justify-between gap-4 sm:mt-10 sm:flex-row sm:items-end"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/35">
                Have something in mind?
              </p>
              <a
                href="#contact"
                onClick={(event) => handleNavClick(event, "#contact")}
                tabIndex={isOpen ? 0 : -1}
                className="mt-2 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#C6FF00] sm:text-base"
              >
                Let's make it happen
                <ArrowUpRight size={17} className="text-[#C6FF00]" />
              </a>
            </div>

            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
              Designed with intention.
            </p>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="relative h-[3px] w-full bg-white/5">
          <div className="h-full w-1/3 bg-[#C6FF00]" />
        </div>
      </aside>
    </>
  );
}
