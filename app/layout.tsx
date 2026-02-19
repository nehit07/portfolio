import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  title: "Nehit Vasavada — AI Systems Engineer",
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        {/* Noise grain texture — premium overlay */}
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
