"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, ArrowUp, Activity } from "lucide-react";

interface DebrisItem {
  id: number;
  text: string;
  x: number;
  y: number;
  angle: number;
  stage: 'floating' | 'lifting';
  weight: number;
}

export default function WeightCollector({ onLift }: { onLift: (weights: any[]) => void }) {
  const [input, setInput] = useState("");
  const [debris, setDebris] = useState<DebrisItem[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleLift = async () => {
    if (!input.trim()) return;
    
    setIsAnalyzing(true);
    const thought = input.trim();
    
    // Create new debris item
    const newItem: DebrisItem = {
      id: Date.now(),
      text: thought,
      x: Math.random() * (window.innerWidth - 300) + 150,
      y: Math.random() * 200 + 400,
      angle: (Math.random() - 0.5) * 40,
      stage: 'floating',
      weight: Math.floor(Math.random() * 10) + 1
    };

    setDebris(prev => [...prev, newItem]);
    setInput("");

    // Simulate AI Analysis
    setTimeout(() => {
      setDebris(prev => prev.map(d => d.id === newItem.id ? { ...d, stage: 'lifting' } : d));
      
      onLift([{
        id: newItem.id,
        text: thought,
        gravity: newItem.weight,
        type: 'task'
      }]);

      setTimeout(() => {
        setDebris(prev => prev.filter(d => d.id !== newItem.id));
      }, 2000);
      
      setIsAnalyzing(false);
    }, 800);
  };

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Visual Debris Layer */}
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
        <AnimatePresence>
          {debris.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8, x: item.x, y: item.y, rotate: item.angle }}
              animate={{ 
                opacity: item.stage === 'floating' ? 1 : 0,
                y: item.stage === 'floating' ? item.y - 20 : -1000,
                scale: item.stage === 'floating' ? 1 : 0.5,
                rotate: item.stage === 'floating' ? item.angle : item.angle * 2
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: item.stage === 'floating' ? 2 : 1.5,
                ease: item.stage === 'floating' ? "easeOut" : "backIn"
              }}
              className="absolute glass p-4 rounded-2xl border-white/10 shadow-2xl max-w-[200px]"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-3 h-3 text-shift-purple" />
                  <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Weight Detected</span>
                </div>
                <p className="text-[10px] text-white leading-relaxed line-clamp-2">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Brain className="w-4 h-4 text-shift-purple" />
          <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500">Weight Collection</h2>
        </div>
        
        <div className="relative group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleLift())}
            placeholder="Dump your messy thoughts... they will float away."
            className="w-full h-32 glass p-6 rounded-[2rem] text-lg font-light text-white placeholder:text-zinc-700 focus:outline-none focus:border-shift-purple/30 transition-all resize-none scrollbar-hide"
          />
          <button
            onClick={handleLift}
            disabled={isAnalyzing || !input.trim()}
            className="absolute bottom-4 right-4 p-4 bg-white text-black rounded-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            {isAnalyzing ? (
              <Sparkles className="w-5 h-5 animate-spin" />
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2">Lift</span>
                <ArrowUp className="w-4 h-4" />
              </div>
            )}
          </button>
        </div>
        
        <div className="flex items-center gap-3 px-4">
          <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">Anti-Gravity engine engaged</p>
        </div>
      </div>
    </div>
  );
}
