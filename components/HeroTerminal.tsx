"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { stagger, fadeUp, VIEWPORT_ONCE } from "@/lib/animations";
import { ArrowDown, Github, Linkedin } from "lucide-react";

// Lazy-load the heavy canvas — no SSR
const NeuralCanvas = dynamic(
    () => import("./NeuralCanvas").then((m) => m.NeuralCanvas),
    { ssr: false }
);

// ─── Typewriter ────────────────────────────────────────────────────────────────
const LINES = [
    "GenAI Engineer & Systems Architect",
    "LangGraph · RAG Pipelines · Agentic AI",
    "Building Autonomous Intelligence Systems",
];

function Typewriter() {
    const [display, setDisplay] = useState("");
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = LINES[lineIndex];
        let timeout: ReturnType<typeof setTimeout>;

        if (!deleting && charIndex <= current.length) {
            timeout = setTimeout(() => {
                setDisplay(current.slice(0, charIndex));
                setCharIndex((c) => c + 1);
            }, 45);
        } else if (!deleting && charIndex > current.length) {
            timeout = setTimeout(() => setDeleting(true), 1800);
        } else if (deleting && charIndex > 0) {
            timeout = setTimeout(() => {
                setDisplay(current.slice(0, charIndex - 1));
                setCharIndex((c) => c - 1);
            }, 22);
        } else if (deleting && charIndex === 0) {
            setDeleting(false);
            setLineIndex((l) => (l + 1) % LINES.length);
        }

        return () => clearTimeout(timeout);
    }, [charIndex, deleting, lineIndex]);

    return (
        <span className="terminal-text font-mono text-sm md:text-base tracking-wide">
            {display}
            <span className="cursor-blink ml-0.5 text-emerald-400">█</span>
        </span>
    );
}

// ─── System Metrics ────────────────────────────────────────────────────────────
const METRICS = [
    { label: "Systems Deployed", value: 4 },
    { label: "AI Pipelines Built", value: 8 },
    { label: "Agent Architectures", value: 3 },
    { label: "Research Papers Studied", value: "50+" },
];

function MetricCounter({ target, label }: { target: number | string; label: string }) {
    const [count, setCount] = useState(typeof target === "number" ? 0 : "0+");
    const ref = useRef<HTMLDivElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    if (typeof target === "number") {
                        let start = 0;
                        const step = Math.ceil(target / 40);
                        const interval = setInterval(() => {
                            start += step;
                            if (start >= target) { setCount(target); clearInterval(interval); }
                            else setCount(start);
                        }, 30);
                    } else {
                        setCount(target);
                    }
                }
            },
            { threshold: 0.1 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [target]);

    return (
        <div ref={ref} className="flex flex-col items-center gap-1 px-4">
            <span className="font-mono text-2xl font-bold text-violet-400">{count}</span>
            <span className="text-xs text-zinc-500 text-center whitespace-nowrap">{label}</span>
        </div>
    );
}

// ─── Role Badges ───────────────────────────────────────────────────────────────
const BADGES = [
    { label: "LangGraph", color: "glass-violet" },
    { label: "RAG Pipelines", color: "glass-cyan" },
    { label: "Agentic Systems", color: "glass-violet" },
    { label: "NLP / Transformers", color: "glass-cyan" },
    { label: "Django Backends", color: "glass-emerald" },
    { label: "Vector DBs", color: "glass-emerald" },
];

// ─── Main Hero Component ───────────────────────────────────────────────────────
export function HeroTerminal() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-14">
            {/* Neural canvas background */}
            <div className="absolute inset-0 z-0">
                <NeuralCanvas />
            </div>

            {/* Aurora glows */}
            <div
                className="aurora aurora-violet absolute"
                style={{ width: "500px", height: "500px", top: "10%", left: "55%", transform: "translate(-50%,-50%)" }}
                aria-hidden="true"
            />
            <div
                className="aurora aurora-cyan absolute"
                style={{ width: "300px", height: "300px", top: "70%", left: "20%", animationDelay: "3s" }}
                aria-hidden="true"
            />

            {/* Dot grid */}
            <div className="absolute inset-0 bg-grid opacity-60 z-0" aria-hidden="true" />

            {/* Content — split layout */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                {/* LEFT — Text content */}
                <div className="flex-1 w-full">
                    {/* Terminal label */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mb-6"
                    >
                        <span className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500 bg-zinc-900/60 border border-zinc-800 rounded-md px-3 py-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            SYSTEM ONLINE — Nehit D. Vasavada — AI Systems Engineer
                        </span>
                    </motion.div>

                    {/* Typewriter */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="mb-6 h-6"
                    >
                        <Typewriter />
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] mb-6"
                    >
                        <span className="text-white">Designing</span>
                        <br />
                        <span className="bg-gradient-to-r from-violet-400 via-violet-300 to-cyan-400 bg-clip-text text-transparent">
                            Autonomous
                        </span>
                        <br />
                        <span className="text-white/90">AI Systems.</span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="text-zinc-400 text-base md:text-lg max-w-xl leading-relaxed mb-8"
                    >
                        I architect and deploy AI pipelines — from multi-agent orchestration with{" "}
                        <span className="text-violet-400 font-medium">LangGraph</span> to production{" "}
                        <span className="text-cyan-400 font-medium">RAG systems</span> and{" "}
                        <span className="text-emerald-400 font-medium">transformer-based NLP</span>.
                        Research-backed. Production-ready.
                    </motion.p>

                    {/* Badges */}
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-wrap gap-2 mb-10"
                    >
                        {BADGES.map((b) => (
                            <motion.span
                                key={b.label}
                                variants={fadeUp}
                                className={`${b.color} font-mono text-xs px-3 py-1.5 rounded-full text-zinc-300`}
                            >
                                {b.label}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="flex flex-wrap gap-4"
                    >
                        <a
                            href="#systems"
                            className="group flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-[0_0_24px_rgba(124,58,237,0.4)]"
                        >
                            View Deployed Systems
                            <ArrowDown size={16} className="transition-transform group-hover:translate-y-1" />
                        </a>
                        <a
                            href="https://github.com/nehit07"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 glass border px-6 py-3 rounded-xl font-semibold text-sm text-zinc-300 hover:text-white hover:border-zinc-500 transition-all duration-200"
                        >
                            <Github size={16} />
                            GitHub
                        </a>
                        <a
                            href="https://www.linkedin.com/in/nehitvasavada/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 glass border px-6 py-3 rounded-xl font-semibold text-sm text-zinc-300 hover:text-white hover:border-zinc-500 transition-all duration-200"
                        >
                            <Linkedin size={16} />
                            LinkedIn
                        </a>
                    </motion.div>
                </div>

                {/* RIGHT — Avatar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="shrink-0 flex items-center justify-center"
                >
                    <div
                        className="relative"
                        style={{ animation: "hero-float 6s ease-in-out infinite" }}
                    >
                        {/* Ambient glow behind the image */}
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: "radial-gradient(circle, rgba(124,58,237,0.35) 0%, rgba(6,182,212,0.12) 50%, transparent 70%)",
                                filter: "blur(40px)",
                                transform: "scale(1.5)",
                            }}
                            aria-hidden="true"
                        />
                        {/* Image */}
                        <Image
                            src="/avatar.png"
                            alt="Nehit Vasavada — AI Systems Engineer"
                            width={280}
                            height={280}
                            className="relative rounded-full object-cover w-[200px] h-[200px] md:w-[240px] md:h-[240px] lg:w-[280px] lg:h-[280px]"
                            style={{
                                filter: "drop-shadow(0 0 40px rgba(124,58,237,0.4)) drop-shadow(0 0 16px rgba(6,182,212,0.15))",
                            }}
                            priority
                        />
                    </div>
                </motion.div>
            </div>

            {/* System Metrics — stays full width below */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.85, duration: 0.5 }}
                    className="glass border border-white/5 rounded-2xl py-6 px-4 flex flex-wrap justify-center gap-2 divide-x divide-white/5"
                >
                    {METRICS.map((m) => (
                        <MetricCounter key={m.label} target={m.value} label={m.label} />
                    ))}
                </motion.div>
            </div>

            {/* Scroll cue */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
            >
                <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">scroll</span>
                <div className="w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent animate-pulse" />
            </motion.div>
        </section>
    );
}
