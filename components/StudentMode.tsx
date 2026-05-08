"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Clock, FileText, Zap, Brain, ArrowRight, Plus } from "lucide-react";

interface Assignment {
  id: string;
  course: string;
  title: string;
  deadline: string;
  urgency: "high" | "medium" | "low";
}

const MOCK_ASSIGNMENTS: Assignment[] = [
  { id: "1", course: "CS50", title: "Final Project Draft", deadline: "2 days", urgency: "high" },
  { id: "2", course: "Economics", title: "Supply Chain Analysis", deadline: "5 days", urgency: "medium" },
  { id: "3", course: "Psychology", title: "Cognitive Load Essay", deadline: "Today", urgency: "high" },
];

export default function StudentMode() {
  return (
    <div className="w-full flex flex-col gap-12">
      {/* Student Header */}
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-4 h-4 text-shift-purple" />
            <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500">Student Survival Mode</h2>
          </div>
          <h1 className="text-4xl font-extralight text-white tracking-tight">Academic Launchpad</h1>
        </div>
        <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Assignment Tracker */}
        <div className="lg:col-span-7 flex flex-col gap-8">
           <div className="flex items-center justify-between px-2">
             <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-600">Assignments in Orbit</h3>
             <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">3 Priority Items</span>
           </div>
           
           <div className="flex flex-col gap-4">
             {MOCK_ASSIGNMENTS.map((a, i) => (
               <motion.div
                 key={a.id}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="glass-premium p-6 rounded-[2.5rem] border-white/5 group hover:border-shift-purple/30 transition-all"
               >
                 <div className="flex justify-between items-start">
                   <div className="flex flex-col gap-1">
                     <span className="text-[9px] font-bold text-shift-purple uppercase tracking-widest">{a.course}</span>
                     <h4 className="text-lg text-white font-light">{a.title}</h4>
                   </div>
                   <div className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                     a.urgency === 'high' ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'
                   }`}>
                     {a.deadline} left
                   </div>
                 </div>
                 <div className="mt-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-all">
                   <button className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[9px] font-bold text-zinc-400 uppercase tracking-widest hover:text-white transition-all">
                     Break Down
                   </button>
                   <button className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[9px] font-bold text-zinc-400 uppercase tracking-widest hover:text-white transition-all">
                     Find Resources
                   </button>
                 </div>
               </motion.div>
             ))}
           </div>
        </div>

        {/* AI Study Tools */}
        <div className="lg:col-span-5 flex flex-col gap-8">
           <div className="flex items-center gap-3 px-2">
             <Brain className="w-4 h-4 text-zinc-600" />
             <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-600">AI Study Forge</h3>
           </div>

           <div className="grid grid-cols-1 gap-4">
              <button className="glass p-8 rounded-[2.5rem] border-white/5 text-left flex items-center justify-between group hover:border-shift-purple/30 transition-all">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-shift-purple/10 rounded-2xl text-shift-purple">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Lecture Summarizer</h4>
                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-1">PDF &rarr; Flashcards</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-zinc-800 group-hover:text-white transition-all" />
              </button>

              <button className="glass p-8 rounded-[2.5rem] border-white/5 text-left flex items-center justify-between group hover:border-emerald-500/30 transition-all">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Study Sprint Mode</h4>
                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-1">Optimized Pomodoro</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-zinc-800 group-hover:text-white transition-all" />
              </button>

              <button className="glass p-8 rounded-[2.5rem] border-white/5 text-left flex items-center justify-between group hover:border-amber-500/30 transition-all">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-500">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Quiz Generator</h4>
                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-1">Test your retention</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-zinc-800 group-hover:text-white transition-all" />
              </button>
           </div>

           <div className="glass-premium p-8 rounded-[2.5rem] border-white/10 mt-4">
              <p className="text-[10px] text-zinc-500 font-light leading-relaxed">
                <span className="text-shift-purple font-bold">AI Tip:</span> You've completed 4 focus sessions today. Your retention is currently peak. We recommend a 30-minute exam review now.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
