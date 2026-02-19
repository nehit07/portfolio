"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200"
            style={{
                background: isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(0,0,0,0.06)",
                border: isDark
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid rgba(0,0,0,0.1)",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
                {isDark ? (
                    <Sun size={16} className="text-amber-400" />
                ) : (
                    <Moon size={16} className="text-violet-500" />
                )}
            </motion.div>
        </motion.button>
    );
}
