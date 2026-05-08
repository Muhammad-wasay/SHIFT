"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, Sparkles, X, ChevronRight, Zap, Brain, ShieldAlert } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  type?: "advice" | "action" | "insight";
}

export default function AssistantChat({ 
  load, 
  tasksCount, 
  onClose 
}: { 
  load: number; 
  tasksCount: number; 
  onClose: () => void 
}) {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: "1", 
      role: "assistant", 
      content: "Welcome to SHIFT OS. I'm your cognitive copilot. Your current mental load is moderate. How can I help you achieve focus today?",
      type: "advice"
    }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simulate AI Response based on context
    setTimeout(() => {
      let response = "I'm analyzing your orbital mechanics...";
      let type: Message["type"] = "advice";

      if (input.toLowerCase().includes("overwhelmed")) {
        response = `I detect a mental load of ${load}%. I recommend lifting 3 non-essential tasks and entering a 20-minute Orbital Focus session. Shall I clear your schedule?`;
        type = "insight";
      } else if (input.toLowerCase().includes("plan")) {
        response = `Based on your peak energy window (9-11 AM), I've prioritized your high-impact work. You have ${tasksCount} items in orbit. Let's launch the most critical one first.`;
        type = "action";
      }

      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: "assistant", 
        content: response,
        type
      }]);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      className="glass-premium fixed bottom-8 right-8 w-96 h-[600px] rounded-[2.5rem] flex flex-col overflow-hidden z-[200] border-white/10"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-shift-purple/20 flex items-center justify-center border border-shift-purple/30">
            <Brain className="w-5 h-5 text-shift-purple" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase text-white">SHIFT Assistant</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-bold text-emerald-500/80 uppercase tracking-tighter">System Online</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scrollbar-hide">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed ${
                msg.role === "user" 
                  ? "bg-shift-purple text-white rounded-tr-none shadow-lg shadow-shift-purple/20" 
                  : "bg-white/[0.03] text-zinc-300 border border-white/5 rounded-tl-none"
              }`}>
                {msg.type === "insight" && <ShieldAlert className="w-4 h-4 text-rose-400 mb-2" />}
                {msg.type === "action" && <Zap className="w-4 h-4 text-amber-400 mb-2" />}
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="p-6 border-t border-white/5 bg-white/[0.01]">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask your copilot..."
            className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-shift-purple/50 transition-all"
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 top-2 p-3 bg-shift-purple rounded-xl text-white hover:scale-105 active:scale-95 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[9px] text-zinc-500 hover:text-white hover:bg-white/10 transition-all uppercase font-bold tracking-widest">
            Plan Day
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[9px] text-zinc-500 hover:text-white hover:bg-white/10 transition-all uppercase font-bold tracking-widest">
            Analyze Load
          </button>
        </div>
      </div>
    </motion.div>
  );
}
