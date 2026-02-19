"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, scaleIn, VIEWPORT_ONCE } from "@/lib/animations";

// ─── Domain Nodes ─────────────────────────────────────────────────────────────
const DOMAINS = [
    {
        id: "llm",
        label: "LLM Orchestration",
        sub: "LangGraph · LangChain · GPT-4 · Groq",
        color: "#7c3aed",
        glow: "rgba(124,58,237,0.4)",
        pos: { top: "10%", left: "50%" },
    },
    {
        id: "rag",
        label: "RAG Pipelines",
        sub: "FAISS · ChromaDB · Retrieval Augmented",
        color: "#06b6d4",
        glow: "rgba(6,182,212,0.35)",
        pos: { top: "42%", left: "12%" },
    },
    {
        id: "agents",
        label: "Agentic Systems",
        sub: "Multi-Agent · Tool Use · State Machines",
        color: "#a78bfa",
        glow: "rgba(167,139,250,0.35)",
        pos: { top: "42%", left: "88%" },
    },
    {
        id: "nlp",
        label: "NLP / Transformers",
        sub: "BERT · Fine-tuning · Seq2Seq · Embeddings",
        color: "#10b981",
        glow: "rgba(16,185,129,0.35)",
        pos: { top: "75%", left: "25%" },
    },
    {
        id: "backend",
        label: "Backend Systems",
        sub: "Django · FastAPI · REST · PostgreSQL",
        color: "#f59e0b",
        glow: "rgba(245,158,11,0.3)",
        pos: { top: "75%", left: "75%" },
    },
];

const PRINCIPLES = [
    {
        icon: "⬡",
        title: "Systems Think First",
        desc: "Every solution starts as an architecture diagram. Boundaries, contracts, and data flows are defined before a single line of code.",
    },
    {
        icon: "⟳",
        title: "Research → Production",
        desc: "Academic insights are the foundation. Production constraints are the filter. The output is a system that runs — not a proof of concept.",
    },
    {
        icon: "◈",
        title: "Observable by Design",
        desc: "Every agent, pipeline, and model output is instrumented. If you can't measure it, you can't trust it.",
    },
];

export function ArchitectureMap() {
    return (
        <section className="relative py-28 overflow-hidden">
            {/* Aurora */}
            <div
                className="aurora aurora-cyan absolute"
                style={{ width: "600px", height: "400px", top: "30%", left: "50%", transform: "translate(-50%,-50%)" }}
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT_ONCE}
                    className="text-center mb-20"
                >
                    <motion.span variants={fadeUp} className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-4">
                        CAPABILITY ARCHITECTURE
                    </motion.span>
                    <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white">
                        How I{" "}
                        <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                            Build
                        </span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="mt-4 text-zinc-400 max-w-xl mx-auto">
                        Five interconnected domain clusters. Each one a production capability, not a tutorial exercise.
                    </motion.p>
                </motion.div>

                {/* Domain Node Graph — Responsive Grid Layout */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT_ONCE}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-24"
                >
                    {DOMAINS.map((d, i) => (
                        <motion.div
                            key={d.id}
                            variants={scaleIn}
                            transition={{ delay: i * 0.08 }}
                            whileHover={{ scale: 1.03, y: -4 }}
                            className="glass rounded-2xl p-5 cursor-default group relative overflow-hidden"
                            style={{
                                border: `1px solid ${d.color}30`,
                            }}
                        >
                            {/* Glow BG on hover */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                                style={{
                                    background: `radial-gradient(circle at 30% 50%, ${d.color}12, transparent 70%)`,
                                }}
                                aria-hidden="true"
                            />

                            {/* Node dot */}
                            <div className="relative z-10 flex items-start gap-3">
                                <div
                                    className="w-3 h-3 rounded-full mt-1 shrink-0 transition-all duration-300"
                                    style={{
                                        background: d.color,
                                        boxShadow: `0 0 0 3px ${d.color}20`,
                                    }}
                                />
                                <div>
                                    <h3
                                        className="font-semibold text-sm text-white mb-1 group-hover:text-opacity-100 transition-colors"
                                        style={{ color: d.color }}
                                    >
                                        {d.label}
                                    </h3>
                                    <p className="font-mono text-xs text-zinc-500 leading-relaxed">{d.sub}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Engineering Principles */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT_ONCE}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {PRINCIPLES.map((p) => (
                        <motion.div
                            key={p.title}
                            variants={fadeUp}
                            className="glass border border-white/5 rounded-2xl p-6 group hover-card"
                        >
                            <div className="text-3xl mb-4 text-violet-400">{p.icon}</div>
                            <h3 className="font-bold text-white text-base mb-2">{p.title}</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">{p.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
