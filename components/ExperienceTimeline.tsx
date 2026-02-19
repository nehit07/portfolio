"use client";

import { cn } from "@/lib/utils";
import { Briefcase, GraduationCap } from "lucide-react";

export const ExperienceTimeline = () => {
    const events = [
        {
            year: "Sept 2025 - Present",
            title: "Software Developer Intern",
            company: "WeServe Codes",
            desc: "Building Agentic AI systems & Django backends.",
            icon: <Briefcase size={14} />,
            current: true,
        },
        {
            year: "2023 - Present",
            title: "B.Tech Computer Engineering",
            company: "Charotar University",
            desc: "CGPA: 8.31",
            icon: <GraduationCap size={14} />,
            current: false,
        },
        {
            year: "2023",
            title: "Diploma Computer Engineering",
            company: "Dr. Subhash Technical Campus",
            desc: "CGPA: 9.90",
            icon: <GraduationCap size={14} />,
            current: false,
        }
    ];

    return (
        <div className="flex flex-col gap-8 p-4">
            {events.map((e, i) => (
                <div key={i} className="flex gap-4 relative group glass p-6 rounded-2xl transition-all duration-300 hover:border-emerald-500/30">
                    {/* Vertical Line */}
                    {i !== events.length - 1 && (
                        <div className="absolute left-[11px] top-7 bottom-[-16px] w-[2px] bg-neutral-800 group-hover:bg-neutral-700 transition-colors" />
                    )}

                    <div className={cn(
                        "relative z-10 w-6 h-6 rounded-full border flex items-center justify-center shrink-0",
                        e.current ? "bg-emerald-500/10 border-emerald-500 text-emerald-500" : "bg-neutral-900 border-neutral-700 text-neutral-500"
                    )}>
                        {e.icon}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs text-neutral-500 font-mono">{e.year}</span>
                        <span className="text-sm font-semibold text-neutral-200">{e.title}</span>
                        <span className="text-xs text-neutral-400">{e.company}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};
