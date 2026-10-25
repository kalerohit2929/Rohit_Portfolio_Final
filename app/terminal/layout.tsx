import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer Terminal",
  description: "Explore Rohit Kale’s interactive developer terminal to discover his profile, projects, skills, and contact details.",
  openGraph: {
    title: "Developer Terminal | Rohit Kale",
    description: "Explore Rohit Kale’s interactive developer terminal to discover his profile, projects, skills, and contact details.",
    type: "website",
  },
};

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
