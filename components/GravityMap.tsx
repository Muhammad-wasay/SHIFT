"use client";

import { motion } from "framer-motion";
import { CircleDot, Globe, Compass } from "lucide-react";

interface GravityItem {
  id: string;
  text: string;
  gravity: number;
  type: string;
}

export default function GravityMap({ items }: { items: GravityItem[] }) {
  const core = items.filter(i => i.gravity >= 8);
  const orbit = items.filter(i => i.gravity >= 4 && i.gravity < 8);
  const distant = items.filter(i => i.gravity < 4);

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-zinc-500 flex items-center gap-2">
          <Compass className="w-4 h-4 text-shift-purple" />
          Gravity Map
        </h2>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-[9px] font-bold tracking-widest text-zinc-600 uppercase">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" /> Core
          </div>
          <div className="flex items-center gap-2 text-[9px] font-bold tracking-widest text-zinc-600 uppercase">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" /> Orbit
          </div>
          <div className="flex items-center gap-2 text-[9px] font-bold tracking-widest text-zinc-600 uppercase">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-500/50" /> Distant
          </div>
        </div>
      </div>

      <div className="relative aspect-square md:aspect-video glass rounded-[3rem] overflow-hidden flex items-center justify-center p-12">
        {/* Gravitational Field Rings */}
        <div className="absolute w-[80%] aspect-square rounded-full border border-white/5 animate-[pulse_8s_infinite]" />
        <div className="absolute w-[50%] aspect-square rounded-full border border-white/10 animate-[pulse_6s_infinite]" />
        <div className="absolute w-[20%] aspect-square rounded-full border border-shift-purple/20 bg-shift-purple/5 shadow-[0_0_100px_rgba(124,58,237,0.1)]" />

        {/* Core items (Center) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {core.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute p-4 glass rounded-2xl border-red-500/20 text-white flex flex-col gap-1 pointer-events-auto cursor-pointer hover:bg-white/5 transition-colors"
              style={{ 
                transform: `rotate(${i * 45}deg) translate(${30 + i * 10}px) rotate(-${i * 45}deg)`,
                zIndex: 30
              }}
            >
              <span className="text-xs font-medium">{item.text}</span>
              <span className="text-[8px] font-bold text-red-400 uppercase tracking-widest">Core Density</span>
            </motion.div>
          ))}
        </div>

        {/* Orbit items (Middle) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {orbit.map((item, i) => (
            <motion.div
              key={item.id}
              animate={{ 
                rotate: 360,
              }}
              transition={{ 
                duration: 20 + i * 5, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute w-full h-full flex items-center justify-center"
            >
              <div 
                className="glass px-4 py-2 rounded-xl text-zinc-400 flex items-center gap-2 pointer-events-auto cursor-pointer hover:text-white transition-colors"
                style={{ transform: `translateX(${150 + i * 20}px) rotate(-360deg)` }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                <span className="text-[10px] font-light">{item.text}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Distant items (Edge) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {distant.map((item, i) => (
            <motion.div
              key={item.id}
              animate={{ 
                rotate: -360,
              }}
              transition={{ 
                duration: 40 + i * 10, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute w-full h-full flex items-center justify-center"
            >
              <div 
                className="opacity-40 px-3 py-1 text-zinc-600 flex items-center gap-2 pointer-events-auto cursor-pointer hover:opacity-100 transition-all"
                style={{ transform: `translateX(${280 + i * 30}px) rotate(360deg)` }}
              >
                <span className="text-[9px] font-light tracking-wide">{item.text}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="z-10 flex flex-col items-center gap-2">
          <CircleDot className="w-8 h-8 text-shift-purple animate-pulse" />
          <span className="text-[8px] font-bold tracking-[0.5em] uppercase text-zinc-600">Focus Core</span>
        </div>
      </div>
    </div>
  );
}
