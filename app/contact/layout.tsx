import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Rohit Kale about full-stack development, React and Next.js projects, freelance work, and collaboration.",
  openGraph: {
    title: "Contact | Rohit Kale",
    description: "Contact Rohit Kale about full-stack development, React and Next.js projects, freelance work, and collaboration.",
    type: "website",
  },
};

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
