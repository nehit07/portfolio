"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "Hello! I'm Nehit's AI Agent. I've been trained on his resume and GitHub. Ask me anything about his skills in Agentic AI or Django!",
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate RAG Latency & Response
        setTimeout(() => {
            let responseText = "I can tell you about that. ";
            const lowerInput = userMsg.content.toLowerCase();

            if (lowerInput.includes("lagngraph") || lowerInput.includes("agent")) {
                responseText = "Nehit built an **AI Blog Generator** using **LangGraph**. It uses a multi-agent workflow where one agent researches via Tavily API, and another writes the content. It's a stateful, production-ready system.";
            } else if (lowerInput.includes("django") || lowerInput.includes("backend")) {
                responseText = "He uses **Django** for robust backends. At WeServe Codes, he built the API services that power the GenAI applications, integrating PostgreSQL for structured data storage.";
            } else if (lowerInput.includes("rag") || lowerInput.includes("research")) {
                responseText = "Nehit developed a **Research Paper RAG system** that lets users chat with PDFs. It uses Weaviate for vector storage and provides source citations for every answer.";
            } else {
                responseText = "Nehit is a **Generative AI Engineer** intern with strong skills in Python, LangChain, and Full-Stack development. Check out his projects below!";
            }

            const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: responseText };
            setMessages((prev) => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-full w-full bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2 p-3 border-b border-neutral-800 bg-neutral-900/80">
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-mono text-neutral-400">nehit-rag-agent-v1</span>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-neutral-700">
                <AnimatePresence>
                    {messages.map((m) => (
                        <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                        >
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${m.role === "assistant" ? "bg-purple-500/10 text-purple-400" : "bg-blue-500/10 text-blue-400"}`}>
                                {m.role === "assistant" ? <Bot size={16} /> : <User size={16} />}
                            </div>
                            <div className={`rounded-lg p-3 text-sm max-w-[80%] ${m.role === "assistant" ? "bg-neutral-800 text-neutral-200" : "bg-blue-600/20 text-blue-100 border border-blue-500/20"}`}>
                                <p dangerouslySetInnerHTML={{ __html: m.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                            </div>
                        </motion.div>
                    ))}
                    {isTyping && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                            <div className="h-8 w-8 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center"><Bot size={16} /></div>
                            <div className="bg-neutral-800 rounded-lg p-3 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce"></span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Input */}
            <div className="p-3 border-t border-neutral-800 bg-neutral-900/80">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Ask about my projects..."
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-lg py-2 pl-3 pr-10 text-sm focus:outline-none focus:border-purple-500 text-neutral-200 placeholder:text-neutral-600"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="absolute right-2 text-purple-500 hover:text-purple-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
