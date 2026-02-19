"use client";

import { cn } from "@/lib/utils";

// ─── Tech Ticker ───────────────────────────────────────────────────────────────
const TECH_1 = [
    "LangGraph", "LangChain", "RAG Pipelines", "FAISS", "ChromaDB",
    "Agentic Systems", "OpenAI GPT-4", "Groq", "Ollama",
    "Django REST", "FastAPI", "PostgreSQL", "Python", "TypeScript",
];

const TECH_2 = [
    "TensorFlow", "BERT Fine-tuning", "Transfer Learning",
    "Prompt Engineering", "Vector Databases", "Multi-Agent Orchestration",
    "Next.js", "Transformers HF", "CNN Architectures", "LLM Optimization",
];

interface MarqueeRowProps {
    items: string[];
    reverse?: boolean;
    accent?: string;
}

function MarqueeRow({ items, reverse = false, accent = "#7c3aed" }: MarqueeRowProps) {
    const doubled = [...items, ...items];
    return (
        <div className="flex overflow-hidden py-2">
            <div
                className={cn(
                    "flex shrink-0 gap-4 min-w-full",
                    reverse ? "animate-[marquee-reverse_30s_linear_infinite]" : "animate-[marquee_28s_linear_infinite]"
                )}
                style={{ willChange: "transform" }}
            >
                {doubled.map((tech, i) => (
                    <span
                        key={`${tech}-${i}`}
                        className="font-mono text-xs px-4 py-2 rounded-full whitespace-nowrap border"
                        style={{
                            background: `${accent}08`,
                            borderColor: `${accent}20`,
                            color: "#71717a",
                        }}
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    );
}

export function TechMarquee() {
    return (
        <div className="py-8 overflow-hidden">
            <div className="relative">
                {/* Fade edges */}
                <div
                    className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
                    style={{ background: "linear-gradient(to right, #080810, transparent)" }}
                    aria-hidden="true"
                />
                <div
                    className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
                    style={{ background: "linear-gradient(to left, #080810, transparent)" }}
                    aria-hidden="true"
                />
                <MarqueeRow items={TECH_1} accent="#7c3aed" />
                <MarqueeRow items={TECH_2} reverse accent="#06b6d4" />
            </div>
        </div>
    );
}
