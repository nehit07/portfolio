"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeProvider";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    const beamsRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = beamsRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const isDark = theme === "dark";
        let animationFrameId: number;
        let particles: { x: number; y: number; speed: number; opacity: number; size: number }[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const particleCount = 40;
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    speed: 0.2 + Math.random() * 0.5,
                    opacity: Math.random() * (isDark ? 0.5 : 0.25),
                    size: Math.random() * 2,
                });
            }
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw particles (stars)
            particles.forEach((p) => {
                if (isDark) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                } else {
                    ctx.fillStyle = `rgba(124, 58, 237, ${p.opacity * 0.5})`;
                }
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // Update position (slow float upwards)
                p.y -= p.speed;
                if (p.y < 0) {
                    p.y = canvas.height;
                    p.x = Math.random() * canvas.width;
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        window.addEventListener("resize", resize);
        resize();
        render();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <div
            className={cn(
                "fixed inset-0 z-0 pointer-events-none transition-opacity duration-[2000ms]",
                className
            )}
        >
            {/* Deep Gradient Background — adapts to theme */}
            <div
                className="absolute inset-0"
                style={{
                    background: theme === "dark"
                        ? "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120,119,198,0.15), rgba(255,255,255,0))"
                        : "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120,119,198,0.08), rgba(255,255,255,0))",
                }}
            />

            {/* Canvas for Particles */}
            <canvas ref={beamsRef} className="absolute inset-0 w-full h-full opacity-40" />
        </div>
    );
};
