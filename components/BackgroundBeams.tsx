"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    const beamsRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = beamsRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number; y: number; speed: number; opacity: number; size: number }[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const particleCount = 40; // Reduced count for subtlety
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    speed: 0.2 + Math.random() * 0.5,
                    opacity: Math.random() * 0.5,
                    size: Math.random() * 2,
                });
            }
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw particles (stars)
            particles.forEach((p) => {
                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
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
    }, []);

    return (
        <div
            className={cn(
                "fixed inset-0 z-0 pointer-events-none transition-opacity duration-[2000ms]",
                className
            )}
        >
            {/* Deep Gradient Background */}
            <div className="absolute inset-0 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />

            {/* Canvas for Particles */}
            <canvas ref={beamsRef} className="absolute inset-0 w-full h-full opacity-40" />
        </div>
    );
};
