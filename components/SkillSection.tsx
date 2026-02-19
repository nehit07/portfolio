"use client";

import { motion } from "framer-motion";

const skills = {
    "Agentic AI": ["LangChain", "LangGraph", "RAG", "Ollama", "HuggingFace", "Vector DBs (Weaviate)"],
    "Backend Engineering": ["Python", "Django", "PostgreSQL", "REST APIs", "Docker", "AWS"],
    "Frontend & Tools": ["TypeScript", "Next.js", "React", "Tailwind CSS", "Git/GitHub", "Linux"],
};

export function SkillSection() {
    return (
        <section className="py-24 max-w-4xl mx-auto px-4 md:px-0">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-12"
            >
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Arsenal</h2>
                    <p className="text-neutral-400">The tools I use to build intelligent systems.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {Object.entries(skills).map(([category, items], idx) => (
                        <div key={category} className="space-y-4 glass p-6 rounded-2xl hover:bg-white/5 transition-colors duration-300">
                            <h3 className="text-lg font-semibold text-emerald-400 font-mono h-8 border-b border-white/10 pb-2 mb-4 flex items-center justify-between">
                                <span>0{idx + 1}. {category}</span>
                            </h3>
                            <ul className="space-y-3">
                                {items.map((skill) => (
                                    <li key={skill} className="text-neutral-300 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-emerald-500/50 rounded-full shadow-[0_0_5px_currentColor]" />
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
