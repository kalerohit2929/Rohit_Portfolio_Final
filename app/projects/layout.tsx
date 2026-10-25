import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore Rohit Kale’s selected projects, including full-stack web applications built with Next.js, React, Tailwind CSS, and MongoDB.",
  openGraph: {
    title: "Projects | Rohit Kale",
    description: "Explore Rohit Kale’s selected projects, including full-stack web applications built with Next.js, React, Tailwind CSS, and MongoDB.",
    type: "website",
  },
};

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
