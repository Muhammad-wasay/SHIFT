"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Zap, Shield, Crown, Sparkles, Target } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  desc: string;
  icon: any;
  unlocked: boolean;
  color: string;
}

const ACHIEVEMENTS: Achievement[] = [
  { id: "1", title: "Stability Prime", desc: "Maintained 90% focus for 2 hours.", icon: Shield, unlocked: true, color: "text-emerald-500" },
  { id: "2", title: "Gravity Defier", desc: "Offloaded 50 units of cognitive weight.", icon: Zap, unlocked: true, color: "text-shift-purple" },
  { id: "3", title: "Deep Orbit Master", icon: Target, desc: "Completed 10 focus sessions.", unlocked: false, color: "text-blue-400" },
  { id: "4", title: "Mindful Sovereign", icon: Crown, desc: "7-day habit streak maintained.", unlocked: false, color: "text-amber-500" },
];

export default function AchievementSystem() {
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Trophy className="w-4 h-4 text-shift-purple" />
            <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500">Neuro-Achievement Vault</h2>
          </div>
          <h1 className="text-4xl font-extralight text-white tracking-tight">Status & Rewards</h1>
        </div>
        <div className="flex items-center gap-4 glass px-6 py-3 rounded-2xl border-white/5">
           <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
           <span className="text-xl font-light text-white">2,450 <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-2">Stability Pts</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ACHIEVEMENTS.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-premium p-8 rounded-[2.5rem] border transition-all flex flex-col items-center text-center gap-6 group relative overflow-hidden ${
              a.unlocked ? 'border-white/10' : 'border-white/5 opacity-40 grayscale'
            }`}
          >
            {a.unlocked && (
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />
            )}
            
            <div className={`p-5 rounded-2xl bg-white/5 relative z-10 ${a.unlocked ? a.color : 'text-zinc-800'}`}>
              <a.icon className="w-8 h-8" />
              {a.unlocked && (
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 blur-xl bg-current opacity-20"
                />
              )}
            </div>

            <div className="relative z-10">
              <h3 className="text-lg font-light text-white mb-2">{a.title}</h3>
              <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest leading-relaxed">
                {a.desc}
              </p>
            </div>

            {a.unlocked ? (
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">Claimed</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 rounded-full">
                <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Locked</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="glass-premium p-10 rounded-[3rem] border-white/5 flex items-center justify-between overflow-hidden relative">
         <div className="absolute top-0 right-0 p-10 opacity-5">
            <Trophy className="w-32 h-32 text-shift-purple" />
         </div>
         <div className="flex flex-col gap-2 relative z-10">
           <h3 className="text-white font-light text-xl">Next Reward: <span className="text-shift-purple font-medium uppercase tracking-widest text-xs">Aura Protocol</span></h3>
           <p className="text-xs text-zinc-500 font-light">"Maintain 80%+ Bio-Energy for 3 consecutive days to unlock the dynamic mood-ambient interface."</p>
         </div>
         <div className="flex flex-col items-end gap-3 relative z-10">
            <div className="flex justify-between w-48 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
               <span>Progress</span>
               <span>72%</span>
            </div>
            <div className="w-48 h-1.5 bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "72%" }}
                 className="h-full bg-shift-purple shadow-[0_0_15px_rgba(124,58,237,0.5)]"
               />
            </div>
         </div>
      </div>
    </div>
  );
}
