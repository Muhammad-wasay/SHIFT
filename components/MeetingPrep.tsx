"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, FileText, Sparkles, Clock, ChevronRight, Brain, Zap } from "lucide-react";

interface Meeting {
  id: string;
  title: string;
  time: string;
  attendees: string[];
  description: string;
}

const MOCK_MEETINGS: Meeting[] = [
  { id: "1", title: "Product Roadmap Sync", time: "10:30 AM", attendees: ["Sarah", "Mike", "Alex"], description: "Discussing Q3 anti-gravity features." },
  { id: "2", title: "Investor Pitch Prep", time: "2:00 PM", attendees: ["David", "Elena"], description: "Reviewing the Series A deck." },
  { id: "3", title: "Engineering Deep Dive", time: "4:15 PM", attendees: ["Chris", "Leo", "Sofi"], description: "Optimizing the orbital physics engine." },
];

export default function MeetingPrep() {
  const [selected, setSelected] = useState<Meeting | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    <div className="w-full flex flex-col gap-12">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-shift-purple" />
            <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500">Meeting Prep Assistant</h2>
          </div>
          <h1 className="text-4xl font-extralight text-white tracking-tight">Mission Control</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Meeting List */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-600">Upcoming Windows</h3>
            <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">{MOCK_MEETINGS.length} Slotted</span>
          </div>
          <div className="flex flex-col gap-4">
            {MOCK_MEETINGS.map((m) => (
              <button
                key={m.id}
                onClick={() => { setSelected(m); setIsAnalyzing(true); setTimeout(() => setIsAnalyzing(false), 1500); }}
                className={`glass-premium p-6 rounded-[2rem] text-left transition-all border-white/5 hover:border-shift-purple/30 group ${selected?.id === m.id ? 'border-shift-purple bg-shift-purple/10' : ''}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-zinc-500" />
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{m.time}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-zinc-800 transition-transform ${selected?.id === m.id ? 'rotate-90 text-white' : 'group-hover:translate-x-1'}`} />
                </div>
                <h4 className="text-lg text-white font-light group-hover:text-shift-purple transition-colors">{m.title}</h4>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Prep Control Panel */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-premium p-10 rounded-[3rem] border-white/10 min-h-[500px] flex flex-col gap-10"
              >
                {isAnalyzing ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-6">
                    <Brain className="w-12 h-12 text-shift-purple animate-pulse" />
                    <p className="text-[10px] font-bold text-zinc-500 tracking-[0.5em] uppercase animate-pulse">Syncing Context...</p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-3">
                        <h2 className="text-3xl font-extralight text-white">{selected.title}</h2>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-shift-purple" />
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{selected.attendees.join(", ")}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                        <Sparkles className="w-5 h-5 text-emerald-500" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex flex-col gap-6">
                        <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-600">AI Talking Points</h3>
                        <div className="flex flex-col gap-4">
                          {["Highlight the 12% reduction in cognitive load.", "Address Mike's concern regarding GPU latency.", "Push for the 2.0 release date confirmation."].map((p, i) => (
                            <div key={i} className="flex gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                              <div className="w-1.5 h-1.5 rounded-full bg-shift-purple mt-1.5 shrink-0" />
                              <p className="text-xs text-zinc-400 font-light leading-relaxed">{p}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-6">
                        <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-600">Key Context</h3>
                        <div className="p-6 bg-shift-purple/5 border border-shift-purple/10 rounded-3xl">
                          <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
                            {selected.description}
                          </p>
                          <div className="flex flex-col gap-3">
                             <div className="flex items-center justify-between text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                               <span>Prep Status</span>
                               <span className="text-emerald-500">100% Ready</span>
                             </div>
                             <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                               <div className="w-full h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                             </div>
                          </div>
                        </div>
                        <button className="w-full py-4 glass rounded-2xl text-[10px] font-bold text-white uppercase tracking-widest hover:bg-white/5 transition-all">
                          Record Live Summary
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ) : (
              <div className="glass-premium p-10 rounded-[3rem] border-white/5 h-full flex flex-col items-center justify-center gap-6 opacity-40">
                <FileText className="w-12 h-12 text-zinc-800" />
                <p className="text-[10px] font-bold text-zinc-700 tracking-[0.5em] uppercase text-center leading-relaxed">
                  Select a mission <br/> to generate prep notes
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
