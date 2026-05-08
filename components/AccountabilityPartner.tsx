"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Zap, AlertTriangle, TrendingDown, Target, Brain, ArrowUpRight } from "lucide-react";

interface Deviation {
  id: string;
  type: "overdue" | "momentum" | "energy";
  title: string;
  impact: string;
  urgency: "high" | "critical";
}

const DEVIATIONS: Deviation[] = [
  { id: "1", type: "overdue", title: "Product Spec Review", impact: "Blocks Engineering Orbit", urgency: "critical" },
  { id: "2", type: "momentum", title: "3-Hour Stagnation", impact: "Zero trajectory progress detected", urgency: "high" },
  { id: "3", type: "energy", title: "Circadian Mismatch", impact: "Attempting High-Density task during dip", urgency: "high" },
];

export default function AccountabilityPartner() {
  return (
    <div className="w-full flex flex-col gap-12">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-4 h-4 text-shift-purple" />
            <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500">Mission Accountability Partner</h2>
          </div>
          <h1 className="text-4xl font-extralight text-white tracking-tight">Observer Protocol</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Observation Hub */}
        <div className="lg:col-span-8 flex flex-col gap-8">
           <div className="glass-premium p-10 rounded-[3rem] border-rose-500/20 bg-rose-500/[0.02] flex flex-col gap-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-5">
               <AlertTriangle className="w-32 h-32 text-rose-500" />
             </div>
             
             <div className="flex items-center gap-4">
                <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-500">
                  <TrendingDown className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-light text-white">Momentum Warning</h3>
                  <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mt-1">Efficiency decreased by 34% in last window</p>
                </div>
             </div>

             <p className="text-lg text-zinc-400 font-light leading-relaxed max-w-2xl">
               "System observation indicates you have bypassed 3 scheduled focus sessions. This pattern will likely cause a <span className="text-rose-500 font-medium">Gravitational Collapse</span> by tomorrow morning. I recommend immediate offloading."
             </p>

             <div className="flex gap-4">
                <button className="px-8 py-3 bg-rose-500 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all">Clear Overdue Orbits</button>
                <button className="px-8 py-3 glass rounded-2xl text-[10px] font-bold text-white uppercase tracking-widest hover:bg-white/5 transition-all">Re-Sync Trajectory</button>
             </div>
           </div>

           <div className="flex flex-col gap-6">
              <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-600 px-2">Trajectory Deviations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DEVIATIONS.map((d, i) => (
                  <motion.div
                    key={d.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-premium p-8 rounded-[2.5rem] border-white/5 group hover:border-white/10 transition-all"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                        d.urgency === 'critical' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {d.urgency}
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-zinc-800 group-hover:text-white transition-all" />
                    </div>
                    <h4 className="text-lg text-white font-light mb-2">{d.title}</h4>
                    <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">{d.impact}</p>
                  </motion.div>
                ))}
              </div>
           </div>
        </div>

        {/* Accountability Stats */}
        <div className="lg:col-span-4 flex flex-col gap-8">
           <div className="glass-premium p-10 rounded-[3rem] border-white/5 flex flex-col gap-8">
              <h3 className="text-xl font-light text-white">Trust Score</h3>
              <div className="flex flex-col items-center gap-6">
                <div className="relative w-32 h-32 flex items-center justify-center">
                   <svg className="w-full h-full -rotate-90">
                      <circle cx="64" cy="64" r="58" fill="none" stroke="white" strokeWidth="4" className="opacity-5" />
                      <motion.circle 
                        cx="64" 
                        cy="64" 
                        r="58" 
                        fill="none" 
                        stroke="#7C3AED" 
                        strokeWidth="4" 
                        strokeDasharray="364"
                        initial={{ strokeDashoffset: 364 }}
                        animate={{ strokeDashoffset: 364 * 0.2 }}
                        transition={{ duration: 2, ease: "circOut" }}
                      />
                   </svg>
                   <span className="absolute text-3xl font-extralight text-white">82%</span>
                </div>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest text-center leading-relaxed">
                  Reliability rating based on <br/> task completion velocity
                </p>
              </div>

              <div className="flex flex-col gap-4 mt-4">
                 <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center gap-4">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-zinc-500 uppercase">Power Streak</span>
                      <span className="text-sm text-white font-medium">12 Days Active</span>
                    </div>
                 </div>
                 <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center gap-4">
                    <Target className="w-5 h-5 text-emerald-500" />
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-zinc-500 uppercase">Mission Accuracy</span>
                      <span className="text-sm text-white font-medium">94% Predicted vs Actual</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
