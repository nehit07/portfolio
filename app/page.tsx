"use client";

import { BentoGrid, BentoCard } from "@/components/BentoGrid";
import { MoveRight, Cpu, Bot, Code2, Database } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center font-sans tracking-tight">
      <div className="w-full max-w-7xl mb-8 flex items-center justify-between px-4">
        <h2 className="text-xl font-bold tracking-tighter mix-blend-difference">nehit.ai</h2>
        <a href="mailto:nehitvasavada7@gmail.com" className="text-sm text-neutral-400 hover:text-white transition-colors">Contact</a>
      </div>

      <BentoGrid>
        {/* HERO CARD - 2x2 */}
        <BentoCard className="col-span-1 md:col-span-2 row-span-2 relative min-h-[300px]" title="Nehit D. Vasavada" subtitle="GenAI Engineer">
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <Cpu size={120} />
          </div>
          <div className="mt-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 mb-4">
              Building Agentic AI & Scalable Systems.
            </h1>
            <p className="text-neutral-400 max-w-md">
              Software Developer Intern @ WeServe Codes. Specializing in LangGraph, RAG Pipelines, and Django Backends.
            </p>
          </div>
        </BentoCard>

        {/* STATUS CARD - 1x1 */}
        <BentoCard className="col-span-1 border-emerald-500/20 bg-emerald-500/5">
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono text-emerald-400 uppercase">Current Status</span>
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-semibold text-emerald-100">Intern @ WeServe Codes</h3>
            <p className="text-xs text-emerald-400/60 mt-1">Researching Agentic AI & RAG</p>
          </div>
        </BentoCard>

        {/* TECH STACK - 1x1 */}
        <BentoCard className="col-span-1" title="Tech Stack" subtitle="Core Arsenal">
          <div className="flex flex-wrap gap-2 mt-4">
            {["LangChain", "LangGraph", "Django", "PostgreSQL", "Next.js", "Docker"].map((tech) => (
              <span key={tech} className="px-2 py-1 text-xs bg-neutral-800 border border-neutral-700 rounded-md text-neutral-300">
                {tech}
              </span>
            ))}
          </div>
        </BentoCard>

        {/* PROJECT 1: AI Blog Generator - 2x1 */}
        <BentoCard colSpan={2} title="AI Blog Generator" subtitle="Agentic Workflow | Live Project" href="https://github.com/nehit-vasavada/AI-Blog-Generator">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 z-0" />
          <div className="flex items-center gap-4 z-10 my-auto">
            <Bot className="text-blue-400" size={32} />
            <MoveRight className="text-neutral-600" />
            <Code2 className="text-purple-400" size={32} />
            <div className="ml-auto text-right md:block hidden">
              <div className="text-xs font-mono text-neutral-500">Multi-Agent System</div>
              <div className="text-xs text-neutral-400">Tavily API • LangGraph</div>
            </div>
          </div>
        </BentoCard>

        {/* PROJECT 2: FloraVision - 1x1 */}
        <BentoCard title="FloraVision AI" subtitle="Computer Vision" href="https://github.com/nehit-vasavada/FloraVision">
          <div className="h-full w-full flex items-center justify-center bg-neutral-800 rounded-xl mt-2 overflow-hidden relative group">
            {/* Simulated scanning effect */}
            <div className="absolute top-0 w-full h-1 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)] animate-scan" />
            <span className="text-4xl">🌿</span>
          </div>
        </BentoCard>

        {/* PROJECT 3: RAG Engine - 1x1 */}
        <BentoCard title="Paper Q&A" subtitle="RAG System" href="#">
          <div className="flex flex-col gap-2 mt-2">
            <div className="text-xs bg-neutral-800 p-2 rounded border border-neutral-700">
              <span className="text-blue-400">User:</span> Summarize this PDF.
            </div>
            <div className="text-xs bg-blue-900/20 p-2 rounded border border-blue-800/50">
              <span className="text-green-400">AI:</span> Based on page 3...
            </div>
          </div>
        </BentoCard>

        {/* GITHUB - 1x2 or 2x1 depending on layout */}
        <BentoCard colSpan={2} title="GitHub Activity" subtitle="Open Source" href="https://github.com/nehit-vasavada">
          <div className="flex gap-1 h-8 mt-4 opacity-50">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className={`h-full w-2 rounded-sm ${Math.random() > 0.5 ? 'bg-emerald-500' : 'bg-neutral-800'}`} />
            ))}
          </div>
        </BentoCard>

      </BentoGrid>
    </main>
  );
}
