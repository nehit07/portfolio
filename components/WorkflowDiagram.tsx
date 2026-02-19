"use client";

import { motion } from "framer-motion";

export function WorkflowDiagram() {
    return (
        <div className="flex items-center justify-between w-full h-full px-8 opacity-80">
            {/* Node 1: Research */}
            <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/50 flex items-center justify-center text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    Draft
                </div>
                <span className="text-[10px] font-mono text-blue-400/80 uppercase tracking-wider">Research</span>
            </div>

            {/* Connector 1 */}
            <div className="flex-1 h-[2px] bg-neutral-800 relative mx-2">
                <motion.div
                    className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                    animate={{ left: ["-30%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* Node 2: Plan */}
            <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400/50 flex items-center justify-center text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    Plan
                </div>
                <span className="text-[10px] font-mono text-purple-400/80 uppercase tracking-wider">Plan</span>
            </div>

            {/* Connector 2 */}
            <div className="flex-1 h-[2px] bg-neutral-800 relative mx-2">
                <motion.div
                    className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                    animate={{ left: ["-30%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                />
            </div>

            {/* Node 3: Write */}
            <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    Write
                </div>
                <span className="text-[10px] font-mono text-emerald-400/80 uppercase tracking-wider">Writer</span>
            </div>

        </div>
    );
}
