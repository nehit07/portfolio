"use client";

import { motion } from "framer-motion";
import { stagger, fadeUp, VIEWPORT_ONCE } from "@/lib/animations";
import { BookOpen, Award, Calendar, MapPin } from "lucide-react";
import { useTheme } from "./ThemeProvider";

// ─── Certifications ────────────────────────────────────────────────────────────
const CERTIFICATIONS = [
    {
        title: "Deep Learning and Neural Networks",
        issuer: "Udemy",
        year: "2024",
        accent: "#7c3aed",
    },
    {
        title: "Google Cybersecurity",
        issuer: "Coursera",
        year: "2024",
        accent: "#06b6d4",
    },
    {
        title: "Generative AI",
        issuer: "LinkedIn Learning",
        year: "2024",
        accent: "#10b981",
    },
];

// ─── Component ─────────────────────────────────────────────────────────────────
export function PublicationsSection() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section id="publications" className="relative py-28 overflow-hidden">
            {/* Aurora */}
            <div
                className="aurora aurora-cyan absolute"
                style={{ width: "450px", height: "450px", top: "10%", left: "-80px", opacity: isDark ? 1 : 0.4 }}
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
                        RESEARCH &amp; CREDENTIALS
                    </motion.span>
                    <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold" style={{ color: "var(--text-heading)" }}>
                        Publications{" "}
                        <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                            &amp; Certifications
                        </span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="mt-4 max-w-xl" style={{ color: "var(--text-secondary)" }}>
                        Peer-reviewed research and applied coursework that back up the engineering work.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Featured Publication — 3 cols */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={VIEWPORT_ONCE}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-3 glass rounded-3xl p-8 md:p-10 hover-card"
                        style={{ borderColor: "rgba(6,182,212,0.2)" }}
                    >
                        <div className="flex items-start gap-4 mb-6">
                            <span
                                className="p-3 rounded-xl shrink-0"
                                style={{ background: "rgba(6,182,212,0.15)", border: "1px solid rgba(6,182,212,0.3)", color: "#22d3ee" }}
                            >
                                <BookOpen size={20} />
                            </span>
                            <div>
                                <span className="font-mono text-xs uppercase tracking-widest block mb-2" style={{ color: "var(--text-dim)" }}>
                                    Published Research Paper
                                </span>
                                <h3 className="text-xl md:text-2xl font-bold leading-snug" style={{ color: "var(--text-heading)" }}>
                                    &ldquo;Bridging Traditional Techniques and AI-Driven Approach in Image Deconvolution&rdquo;
                                </h3>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mb-6">
                            <span className="flex items-center gap-2 font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
                                <Calendar size={13} style={{ color: "var(--text-dim)" }} />
                                9th ICTCS (2024)
                            </span>
                            <span className="flex items-center gap-2 font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
                                <MapPin size={13} style={{ color: "var(--text-dim)" }} />
                                Jaipur, India
                            </span>
                        </div>

                        <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                            Presented at the 9th International Conference on Trends in Computational and Cognitive Engineering,
                            examining how classical image-deconvolution techniques can be combined with AI-driven approaches to
                            improve restoration quality. Published by Springer.
                        </p>

                        <span
                            className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-lg border"
                            style={{ color: "#22d3ee", borderColor: "rgba(6,182,212,0.4)", background: "rgba(6,182,212,0.1)" }}
                        >
                            Publisher: Springer
                        </span>
                    </motion.div>

                    {/* Certifications — 2 cols */}
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT_ONCE}
                        className="lg:col-span-2 flex flex-col gap-4"
                    >
                        {CERTIFICATIONS.map((cert) => (
                            <motion.div
                                key={cert.title}
                                variants={fadeUp}
                                className="glass rounded-xl px-5 py-4 flex items-start gap-4 hover-card"
                                style={{ borderColor: `${cert.accent}15` }}
                            >
                                <span
                                    className="p-2 rounded-lg shrink-0 mt-0.5"
                                    style={{ background: `${cert.accent}18`, color: cert.accent }}
                                >
                                    <Award size={15} />
                                </span>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-medium" style={{ color: "var(--text-heading)" }}>
                                        {cert.title}
                                    </span>
                                    <span className="font-mono text-xs mt-1" style={{ color: "var(--text-dim)" }}>
                                        {cert.issuer} · {cert.year}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
