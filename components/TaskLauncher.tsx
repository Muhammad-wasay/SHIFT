"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, CheckCircle2, Circle, Clock, Zap, ArrowRight, Brain, BarChart3, Activity } from "lucide-react";

interface Step {
  id: number;
  text: string;
  duration: string;
  completed: boolean;
}

export default function TaskLauncher({ task, onLaunch }: { task: string; onLaunch: () => void }) {
  const [steps, setSteps] = useState<Step[]>([
    { id: 1, text: "Gather context and resources", duration: "5 min", completed: false },
    { id: 2, text: "Define the core objective", duration: "10 min", completed: false },
    { id: 3, text: "Execute main work blocks", duration: "45 min", completed: false },
    { id: 4, text: "Review and polish", duration: "15 min", completed: false },
    { id: 5, text: "Final submission/completion", duration: "5 min", completed: false },
  ]);

  const toggleStep = (id: number) => {
    setSteps(prev => prev.map(s => s.id === id ? { ...s, completed: !s.completed } : s));
  };

  const progress = (steps.filter(s => s.completed).length / steps.length) * 100;

  return (
    <div className="glass-premium p-8 md:p-12 rounded-[3.5rem] w-full max-w-2xl mx-auto border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-shift-purple/10 border border-shift-purple/20 text-[9px] font-bold text-shift-purple uppercase tracking-widest">
                Deep Work Candidate
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[9px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
                <BarChart3 className="w-3 h-3" /> Medium Difficulty
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extralight text-white tracking-tight leading-tight">
              {task || "Select a task to launch"}
            </h2>
          </div>
          <motion.div 
            animate={{ 
              y: [0, -6, 0],
              filter: ["drop-shadow(0 0 10px rgba(124, 58, 237, 0.3))", "drop-shadow(0 0 25px rgba(124, 58, 237, 0.6))", "drop-shadow(0 0 10px rgba(124, 58, 237, 0.3))"]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="p-5 bg-shift-purple/20 rounded-[2rem] border border-shift-purple/30"
          >
            <Rocket className="w-8 h-8 text-shift-purple" />
          </motion.div>
        </div>

        {/* AI Metrics Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="glass p-5 rounded-3xl border-white/5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-zinc-500">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-[9px] font-bold uppercase tracking-widest">Time</span>
            </div>
            <p className="text-white text-lg font-light">~80 min</p>
          </div>
          <div className="glass p-5 rounded-3xl border-white/5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-zinc-500">
              <Activity className="w-3.5 h-3.5" />
              <span className="text-[9px] font-bold uppercase tracking-widest">Energy</span>
            </div>
            <p className="text-amber-500 text-lg font-light">High</p>
          </div>
          <div className="glass p-5 rounded-3xl border-white/5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-zinc-500">
              <Brain className="w-3.5 h-3.5" />
              <span className="text-[9px] font-bold uppercase tracking-widest">Type</span>
            </div>
            <p className="text-shift-purple text-lg font-light">Focus</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-bold tracking-[0.4em] text-zinc-600 uppercase">Escape Velocity</span>
            <span className="text-2xl font-light text-white tracking-tighter">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden p-[2px]">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-shift-purple via-indigo-500 to-emerald-500 rounded-full shadow-[0_0_15px_rgba(124,58,237,0.4)]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => toggleStep(step.id)}
              className={`flex items-center justify-between p-5 rounded-3xl border transition-all cursor-pointer group ${
                step.completed 
                  ? "bg-emerald-500/5 border-emerald-500/20 text-white" 
                  : "bg-white/[0.02] border-white/5 text-zinc-500 hover:bg-white/[0.05]"
              }`}
            >
              <div className="flex items-center gap-5">
                <div className="relative">
                  {step.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-zinc-800 group-hover:text-zinc-600 transition-colors" />
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <span className={`text-sm font-light ${step.completed ? 'text-zinc-300' : 'text-zinc-500'}`}>{step.text}</span>
                  <span className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">{step.duration} predicted</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <button
            onClick={onLaunch}
            className="w-full py-6 rounded-3xl bg-white text-black font-bold text-[11px] tracking-[0.5em] uppercase flex items-center justify-center gap-4 hover:bg-zinc-100 transition-all active:scale-[0.98] shadow-[0_0_50px_rgba(255,255,255,0.15)] group"
          >
            Initiate Launch Sequence
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
          
          <div className="flex items-center justify-center gap-3 opacity-40">
             <div className="w-1.5 h-1.5 rounded-full bg-shift-purple animate-pulse" />
             <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Adaptive Decomposition Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}

