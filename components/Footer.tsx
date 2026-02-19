"use client";

import { useTheme } from "./ThemeProvider";

export function Footer() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <footer
            className="py-10 text-center"
            style={{ borderTop: "1px solid var(--border-default)" }}
        >
            <div className="flex flex-col items-center gap-3">
                <span className={`font-mono text-xs uppercase tracking-widest ${isDark ? "text-zinc-600" : "text-zinc-400"}`}>
                    SYSTEM STATUS
                </span>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="font-mono text-xs text-emerald-500">All systems operational</span>
                </div>
                <p className={`font-mono text-xs mt-2 ${isDark ? "text-zinc-700" : "text-zinc-400"}`}>
                    © 2026 Nehit D. Vasavada
                </p>
            </div>
        </footer>
    );
}
