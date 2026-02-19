"use client";

import { motion } from "framer-motion";
import { stagger, fadeUp, VIEWPORT_ONCE } from "@/lib/animations";
import { Github, Linkedin, Mail, MapPin, ExternalLink } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const CONTACT_LINKS = [
    {
        icon: <Mail size={18} />,
        label: "Email",
        value: "nehitvasavada7@gmail.com",
        href: "mailto:nehitvasavada7@gmail.com",
        accent: "#7c3aed",
    },
    {
        icon: <Github size={18} />,
        label: "GitHub",
        value: "github.com/nehit07",
        href: "https://github.com/nehit07",
        accent: "#a78bfa",
    },
    {
        icon: <Linkedin size={18} />,
        label: "LinkedIn",
        value: "linkedin.com/in/nehit-vasavada",
        href: "https://www.linkedin.com/in/nehitvasavada/",
        accent: "#06b6d4",
    },
    {
        icon: <MapPin size={18} />,
        label: "Location",
        value: "Ahmedabad, Gujarat, India",
        href: null,
        accent: "#10b981",
    },
];

const AVAILABLE_FOR = [
    "Entry Level AI / ML Engineering Roles",
    "Agentic Systems Consulting",
    "Research Collaboration",
    "LangGraph / RAG Architecture Review",
];

export function ContactNode() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section id="node" className="relative py-28 overflow-hidden">
            {/* Aurora */}
            <div
                className="aurora aurora-violet absolute"
                style={{ width: "400px", height: "400px", bottom: "10%", right: "20%", opacity: isDark ? 1 : 0.4 }}
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-4xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT_ONCE}
                    className="mb-16 text-center"
                >
                    <motion.span variants={fadeUp} className="font-mono text-xs uppercase tracking-widest block mb-4" style={{ color: "var(--text-dim)" }}>
                        CONTACT NODE
                    </motion.span>
                    <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold" style={{ color: "var(--text-heading)" }}>
                        Initialize{" "}
                        <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                            Connection
                        </span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="mt-4 max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
                        Direct channels. Zero friction. Response within 24 hours.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Links */}
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT_ONCE}
                        className="flex flex-col gap-4"
                    >
                        {CONTACT_LINKS.map((link) => (
                            <motion.div key={link.label} variants={fadeUp}>
                                {link.href ? (
                                    <a
                                        href={link.href}
                                        target={link.href.startsWith("http") ? "_blank" : undefined}
                                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className="group glass rounded-xl px-5 py-4 flex items-center gap-4 hover-card"
                                        style={{ borderColor: `${link.accent}15` }}
                                    >
                                        <span
                                            className="p-2 rounded-lg transition-colors duration-200"
                                            style={{ background: `${link.accent}18`, color: link.accent }}
                                        >
                                            {link.icon}
                                        </span>
                                        <div className="flex flex-col flex-1 min-w-0">
                                            <span className="font-mono text-xs uppercase" style={{ color: "var(--text-dim)" }}>{link.label}</span>
                                            <span className="text-sm truncate group-hover:opacity-80 transition-colors" style={{ color: "var(--text-secondary)" }}>
                                                {link.value}
                                            </span>
                                        </div>
                                        <ExternalLink size={14} style={{ color: "var(--text-dim)" }} className="transition-colors" />
                                    </a>
                                ) : (
                                    <div
                                        className="glass rounded-xl px-5 py-4 flex items-center gap-4"
                                        style={{ borderColor: `${link.accent}15` }}
                                    >
                                        <span
                                            className="p-2 rounded-lg"
                                            style={{ background: `${link.accent}18`, color: link.accent }}
                                        >
                                            {link.icon}
                                        </span>
                                        <div className="flex flex-col flex-1 min-w-0">
                                            <span className="font-mono text-xs uppercase" style={{ color: "var(--text-dim)" }}>{link.label}</span>
                                            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{link.value}</span>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Available For */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT_ONCE}
                        className="flex flex-col"
                    >
                        <div
                            className="glass border rounded-2xl p-6 flex-1"
                            style={{
                                borderColor: "rgba(124,58,237,0.2)",
                                animation: "breath 3s ease-in-out infinite",
                            }}
                        >
                            <div className="flex items-center gap-2 mb-5">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                                </span>
                                <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
                                    Available For
                                </span>
                            </div>

                            <ul className="flex flex-col gap-3">
                                {AVAILABLE_FOR.map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 pt-5" style={{ borderTop: "1px solid var(--border-default)" }}>
                                <a
                                    href="mailto:nehitvasavada7@gmail.com"
                                    className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl py-3 font-semibold text-sm transition-all duration-200 hover:shadow-[0_0_24px_rgba(124,58,237,0.4)]"
                                >
                                    <Mail size={15} />
                                    Send Message
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
