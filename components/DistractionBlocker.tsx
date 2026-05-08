"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, AlertCircle, Ban, Activity, Eye, Zap, ShieldAlert, WifiOff } from "lucide-react";

interface Interruption {
  type: string;
  count: number;
  impact: string;
  color: string;
}

const INTERRUPTIONS: Interruption[] = [
  { type: "Email Checks", count: 12, impact: "High Decay", color: "text-rose-500" },
  { type: "Social Pings", count: 4, impact: "Momentum Break", color: "text-amber-500" },
  { type: "Unscheduled Tabs", count: 8, impact: "Context Fragmentation", color: "text-blue-500" },
];

export default function DistractionBlocker() {
  const [isLocked, setIsLocked] = useState(false);

  return (
    <div className="w-full flex flex-col gap-12">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-shift-purple" />
            <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500">Cognitive Shield Protocol</h2>
          </div>
          <h1 className="text-4xl font-extralight text-white tracking-tight">Distraction Blocker</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Stats Column */}
        <div className="lg:col-span-8 flex flex-col gap-8">
           <div className="glass-premium p-10 rounded-[3rem] border-white/5 flex flex-col gap-10">
              <div className="flex justify-between items-start">
                 <div className="flex flex-col gap-3">
                   <h3 className="text-2xl font-light text-white">Digital Noise Audit</h3>
                   <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Last 24-Hour Focus Cycle</p>
                 </div>
                 <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                   <Activity className="w-5 h-5 text-shift-purple" />
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {INTERRUPTIONS.map((int, i) => (
                   <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] flex flex-col gap-4">
                      <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{int.type}</span>
                      <div className="flex items-end gap-2">
                        <span className="text-4xl font-extralight text-white">{int.count}</span>
                        <span className={`text-[9px] font-bold uppercase mb-1.5 ${int.color}`}>{int.impact}</span>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="p-8 bg-rose-500/5 border border-rose-500/10 rounded-[2.5rem] flex items-center gap-8">
                 <div className="w-16 h-16 rounded-2xl bg-rose-500/10 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-8 h-8 text-rose-500" />
                 </div>
                 <div className="flex flex-col gap-2">
                    <h4 className="text-white font-medium">Critical Vulnerability Detected</h4>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                      Your "Email Check" pattern spikes between 2 PM and 3 PM, causing a <span className="text-rose-500 font-medium">42% decay</span> in deep work efficiency.
                    </p>
                 </div>
              </div>
           </div>

           <div className="glass-premium p-10 rounded-[3rem] border-white/5 flex items-center justify-between">
              <div className="flex flex-col gap-2">
                 <h4 className="text-white font-light text-xl">Recommendation</h4>
                 <p className="text-xs text-zinc-500 font-light">"Enable 'Deep Orbit Lock' to automatically block these vectors during focus windows."</p>
              </div>
              <button className="px-8 py-3 bg-white text-black rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all">Optimize Shield</button>
           </div>
        </div>

        {/* Deep Lock Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-8">
           <div className={`glass-premium p-10 rounded-[3rem] border-white/10 transition-all flex flex-col items-center gap-10 ${isLocked ? 'bg-shift-purple/10 border-shift-purple/50' : ''}`}>
              <div className="relative w-32 h-32 flex items-center justify-center">
                 <motion.div
                    animate={isLocked ? { rotate: 360, scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className={`absolute inset-0 rounded-full border-[1px] border-dashed ${isLocked ? 'border-shift-purple' : 'border-zinc-800'}`}
                 />
                 <Ban className={`w-12 h-12 transition-all ${isLocked ? 'text-shift-purple' : 'text-zinc-800'}`} />
              </div>

              <div className="flex flex-col items-center gap-3 text-center">
                 <h3 className="text-2xl font-light text-white">Deep Orbit Lock</h3>
                 <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] leading-relaxed">
                   Enforce absolute cognitive <br/> isolation protocols
                 </p>
              </div>

              <div className="flex flex-col gap-4 w-full">
                 <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-2xl">
                    <div className="flex items-center gap-3">
                       <WifiOff className="w-4 h-4 text-zinc-500" />
                       <span className="text-[10px] font-bold text-zinc-500 uppercase">Comm Silence</span>
                    </div>
                    <div className={`w-10 h-5 rounded-full p-1 transition-all cursor-pointer ${isLocked ? 'bg-shift-purple' : 'bg-white/10'}`} onClick={() => setIsLocked(!isLocked)}>
                       <div className={`w-3 h-3 rounded-full bg-white transition-all ${isLocked ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-2xl">
                    <div className="flex items-center gap-3">
                       <Eye className="w-4 h-4 text-zinc-500" />
                       <span className="text-[10px] font-bold text-zinc-500 uppercase">Visual Shield</span>
                    </div>
                    <div className={`w-10 h-5 rounded-full p-1 transition-all cursor-pointer ${isLocked ? 'bg-shift-purple' : 'bg-white/10'}`} onClick={() => setIsLocked(!isLocked)}>
                       <div className={`w-3 h-3 rounded-full bg-white transition-all ${isLocked ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                 </div>
              </div>

              <button 
                onClick={() => setIsLocked(!isLocked)}
                className={`w-full py-5 rounded-[2rem] text-[10px] font-bold uppercase tracking-[0.3em] transition-all ${
                  isLocked ? 'bg-shift-purple text-white shadow-lg shadow-shift-purple/20' : 'bg-white/5 text-zinc-500 hover:bg-white/10'
                }`}
              >
                {isLocked ? "Deactivate Shield" : "Engage Deep Orbit"}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
