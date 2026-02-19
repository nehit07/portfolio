"use client";

import { cn } from "@/lib/utils";

export const Marquee = ({
    items,
    speed = "fast",
    direction = "left",
    className,
}: {
    items: string[];
    speed?: "fast" | "normal" | "slow";
    direction?: "left" | "right";
    className?: string;
}) => {
    const duration = {
        fast: "20s",
        normal: "40s",
        slow: "60s",
    };

    return (
        <div
            className={cn(
                "group flex overflow-hidden p-2 gap-12",
                className
            )}
            style={{
                maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
            }}
        >
            <div
                className={cn(
                    "flex shrink-0 gap-12 min-w-full",
                    direction === "left" ? "animate-marquee" : "animate-marquee-reverse"
                )}
                style={{
                    animationDuration: duration[speed]
                }}
            >
                {items.map((item, idx) => (
                    <span
                        key={idx}
                        className="px-3 py-1 text-xs md:text-sm bg-neutral-800 border border-neutral-700 rounded-md text-neutral-300 whitespace-nowrap"
                    >
                        {item}
                    </span>
                ))}
                {items.map((item, idx) => (
                    <span
                        key={`dup-${idx}`}
                        className="px-3 py-1 text-xs md:text-sm bg-neutral-800 border border-neutral-700 rounded-md text-neutral-300 whitespace-nowrap"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};
