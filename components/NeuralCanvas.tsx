"use client";

import { useEffect, useRef } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    opacity: number;
}

// ─── Config ────────────────────────────────────────────────────────────────────
const PARTICLE_COUNT = 72;
const CONNECTION_DISTANCE = 130;
const PARTICLE_SPEED = 0.3;
const MOUSE_RADIUS = 120;
const MOUSE_STRENGTH = 0.04;

export function NeuralCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const particlesRef = useRef<Particle[]>([]);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Resize handler
        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        const resizeObs = new ResizeObserver(resize);
        resizeObs.observe(canvas);

        // Mouse tracking
        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mouseleave", () => {
            mouseRef.current = { x: -9999, y: -9999 };
        });

        // Init particles
        particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * PARTICLE_SPEED,
            vy: (Math.random() - 0.5) * PARTICLE_SPEED,
            opacity: Math.random() * 0.5 + 0.2,
        }));

        const VIOLET_R = 139, VIOLET_G = 92, VIOLET_B = 246;
        const CYAN_R = 6, CYAN_G = 182, CYAN_B = 212;

        const draw = () => {
            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);

            const { x: mx, y: my } = mouseRef.current;
            const particles = particlesRef.current;

            // Update + draw particles
            for (const p of particles) {
                // Mouse repulsion/attraction
                const dx = mx - p.x;
                const dy = my - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MOUSE_RADIUS) {
                    p.vx += (dx / dist) * MOUSE_STRENGTH;
                    p.vy += (dy / dist) * MOUSE_STRENGTH;
                }

                // Dampen velocity
                p.vx *= 0.99;
                p.vy *= 0.99;

                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Wrap edges
                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;

                // Draw node
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${VIOLET_R}, ${VIOLET_G}, ${VIOLET_B}, ${p.opacity})`;
                ctx.fill();
            }

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i];
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < CONNECTION_DISTANCE) {
                        const alpha = (1 - d / CONNECTION_DISTANCE) * 0.25;
                        // Interpolate violet<->cyan based on position
                        const ratio = (a.x + b.x) / 2 / w;
                        const r = Math.round(VIOLET_R + (CYAN_R - VIOLET_R) * ratio);
                        const g = Math.round(VIOLET_G + (CYAN_G - VIOLET_G) * ratio);
                        const bv = Math.round(VIOLET_B + (CYAN_B - VIOLET_B) * ratio);
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `rgba(${r}, ${g}, ${bv}, ${alpha})`;
                        ctx.lineWidth = 0.7;
                        ctx.stroke();
                    }
                }
            }

            rafRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(rafRef.current);
            resizeObs.disconnect();
            canvas.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.7 }}
            aria-hidden="true"
        />
    );
}
