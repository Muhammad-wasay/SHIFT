"use client";

import { motion } from "framer-motion";

export default function FlowStateGraph() {
  // Mock history points
  const points = [40, 35, 45, 30, 20, 25, 15, 10];
  const width = 300;
  const height = 100;
  const step = width / (points.length - 1);
  
  const pathData = points.reduce((acc, val, i) => {
    const x = i * step;
    const y = height - (val / 50) * height;
    return acc + `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }, "");

  return (
    <div className="glass p-8 rounded-[2.5rem] flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-zinc-500 text-[10px] font-bold tracking-[0.4em] uppercase">Cognitive History</h3>
        <span className="text-[10px] text-emerald-400 font-bold tracking-widest">-62% LOAD</span>
      </div>
      
      <div className="relative h-24 w-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          <motion.path
            d={pathData}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.6)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div className="flex justify-between items-center text-[9px] text-zinc-600 font-bold uppercase tracking-[0.2em]">
        <span>9:00 AM</span>
        <span>Peak Focus</span>
        <span>Now</span>
      </div>
    </div>
  );
}
