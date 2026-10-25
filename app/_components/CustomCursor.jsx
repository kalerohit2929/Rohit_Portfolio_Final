
"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({
    x: -100,
    y: -100,
  });

  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const target = event.target;

      setHovering(
        target instanceof Element &&
          !!target.closest(
            "a, button, [role='button'], [data-cursor]"
          )
      );
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Outer cursor ring */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-[99999] hidden md:block"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
        aria-hidden="true"
      >
        <div
          className={`flex items-center justify-center rounded-full border border-[#C6FF00] bg-[#C6FF00]/5 transition-all duration-200 ease-out ${
            hovering
              ? "h-12 w-28 bg-[#C6FF00] shadow-[0_0_20px_#C6FF0040]"
              : "h-10 w-10"
          }`}
        >
          {hovering && (
            <span className="whitespace-nowrap px-2 text-[9px] font-bold tracking-wider text-[#090909]">
              VIEW ↗
            </span>
          )}
        </div>
      </div>

      {/* Center dot */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-[100000] hidden h-1.5 w-1.5 rounded-full bg-[#C6FF00] shadow-[0_0_10px_#C6FF00] md:block"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
        aria-hidden="true"
      />
    </>
  );
}
