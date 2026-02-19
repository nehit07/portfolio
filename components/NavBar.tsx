"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

export function NavBar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [mobileOpen, setMobileOpen] = useState(false);
    const { scrollY } = useScroll();
    const backdropBlur = useTransform(scrollY, [0, 60], [8, 20]);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // ── Scroll detection ───────────────────────────────────────────────
    useEffect(() => {
        const unsub = scrollY.on("change", (v) => setScrolled(v > 40));
        return unsub;
    }, [scrollY]);

    // ── Active section tracking via IntersectionObserver ────────────────
    useEffect(() => {
        const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));
        const observers: IntersectionObserver[] = [];

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;

            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(id);
                    }
                },
                { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
            );
            obs.observe(el);
            observers.push(obs);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    // ── Lock body scroll when mobile drawer is open ────────────────────
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    const handleNavClick = useCallback((href: string) => {
        setMobileOpen(false);
        // Smooth scroll handled by CSS `scroll-behavior: smooth` on <html>
        const el = document.getElementById(href.slice(1));
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, []);

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
                style={{
                    background: scrolled
                        ? isDark
                            ? "rgba(8,8,16,0.85)"
                            : "rgba(248,248,252,0.88)"
                        : "transparent",
                    borderBottom: scrolled
                        ? `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`
                        : "1px solid transparent",
                    backdropFilter: `blur(${backdropBlur}px)`,
                    WebkitBackdropFilter: `blur(${backdropBlur}px)`,
                }}
            >
                <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
                    {/* Logo / Mark */}
                    <Link
                        href="/"
                        className={`text-lg font-extrabold tracking-tight transition-colors ${isDark ? "text-white hover:text-violet-300" : "text-zinc-900 hover:text-violet-600"}`}
                    >
                        Nehit<span className="text-violet-500">.</span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <nav className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => {
                            const isActive = activeSection === link.href.slice(1);
                            return (
                                <button
                                    key={link.href}
                                    onClick={() => handleNavClick(link.href)}
                                    className="nav-link relative text-xs font-mono uppercase tracking-widest transition-colors duration-200 py-1"
                                    style={{
                                        color: isActive
                                            ? isDark ? "#e4e4e7" : "#18181b"
                                            : isDark ? "#71717a" : "#71717a",
                                    }}
                                >
                                    {link.label}
                                    {/* Active indicator */}
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-active"
                                            className="absolute -bottom-1 left-0 right-0 h-px bg-violet-500"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Right side — Theme Toggle + Status + Hamburger */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        {/* Status dot — desktop only */}
                        <div className="hidden sm:flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="font-mono text-xs text-emerald-500">
                                Available
                            </span>
                        </div>
                        {/* Hamburger — mobile only */}
                        <button
                            onClick={() => setMobileOpen((v) => !v)}
                            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
                            style={{
                                color: isDark ? "#e4e4e7" : "#18181b",
                                background: mobileOpen
                                    ? isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"
                                    : "transparent",
                            }}
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        >
                            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* ── Mobile Drawer ─────────────────────────────────────────────── */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-40 md:hidden"
                            style={{ background: isDark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.3)" }}
                            onClick={() => setMobileOpen(false)}
                        />
                        {/* Drawer panel */}
                        <motion.nav
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed top-14 left-0 right-0 z-45 md:hidden px-6 pb-6 pt-4"
                            style={{
                                background: isDark ? "rgba(8,8,16,0.96)" : "rgba(248,248,252,0.97)",
                                backdropFilter: "blur(24px)",
                                WebkitBackdropFilter: "blur(24px)",
                                borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                            }}
                        >
                            <div className="flex flex-col gap-1">
                                {NAV_LINKS.map((link) => {
                                    const isActive = activeSection === link.href.slice(1);
                                    return (
                                        <button
                                            key={link.href}
                                            onClick={() => handleNavClick(link.href)}
                                            className="text-left font-mono text-sm uppercase tracking-widest px-4 py-3 rounded-xl transition-all duration-200"
                                            style={{
                                                color: isActive
                                                    ? isDark ? "#f4f4f5" : "#09090b"
                                                    : isDark ? "#71717a" : "#71717a",
                                                background: isActive
                                                    ? isDark ? "rgba(124,58,237,0.1)" : "rgba(124,58,237,0.06)"
                                                    : "transparent",
                                                borderLeft: isActive ? "2px solid #7c3aed" : "2px solid transparent",
                                            }}
                                        >
                                            {link.label}
                                        </button>
                                    );
                                })}
                            </div>
                            {/* Mobile status */}
                            <div className="flex items-center gap-2 mt-4 pt-4" style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` }}>
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                </span>
                                <span className="font-mono text-xs text-emerald-500">Available for opportunities</span>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
