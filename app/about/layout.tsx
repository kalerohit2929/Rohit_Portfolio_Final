import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Rohit Kale, a full-stack developer focused on responsive interfaces, reliable APIs, and practical digital experiences.",
  openGraph: {
    title: "About | Rohit Kale",
    description: "Learn about Rohit Kale, a full-stack developer focused on responsive interfaces, reliable APIs, and practical digital experiences.",
    type: "website",
  },
};

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
