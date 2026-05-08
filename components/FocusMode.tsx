"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Volume2, Shield, Wind, CloudRain, Coffee, Trees, Droplets } from "lucide-react";

interface Environment {
  id: string;
  name: string;
  icon: any;
  color: string;
  bg: string;
}

const ENVIRONMENTS: Environment[] = [
  { id: "space", name: "Deep Space", icon: Wind, color: "text-shift-purple", bg: "bg-space-950" },
  { id: "rain", name: "Rainfall", icon: CloudRain, color: "text-blue-400", bg: "bg-blue-950" },
  { id: "forest", name: "Ancient Forest", icon: Trees, color: "text-emerald-400", bg: "bg-emerald-950" },
  { id: "cafe", name: "Digital Cafe", icon: Coffee, color: "text-amber-400", bg: "bg-amber-950" },
];

export default function FocusMode({ isActive, onClose }: { isActive: boolean; onClose: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [env, setEnv] = useState(ENVIRONMENTS[0]);
  const [breathingPhase, setBreathingPhase] = useState<"Breathe In" | "Hold" | "Breathe Out" | "Relax">("Breathe In");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
      // Box Breathing Cycle (4s in, 4s hold, 4s out, 4s hold)
      const cycle = timer % 16;
      if (cycle < 4) setBreathingPhase("Breathe In");
      else if (cycle < 8) setBreathingPhase("Hold");
      else if (cycle < 12) setBreathingPhase("Breathe Out");
      else setBreathingPhase("Relax");
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timer]);

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-[500] ${env.bg} flex flex-col items-center justify-center overflow-hidden transition-colors duration-[2000ms]`}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-radial-[at_center,_var(--color-black)_0%,_transparent_100%] opacity-60" />
        
        {/* Breathing Ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{
              scale: breathingPhase === 'Breathe In' ? 2 : breathingPhase === 'Breathe Out' ? 1 : 1.5,
              opacity: breathingPhase === 'Hold' ? 0.3 : 0.6,
            }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className={`w-[400px] h-[400px] rounded-full border-[1px] ${env.color} border-opacity-30 blur-3xl`}
          />
        </div>
      </div>

      {/* Force Field Visual */}
      <div className="absolute inset-0 border-[60px] border-white/[0.01] pointer-events-none" />

      {/* Main UI */}
      <div className="z-10 flex flex-col items-center gap-20">
        <div className="flex flex-col items-center gap-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className={`p-12 rounded-full border border-white/5 bg-white/[0.02] relative`}
          >
             <Shield className={`w-14 h-14 ${env.color} opacity-40`} />
             <div className="absolute inset-0 flex items-center justify-center">
               <motion.div 
                 animate={{ scale: [1, 1.4, 1] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className={`w-3 h-3 rounded-full ${env.color} shadow-[0_0_20px_currentColor]`}
               />
             </div>
          </motion.div>
          
          <div className="flex flex-col items-center gap-4">
            <AnimatePresence mode="wait">
              <motion.h2 
                key={breathingPhase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-6xl font-extralight text-white tracking-tighter uppercase"
              >
                {breathingPhase}
              </motion.h2>
            </AnimatePresence>
            <p className="text-[10px] font-bold text-zinc-500 tracking-[0.6em] uppercase">
              Orbital Stability Active
            </p>
          </div>
        </div>

        {/* Environment Controls */}
        <div className="flex gap-4 p-3 glass rounded-[2.5rem] border-white/5 bg-white/[0.01]">
          {ENVIRONMENTS.map((e) => (
            <button
              key={e.id}
              onClick={() => setEnv(e)}
              className={`p-5 rounded-3xl transition-all flex flex-col items-center gap-3 ${
                env.id === e.id ? 'bg-white/10 text-white shadow-xl' : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              <e.icon className="w-6 h-6" />
              <span className="text-[9px] font-bold uppercase tracking-widest">{e.name}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-10 items-center">
           <button onClick={() => setIsPlaying(!isPlaying)} className="p-8 bg-white rounded-full text-black hover:scale-105 active:scale-95 transition-all shadow-2xl">
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
           </button>
           <button onClick={onClose} className="p-8 bg-white/5 border border-white/10 rounded-full text-zinc-500 hover:text-white transition-all">
              <X className="w-8 h-8" />
           </button>
        </div>

        <div className="flex flex-col items-center gap-4">
           <div className="flex items-center gap-3">
             <Droplets className="w-4 h-4 text-zinc-700" />
             <span className="text-zinc-700 text-[10px] font-bold tracking-[0.4em] uppercase">Water Reminder: 45 min</span>
           </div>
           <p className="text-zinc-800 text-[10px] font-bold tracking-widest uppercase opacity-40">
             Notifications Silenced // Focus Optimized // Bio-Sync Active
           </p>
        </div>
      </div>
    </motion.div>
  );
}
