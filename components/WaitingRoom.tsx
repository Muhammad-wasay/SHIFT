"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, Info, Sparkles, ChevronRight } from "lucide-react";

export default function WaitingRoom({ items }: { items: any[] }) {
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleSummarize = () => {
    setIsSummarizing(true);
    setTimeout(() => setIsSummarizing(false), 3000); // Simulate AI processing
  };

  return (
    <div className="w-full max-w-sm glass rounded-[2.5rem] p-8 overflow-hidden relative">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase">The Waiting Room</h3>
        <span className="text-zinc-400 text-[9px] font-bold bg-zinc-900/80 px-3 py-1 rounded-full border border-zinc-800 tracking-widest uppercase">{items.length} Held</span>
      </div>
      
      <div className="flex flex-col gap-5 min-h-[200px]">
        <AnimatePresence mode="wait">
          {isSummarizing ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center gap-4 py-12"
            >
              <div className="w-8 h-8 rounded-full border-2 border-white/5 border-t-white/40 animate-spin" />
              <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase animate-pulse">Bouncer is Summarizing...</p>
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {items.length > 0 ? (
                <div className="flex flex-col gap-5">
                  {items.map((notif, index) => (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 py-1 group cursor-pointer"
                    >
                      <div className="p-2 rounded-xl bg-zinc-900/30 text-zinc-600 border border-zinc-800/30 group-hover:border-white/10 group-hover:text-zinc-300 transition-all">
                        {notif.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-zinc-500 font-bold tracking-wider uppercase mb-0.5">{notif.source}</p>
                        <p className="text-sm text-zinc-400 truncate font-light tracking-tight">{notif.content}</p>
                        {notif.reason && (
                          <p className="text-[9px] text-zinc-600 mt-1 italic group-hover:text-zinc-500 transition-colors">
                            Bouncer: {notif.reason}
                          </p>
                        )}
                      </div>
                      <ChevronRight className="w-3 h-3 text-zinc-800 group-hover:text-zinc-400 transition-colors" />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-zinc-700">
                  <Sparkles className="w-6 h-6 mb-2 opacity-20" />
                  <p className="text-[10px] font-bold tracking-widest uppercase">No pending updates</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <button 
        onClick={handleSummarize}
        disabled={items.length === 0 || isSummarizing}
        className="mt-10 w-full py-4 rounded-[1.25rem] text-[10px] font-bold text-zinc-500 hover:text-white hover:bg-white/[0.02] disabled:opacity-30 disabled:hover:bg-transparent transition-all uppercase tracking-[0.3em] border border-zinc-800/50 flex items-center justify-center gap-2"
      >
        <Sparkles className="w-3 h-3" />
        Generate AI Digest
      </button>
    </div>
  );
}
