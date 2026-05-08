"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ZenSphere from "@/components/ZenSphere";
import ShiftLogo from "@/components/ShiftLogo";
import FocusMode from "@/components/FocusMode";
import WeightCollector from "@/components/WeightCollector";
import GravityFieldDashboard from "@/components/GravityFieldDashboard";
import TaskLauncher from "@/components/TaskLauncher";
import AssistantChat from "@/components/AssistantChat";
import AILifeCoach from "@/components/AILifeCoach";
import InboxTriage from "@/components/InboxTriage";
import ScheduleOptimizer from "@/components/ScheduleOptimizer";
import ReflectionJournal from "@/components/ReflectionJournal";
import BurnoutDashboard from "@/components/BurnoutDashboard";
import MeetingPrep from "@/components/MeetingPrep";
import HabitTracker from "@/components/HabitTracker";
import DecisionMatrix from "@/components/DecisionMatrix";
import AccountabilityPartner from "@/components/AccountabilityPartner";
import DistractionBlocker from "@/components/DistractionBlocker";
import StudentMode from "@/components/StudentMode";
import AmbientEngine from "@/components/AmbientEngine";
import AchievementSystem from "@/components/AchievementSystem";
import VoiceCommander from "@/components/VoiceCommander";
import { 
  Activity, Shield, Zap, AlertTriangle, ArrowUp, MessageSquare, LayoutGrid, 
  Calendar, Mail, Sparkles, Brain, BarChart3, Moon, Target, Scale, ShieldAlert,
  ShieldCheck, GraduationCap, Trophy, Mic, Volume2
} from "lucide-react";

type TabType = "orbit" | "debris" | "schedule" | "analytics" | "prep" | "habits" | "matrix" | "observer" | "shield" | "student" | "vault";

export default function Home() {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showCoach, setShowCoach] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("orbit");
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [load, setLoad] = useState(48);
  const [energy, setEnergy] = useState(82);
  const [weights, setWeights] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy(prev => {
        if (isFocusMode) return Math.max(10, prev - 0.5);
        return Math.min(100, prev + 0.2);
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [isFocusMode]);

  const handleLift = (newWeights: any[]) => {
    setWeights(prev => [...prev, ...newWeights]);
    const weightImpact = newWeights.reduce((acc, curr) => acc + curr.gravity, 0);
    setLoad(Math.min(95, load + weightImpact * 1.5));
  };

  const handleVoiceCommand = (text: string) => {
    handleLift([{
      id: Date.now(),
      text,
      gravity: Math.floor(Math.random() * 5) + 3,
      type: 'task'
    }]);
  };

  const launchTask = (task: string) => {
    setSelectedTask(task);
    setIsLaunching(true);
  };

  return (
    <main className="flex min-h-screen flex-row relative overflow-hidden bg-space-950">
      {/* Background Zen sphere */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <ZenSphere load={load} isFocus={isFocusMode} />
      </div>

      {/* Side Navigation (Expanded Ecosystem) */}
      <nav className="h-screen w-24 flex flex-col items-center py-10 gap-8 z-[100] glass border-r border-white/5">
        <ShiftLogo mini />
        
        <div className="flex-1 flex flex-col gap-4">
          <NavItem active={activeTab === 'orbit'} onClick={() => setActiveTab('orbit')} icon={LayoutGrid} label="Orbit" />
          <NavItem active={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')} icon={Calendar} label="Schedule" />
          <NavItem active={activeTab === 'debris'} onClick={() => setActiveTab('debris')} icon={Mail} label="Triage" />
          <NavItem active={activeTab === 'prep'} onClick={() => setActiveTab('prep')} icon={Target} label="Prep" />
          <NavItem active={activeTab === 'habits'} onClick={() => setActiveTab('habits')} icon={Activity} label="Habits" />
          <NavItem active={activeTab === 'matrix'} onClick={() => setActiveTab('matrix')} icon={Scale} label="Matrix" />
          <NavItem active={activeTab === 'observer'} onClick={() => setActiveTab('observer')} icon={ShieldAlert} label="Observer" />
          <NavItem active={activeTab === 'shield'} onClick={() => setActiveTab('shield')} icon={ShieldCheck} label="Shield" />
          <NavItem active={activeTab === 'vault'} onClick={() => setActiveTab('vault')} icon={Trophy} label="Vault" />
          <NavItem active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} icon={BarChart3} label="Data" />
        </div>

        <div className="flex flex-col gap-4 mt-auto">
           <button onClick={() => setShowReflection(true)} className="p-3 text-zinc-600 hover:text-white transition-all"><Moon className="w-5 h-5" /></button>
           <button onClick={() => setShowCoach(true)} className="p-3 bg-shift-purple rounded-xl text-white hover:scale-105 transition-all"><MessageSquare className="w-5 h-5" /></button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto scrollbar-hide relative z-10">
        <header className="w-full flex justify-between items-center py-10 px-16 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-6">
            <div className="glass px-6 py-2.5 rounded-full flex items-center gap-4 border-white/5 bg-white/[0.02]">
              <div className={`w-2 h-2 rounded-full animate-pulse ${load > 75 ? 'bg-rose-500' : 'bg-emerald-500'}`} />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-zinc-400">
                {load > 85 ? "Critical Collapse" : load > 60 ? "Heavy Orbit" : "Clear Space"}
              </span>
              <div className="w-[1px] h-3 bg-white/10" />
              <span className="text-[10px] font-bold text-white tracking-widest">{load}% LOAD</span>
            </div>
            <div className="glass px-6 py-2.5 rounded-full flex items-center gap-4 border-white/5 bg-white/[0.02]">
               <Zap className="w-3 h-3 text-amber-500" />
               <span className="text-[10px] font-bold text-white tracking-widest">{energy}% BIO-ENERGY</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <button onClick={() => setIsFocusMode(true)} className="px-6 py-2.5 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all">Launch Focus</button>
          </div>
        </header>

        <div className="w-full max-w-[1600px] mx-auto p-16 pt-4 pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (isLaunching ? '-launching' : '')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                <div className={`${activeTab === 'analytics' || activeTab === 'prep' || activeTab === 'habits' || activeTab === 'matrix' || activeTab === 'observer' || activeTab === 'shield' || activeTab === 'student' || activeTab === 'vault' ? 'lg:col-span-12' : 'lg:col-span-7'} flex flex-col gap-20`}>
                  
                  {activeTab === 'orbit' && (
                    <>
                      {!isLaunching ? (
                        <div className="flex flex-col gap-20">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                              <div className="flex flex-col gap-10">
                                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
                                    <h1 className="text-8xl font-extralight tracking-tighter text-white leading-tight">
                                      Sustainable <br/>
                                      <span className="shift-logo italic font-light">focus.</span>
                                    </h1>
                                 </motion.div>
                                 <WeightCollector onLift={handleLift} />
                              </div>
                              <div className="flex flex-col gap-10 pt-20">
                                 <VoiceCommander onResult={handleVoiceCommand} />
                                 <AmbientEngine />
                              </div>
                           </div>
                           
                           {weights.length > 0 && (
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               {weights.slice(0, 4).map(w => (
                                 <button key={w.id} onClick={() => launchTask(w.text)} className="glass-premium p-8 rounded-[2.5rem] text-left hover:border-shift-purple/50 transition-all group">
                                    <div className="flex justify-between items-start mb-6">
                                       <span className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase">{w.gravity}G Density</span>
                                       <ArrowUp className="w-4 h-4 text-zinc-800 group-hover:text-white group-hover:-translate-y-1 transition-all" />
                                    </div>
                                    <p className="text-lg text-white font-light leading-relaxed">{w.text}</p>
                                 </button>
                               ))}
                             </div>
                           )}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-10">
                          <button onClick={() => setIsLaunching(false)} className="w-fit px-6 py-2.5 glass rounded-full text-zinc-500 hover:text-white text-[10px] font-bold tracking-widest uppercase flex items-center gap-3">
                            <ArrowUp className="w-3 h-3 rotate-[-90deg]" /> Return to Dashboard
                          </button>
                          <TaskLauncher task={selectedTask!} onLaunch={() => setIsFocusMode(true)} />
                        </div>
                      )}
                    </>
                  )}

                  {activeTab === 'schedule' && <ScheduleOptimizer />}
                  {activeTab === 'debris' && <InboxTriage />}
                  {activeTab === 'prep' && <MeetingPrep />}
                  {activeTab === 'habits' && <HabitTracker />}
                  {activeTab === 'matrix' && <DecisionMatrix />}
                  {activeTab === 'observer' && <AccountabilityPartner />}
                  {activeTab === 'shield' && <DistractionBlocker />}
                  {activeTab === 'student' && <StudentMode />}
                  {activeTab === 'vault' && <AchievementSystem />}
                  {activeTab === 'analytics' && <BurnoutDashboard />}
                </div>

                {['orbit', 'schedule', 'debris'].includes(activeTab) && !isLaunching && (
                  <div className="lg:col-span-5 flex flex-col gap-16 lg:sticky lg:top-8">
                    <GravityFieldDashboard tasks={weights} />
                    <div className="glass-premium p-10 rounded-[3rem] flex flex-col gap-10 border-white/10">
                       <div className="flex items-center justify-between">
                          <span className="text-zinc-500 text-[10px] font-bold tracking-[0.3em] uppercase">Cognitive Density</span>
                          <span className={`text-2xl font-extralight tracking-tighter ${load > 80 ? 'text-rose-400' : 'text-emerald-400'}`}>{load}%</span>
                       </div>
                       <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden p-[2px]">
                          <motion.div animate={{ width: `${load}%` }} className={`h-full rounded-full ${load > 80 ? 'bg-rose-500' : 'bg-shift-purple'}`} />
                       </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showChat && <AssistantChat load={load} tasksCount={weights.length} onClose={() => setShowChat(false)} />}
        {showCoach && <AILifeCoach load={load} energy={energy} tasksCount={weights.length} onClose={() => setShowCoach(false)} />}
        {showReflection && <ReflectionJournal onClose={() => setShowReflection(false)} />}
      </AnimatePresence>

      <FocusMode isActive={isFocusMode} onClose={() => setIsFocusMode(false)} />
    </main>
  );
}

function NavItem({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) {
  return (
    <div className="relative group">
      <button 
        onClick={onClick}
        className={`p-3.5 rounded-2xl transition-all relative z-10 ${active ? 'bg-shift-purple text-white' : 'text-zinc-600 hover:text-white'}`}
      >
        <Icon className="w-5 h-5" />
      </button>
      <div className="absolute left-full ml-4 px-3 py-1.5 glass rounded-lg text-[9px] font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
        {label}
      </div>
    </div>
  );
}





