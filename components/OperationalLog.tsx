"use client";

import { motion } from "framer-motion";
import { stagger, fadeUp, nodeSpring, VIEWPORT_ONCE } from "@/lib/animations";
import { Briefcase, GraduationCap, Terminal } from "lucide-react";

// ─── Log Entries ───────────────────────────────────────────────────────────────
const LOG_ENTRIES = [
    {
        timestamp: "2025-09 → PRESENT",
        title: "Software Developer Intern",
        org: "WeServe Codes",
        mission:
            "Architecting agentic AI workflows using LangGraph for automated content and data processing pipelines. Building Django REST backends with PostgreSQL, implementing caching layers, and subscription-gated feature systems.",
        type: "work",
        current: true,
    },
    {
        timestamp: "2023 → PRESENT",
        title: "B.Tech — Computer Engineering",
        org: "Charotar University of Science & Technology",
        mission:
            "CGPA: 8.31 / 10. Core coursework: Machine Learning, Database Systems, Operating Systems, Computer Networks. Independent research focus: Transformer architectures and retrieval-augmented generation.",
        type: "education",
        current: false,
    },
    {
        timestamp: "2023",
        title: "Diploma — Computer Engineering",
        org: "Dr. Subhash Technical Campus",
        mission:
            "CGPA: 9.90 / 10. Distinction in all semesters. Foundation in systems programming, data structures, and applied mathematics.",
        type: "education",
        current: false,
    },
];

const ICON_MAP: Record<string, React.ReactNode> = {
    work: <Terminal size={13} />,
    education: <GraduationCap size={13} />,
};

const COLOR_MAP = {
    work: { accent: "#7c3aed", bg: "rgba(124,58,237,0.1)", border: "rgba(124,58,237,0.3)" },
    education: { accent: "#06b6d4", bg: "rgba(6,182,212,0.08)", border: "rgba(6,182,212,0.25)" },
};

// ─── Component ─────────────────────────────────────────────────────────────────
export function OperationalLog() {
    return (
        <section id="log" className="relative py-28 overflow-hidden">
            {/* Aurora */}
            <div
                className="aurora aurora-amber absolute"
                style={{ width: "350px", height: "350px", top: "50%", right: "5%" }}
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-4xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT_ONCE}
                    className="mb-16"
                >
                    <motion.span variants={fadeUp} className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-4">
                        OPERATIONAL LOG
                    </motion.span>
                    <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white">
                        System{" "}
                        <span className="bg-gradient-to-r from-amber-400 to-violet-400 bg-clip-text text-transparent">
                            Changelog
                        </span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="mt-4 text-zinc-400">
                        Career trajectory as version history — each entry a capability upgrade.
                    </motion.p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Connecting line */}
                    <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={VIEWPORT_ONCE}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/60 via-cyan-500/40 to-zinc-800 origin-top"
                    />

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT_ONCE}
                        className="relative flex flex-col gap-8"
                    >
                        {LOG_ENTRIES.map((entry) => {
                            const colors = COLOR_MAP[entry.type as keyof typeof COLOR_MAP];
                            return (
                                <motion.div
                                    key={entry.title}
                                    variants={fadeUp}
                                    className="flex gap-6 group"
                                >
                                    {/* Node dot */}
                                    <motion.div
                                        variants={nodeSpring}
                                        className="relative z-10 shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                        style={{
                                            background: colors.bg,
                                            border: `1px solid ${colors.border}`,
                                            color: colors.accent,
                                        }}
                                    >
                                        {ICON_MAP[entry.type]}
                                        {entry.current && (
                                            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#080810] animate-pulse" />
                                        )}
                                    </motion.div>

                                    {/* Content */}
                                    <div
                                        className="flex-1 glass border rounded-2xl p-6 hover-card"
                                        style={{ borderColor: `${colors.accent}18` }}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                            <div>
                                                <h3 className="font-bold text-white text-base">{entry.title}</h3>
                                                <span className="text-sm font-medium" style={{ color: colors.accent }}>
                                                    {entry.org}
                                                </span>
                                            </div>
                                            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md shrink-0 self-start">
                                                {entry.timestamp}
                                            </span>
                                        </div>
                                        <p className="text-zinc-400 text-sm leading-relaxed">{entry.mission}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
