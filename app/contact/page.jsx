
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

export default function Contact() {
    const sectionRef = useRef(null);
    const [status, setStatus] = useState("");
    const [sending, setSending] = useState(false);
    const [year, setYear] = useState("2026");

    useEffect(() => {
        setYear(String(new Date().getFullYear()));
    }, []);

    useGSAP(
        () => {
            gsap.from(".contact-kicker", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                },
            });

            gsap.from(".contact-title-line", {
                yPercent: 110,
                opacity: 0,
                stagger: 0.13,
                duration: 1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".contact-title",
                    start: "top 80%",
                    once: true,
                },
            });

            gsap.from(".contact-panel", {
                y: 45,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".contact-panel",
                    start: "top 85%",
                    once: true,
                },
            });

            gsap.from(".contact-bottom > *", {
                y: 20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".contact-bottom",
                    start: "top 95%",
                    once: true,
                },
            });

            gsap.to(".contact-orb", {
                y: -22,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        },
        { scope: sectionRef }
    );

    async function handleSubmit(event) {
        event.preventDefault();
        setStatus("");

        if (!WEB3FORMS_ACCESS_KEY) {
            setStatus("Please add your Web3Forms access key first.");
            return;
        }

        const formElement = event.currentTarget;
        const formData = new FormData(formElement);

        formData.append("access_key", WEB3FORMS_ACCESS_KEY);
        formData.append("subject", "New portfolio contact message");
        formData.append("from_name", "Rohit Kale Portfolio");

        setSending(true);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setStatus("Message sent successfully! I'll get back to you soon.");
                formElement.reset();
            } else {
                setStatus(
                    result.message || "Unable to send your message. Please try again."
                );
            }
        } catch {
            setStatus("Network error. Please check your connection and try again.");
        } finally {
            setSending(false);
        }
    }

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative overflow-hidden bg-[#090909] px-5 py-24 text-[#E5E5E5] sm:px-8 sm:py-32 lg:px-12"
        >
            {/* Background accent */}
            <div
                aria-hidden="true"
                className="contact-orb pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-[#B7FF00]/[0.07] blur-[100px] sm:h-96 sm:w-96"
            />

            <div className="relative mx-auto max-w-7xl">
                {/* Heading */}
                <div className="contact-kicker mb-8 flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#B7FF00]" />
                    <span className="text-[10px] tracking-[0.25em] text-[#B7FF00] sm:text-xs">
                        HAVE SOMETHING IN MIND?
                    </span>
                </div>

                <div className="contact-title mb-14">
                    <h1 className="text-[clamp(3.5rem,10.5vw,9rem)] font-semibold leading-[0.82] tracking-[-0.085em]">
                        <span className="block overflow-hidden pb-2">
                            <span className="contact-title-line block">LET&apos;S MAKE</span>
                        </span>
                        <span className="block overflow-hidden pb-2">
                            <span className="contact-title-line block text-[#B7FF00]">
                                IT HAPPEN.
                            </span>
                        </span>
                    </h1>

                    <p className="mt-8 max-w-lg text-sm leading-7 text-[#A3A3A3] sm:text-base">
                        Got an idea, a role, or a project worth building? Tell me about
                        it. I'm always open to meaningful conversations and interesting
                        challenges.
                    </p>
                </div>

                {/* Contact panel */}
                <div className="contact-panel grid overflow-hidden border border-white/10 md:grid-cols-[0.8fr_1.2fr]">
                    {/* Left panel */}
                    <div className="flex flex-col justify-between border-b border-white/10 bg-[#101010] p-6 sm:p-9 md:border-b-0 md:border-r">
                        <div>
                            <p className="text-xs tracking-[0.2em] text-white/40">
                                OPEN FOR
                            </p>

                            <div className="mt-6 space-y-4">
                                {[
                                    "Full-Stack Opportunities",
                                    "Freelance Projects",
                                    "Creative Collaborations",
                                ].map((item, index) => (
                                    <div key={item} className="flex items-center gap-3">
                                        <span className="font-mono text-xs text-[#B7FF00]">
                                            0{index + 1}
                                        </span>
                                        <span className="text-sm text-[#E5E5E5]">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-12">
                            <p className="text-xs tracking-[0.2em] text-white/40">
                                PREFER EMAIL?
                            </p>

                            {CONTACT_EMAIL ? (
                                <a
                                    href={`mailto:${CONTACT_EMAIL}`}
                                    className="mt-3 inline-block break-all text-sm text-[#B7FF00] transition-colors hover:text-white"
                                >
                                    {CONTACT_EMAIL} ↗
                                </a>
                            ) : (
                                <p className="mt-3 text-sm text-white/45">
                                    Email contact details will be added soon.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Web3Forms form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 bg-[#0D0D0D] p-6 sm:p-9"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-xs tracking-[0.2em] text-white/50">
                                SEND A MESSAGE
                            </p>
                            <span className="text-[10px] text-[#B7FF00]">
                                WEB3FORMS / ONLINE
                            </span>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="contact-name"
                                    className="mb-2 block text-xs text-white/50"
                                >
                                    Your name
                                </label>
                                <input
                                    id="contact-name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    placeholder="John Doe"
                                    required
                                    maxLength={100}
                                    className="w-full border-b border-white/15 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-white/25 focus:border-[#B7FF00]"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="contact-email"
                                    className="mb-2 block text-xs text-white/50"
                                >
                                    Email address
                                </label>
                                <input
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="john@example.com"
                                    required
                                    maxLength={254}
                                    className="w-full border-b border-white/15 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-white/25 focus:border-[#B7FF00]"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="contact-subject"
                                className="mb-2 block text-xs text-white/50"
                            >
                                What is this about?
                            </label>
                            <select
                                id="contact-subject"
                                name="topic"
                                defaultValue="Project inquiry"
                                className="w-full border-b border-white/15 bg-[#0D0D0D] py-3 text-sm text-[#E5E5E5] outline-none focus:border-[#B7FF00]"
                            >
                                <option>Project inquiry</option>
                                <option>Job opportunity</option>
                                <option>Freelance work</option>
                                <option>Collaboration</option>
                                <option>Just saying hello</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="contact-message"
                                className="mb-2 block text-xs text-white/50"
                            >
                                Your message
                            </label>
                            <textarea
                                id="contact-message"
                                name="message"
                                rows={4}
                                placeholder="Tell me a little about what you have in mind..."
                                required
                                maxLength={5000}
                                className="w-full resize-y border-b border-white/15 bg-transparent py-3 text-sm leading-7 outline-none transition-colors placeholder:text-white/25 focus:border-[#B7FF00]"
                            />
                        </div>

                        {/* Honeypot spam field */}
                        <input
                            type="checkbox"
                            name="botcheck"
                            className="hidden"
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                        />

                        <button
                            type="submit"
                            disabled={sending}
                            className="group flex w-full items-center justify-between bg-[#B7FF00] px-5 py-4 text-left text-sm font-semibold text-black transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <span>{sending ? "SENDING MESSAGE..." : "SEND MESSAGE"}</span>
                            <span className="text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                ↗
                            </span>
                        </button>

                        {status && (
                            <p
                                role="status"
                                aria-live="polite"
                                className="text-sm leading-6 text-[#B7FF00]"
                            >
                                {status}
                            </p>
                        )}

                        <p className="text-[11px] leading-5 text-white/35">
                            Your message will be sent securely through Web3Forms. Please
                            don't include passwords or sensitive personal information.
                        </p>
                    </form>
                </div>

                {/* Closing line */}
                {/* Bottom bar */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-[9px] uppercase tracking-[0.15em] text-neutral-500 sm:mt-10">
                    <span>© {year} Rohit Kale</span>

                    <span>Designed &amp; developed with purpose</span>

                    <a
                        href="#home"
                        className="transition-colors duration-300 hover:text-[#B7FF00]"
                    >
                        Back to top ↑
                    </a>
                </div>
            </div>
        </section>
    );
}
