"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, VIEWPORT_ONCE } from "@/lib/animations";
import { Github, ExternalLink } from "lucide-react";

// ─── Animated SVG Pipeline ─────────────────────────────────────────────────────
function PipelineBox({ label, color = "#7c3aed" }: { label: string; color?: string }) {
    return (
        <div
            className="font-mono text-xs px-3 py-2 rounded-lg border text-center whitespace-nowrap"
            style={{
                borderColor: `${color}50`,
                background: `${color}12`,
                color: color === "#10b981" ? "#6ee7b7" : color === "#06b6d4" ? "#67e8f9" : "#c4b5fd",
            }}
        >
            {label}
        </div>
    );
}

function PipelineArrow({ color = "#7c3aed30" }: { color?: string }) {
    return (
        <svg width="32" height="16" viewBox="0 0 32 16" className="shrink-0" aria-hidden="true">
            <defs>
                <marker id={`arrow-${color}`} markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill={color.replace("30", "80")} />
                </marker>
            </defs>
            <line
                x1="0"
                y1="8"
                x2="26"
                y2="8"
                stroke={color.replace("30", "60")}
                strokeWidth="1.5"
                strokeDasharray="4 3"
                markerEnd={`url(#arrow-${color})`}
                style={{ animation: "flow 1.8s linear infinite" }}
            />
        </svg>
    );
}

// ─── Project Data ──────────────────────────────────────────────────────────────
const PROJECTS = [
    {
        id: "blog-gen",
        title: "AI Blog Generator",
        subtitle: "Agentic Multi-Agent System",
        problem:
            "Manual content pipelines break at scale. Human writers can't research, plan, write, and edit simultaneously at production volume. This system replaces that bottleneck with an orchestrated multi-agent graph.",
        architecture: [
            { label: "User Query", color: "#7c3aed" },
            { label: "Orchestrator", color: "#7c3aed" },
            { label: "Researcher Agent", color: "#06b6d4" },
            { label: "Tavily API", color: "#06b6d4" },
            { label: "Planner Agent", color: "#a78bfa" },
            { label: "Writer Agent", color: "#10b981" },
            { label: "Editor Agent", color: "#10b981" },
            { label: "Final Output", color: "#f59e0b" },
        ],
        decisions: [
            "LangGraph for stateful orchestration — enables conditional edges and parallel agent branches",
            "Tavily over SerpAPI — real-time web grounding eliminates hallucination in the research phase",
            "Shared state dict across nodes — avoids redundant API calls between agent handoffs",
            "Modular agents — each node independently deployable as a microservice",
        ],
        tags: ["LangGraph", "LangChain", "Tavily API", "Python", "Next.js"],
        github: "https://github.com/nehit07/blog_generator",
        accent: "#7c3aed",
        accentSoft: "rgba(124,58,237,0.12)",
    },
    {
        id: "flora",
        title: "FloraVision AI",
        subtitle: "Computer Vision Classification System",
        problem:
            "Agricultural disease identification requires expert pathologists — a resource unavailable to small-scale farmers. This system deploys a CNN classification pipeline achieving 95% accuracy on leaf disease detection, democratizing plant health diagnostics.",
        architecture: [
            { label: "Image Upload", color: "#10b981" },
            { label: "Preprocessing", color: "#10b981" },
            { label: "CNN Backbone", color: "#06b6d4" },
            { label: "Feature Extractor", color: "#06b6d4" },
            { label: "Classification Head", color: "#7c3aed" },
            { label: "Disease + Confidence", color: "#f59e0b" },
        ],
        decisions: [
            "Transfer learning on EfficientNet — solves cold-start on limited agricultural dataset",
            "Augmentation pipeline (rotation, flip, color jitter) — cuts overfitting by ~18%",
            "FastAPI async backend — enables concurrent image processing without blocking",
            "Base64 encoding for browser upload compatibility — removes native file system dependency",
        ],
        tags: ["TensorFlow", "CNN", "FastAPI", "React", "Python"],
        github: "https://github.com/nehit07/FloraVision-AI",
        accent: "#10b981",
        accentSoft: "rgba(16,185,129,0.1)",
    },
    {
        id: "resumify",
        title: "Resumify AI",
        subtitle: "Intelligent Resume Generation Platform",
        problem:
            "Generic resumes fail ATS filters and recruiter scans. This system ingests a user's professional profile and generates role-specific, ATS-optimized resumes — with caching, subscription limits, and PDF/DOCX export pipelines.",
        architecture: [
            { label: "User Profile", color: "#7c3aed" },
            { label: "Ingestion Agent", color: "#7c3aed" },
            { label: "LLM Generator", color: "#06b6d4" },
            { label: "ATS Scorer", color: "#06b6d4" },
            { label: "Cache Layer", color: "#a78bfa" },
            { label: "PDF/DOCX Export", color: "#f59e0b" },
        ],
        decisions: [
            "LangChain + Groq LLM — high-throughput generation with structured JSON output",
            "Redis-compatible caching on ATS scores — prevents redundant LLM calls on unchanged profiles",
            "Subscription-gated generation limits — enforced at Django view level, not client side",
            "WeasyPrint pipeline for PDF export — pixel-accurate layout matching the web preview",
        ],
        tags: ["Django", "LangChain", "Groq", "PostgreSQL", "Next.js", "WeasyPrint"],
        github: "#",
        accent: "#06b6d4",
        accentSoft: "rgba(6,182,212,0.1)",
    },
];

// ─── Individual Project Card ───────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
    const isEven = index % 2 === 0;

    return (
        <motion.article
            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="glass border border-white/5 rounded-3xl p-8 md:p-10 group hover-card"
            style={{ borderColor: `${project.accent}20` }}
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                    <span
                        className="font-mono text-xs uppercase tracking-widest mb-2 block"
                        style={{ color: project.accent }}
                    >
                        {project.subtitle}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h3>
                </div>
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-white transition-colors shrink-0 self-start"
                >
                    <Github size={14} />
                    Source
                </a>
            </div>

            {/* Problem Statement */}
            <div className="mb-6 p-4 rounded-xl" style={{ background: project.accentSoft }}>
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider block mb-2">
                    Problem Framing
                </span>
                <p className="text-zinc-300 text-sm leading-relaxed">{project.problem}</p>
            </div>

            {/* Architecture Pipeline */}
            <div className="mb-6">
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider block mb-3">
                    System Architecture
                </span>
                <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2">
                    {project.architecture.map((node, i) => (
                        <div key={node.label} className="flex items-center gap-2">
                            <PipelineBox label={node.label} color={node.color} />
                            {i < project.architecture.length - 1 && (
                                <PipelineArrow color={`${node.color}30`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Engineering Decisions */}
            <div className="mb-6">
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider block mb-3">
                    Engineering Decisions
                </span>
                <motion.ul
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT_ONCE}
                    className="space-y-2"
                >
                    {project.decisions.map((d) => (
                        <motion.li
                            key={d}
                            variants={fadeUp}
                            className="flex items-start gap-2.5 text-sm text-zinc-400"
                        >
                            <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: project.accent }} />
                            {d}
                        </motion.li>
                    ))}
                </motion.ul>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        className="font-mono text-xs px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-400 border border-zinc-800"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </motion.article>
    );
}

// ─── Deployed Systems Section ──────────────────────────────────────────────────
export function DeployedSystems() {
    return (
        <section id="systems" className="relative py-28 overflow-hidden">
            {/* Aurora */}
            <div
                className="aurora aurora-violet absolute"
                style={{ width: "500px", height: "500px", top: "20%", right: "-100px" }}
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-5xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT_ONCE}
                    className="mb-16"
                >
                    <motion.span variants={fadeUp} className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-4">
                        DEPLOYED SYSTEMS
                    </motion.span>
                    <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white">
                        Production{" "}
                        <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                            Case Studies
                        </span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="mt-4 text-zinc-400 max-w-xl">
                        Each system addresses a real-world bottleneck. Architecture-first, outcome-measured, production-ready.
                    </motion.p>
                </motion.div>

                {/* Project Cards */}
                <div className="flex flex-col gap-8">
                    {PROJECTS.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
