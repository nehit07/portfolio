"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, VIEWPORT_ONCE } from "@/lib/animations";
import { Github, ExternalLink, Construction } from "lucide-react";
import { useTheme } from "./ThemeProvider";

// ─── Animated SVG Pipeline ─────────────────────────────────────────────────────
const NODE_TEXT_TINT: Record<string, string> = {
    "#7c3aed": "#c4b5fd",
    "#a78bfa": "#ddd6fe",
    "#06b6d4": "#67e8f9",
    "#10b981": "#6ee7b7",
    "#f59e0b": "#fcd34d",
    "#ec4899": "#f9a8d4",
};

function PipelineBox({ label, color = "#7c3aed" }: { label: string; color?: string }) {
    return (
        <div
            className="font-mono text-xs px-3 py-2 rounded-lg border text-center whitespace-nowrap"
            style={{
                borderColor: `${color}50`,
                background: `${color}12`,
                color: NODE_TEXT_TINT[color] ?? "#c4b5fd",
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
            "Manual content pipelines break at scale. Human writers can't research, plan, write, and edit simultaneously at production volume. This system replaces that bottleneck with an orchestrated multi-agent graph, shipped as a full Django web app with a user dashboard.",
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
            "Django + PostgreSQL delivery — full save/edit/delete dashboard, not just a script or notebook",
        ],
        tags: ["LangGraph", "LangChain", "Tavily API", "Django", "PostgreSQL", "Python"],
        github: "https://github.com/nehit07/blog_generator",
        liveUrl: "https://blog-generator-9r8p.onrender.com/",
        accent: "#7c3aed",
        accentSoft: "rgba(124,58,237,0.12)",
    },
    {
        id: "flora",
        title: "FloraVision AI",
        subtitle: "Agentic Computer-Vision Diagnosis System",
        problem:
            "Agricultural disease identification requires expert pathologists — a resource unavailable to small-scale farmers. FloraVision closes that gap by pairing YOLOv8 symptom detection with an 8-node LangGraph reasoning pipeline that turns raw detections into a grounded, safety-checked care plan.",
        architecture: [
            { label: "Image Input", color: "#10b981" },
            { label: "YOLOv8 Detection", color: "#10b981" },
            { label: "Plant ID Node", color: "#06b6d4" },
            { label: "Symptom Mapping", color: "#06b6d4" },
            { label: "Severity (Rule-Based)", color: "#a78bfa" },
            { label: "Cause Analysis (LLM)", color: "#7c3aed" },
            { label: "Safety Filter", color: "#f59e0b" },
            { label: "Diagnosis Report", color: "#f59e0b" },
        ],
        decisions: [
            "YOLOv8 for symptom detection — flags yellowing, spots, wilting, and pests with confidence scores before any LLM reasoning runs",
            "Rule-based severity classification before the LLM handoff — deterministic Critical/Moderate/Mild/Healthy grading keeps diagnosis auditable",
            "8-node LangGraph pipeline — plant ID, symptom mapping, cause analysis, seasonal context, and care planning as independently testable nodes",
            "Dedicated safety-filter node — screens every recommendation to prefer organic, low-risk treatments before it reaches the user",
        ],
        tags: ["YOLOv8", "LangGraph", "Computer Vision", "Streamlit", "Python"],
        github: "https://github.com/nehit07/FloraVision-AI",
        liveUrl: "https://floravision-ai.streamlit.app/",
        accent: "#10b981",
        accentSoft: "rgba(16,185,129,0.1)",
    },
    {
        id: "research-qa",
        title: "Research Paper Q&A System",
        subtitle: "RAG Chatbot for Academic PDFs",
        problem:
            "Digging through dense academic PDFs for one specific claim is slow, and generic chatbots hallucinate citations. This system lets a user query research papers in plain language and get answers grounded in the source text — down to the exact page.",
        architecture: [
            { label: "PDF Upload", color: "#a78bfa" },
            { label: "Chunking", color: "#a78bfa" },
            { label: "Embedding", color: "#06b6d4" },
            { label: "Weaviate Store", color: "#06b6d4" },
            { label: "Retriever", color: "#7c3aed" },
            { label: "Answer + Citation", color: "#f59e0b" },
        ],
        decisions: [
            "Weaviate as the vector store — hybrid search and metadata filtering support page-level citation tracking",
            "Chunking tuned for citation precision — smaller, overlapping chunks trade some context for exact page-number attribution",
            "LangChain retrieval chain — keeps retrieval and generation swappable as models change",
            "Streamlit interface — fast to iterate on for a research-tool UX without building a full frontend",
        ],
        tags: ["LangChain", "RAG", "Weaviate", "Streamlit", "Python"],
        github: "https://github.com/nehit07/Chatbot_multipdf",
        accent: "#a78bfa",
        accentSoft: "rgba(167,139,250,0.12)",
    },
    {
        id: "ner-system",
        title: "Named Entity Recognition System",
        subtitle: "Transformer-Based NLP Pipeline",
        problem:
            "Off-the-shelf NER models miss domain-specific entities and can't adapt without a full retrain cycle. This system pairs spaCy and BERT-based models with a Flask layer that supports adding new entity types and retraining for domain adaptation.",
        architecture: [
            { label: "Text Input", color: "#f59e0b" },
            { label: "spaCy Preprocessing", color: "#f59e0b" },
            { label: "BERT / Transformer", color: "#7c3aed" },
            { label: "Entity Extraction", color: "#06b6d4" },
            { label: "Flask API", color: "#10b981" },
            { label: "Tagged Output", color: "#10b981" },
        ],
        decisions: [
            "spaCy + BERT pairing — spaCy handles fast preprocessing, BERT-based models handle ambiguous and multi-word entities",
            "Flask backend — lightweight serving layer for entity-extraction requests",
            "Dynamic entity addition — new entity types register without rebuilding the whole pipeline",
            "Domain-adaptation retraining — the model fine-tunes on new domain text as labeled data grows",
        ],
        tags: ["Transformers", "spaCy", "BERT", "NLP", "Flask", "Python"],
        github: "https://github.com/nehit07/NER-Named-Entity-Recognition-",
        accent: "#f59e0b",
        accentSoft: "rgba(245,158,11,0.1)",
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
        status: "developing" as const,
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
            className="glass rounded-3xl p-8 md:p-10 group hover-card"
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
                    <h3 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--text-heading)" }}>{project.title}</h3>
                </div>
                <div className="flex items-center gap-3 shrink-0 self-start">
                    {(project as any).liveUrl && (
                        <a
                            href={(project as any).liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg border transition-all duration-300 hover:scale-105"
                            style={{
                                color: project.accent,
                                borderColor: `${project.accent}40`,
                                background: `${project.accent}12`,
                            }}
                        >
                            <ExternalLink size={13} />
                            Live Demo
                        </a>
                    )}
                    {(project as any).status === "developing" && (
                        <span
                            className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg border"
                            style={{
                                color: "#f59e0b",
                                borderColor: "rgba(245,158,11,0.3)",
                                background: "rgba(245,158,11,0.08)",
                                animation: "pulse 2.5s ease-in-out infinite",
                            }}
                        >
                            <Construction size={13} />
                            In Development
                        </span>
                    )}
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-mono transition-colors shrink-0"
                        style={{ color: "var(--text-dim)" }}
                    >
                        <Github size={14} />
                        Source
                    </a>
                </div>
            </div>

            {/* Problem Statement */}
            <div className="mb-6 p-4 rounded-xl" style={{ background: project.accentSoft }}>
                <span className="font-mono text-xs uppercase tracking-wider block mb-2" style={{ color: "var(--text-dim)" }}>
                    Problem Framing
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{project.problem}</p>
            </div>

            {/* Architecture Pipeline */}
            <div className="mb-6">
                <span className="font-mono text-xs uppercase tracking-wider block mb-3" style={{ color: "var(--text-dim)" }}>
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
                <span className="font-mono text-xs uppercase tracking-wider block mb-3" style={{ color: "var(--text-dim)" }}>
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
                            className="flex items-start gap-2.5 text-sm"
                            style={{ color: "var(--text-secondary)" }}
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
                        className="font-mono text-xs px-2.5 py-1 rounded-md"
                        style={{
                            background: "var(--tag-bg)",
                            color: "var(--tag-text)",
                            border: "1px solid var(--tag-border)",
                        }}
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
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section id="projects" className="relative py-28 overflow-hidden">
            {/* Aurora */}
            <div
                className="aurora aurora-violet absolute"
                style={{ width: "500px", height: "500px", top: "20%", right: "-100px", opacity: isDark ? 1 : 0.4 }}
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
                    <motion.span variants={fadeUp} className="font-mono text-xs uppercase tracking-widest block mb-4" style={{ color: "var(--text-dim)" }}>
                        DEPLOYED SYSTEMS
                    </motion.span>
                    <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold" style={{ color: "var(--text-heading)" }}>
                        Production{" "}
                        <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                            Case Studies
                        </span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="mt-4 max-w-xl" style={{ color: "var(--text-secondary)" }}>
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
