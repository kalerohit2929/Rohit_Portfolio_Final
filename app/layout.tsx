
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import CustomCursor from './_components/CustomCursor'
// import CustomCursor from "./_components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "Rohit Kale | Full-Stack Developer",
    template: "%s | Rohit Kale",
  },
  description:
    "Explore Rohit Kale's portfolio: full-stack web development with React, Next.js, Node.js, MongoDB, and thoughtful interactive experiences.",
  applicationName: "Rohit Kale Portfolio",
  creator: "Rohit Kale",
  keywords: [
    "Rohit Kale",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "MERN Stack Developer",
    "Node.js",
    "MongoDB",
    "Portfolio",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Rohit Kale Portfolio",
    title: "Rohit Kale | Full-Stack Developer",
    description:
      "Full-stack developer building responsive web applications and thoughtful digital experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohit Kale | Full-Stack Developer",
    description:
      "Full-stack developer building responsive web applications and thoughtful digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#090909] text-[#E5E5E5]">
        <CustomCursor />

        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
