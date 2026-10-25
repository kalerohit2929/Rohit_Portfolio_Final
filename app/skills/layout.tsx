import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills",
  description: "Explore Rohit Kale’s frontend and backend development skills, including React, Next.js, JavaScript, Node.js, MongoDB, and GSAP.",
  openGraph: {
    title: "Skills | Rohit Kale",
    description: "Explore Rohit Kale’s frontend and backend development skills, including React, Next.js, JavaScript, Node.js, MongoDB, and GSAP.",
    type: "website",
  },
};

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
