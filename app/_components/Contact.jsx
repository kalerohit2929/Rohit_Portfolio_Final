
"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Send, Plus, CheckCircle2, AlertCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

const projectTypes = [
  "Frontend Development",
  "Full-Stack Application",
  "Portfolio Website",
  "Freelance Project",
  "Other",
];

export default function Contact() {
  const sectionRef = useRef(null);

  const [projectType, setProjectType] = useState(
    "Full-Stack Application"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const ctx = gsap.context(() => {
        gsap.from(".contact-eyebrow", {
          y: 25,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        });

        gsap.from(".contact-word", {
          yPercent: 110,
          opacity: 0,
          stagger: 0.15,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".contact-heading",
            start: "top 82%",
          },
        });

        gsap.from(".contact-panel", {
          y: 55,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-panel",
            start: "top 85%",
          },
        });

        gsap.from(".contact-detail", {
          x: -20,
          opacity: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-details",
            start: "top 90%",
          },
        });

        gsap.to(".orbit-ring", {
          rotation: 360,
          duration: 28,
          repeat: -1,
          ease: "none",
        });

        gsap.to(".orbit-dot", {
          scale: 1.5,
          opacity: 0.4,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }, section);

      return () => ctx.revert();
    },
    { scope: sectionRef }
  );

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setStatus("Sending your message...");
    setStatusType("loading");

    try {
      const accessKey =
        process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

      if (!accessKey) {
        throw new Error(
          "Web3Forms access key is missing. Check your .env.local file."
        );
      }

      const payload = {
        access_key: accessKey,
        name: formData.get("name"),
        email: formData.get("email"),
        projectType: formData.get("projectType"),
        message: formData.get("message"),
        subject: `New Portfolio Inquiry — ${projectType}`,
        from_name: "Rohit Kale Portfolio",
        botcheck: formData.get("botcheck") || "",
      };

      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to send your message. Please try again."
        );
      }

      setStatus(
        "Message sent successfully! I'll be in touch soon."
      );
      setStatusType("success");

      form.reset();
      setProjectType("Full-Stack Application");
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
      setStatusType("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative isolate w-full overflow-hidden bg-[#090909] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-16"
    >
      {/* Animated SVG background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -right-32 top-16 h-80 w-80 rounded-full bg-[#C6FF00]/[0.06] blur-[100px]" />

        <svg
          viewBox="0 0 500 500"
          fill="none"
          className="absolute -right-24 top-10 w-[340px] opacity-30 sm:right-0 sm:w-[440px]"
        >
          <circle
            className="orbit-ring"
            cx="250"
            cy="250"
            r="160"
            stroke="#C6FF00"
            strokeWidth="0.6"
            strokeDasharray="3 10"
          />

          <circle
            cx="250"
            cy="250"
            r="115"
            stroke="#C6FF00"
            strokeWidth="0.5"
          />

          <circle
            cx="250"
            cy="250"
            r="70"
            stroke="#C6FF00"
            strokeWidth="0.5"
          />

          <circle
            className="orbit-dot"
            cx="410"
            cy="250"
            r="4"
            fill="#C6FF00"
          />

          <circle
            cx="165"
            cy="135"
            r="2"
            fill="#C6FF00"
          />

          <path
            d="M250 40V460M40 250H460"
            stroke="#C6FF00"
            strokeWidth="0.4"
            strokeDasharray="2 9"
          />
        </svg>

        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)] [background-size:55px_55px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16">
          <div className="contact-eyebrow mb-7 flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#C6FF00]" />

            <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">
              Have an idea? Let&apos;s talk
            </span>
          </div>

          <h2 className="contact-heading max-w-5xl text-[clamp(3.5rem,10vw,8.5rem)] font-black uppercase leading-[0.82] tracking-[-0.075em]">
            <span className="block overflow-hidden pb-2">
              <span className="contact-word inline-block">
                LET&apos;S MAKE
              </span>
            </span>

            <span className="block overflow-hidden pb-2">
              <span className="contact-word inline-block text-[#C6FF00]">
                IT HAPPEN.
              </span>
            </span>
          </h2>

          <p className="mt-7 max-w-lg text-sm leading-7 text-neutral-400 sm:text-base">
            Have a project in mind, an interesting challenge, or an
            opportunity to collaborate? Tell me about it.
          </p>
        </div>

        {/* Contact details and form */}
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div className="contact-details flex flex-col justify-between gap-10">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.25em] text-neutral-500">
                A little about me
              </p>

              <p className="max-w-sm text-2xl font-medium leading-relaxed tracking-tight sm:text-3xl">
                Good ideas deserve{" "}
                <span className="text-[#C6FF00]">
                  great execution.
                </span>
              </p>
            </div>

            <div className="space-y-5">
              <div className="contact-detail border-t border-white/10 pt-4">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                  Email
                </p>

                {contactEmail ? (
                  <a
                    href={`mailto:${contactEmail}`}
                    className="break-all text-sm transition-colors hover:text-[#C6FF00]"
                  >
                    {contactEmail}
                  </a>
                ) : (
                  <p className="text-sm text-neutral-500">Contact email will be added soon.</p>
                )}
              </div>

              <div className="contact-detail border-t border-white/10 pt-4">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                  Based in
                </p>

                <p className="text-sm text-neutral-300">
                  India · Available for opportunities
                </p>
              </div>

              <div className="contact-detail border-t border-white/10 pt-4">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                  Response time
                </p>

                <p className="text-sm text-neutral-300">
                  Usually within 1–2 business days
                </p>
              </div>
            </div>
          </div>

          {/* Web3Forms form */}
          <form
            onSubmit={handleSubmit}
            className="contact-panel relative border border-white/10 bg-white/[0.025] p-5 sm:p-8 lg:p-10"
          >
            {/* Honeypot field */}
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="mb-8 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-300">
                Send a message
              </p>

              <Plus size={17} className="text-[#C6FF00]" />
            </div>

            <div className="grid gap-7 sm:grid-cols-2">
              <label className="block">
                <span className="mb-3 block text-xs text-neutral-400">
                  Your name{" "}
                  <span className="text-[#C6FF00]">*</span>
                </span>

                <input
                  required
                  name="name"
                  autoComplete="name"
                  placeholder="John Doe"
                  className="w-full border-b border-white/20 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-neutral-600 focus:border-[#C6FF00]"
                />
              </label>

              <label className="block">
                <span className="mb-3 block text-xs text-neutral-400">
                  Email address{" "}
                  <span className="text-[#C6FF00]">*</span>
                </span>

                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="john@example.com"
                  className="w-full border-b border-white/20 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-neutral-600 focus:border-[#C6FF00]"
                />
              </label>
            </div>

            <label className="mt-8 block">
              <span className="mb-3 block text-xs text-neutral-400">
                What are you looking for?
              </span>

              <select
                name="projectType"
                value={projectType}
                onChange={(event) =>
                  setProjectType(event.target.value)
                }
                className="w-full appearance-none border-b border-white/20 bg-[#090909] py-3 text-sm text-neutral-200 outline-none transition-colors focus:border-[#C6FF00]"
              >
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-8 block">
              <span className="mb-3 block text-xs text-neutral-400">
                Tell me about your idea{" "}
                <span className="text-[#C6FF00]">*</span>
              </span>

              <textarea
                required
                name="message"
                rows={4}
                placeholder="A little context about your project..."
                className="w-full resize-y border-b border-white/20 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-neutral-600 focus:border-[#C6FF00]"
              />
            </label>

            {/* Submission status and button */}
            <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div
                aria-live="polite"
                role="status"
                className={`flex items-start gap-2 text-xs leading-relaxed ${
                  statusType === "success"
                    ? "text-[#C6FF00]"
                    : statusType === "error"
                      ? "text-red-400"
                      : "text-neutral-400"
                }`}
              >
                {statusType === "success" && (
                  <CheckCircle2
                    size={15}
                    className="mt-0.5 shrink-0"
                  />
                )}

                {statusType === "error" && (
                  <AlertCircle
                    size={15}
                    className="mt-0.5 shrink-0"
                  />
                )}

                <span>
                  {status || "Fields marked * are required."}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex min-h-14 w-full shrink-0 items-center justify-center gap-3 overflow-hidden rounded-full bg-[#C6FF00] px-7 text-xs font-bold uppercase tracking-[0.12em] text-black transition-colors duration-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                <span>
                  {isSubmitting ? "Sending..." : "Send message"}
                </span>

                <Send
                  size={15}
                  className={`transition-transform duration-300 ${
                    isSubmitting
                      ? "animate-pulse"
                      : "group-hover:translate-x-1 group-hover:-translate-y-1"
                  }`}
                />
              </button>
            </div>
          </form>
        </div>

        {/* Bottom line */}
        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
            ROHIT KALE · FULL-STACK DEVELOPER
          </p>

          <a
            href="#home"
            className="group flex items-center gap-2 text-xs text-neutral-400 transition-colors hover:text-[#C6FF00]"
          >
            Back to top

            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
