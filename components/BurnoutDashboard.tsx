"use client";

import { motion } from "framer-motion";
import { Activity, TrendingUp, Zap, ShieldCheck, Brain, Flame, ArrowUpRight, LayoutGrid } from "lucide-react";

interface Metric {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "stable";
  icon: any;
  color: string;
}

const METRICS: Metric[] = [
  { label: "Stability Score", value: "84%", change: "+4%", trend: "up", icon: ShieldCheck, color: "text-emerald-500" },
  { label: "Mental Resistance", value: "12G", change: "-15%", trend: "down", icon: Flame, color: "text-rose-500" },
  { label: "Focus Efficiency", value: "92%", change: "+2%", trend: "up", icon: Zap, color: "text-amber-500" },
  { label: "Recovery Delta", value: "0.8x", change: "Stable", trend: "stable", icon: Activity, color: "text-blue-500" },
];

export default function BurnoutDashboard({ reflectionValue }: { reflectionValue?: number | null }) {
  const dynamicMetrics = [...METRICS];
  if (reflectionValue) {
    dynamicMetrics[1] = { ...dynamicMetrics[1], value: `${reflectionValue}G` };
  }

  return (
    <div className="w-full flex flex-col gap-12">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Brain className="w-4 h-4 text-shift-purple" />
            <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500">Cognitive Analytics</h2>
          </div>
          <h1 className="text-4xl font-extralight text-white tracking-tight">Sustainability Overview</h1>
        </div>
        <div className="flex gap-2">
          <button className="px-5 py-2 glass rounded-xl text-[10px] font-bold text-zinc-500 uppercase tracking-widest hover:text-white transition-all">Weekly</button>
          <button className="px-5 py-2 glass rounded-xl text-[10px] font-bold text-white uppercase tracking-widest border-shift-purple/30 bg-shift-purple/10">Monthly</button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dynamicMetrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-premium p-8 rounded-[2.5rem] border-white/5 hover:border-white/10 transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl bg-white/[0.03] border border-white/5 ${m.color} group-hover:scale-110 transition-transform`}>
                <m.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold tracking-tighter ${
                m.trend === 'up' ? 'text-emerald-500' : m.trend === 'down' ? 'text-rose-500' : 'text-zinc-500'
              }`}>
                {m.change}
                <ArrowUpRight className={`w-3 h-3 ${m.trend === 'down' ? 'rotate-90' : m.trend === 'stable' ? 'rotate-45 opacity-0' : ''}`} />
              </div>
            </div>
            <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-[0.2em] mb-1">{m.label}</p>
            <h3 className="text-3xl font-extralight text-white">{m.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Visualization Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Load Trajectory Chart (Mocked with SVG) */}
        <div className="lg:col-span-8 glass-premium p-10 rounded-[3rem] border-white/10 relative overflow-hidden">
          <div className="flex justify-between items-start mb-12">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-light text-white">Load Trajectory</h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">7-Day Cognitive Density Forecast</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-shift-purple" />
                <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Predicted</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full flex items-end justify-between gap-4 relative">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[1, 2, 3, 4].map(l => <div key={l} className="w-full h-[1px] bg-white/[0.03]" />)}
            </div>

            {[45, 60, 35, 85, 50, 65, 40].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group relative z-10">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 1.5, ease: "circOut" }}
                  className={`w-full max-w-[40px] rounded-2xl relative ${
                    h > 75 ? 'bg-rose-500/80 shadow-[0_0_20px_rgba(244,63,94,0.3)]' :
                    h > 50 ? 'bg-shift-purple/80 shadow-[0_0_20px_rgba(124,58,237,0.3)]' :
                    'bg-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                  }`}
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black px-2 py-1 rounded-md text-[10px] font-bold">
                    {h}%
                  </div>
                </motion.div>
                <span className="text-[9px] font-bold text-zinc-700 uppercase">Day {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Focus Quality Breakdown */}
        <div className="lg:col-span-4 flex flex-col gap-8">
           <div className="glass-premium p-10 rounded-[3rem] border-white/10 flex flex-col gap-8">
              <h3 className="text-xl font-light text-white">Self-Awareness</h3>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    <span>Morning Peak</span>
                    <span className="text-emerald-500">92%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-[92%] h-full bg-emerald-500" />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    <span>Afternoon Dip</span>
                    <span className="text-rose-500">34%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-[34%] h-full bg-rose-500" />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    <span>Night Flow</span>
                    <span className="text-shift-purple">78%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-[78%] h-full bg-shift-purple" />
                  </div>
                </div>
              </div>

              <div className="mt-4 p-5 bg-white/[0.03] border border-white/5 rounded-2xl">
                <p className="text-[10px] text-zinc-500 font-light leading-relaxed">
                  <span className="text-shift-purple font-bold">Insight:</span> Your focus quality increases significantly when you skip afternoon admin tasks.
                </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
