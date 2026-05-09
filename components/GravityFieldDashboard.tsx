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
        radius: 180 + weight * 35, // Increased radius
        angle: Math.random() * 360,
        speed: 15 + (10 - weight) * 5 // Slower, more graceful orbit
      };
    });
    setGravityTasks(formatted);
  }, [tasks]);

  return (
    <div className="w-full h-[850px] glass-premium rounded-[4rem] relative overflow-hidden bg-black/60 border-white/5 shadow-2xl shadow-black/50">
      {/* Background Orbital Rings */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
        {[180, 260, 340, 420, 500].map(r => (
          <circle key={r} cx="50%" cy="50%" r={r} fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 12" />
        ))}
      </svg>

      {/* Central Focus (Sun) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="w-48 h-48 rounded-full bg-shift-purple blur-[80px] absolute"
        />
        <div className="w-24 h-24 rounded-[2rem] glass border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-3xl relative z-10 shadow-[0_0_40px_rgba(124,58,237,0.3)]">
          <Brain className="w-12 h-12 text-white" />
        </div>
        <p className="mt-6 text-[11px] font-bold text-white tracking-[0.6em] uppercase opacity-60">Core Mind</p>
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
            <div className="group relative flex items-center">
               {/* Persistent Label */}
               <div className="absolute left-10 glass px-5 py-2.5 rounded-2xl border-white/10 backdrop-blur-xl shadow-xl transition-all group-hover:scale-110 group-hover:border-shift-purple/50 min-w-[150px]">
                  <p className="text-[10px] font-bold text-white tracking-[0.05em] leading-tight mb-1">{task.title}</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${task.weight > 7 ? 'bg-rose-500' : 'bg-shift-purple'}`} />
                    <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">{task.weight}G Density</p>
                  </div>
               </div>

               {/* Planet Body */}
               <div className={`w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center transition-all group-hover:scale-125 group-hover:rotate-12 ${
                 task.weight > 7 ? 'bg-rose-500/20' : 'bg-shift-purple/20'
               }`}>
                 <Star className={`w-4 h-4 ${task.weight > 7 ? 'text-rose-400' : 'text-shift-purple'}`} />
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
