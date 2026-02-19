"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

interface ProjectSectionProps {
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    imageContent: ReactNode; // Pass the diagram or image component here
    githubUrl?: string;
    demoUrl?: string;
    align?: "left" | "right";
}

export function ProjectSection({
    title,
    subtitle,
    description,
    tags,
    imageContent,
    githubUrl,
    demoUrl,
    align = "left",
}: ProjectSectionProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="py-24 max-w-6xl mx-auto px-4 md:px-0"
        >
            <div className={`flex flex-col md:flex-row gap-12 items-center ${align === "right" ? "md:flex-row-reverse" : ""}`}>

                {/* Visual Side */}
                <div className="flex-1 w-full glass rounded-3xl overflow-hidden aspect-video flex items-center justify-center relative group transition-all duration-500 hover:border-emerald-500/20 hover:shadow-[0_0_50px_-12px_rgba(16,185,129,0.2)]">
                    {/* Background Gradient Blob */}
                    <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 opacity-0 group-hover:animate-scan" />

                    <div className="relative z-10 w-full h-full p-8 md:p-12 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                        {imageContent}
                    </div>
                </div>

                {/* Text Side */}
                <div className="flex-1 space-y-6">
                    <div>
                        <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest">{subtitle}</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">{title}</h2>
                    </div>

                    <p className="text-neutral-400 text-lg leading-relaxed">
                        {description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-neutral-800 text-neutral-300 text-sm rounded-full border border-neutral-700">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-4 pt-2">
                        {githubUrl && (
                            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-emerald-400 transition-colors font-medium">
                                <Github size={20} /> Code
                            </a>
                        )}
                        {demoUrl && (
                            <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-emerald-400 transition-colors font-medium">
                                <ExternalLink size={20} /> Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
