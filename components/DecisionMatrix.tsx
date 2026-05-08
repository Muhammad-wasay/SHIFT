"use client";

import { motion } from "framer-motion";
import { Scale, Zap, Shield, Target, Trash2, ArrowUpRight, MinusCircle } from "lucide-react";

interface MatrixTask {
  id: string;
  title: string;
  impact: number; // 1-10
  effort: number; // 1-10
}

const MOCK_TASKS: MatrixTask[] = [
  { id: "1", title: "Launch 2.0 Beta", impact: 10, effort: 9 },
  { id: "2", title: "Fix Button Padding", impact: 2, effort: 1 },
  { id: "3", title: "Write Weekly Report", impact: 5, effort: 3 },
  { id: "4", title: "Refactor Auth Logic", impact: 8, effort: 8 },
  { id: "5", title: "Update README", impact: 3, effort: 2 },
  { id: "6", title: "Add Sound Effects", impact: 6, effort: 4 },
];

export default function DecisionMatrix() {
  const getQuadrant = (task: MatrixTask) => {
    if (task.impact >= 5 && task.effort < 5) return "wins"; // Quick Wins
    if (task.impact >= 5 && task.effort >= 5) return "major"; // Major Projects
    if (task.impact < 5 && task.effort < 5) return "filler"; // Fill-ins
    return "waste"; // Thankless Tasks
  };

  const Quadrant = ({ title, icon: Icon, color, tasks, type }: { title: string, icon: any, color: string, tasks: MatrixTask[], type: string }) => (
    <div className={`glass-premium p-8 rounded-[3rem] border-white/5 flex flex-col gap-6 relative overflow-hidden group`}>
      <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[80px] opacity-10 ${color}`} />
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl bg-white/5 ${color.replace('bg-', 'text-')}`}>
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-light text-white">{title}</h3>
        </div>
        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{tasks.length} items</span>
      </div>

      <div className="flex flex-col gap-3 min-h-[150px]">
        {tasks.length > 0 ? (
          tasks.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-all flex justify-between items-center group/item"
            >
              <span className="text-xs text-zinc-400 font-light">{t.title}</span>
              <div className="flex gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                 <button className="p-2 hover:text-white text-zinc-700 transition-colors"><ArrowUpRight className="w-3 h-3" /></button>
                 <button className="p-2 hover:text-rose-500 text-zinc-700 transition-colors"><Trash2 className="w-3 h-3" /></button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="flex-1 flex items-center justify-center border border-dashed border-white/5 rounded-2xl opacity-20">
            <p className="text-[9px] font-bold uppercase tracking-widest">Clear Quadrant</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-12">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Scale className="w-4 h-4 text-shift-purple" />
            <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500">Task Decision Matrix</h2>
          </div>
          <h1 className="text-4xl font-extralight text-white tracking-tight">Strategic Priority</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Quadrant 
          title="Quick Wins" 
          icon={Zap} 
          color="bg-emerald-500" 
          type="wins"
          tasks={MOCK_TASKS.filter(t => getQuadrant(t) === "wins")} 
        />
        <Quadrant 
          title="Major Projects" 
          icon={Target} 
          color="bg-shift-purple" 
          type="major"
          tasks={MOCK_TASKS.filter(t => getQuadrant(t) === "major")} 
        />
        <Quadrant 
          title="Fill-ins" 
          icon={Shield} 
          color="bg-amber-500" 
          type="filler"
          tasks={MOCK_TASKS.filter(t => getQuadrant(t) === "filler")} 
        />
        <Quadrant 
          title="Thankless Tasks" 
          icon={MinusCircle} 
          color="bg-rose-500" 
          type="waste"
          tasks={MOCK_TASKS.filter(t => getQuadrant(t) === "waste")} 
        />
      </div>

      <div className="p-10 glass-premium rounded-[3rem] border-white/5 flex items-center justify-between">
         <div className="flex flex-col gap-2">
           <h3 className="text-white font-light">AI Strategy Recommendation</h3>
           <p className="text-xs text-zinc-500 font-light">"Shift your focus to the <span className="text-emerald-500 font-medium uppercase tracking-widest text-[10px]">Quick Wins</span>. You have 3 high-impact items that require less than 40 minutes each."</p>
         </div>
         <button className="px-8 py-3 bg-shift-purple text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all">Optimize My Day</button>
      </div>
    </div>
  );
}
