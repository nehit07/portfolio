import type { Variants } from "framer-motion";

// ─── Easing ───────────────────────────────────────────────────────────────────
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

// ─── Base Variants ────────────────────────────────────────────────────────────

export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: EASE_OUT_EXPO },
    },
};

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.4 },
    },
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: EASE_OUT_EXPO },
    },
};

export const slideLeft: Variants = {
    hidden: { opacity: 0, x: -36 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.55, ease: EASE_OUT_EXPO },
    },
};

export const slideRight: Variants = {
    hidden: { opacity: 0, x: 36 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.55, ease: EASE_OUT_EXPO },
    },
};

export const nodeSpring: Variants = {
    hidden: { opacity: 0, scale: 0.4 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 20 },
    },
};

// ─── Container Variants (for stagger) ─────────────────────────────────────────

export const stagger: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08, delayChildren: 0 },
    },
};

export const staggerSlow: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};

export const staggerFast: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.05 },
    },
};

// ─── Section Defaults ─────────────────────────────────────────────────────────

export const VIEWPORT_ONCE = { once: true, margin: "-80px" } as const;
