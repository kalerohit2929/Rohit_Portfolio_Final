
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";
import { ArrowUpRight, Plus } from "lucide-react";

const pages = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
];

export default function Footer() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || "";
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || "";

  const [year, setYear] = useState("2026");

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  const socials = [
    {
      label: "GitHub",
      href: githubUrl,
      icon: FaGithub,
    },
    {
      label: "Email",
      href: email ? `mailto:${email}` : "",
      icon: FaEnvelope,
    },
    {
      label: "LinkedIn",
      href: linkedinUrl,
      icon: FaLinkedinIn,
    },
  ];

  return (
    <footer
      id="footer"
      className="m-0 w-full bg-[#090909] p-0 text-white"
    >
      <div className="relative w-full overflow-hidden border-t border-[#C6FF00]/40 bg-[#090909] px-5 pb-4 pt-5 sm:px-8 md:px-12 lg:px-16">
        {/* Decorative symbols */}
        <div className="mb-7 flex items-center justify-between text-[#C6FF00]">
          {[1, 2, 3, 4].map((item) => (
            <Plus key={item} size={14} strokeWidth={1} />
          ))}
        </div>

        {/* Footer information */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
          {/* Intro */}
          <div className="col-span-2 sm:col-span-1">
            <p className="max-w-52 text-xs leading-relaxed text-neutral-400">
              <span className="mr-1 text-[#C6FF00]">✳</span>
              Full-Stack Developer crafting clean, responsive, and meaningful
              digital experiences.
            </p>
          </div>

          {/* Footer navigation */}
          <nav aria-label="Footer navigation">
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              Explore
            </h3>

            <ul className="flex flex-col items-start gap-2">
              {pages.map((page) => (
                <li key={page.label}>
                  <Link
                    href={page.href}
                    className="text-xs text-neutral-400 transition-colors duration-200 hover:text-[#C6FF00]"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact and social links */}
          <div>
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              Get in touch
            </h3>

            {email && (
              <a
                href={`mailto:${email}`}
                className="break-all text-xs text-neutral-400 transition-colors hover:text-[#C6FF00]"
              >
                {email}
              </a>
            )}


            <div className="mt-4 flex items-center gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href || "#"}
                  target={label === "Email" ? "_self" : "_blank"}
                  rel={label === "Email" ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#292929] text-[#C6FF00] transition-all duration-200 hover:-translate-y-1 hover:border-[#C6FF00] hover:bg-[#C6FF00] hover:text-black"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

          </div>

          {/* Availability */}
          <div className="hidden text-right sm:block">
            <p className="text-xs leading-relaxed text-neutral-400">
              Designed with care.
              <br />
              Built with purpose.
            </p>

            <p className="mt-2 text-[10px] uppercase tracking-widest text-[#C6FF00]">
              Available for opportunities
            </p>
          </div>
        </div>

        {/* Main name and contact button */}
        <div className="mt-10 grid grid-cols-1 items-end gap-6 sm:mt-12 md:grid-cols-[1fr_280px] md:gap-10">
          <h2 className="text-[clamp(3rem,10vw,8rem)] font-black uppercase leading-[0.8] tracking-[-0.075em]">
            <span className="block text-[#C6FF00]">ROHIT</span>
            <span className="mt-2 block text-white">KALE.</span>
          </h2>

          {email && (
            <a
              href={`mailto:${email}?subject=Let's%20connect`}
              className="group relative flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#C6FF00] bg-[#C6FF00] px-6 text-sm font-bold uppercase tracking-wide text-black transition-colors duration-300 hover:bg-transparent hover:text-[#C6FF00] sm:min-h-16"
            >
              Let&apos;s connect
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          )}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-[9px] uppercase tracking-[0.15em] text-neutral-500 sm:mt-10">
          <span>© {year} Rohit Kale</span>

          <span>Designed &amp; developed with purpose</span>

          <a
            href="/#home"
            className="transition-colors hover:text-[#C6FF00]"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
