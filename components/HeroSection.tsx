"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";

export function HeroSection() {
    return (
        <section className="min-h-[80vh] flex flex-col justify-center px-4 md:px-0 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
            >
                <span className="text-emerald-400 font-mono text-sm tracking-wider mb-4 block">
                    HI, I'M NEHIT
                </span>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
                    Building <span className="text-neutral-500">Agentic AI</span> & <br />
                    Scalable <span className="text-purple-400">Backends</span>.
                </h1>
                <p className="text-lg text-neutral-400 max-w-xl leading-relaxed mb-8">
                    GenAI Engineer specializing in **LangGraph**, **RAG**, and **Django**.
                    I build production-ready systems that bridge the gap between AI research and real-world application.
                </p>

                <div className="flex flex-wrap gap-4">
                    <a
                        href="#projects"
                        className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-neutral-200 transition-colors"
                    >
                        View Projects <ArrowRight size={18} />
                    </a>
                    <a
                        href="https://github.com/nehit07"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 border border-neutral-700 text-white px-6 py-3 rounded-full font-medium hover:bg-neutral-800 transition-colors"
                    >
                        <Github size={18} /> GitHub
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
