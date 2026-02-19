"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger, VIEWPORT_ONCE } from "@/lib/animations";
import { useTheme } from "./ThemeProvider";

// ─── Skill Data ────────────────────────────────────────────────────────────────
const CATEGORIES = [
    {
        id: "llm",
        label: "LLM / AI",
        skills: [
            { name: "LangGraph", level: 90 },
            { name: "LangChain", level: 88 },
            { name: "OpenAI GPT-4", level: 85 },
            { name: "Groq (Llama)", level: 82 },
            { name: "Prompt Engineering", level: 90 },
            { name: "Ollama (Local LLM)", level: 75 },
        ],
        accent: "#7c3aed",
    },
    {
        id: "agents",
        label: "Agents",
        skills: [
            { name: "Multi-Agent Orchestration", level: 88 },
            { name: "Tool Use / Function Calling", level: 85 },
            { name: "State Machine Design", level: 82 },
            { name: "Memory Systems", level: 78 },
            { name: "Agent RAG Integration", level: 85 },
        ],
        accent: "#a78bfa",
    },
    {
        id: "rag",
        label: "RAG / Vector",
        skills: [
            { name: "FAISS", level: 85 },
            { name: "ChromaDB", level: 80 },
            { name: "Embedding Pipelines", level: 82 },
            { name: "Retrieval Strategies", level: 80 },
            { name: "Document Chunking", level: 85 },
        ],
        accent: "#06b6d4",
    },
    {
        id: "nlp",
        label: "NLP / ML",
        skills: [
            { name: "TensorFlow / Keras", level: 82 },
            { name: "Transformers (HuggingFace)", level: 78 },
            { name: "BERT / Fine-tuning", level: 75 },
            { name: "CNN Architectures", level: 80 },
            { name: "Transfer Learning", level: 78 },
        ],
        accent: "#10b981",
    },
    {
        id: "backend",
        label: "Backend",
        skills: [
            { name: "Django / DRF", level: 88 },
            { name: "FastAPI", level: 82 },
            { name: "PostgreSQL", level: 80 },
            { name: "REST API Design", level: 85 },
            { name: "Python (Expert)", level: 92 },
            { name: "Next.js / TypeScript", level: 78 },
        ],
        accent: "#f59e0b",
    },
];

// ─── Skill Bar ─────────────────────────────────────────────────────────────────
function SkillBar({ name, level, accent, isDark }: { name: string; level: number; accent: string; isDark: boolean }) {
    return (
        <div className="group">
            <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{name}</span>
                <span className="font-mono text-xs" style={{ color: "var(--text-dim)" }}>{level}%</span>
            </div>
            <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: isDark ? "#18181b" : "#e4e4e7" }}
            >
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    viewport={VIEWPORT_ONCE}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${accent}80, ${accent})` }}
                />
            </div>
        </div>
    );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export function SkillMatrix() {
    const [active, setActive] = useState(CATEGORIES[0].id);
    const current = CATEGORIES.find((c) => c.id === active)!;
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section id="stack" className="relative py-28 overflow-hidden">
            {/* Aurora */}
            <div
                className="aurora aurora-emerald absolute"
                style={{ width: "400px", height: "400px", bottom: "0", left: "10%", opacity: isDark ? 1 : 0.4 }}
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-5xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT_ONCE}
                    className="mb-12"
                >
                    <motion.span variants={fadeUp} className="font-mono text-xs uppercase tracking-widest block mb-4" style={{ color: "var(--text-dim)" }}>
                        TECHNICAL STACK MATRIX
                    </motion.span>
                    <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold" style={{ color: "var(--text-heading)" }}>
                        Capability{" "}
                        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            Depth
                        </span>
                    </motion.h2>
                </motion.div>

                {/* Tab Bar */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT_ONCE}
                    className="flex flex-wrap gap-2 mb-10"
                >
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActive(cat.id)}
                            className="font-mono text-xs px-4 py-2 rounded-lg border transition-all duration-200"
                            style={
                                active === cat.id
                                    ? {
                                        background: `${cat.accent}20`,
                                        borderColor: `${cat.accent}60`,
                                        color: cat.accent,
                                    }
                                    : {
                                        background: "transparent",
                                        borderColor: "var(--border-default)",
                                        color: "var(--text-dim)",
                                    }
                            }
                        >
                            {cat.label}
                        </button>
                    ))}
                </motion.div>

                {/* Skills Panel */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="glass rounded-2xl p-8"
                        style={{ borderColor: `${current.accent}15` }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                            {current.skills.map((s) => (
                                <SkillBar key={s.name} name={s.name} level={s.level} accent={current.accent} isDark={isDark} />
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
