"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2, Minimize2 } from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Message {
    role: "user" | "assistant";
    content: string;
}

// ─── Starter prompts ───────────────────────────────────────────────────────────
const STARTERS = [
    "What does Nehit specialize in?",
    "Tell me about the AI Blog Generator",
    "Is Nehit open to new roles?",
    "What's his tech stack?",
];

// ─── Typing Indicator ─────────────────────────────────────────────────────────
function TypingDots() {
    return (
        <div className="flex items-center gap-1 px-1 py-0.5">
            {[0, 1, 2].map((i) => (
                <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-violet-400"
                    style={{
                        animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }}
                />
            ))}
            <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
        </div>
    );
}

// ─── Chat Bubble ───────────────────────────────────────────────────────────────
function ChatBubble({ msg }: { msg: Message }) {
    const isUser = msg.role === "user";
    return (
        <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
        >
            {/* Avatar */}
            <div
                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono mt-0.5"
                style={
                    isUser
                        ? { background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", color: "#a78bfa" }
                        : { background: "rgba(6,182,212,0.15)", border: "1px solid rgba(6,182,212,0.3)", color: "#67e8f9" }
                }
            >
                {isUser ? <User size={12} /> : <Bot size={12} />}
            </div>

            {/* Bubble */}
            <div
                className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
                style={
                    isUser
                        ? {
                            background: "rgba(124,58,237,0.18)",
                            border: "1px solid rgba(124,58,237,0.25)",
                            color: "#e4e4e7",
                            borderBottomRightRadius: "4px",
                        }
                        : {
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            color: "#d4d4d8",
                            borderBottomLeftRadius: "4px",
                        }
                }
            >
                {msg.content}
            </div>
        </motion.div>
    );
}

// ─── Main ChatWidget ────────────────────────────────────────────────────────────
export function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "Hey! I'm NV.AI — Nehit's personal assistant. Ask me anything about his work, projects, or tech stack. 👾",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Scroll to bottom on new message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    // Focus input when chat opens
    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [open]);

    const send = async (text: string) => {
        const trimmed = text.trim();
        if (!trimmed || loading) return;

        const userMsg: Message = { role: "user", content: trimmed };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
                }),
            });

            const data = await res.json();
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.reply || "I couldn't fetch a response. Try again!" },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Looks like there was a network issue. Try again!" },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send(input);
        }
    };

    return (
        <>
            {/* ─── Chat Panel ─────────────────────────────────────────────────────── */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="chat-panel"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed bottom-24 right-5 sm:right-8 z-50 w-[min(380px,calc(100vw-2.5rem))] flex flex-col"
                        style={{
                            height: "520px",
                            background: "rgba(10,10,22,0.92)",
                            backdropFilter: "blur(24px)",
                            WebkitBackdropFilter: "blur(24px)",
                            border: "1px solid rgba(124,58,237,0.25)",
                            borderRadius: "20px",
                            boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
                        }}
                    >
                        {/* Header */}
                        <div
                            className="flex items-center justify-between px-4 py-3 border-b"
                            style={{ borderColor: "rgba(255,255,255,0.06)" }}
                        >
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(124,58,237,0.25)", border: "1px solid rgba(124,58,237,0.4)" }}>
                                    <Bot size={15} className="text-violet-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white leading-none">NV.AI</p>
                                    <p className="font-mono text-xs text-emerald-400 mt-0.5">Online</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-all"
                                aria-label="Close chat"
                            >
                                <X size={15} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 min-h-0">
                            {messages.map((msg, i) => (
                                <ChatBubble key={i} msg={msg} />
                            ))}
                            {loading && (
                                <div className="flex gap-2.5 flex-row">
                                    <div className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(6,182,212,0.15)", border: "1px solid rgba(6,182,212,0.3)", color: "#67e8f9" }}>
                                        <Bot size={12} />
                                    </div>
                                    <div className="rounded-2xl rounded-bl-sm px-4 py-2.5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                                        <TypingDots />
                                    </div>
                                </div>
                            )}
                            <div ref={bottomRef} />
                        </div>

                        {/* Starter Prompts (only shown if only the greeting message exists) */}
                        {messages.length === 1 && (
                            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                                {STARTERS.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => send(s)}
                                        className="font-mono text-xs px-2.5 py-1.5 rounded-lg border text-zinc-400 hover:text-zinc-200 hover:border-violet-500/40 transition-all duration-150"
                                        style={{ background: "rgba(124,58,237,0.08)", borderColor: "rgba(124,58,237,0.2)" }}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <div
                            className="flex items-center gap-2 px-3 py-3 border-t"
                            style={{ borderColor: "rgba(255,255,255,0.06)" }}
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask about Nehit's work..."
                                disabled={loading}
                                className="flex-1 bg-transparent text-sm text-zinc-200 placeholder-zinc-600 outline-none"
                                style={{ caretColor: "#7c3aed" }}
                                aria-label="Chat input"
                            />
                            <button
                                onClick={() => send(input)}
                                disabled={!input.trim() || loading}
                                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-30"
                                style={{
                                    background: input.trim() && !loading ? "rgba(124,58,237,0.8)" : "rgba(124,58,237,0.2)",
                                    border: "1px solid rgba(124,58,237,0.4)",
                                }}
                                aria-label="Send message"
                            >
                                {loading ? (
                                    <Loader2 size={13} className="text-violet-300 animate-spin" />
                                ) : (
                                    <Send size={13} className="text-violet-200" />
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ─── Floating Trigger Button ─────────────────────────────────────────── */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setOpen((v) => !v)}
                className="fixed bottom-5 right-5 sm:right-8 z-50 w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-200"
                style={{
                    background: open
                        ? "rgba(124,58,237,0.9)"
                        : "rgba(124,58,237,0.75)",
                    border: "1px solid rgba(139,92,246,0.6)",
                    boxShadow: "0 8px 32px rgba(124,58,237,0.45), 0 0 0 1px rgba(124,58,237,0.2)",
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-label={open ? "Close chat" : "Chat with NV.AI"}
            >
                <AnimatePresence mode="wait">
                    {open ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <Minimize2 size={20} className="text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <MessageSquare size={20} className="text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pulsing ring */}
                {!open && (
                    <span className="absolute inset-0 rounded-2xl pointer-events-none">
                        <span
                            className="absolute inset-0 rounded-2xl animate-ping"
                            style={{ background: "rgba(124,58,237,0.3)", animationDuration: "2.5s" }}
                        />
                    </span>
                )}
            </motion.button>
        </>
    );
}
