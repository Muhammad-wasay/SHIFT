"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Target, Flame, Droplets, Wind, Brain, Plus, Check } from "lucide-react";

interface Habit {
  id: string;
  name: string;
  icon: any;
  color: string;
  goal: number;
  current: number;
  streak: number;
}

const MOCK_HABITS: Habit[] = [
  { id: "1", name: "Deep Focus", icon: Brain, color: "text-shift-purple", goal: 4, current: 2, streak: 12 },
  { id: "2", name: "Hydration", icon: Droplets, color: "text-blue-400", goal: 8, current: 5, streak: 24 },
  { id: "3", name: "Mindful Break", icon: Wind, color: "text-emerald-400", goal: 3, current: 3, streak: 5 },
];

export default function HabitTracker() {
  const [habits, setHabits] = useState(MOCK_HABITS);

  const logHabit = (id: string) => {
    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        return { ...h, current: Math.min(h.goal, h.current + 1) };
      }
      return h;
    }));
  };

  return (
    <div className="w-full flex flex-col gap-12">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Target className="w-4 h-4 text-shift-purple" />
            <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500">Biological Routine Tracking</h2>
          </div>
          <h1 className="text-4xl font-extralight text-white tracking-tight">Habit Forge</h1>
        </div>
        <button className="p-4 glass rounded-2xl text-zinc-500 hover:text-white transition-all">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {habits.map((h, i) => {
          const progress = (h.current / h.goal) * 100;
          return (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-premium p-10 rounded-[3rem] border-white/5 flex flex-col items-center gap-8 group relative overflow-hidden"
            >
              {/* Streak Badge */}
              <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 bg-rose-500/10 rounded-full">
                <Flame className="w-3 h-3 text-rose-500" />
                <span className="text-[10px] font-bold text-rose-500">{h.streak}d</span>
              </div>

              {/* Progress Ring (SVG) */}
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-white/5"
                  />
                  <motion.circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray="440"
                    initial={{ strokeDashoffset: 440 }}
                    animate={{ strokeDashoffset: 440 - (440 * progress) / 100 }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className={h.color}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <h.icon className={`w-10 h-10 ${h.color} mb-2`} />
                  <span className="text-2xl font-extralight text-white">{h.current}<span className="text-sm text-zinc-600">/{h.goal}</span></span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <h3 className="text-xl font-light text-white">{h.name}</h3>
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                  {progress === 100 ? "Goal Secured" : "Trajectory Active"}
                </p>
              </div>

              <button
                onClick={() => logHabit(h.id)}
                disabled={h.current === h.goal}
                className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 transition-all ${
                  h.current === h.goal 
                  ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                  : 'bg-white/5 hover:bg-white/10 text-white border border-white/5'
                }`}
              >
                {h.current === h.goal ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{h.current === h.goal ? "Completed" : "Log Progress"}</span>
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="glass-premium p-10 rounded-[3rem] border-white/5">
        <div className="flex items-center gap-6">
           <div className="p-4 bg-shift-purple/10 border border-shift-purple/20 rounded-2xl text-shift-purple">
             <Brain className="w-6 h-6" />
           </div>
           <div>
             <h4 className="text-white font-light text-lg">AI Habit Optimization</h4>
             <p className="text-xs text-zinc-500 font-light mt-1">"Your 'Mindful Break' habit has a 94% success rate when logged before 11 AM. We've adjusted your schedule to prioritize this window."</p>
           </div>
        </div>
      </div>
    </div>
  );
}
