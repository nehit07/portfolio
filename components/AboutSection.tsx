"use client";

import { motion } from "framer-motion";
import { stagger, fadeUp, VIEWPORT_ONCE } from "@/lib/animations";
import { useTheme } from "./ThemeProvider";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";

// ─── Quick-Scan Cards ──────────────────────────────────────────────────────────
const SNAPSHOT = [
    {
        icon: <Briefcase size={15} />,
        label: "Current Role",
        value: "Software Developer Intern - WeServe Codes",
        accent: "#7c3aed",
    },
    {
        icon: <GraduationCap size={15} />,
        label: "Education",
        value: "B.Tech Computer Engineering - CHARUSAT (CGPA 8.31)",
        accent: "#06b6d4",
    },
    {
        icon: <MapPin size={15} />,
        label: "Location",
        value: "Ahmedabad, Gujarat, India",
        accent: "#10b981",
    },
];

const FOCUS_AREAS = [
    "Multi-Agent Orchestration",
    "RAG Pipeline Architecture",
    "Production NLP Systems",
    "Backend Infrastructure",
];

// ─── Component ─────────────────────────────────────────────────────────────────
export function AboutSection() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section id="about" className="relative py-28 overflow-hidden">
            {/* Aurora */}
            <div
                className="aurora aurora-violet absolute"
                style={{ width: "400px", height: "400px", top: "20%", left: "60%", transform: "translate(-50%,-50%)", opacity: isDark ? 1 : 0.5 }}
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
                        ABOUT
                    </motion.span>
                    <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold" style={{ color: "var(--text-heading)" }}>
                        Who I{" "}
                        <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                            Am
                        </span>
                    </motion.h2>
                </motion.div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* LEFT — Identity (3 cols) */}
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT_ONCE}
                        className="lg:col-span-3"
                    >
                        <motion.div
                            variants={fadeUp}
                            className="glass rounded-2xl p-8"
                            style={{ borderColor: "var(--border-default)" }}
                        >
                            <p className="text-base leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
                                I&apos;m <span className="font-semibold" style={{ color: "var(--text-heading)" }}>Nehit Vasavada</span>, a Generative AI Engineer
                                focused on building systems that move from research to production.
                                My work centers on <span className="text-violet-400 font-medium">agentic AI architectures</span>,{" "}
                                <span className="text-cyan-400 font-medium">retrieval-augmented generation</span>, and{" "}
                                <span className="text-emerald-400 font-medium">full-stack AI backends</span>.
                            </p>
                            <p className="text-base leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
                                I specialize in designing multi-agent workflows with LangGraph, building production RAG pipelines,
                                and deploying them on Django/FastAPI backends with PostgreSQL. Every system I build starts with
                                an architecture diagram - boundaries, contracts, and data flows defined before the first line of code.
                            </p>
                            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                                Currently pursuing my B.Tech in Computer Engineering while interning as a Software Developer,
                                I&apos;m actively seeking <span className="font-medium" style={{ color: "var(--text-heading)" }}>entry-level AI/ML engineering roles</span> where
                                I can bring production-grade thinking to real-world AI systems.
                            </p>
                        </motion.div>

                        {/* Focus Areas */}
                        <motion.div
                            variants={fadeUp}
                            className="mt-6 flex flex-wrap gap-2"
                        >
                            {FOCUS_AREAS.map((area) => (
                                <span
                                    key={area}
                                    className="font-mono text-xs px-3 py-1.5 rounded-full"
                                    style={{
                                        background: isDark ? "rgba(124,58,237,0.1)" : "rgba(124,58,237,0.06)",
                                        color: "var(--text-secondary)",
                                        border: isDark ? "1px solid rgba(124,58,237,0.2)" : "1px solid rgba(124,58,237,0.15)",
                                    }}
                                >
                                    {area}
                                </span>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* RIGHT — Snapshot Cards (2 cols) */}
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT_ONCE}
                        className="lg:col-span-2 flex flex-col gap-4"
                    >
                        {SNAPSHOT.map((item) => (
                            <motion.div
                                key={item.label}
                                variants={fadeUp}
                                className="glass rounded-xl px-5 py-4 flex items-start gap-4 hover-card"
                                style={{ borderColor: `${item.accent}15` }}
                            >
                                <span
                                    className="p-2 rounded-lg shrink-0 mt-0.5"
                                    style={{ background: `${item.accent}18`, color: item.accent }}
                                >
                                    {item.icon}
                                </span>
                                <div className="flex flex-col min-w-0">
                                    <span className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--text-dim)" }}>
                                        {item.label}
                                    </span>
                                    <span className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                                        {item.value}
                                    </span>
                                </div>
                            </motion.div>
                        ))}

                        {/* Availability indicator */}
                        <motion.div
                            variants={fadeUp}
                            className="glass rounded-xl px-5 py-4"
                            style={{
                                borderColor: "rgba(16,185,129,0.2)",
                                animation: "breath 3s ease-in-out infinite",
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                </span>
                                <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
                                    Open to Opportunities
                                </span>
                            </div>
                            <p className="text-xs mt-2" style={{ color: "var(--text-dim)" }}>
                                Seeking entry-level AI/ML engineering roles &amp; research collaborations
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
