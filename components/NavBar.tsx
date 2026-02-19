"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
    { label: "Systems", href: "#systems" },
    { label: "Stack", href: "#stack" },
    { label: "Log", href: "#log" },
    { label: "Node", href: "#node" },
];

export function NavBar() {
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();
    const backdropBlur = useTransform(scrollY, [0, 60], [8, 20]);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    useEffect(() => {
        const unsub = scrollY.on("change", (v) => setScrolled(v > 40));
        return unsub;
    }, [scrollY]);

    return (
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

                {/* Nav Links */}
                <nav className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={`text-xs font-mono uppercase tracking-widest transition-colors duration-200 ${isDark ? "text-zinc-500 hover:text-zinc-200" : "text-zinc-500 hover:text-zinc-800"}`}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Right side — Theme Toggle + Status */}
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="font-mono text-xs text-emerald-500 hidden sm:block">
                            Available
                        </span>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
