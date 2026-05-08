"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Sparkles, Send, Brain, User, X, ChevronRight, Activity } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AILifeCoach({ load, energy, tasksCount, onClose }: { load: number, energy: number, tasksCount: number, onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Greetings. I've analyzed your current orbit. Your mental load is at ${load}% and energy levels are ${energy > 70 ? 'Optimal' : 'Declining'}. How can I assist your focus today?` }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      // Call the real AI Cognitive OS Assistant
      const { data, error } = await supabase.functions.invoke('cognitive-assistant', {
        body: { user_message: userMsg }
      });

      if (error) throw error;
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.advice }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Trajectory lost. I'm having trouble syncing with your cognitive database. Check your connection." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95, x: 20 }}
      className="fixed bottom-10 right-10 w-[450px] h-[700px] glass-premium rounded-[3rem] border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden z-[1000]"
    >
      {/* Header */}
      <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-shift-purple/10 border border-shift-purple/20 flex items-center justify-center text-shift-purple">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-white font-medium">AI Life Coach</h3>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Cognitive Sync Active</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-2xl transition-all">
          <X className="w-5 h-5 text-zinc-500" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 scrollbar-hide">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              msg.role === 'assistant' ? 'bg-shift-purple/10 border border-shift-purple/20 text-shift-purple' : 'bg-white/5 border border-white/10 text-zinc-400'
            }`}>
              {msg.role === 'assistant' ? <Sparkles className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>
            <div className={`max-w-[80%] p-5 rounded-3xl text-sm leading-relaxed ${
              msg.role === 'assistant' ? 'bg-white/[0.03] text-zinc-200 border border-white/5 rounded-tl-none' : 'bg-shift-purple text-white rounded-tr-none shadow-lg shadow-shift-purple/20'
            }`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex gap-4">
             <div className="w-10 h-10 rounded-xl bg-shift-purple/10 flex items-center justify-center text-shift-purple">
               <Activity className="w-5 h-5 animate-pulse" />
             </div>
             <div className="bg-white/[0.03] p-5 rounded-3xl rounded-tl-none flex gap-1">
               <div className="w-1 h-1 rounded-full bg-zinc-600 animate-bounce" style={{ animationDelay: '0s' }} />
               <div className="w-1 h-1 rounded-full bg-zinc-600 animate-bounce" style={{ animationDelay: '0.2s' }} />
               <div className="w-1 h-1 rounded-full bg-zinc-600 animate-bounce" style={{ animationDelay: '0.4s' }} />
             </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Context Bar */}
      <div className="px-8 py-3 bg-black/40 border-y border-white/5 flex gap-4 overflow-x-auto scrollbar-hide">
         <div className="flex items-center gap-2 shrink-0">
           <Activity className="w-3 h-3 text-shift-purple" />
           <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">{load}% Load</span>
         </div>
         <div className="flex items-center gap-2 shrink-0">
           <Send className="w-3 h-3 text-emerald-500" />
           <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">{energy}% Energy</span>
         </div>
         <div className="flex items-center gap-2 shrink-0">
           <Brain className="w-3 h-3 text-blue-500" />
           <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">{tasksCount} Active</span>
         </div>
      </div>

      {/* Input */}
      <div className="p-8 bg-white/[0.02]">
        <div className="relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask your coach..."
            className="w-full glass py-4 pl-6 pr-16 rounded-2xl text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-shift-purple/30 transition-all"
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 top-2 p-2.5 bg-shift-purple text-white rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-shift-purple/20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
