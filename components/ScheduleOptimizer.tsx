"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Zap, Users, Moon, Sun, ArrowRight, CheckCircle2, Sparkles, Play } from "lucide-react";

interface ScheduleBlock {
  id: string;
  title: string;
  time: string;
  type: "focus" | "meeting" | "admin" | "recovery";
  duration: string;
  energyLevel: "high" | "medium" | "low";
}

const INITIAL_ORBIT: ScheduleBlock[] = [
  { id: "1", title: "Deep Focus Window", time: "9:00 AM - 11:30 AM", type: "focus", duration: "150 min", energyLevel: "high" },
  { id: "2", title: "Team Sync: Strategy", time: "12:00 PM - 12:45 PM", type: "meeting", duration: "45 min", energyLevel: "medium" },
  { id: "3", title: "Light Admin & Emails", time: "2:00 PM - 3:00 PM", type: "admin", duration: "60 min", energyLevel: "low" },
  { id: "4", title: "Recovery Orbit", time: "4:00 PM - 5:00 PM", type: "recovery", duration: "60 min", energyLevel: "medium" },
];

export default function ScheduleOptimizer({ onLaunchFocus }: { onLaunchFocus?: () => void }) {
  const [blocks, setBlocks] = useState<ScheduleBlock[]>(INITIAL_ORBIT);
  const [selectedBlock, setSelectedBlock] = useState<string | null>("1");
  const [isOptimizing, setIsOptimizing] = useState(false);

  const reOptimize = () => {
    setIsOptimizing(true);
    // Simulate AI thinking and reshuffling
    setTimeout(() => {
      const reshuffled = [...blocks].sort(() => Math.random() - 0.5);
      setBlocks(reshuffled);
      setIsOptimizing(false);
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-shift-purple" />
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-zinc-500">Daily Orbit Plan</h2>
        </div>
        <button 
          onClick={reOptimize}
          disabled={isOptimizing}
          className="flex items-center gap-2 text-[10px] font-bold text-shift-purple uppercase tracking-widest bg-shift-purple/10 px-4 py-2 rounded-full border border-shift-purple/20 hover:bg-shift-purple/20 transition-all active:scale-95 disabled:opacity-50"
        >
          {isOptimizing ? <Sparkles className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
          {isOptimizing ? "Optimizing..." : "AI Re-optimize"}
        </button>
      </div>

      <div className="flex flex-col gap-2 relative">
        {/* Connection Line */}
        <div className="absolute left-[27px] top-8 bottom-8 w-[1px] bg-white/5 z-0" />

        <AnimatePresence mode="popLayout">
          {blocks.map((block, i) => (
            <motion.div
              key={block.id}
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => setSelectedBlock(block.id)}
              className={`flex items-start gap-6 group relative z-10 cursor-pointer transition-all duration-500 ${
                selectedBlock === block.id ? "scale-[1.02]" : "hover:scale-[1.01]"
              }`}
            >
              {/* Timeline Indicator */}
              <div className={`w-14 shrink-0 flex flex-col items-center gap-2 pt-2`}>
                <div className={`w-3 h-3 rounded-full border-2 border-black z-10 transition-all duration-500 ${
                  selectedBlock === block.id ? 'scale-125' : ''
                } ${
                  block.type === 'focus' ? 'bg-shift-purple shadow-[0_0_10px_rgba(124,58,237,0.5)]' :
                  block.type === 'meeting' ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' :
                  block.type === 'admin' ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' :
                  'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                }`} />
                <span className={`text-[8px] font-bold uppercase tracking-tighter text-center transition-colors ${
                  selectedBlock === block.id ? 'text-white' : 'text-zinc-700'
                }`}>
                  {block.time.split(' - ')[0]}
                </span>
              </div>

              {/* Block Card */}
              <div className={`flex-1 glass p-5 rounded-3xl transition-all duration-500 relative overflow-hidden ${
                selectedBlock === block.id 
                ? 'bg-white/[0.08] border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]' 
                : 'border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
              }`}>
                {selectedBlock === block.id && (
                  <motion.div 
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-gradient-to-r from-shift-purple/5 to-transparent pointer-events-none"
                  />
                )}

                <div className="flex justify-between items-start mb-2 relative z-10">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      {block.type === 'focus' && <Sun className="w-3 h-3 text-shift-purple" />}
                      {block.type === 'meeting' && <Users className="w-3 h-3 text-blue-500" />}
                      {block.type === 'recovery' && <Moon className="w-3 h-3 text-emerald-500" />}
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                        {block.type}
                      </span>
                    </div>
                    <h3 className={`text-sm font-medium transition-colors ${selectedBlock === block.id ? 'text-white' : 'text-zinc-300'}`}>
                      {block.title}
                    </h3>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[9px] font-bold text-zinc-600 uppercase bg-black/20 px-2 py-1 rounded-md">
                      {block.duration}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 relative z-10">
                  <div className="flex items-center gap-2">
                     <div className={`w-1.5 h-1.5 rounded-full ${
                       block.energyLevel === 'high' ? 'bg-shift-purple' :
                       block.energyLevel === 'medium' ? 'bg-blue-500' : 'bg-amber-500'
                     }`} />
                     <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">
                       {block.energyLevel} Energy Required
                     </span>
                  </div>
                  
                  {selectedBlock === block.id ? (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (block.type === 'focus' && onLaunchFocus) onLaunchFocus();
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white text-black text-[9px] font-bold uppercase tracking-widest hover:scale-105 transition-all"
                    >
                       <Play className="w-3 h-3 fill-black" /> Launch {block.type === 'focus' ? 'Focus' : 'Orbit'}
                    </button>
                  ) : (
                    <ArrowRight className="w-4 h-4 text-zinc-800 group-hover:text-white transition-all" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass p-6 rounded-[2rem] border-white/5 mt-4 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-shift-purple" />
        <p className="text-[10px] text-zinc-500 font-light leading-relaxed">
          <span className="text-shift-purple font-bold">AI Insight:</span> {
            isOptimizing ? "Recalculating bio-rhythms and energy windows..." :
            selectedBlock === "1" ? "Detected peak cognitive window (High Gamma). Optimal for Deep Focus." :
            selectedBlock === "2" ? "Collaborative energy is high. Ideal for strategy alignment." :
            "Energy dip detected. Shifting to low-friction administrative tasks to avoid burnout."
          }
        </p>
      </motion.div>
    </div>
  );
}
