"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, Star, ArrowUp, Sparkles } from "lucide-react";

interface GravityTask {
  id: string;
  title: string;
  weight: number;
  radius: number;
  angle: number;
  speed: number;
}

export default function GravityFieldDashboard({ tasks }: { tasks: any[] }) {
  const [gravityTasks, setGravityTasks] = useState<GravityTask[]>([]);

  useEffect(() => {
    const formatted = tasks.map((t, i) => {
      const weight = t.gravity || 5;
      return {
        id: t.id || String(i),
        title: t.text || t.title,
        weight: weight,
        radius: 150 + weight * 25, // 150 - 400px radius
        angle: Math.random() * 360,
        speed: 10 + (10 - weight) * 5 // Lighter tasks orbit faster
      };
    });
    setGravityTasks(formatted);
  }, [tasks]);

  return (
    <div className="w-full h-[600px] glass-premium rounded-[4rem] relative overflow-hidden bg-black/40 border-white/5">
      {/* Background Orbital Rings */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
        {[150, 225, 300, 375, 450].map(r => (
          <circle key={r} cx="50%" cy="50%" r={r} fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 8" />
        ))}
      </svg>

      {/* Central Focus (Sun) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-24 h-24 rounded-full bg-shift-purple blur-3xl absolute"
        />
        <div className="w-16 h-16 rounded-full glass border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-xl relative z-10">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <p className="mt-4 text-[10px] font-bold text-zinc-500 tracking-[0.5em] uppercase">Core Mind</p>
      </div>

      {/* Orbiting Task Planets */}
      {gravityTasks.map((task) => (
        <motion.div
          key={task.id}
          animate={{ rotate: 360 }}
          transition={{ duration: task.speed, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: task.radius * 2,
            height: task.radius * 2,
            marginLeft: -task.radius,
            marginTop: -task.radius,
          }}
          className="pointer-events-none"
        >
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: '100%',
              transform: 'translate(-50%, -50%)',
            }}
            className="pointer-events-auto"
          >
            <div className="group relative">
               {/* Hover Label */}
               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                  <div className="glass px-4 py-2 rounded-xl border-white/10 whitespace-nowrap">
                    <p className="text-[10px] font-bold text-white tracking-widest uppercase">{task.title}</p>
                    <p className="text-[8px] text-zinc-500 uppercase mt-1">{task.weight}G Density</p>
                  </div>
               </div>

               {/* Planet Body */}
               <div className={`w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center transition-all group-hover:scale-125 group-hover:border-shift-purple/50 ${
                 task.weight > 7 ? 'bg-rose-500/20' : 'bg-shift-purple/20'
               }`}>
                 <Star className={`w-3 h-3 ${task.weight > 7 ? 'text-rose-400' : 'text-shift-purple'}`} />
               </div>
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Empty State */}
      {gravityTasks.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
           <div className="p-6 bg-white/[0.02] border border-white/5 rounded-full">
             <Sparkles className="w-8 h-8 text-zinc-800" />
           </div>
           <p className="text-zinc-700 text-[10px] font-bold tracking-[0.5em] uppercase">No Active Trajectories</p>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-10 left-10 flex flex-col gap-3">
         <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">High Cognitive Load</span>
         </div>
         <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-shift-purple shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Stable Orbit</span>
         </div>
      </div>
    </div>
  );
}
