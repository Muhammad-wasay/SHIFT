"use client";

import { motion } from "framer-motion";
import { Calendar, Zap, Users, Moon, Sun, ArrowRight } from "lucide-react";

interface ScheduleBlock {
  id: string;
  title: string;
  time: string;
  type: "focus" | "meeting" | "admin" | "recovery";
  duration: string;
  energyLevel: "high" | "medium" | "low";
}

const DAILY_ORBIT: ScheduleBlock[] = [
  { id: "1", title: "Deep Focus Window", time: "9:00 AM - 11:30 AM", type: "focus", duration: "150 min", energyLevel: "high" },
  { id: "2", title: "Team Sync: Strategy", time: "12:00 PM - 12:45 PM", type: "meeting", duration: "45 min", energyLevel: "medium" },
  { id: "3", title: "Light Admin & Emails", time: "2:00 PM - 3:00 PM", type: "admin", duration: "60 min", energyLevel: "low" },
  { id: "4", title: "Recovery Orbit", time: "4:00 PM - 5:00 PM", type: "recovery", duration: "60 min", energyLevel: "medium" },
];

export default function ScheduleOptimizer() {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-shift-purple" />
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-zinc-500">Daily Orbit Plan</h2>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          <Zap className="w-3 h-3" /> Optimal
        </div>
      </div>

      <div className="flex flex-col gap-2 relative">
        {/* Connection Line */}
        <div className="absolute left-[27px] top-8 bottom-8 w-[1px] bg-white/5 z-0" />

        {DAILY_ORBIT.map((block, i) => (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-6 group relative z-10"
          >
            {/* Timeline Indicator */}
            <div className={`w-14 shrink-0 flex flex-col items-center gap-2 pt-2`}>
              <div className={`w-3 h-3 rounded-full border-2 border-black z-10 ${
                block.type === 'focus' ? 'bg-shift-purple shadow-[0_0_10px_rgba(124,58,237,0.5)]' :
                block.type === 'meeting' ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' :
                block.type === 'admin' ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' :
                'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
              }`} />
              <span className="text-[8px] font-bold text-zinc-700 uppercase tracking-tighter text-center">
                {block.time.split(' - ')[0]}
              </span>
            </div>

            {/* Block Card */}
            <div className="flex-1 glass p-5 rounded-3xl border-white/5 hover:border-white/10 group-hover:bg-white/[0.04] transition-all">
              <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    {block.type === 'focus' && <Sun className="w-3 h-3 text-shift-purple" />}
                    {block.type === 'meeting' && <Users className="w-3 h-3 text-blue-500" />}
                    {block.type === 'recovery' && <Moon className="w-3 h-3 text-emerald-500" />}
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                      {block.type}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-white">{block.title}</h3>
                </div>
                <span className="text-[9px] font-bold text-zinc-600 uppercase bg-black/20 px-2 py-1 rounded-md">
                  {block.duration}
                </span>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                   <div className={`w-1.5 h-1.5 rounded-full ${
                     block.energyLevel === 'high' ? 'bg-shift-purple' :
                     block.energyLevel === 'medium' ? 'bg-blue-500' : 'bg-amber-500'
                   }`} />
                   <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">
                     {block.energyLevel} Energy Required
                   </span>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-800 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass p-6 rounded-[2rem] border-white/5 mt-4">
        <p className="text-[10px] text-zinc-500 font-light leading-relaxed">
          <span className="text-shift-purple font-bold">AI Insight:</span> You have a 2-hour window of peak cognitive energy starting in 15 minutes. Shielding your schedule for deep work.
        </p>
      </div>
    </div>
  );
}
