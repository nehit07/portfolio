"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoCardProps {
    children: ReactNode;
    className?: string;
    colSpan?: 1 | 2 | 3 | 4;
    rowSpan?: 1 | 2;
    title?: string;
    subtitle?: string;
    href?: string; // Optional link
}

export const BentoCard = ({
    children,
    className,
    colSpan = 1,
    rowSpan = 1,
    title,
    subtitle,
    href,
}: BentoCardProps) => {
    const Wrapper = href ? motion.a : motion.div;

    return (
        <Wrapper
            href={href}
            className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 p-6 shadow-xl transition-all hover:border-neutral-700 hover:shadow-2xl",
                // Grid spanning logic
                colSpan === 1 && "col-span-1",
                colSpan === 2 && "col-span-1 md:col-span-2",
                colSpan === 3 && "col-span-1 md:col-span-3",
                rowSpan === 2 && "row-span-2",
                className
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
        >
            <div className="z-10 flex flex-col gap-1">
                {children}
            </div>

            {(title || subtitle) && (
                <div className="z-10 mt-4">
                    {subtitle && (
                        <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                            {subtitle}
                        </p>
                    )}
                    {title && (
                        <h3 className="text-xl font-semibold text-neutral-100 group-hover:text-white">
                            {title}
                        </h3>
                    )}
                </div>
            )}

            {/* Subtle Gradient Glow Effect */}
            <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, center) var(--mouse-y, center), rgba(255,255,255,0.06), transparent 40%)`
                }}
            />
        </Wrapper>
    );
};
