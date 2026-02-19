import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nehit Vasavada — Generative AI Engineer",
  description:
    "Designing and deploying autonomous AI systems — LangGraph orchestration, RAG pipelines, agentic workflows, and production NLP. Senior AI/ML engineer portfolio.",
  keywords: [
    "AI Engineer",
    "Generative AI",
    "LangGraph",
    "RAG",
    "Agentic AI",
    "Machine Learning",
    "NLP",
    "Django",
    "Vector Database",
  ],
  icons: {
    icon: "/avatar.png",
    apple: "/avatar.png",
  },
  openGraph: {
    title: "Nehit Vasavada — AI Systems Engineer",
    description:
      "Designing and deploying autonomous AI systems — LangGraph, RAG, and agentic orchestration.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Inline script to set theme before first paint — prevents FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t)}else if(window.matchMedia("(prefers-color-scheme:light)").matches){document.documentElement.setAttribute("data-theme","light")}else{document.documentElement.setAttribute("data-theme","dark")}}catch(e){document.documentElement.setAttribute("data-theme","dark")}})()`,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {/* Noise grain texture — premium overlay */}
        <div className="noise-overlay" aria-hidden="true" />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
