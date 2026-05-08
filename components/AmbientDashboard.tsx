"use client";

import { motion } from "framer-motion";

export default function AmbientDashboard({ items }: { items: any[] }) {
  return (
    <div className="flex flex-col gap-8 w-full">
      <h2 className="text-zinc-500 text-[10px] font-bold tracking-[0.4em] uppercase">Essential Streams</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="glass p-8 rounded-[2.5rem] flex flex-col gap-6 group hover:bg-white/[0.03] transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-white/[0.03] text-zinc-400 group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <span className="text-[10px] font-bold text-zinc-600 tracking-widest uppercase">{item.time}</span>
            </div>
            
            <div>
              <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mb-1">{item.category}</p>
              <h3 className="text-xl font-light text-white tracking-tight leading-tight">{item.title || item.source}</h3>
              {item.content && <p className="text-zinc-500 text-sm mt-2 font-light line-clamp-1">{item.content}</p>}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
              <div className="w-1 h-1 rounded-full bg-emerald-500" />
              <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Priority Verified</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
