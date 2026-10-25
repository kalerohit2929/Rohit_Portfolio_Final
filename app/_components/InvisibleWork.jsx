
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HiddenLayer() {
    const sectionRef = useRef(null);
    const glowRef = useRef(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section) return;

            const intro = section.querySelector(".hidden-intro");
            const label = section.querySelector(".hidden-label");
            const lines = gsap.utils.toArray(
                section.querySelectorAll(".hidden-line")
            );
            const finalText = section.querySelector(".hidden-final");
            const reducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (reducedMotion) {
                gsap.set(
                    [intro, label, ...lines, finalText],
                    { clearProps: "all" }
                );
                return;
            }

            gsap.set(label, { autoAlpha: 0 });
            gsap.set(lines, { autoAlpha: 0, y: 28 });
            gsap.set(finalText, {
                autoAlpha: 0,
                y: 35,
                filter: "blur(8px)",
            });

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "+=2400",
                    scrub: 0.8,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            timeline
                .to(intro, {
                    autoAlpha: 0,
                    y: -35,
                    filter: "blur(6px)",
                    duration: 0.8,
                })
                .to(label, {
                    autoAlpha: 1,
                    duration: 0.35,
                })
                .to(
                    lines,
                    {
                        autoAlpha: 1,
                        y: 0,
                        stagger: 0.55,
                        duration: 0.8,
                        ease: "power2.out",
                    },
                    "<"
                )
                .to(
                    lines,
                    {
                        autoAlpha: 0.18,
                        stagger: 0.12,
                        duration: 0.5,
                    },
                    "+=0.25"
                )
                .to(
                    finalText,
                    {
                        autoAlpha: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 1.1,
                        ease: "power3.out",
                    },
                    "-=0.1"
                );
        },
        { scope: sectionRef }
    );

    const handlePointerMove = (event) => {
        if (!glowRef.current || event.pointerType === "touch") return;

        const rect = sectionRef.current.getBoundingClientRect();

        gsap.to(glowRef.current, {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
        });
    };

    return (
        <section
            ref={sectionRef}
            onPointerMove={handlePointerMove}
            className="relative isolate overflow-hidden bg-[#090909] text-[#E5E5E5]"
        >
            <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_center,rgba(183,255,0,0.035),transparent_65%)]" />

            {/* Cursor glow */}
            <div
                ref={glowRef}
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 -z-0 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
                style={{
                    background:
                        "radial-gradient(circle, rgba(183,255,0,0.09), transparent 70%)",
                }}
            />


            <div className="relative z-10 flex min-h-screen items-center px-5 py-12 sm:px-10 lg:px-16">
                <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-10">

                    {/* LEFT — Opening statement */}
                    <div className="hidden-intro">
                        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[#B7FF00]">
                            Beyond the interface / 001
                        </p>

                        <h2 className="max-w-xl text-[clamp(2.8rem,6vw,6rem)] font-medium leading-[0.95] tracking-[-0.065em]">
                            Not everything
                            <br />
                            is meant to be
                            <span className="text-white/30"> seen.</span>
                        </h2>
                    </div>

                    {/* RIGHT — Revealing text */}
                    <div className="md:justify-self-end md:w-full md:max-w-xl">
                        <p className="hidden-label mb-8 text-xs uppercase tracking-[0.3em] text-[#B7FF00] opacity-0">
                            Look a little deeper.
                        </p>

                        <div className="space-y-5">
                            <p className="hidden-line translate-y-8 text-balance text-[clamp(1.5rem,3vw,3rem)] font-light leading-tight tracking-[-0.04em] text-white/75 opacity-0">
                                Few notice the thinking behind every detail.
                            </p>

                            <p className="hidden-line translate-y-8 text-balance text-[clamp(1.5rem,3vw,3rem)] font-light leading-tight tracking-[-0.04em] text-white/75 opacity-0">
                                The logic behind every interaction.
                            </p>

                            <p className="hidden-line translate-y-8 text-balance text-[clamp(1.5rem,3vw,3rem)] font-light leading-tight tracking-[-0.04em] text-white/75 opacity-0">
                                The intention behind every decision.
                            </p>
                        </div>

                        {/* Final message */}
                        <div className="mt-10 border-t border-white/10 pt-7">
                            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-white/40">
                                This is where the real work begins.
                            </p>

                            <h3 className="hidden-final translate-y-12 text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[#B7FF00] opacity-0 blur-[8px]">
                                I build beyond
                                <br />
                                what you see.
                            </h3>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
}
