"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
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
import Onboarding from "@/components/Onboarding";
import { useAuth } from "@/lib/hooks/useAuth";
import { supabase } from "@/lib/supabaseClient";
import { 
  Activity, Shield, Zap, AlertTriangle, ArrowUp, MessageSquare, LayoutGrid, 
  Calendar, Mail, Sparkles, Brain, BarChart3, Moon, Target, Scale, ShieldAlert,
  ShieldCheck, GraduationCap, Trophy, Mic, Volume2, LogOut, Sun
} from "lucide-react";

type TabType = "orbit" | "debris" | "schedule" | "analytics" | "prep" | "habits" | "matrix" | "observer" | "shield" | "student" | "vault";

export default function Home() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  
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
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("shift_onboarding_seen");
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem("shift_onboarding_seen", "true");
  };

  // Sync with Supabase on mount
  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('current_energy_level, current_load')
          .eq('id', user.id)
          .single();
        
        if (data && !error) {
          if (data.current_energy_level) setEnergy(data.current_energy_level);
          // Assuming we might add current_load to profiles later, or calculate from lift_events
        }
      };
      fetchProfile();
    }
  }, [user]);

  // Periodic energy & load sync
  useEffect(() => {
    if (!user) return;
    
    const syncMetrics = async () => {
      await supabase
        .from('profiles')
        .update({ 
          current_energy_level: energy,
          current_load: load
        })
        .eq('id', user.id);
    };

    const timer = setTimeout(syncMetrics, 5000);
    return () => clearTimeout(timer);
  }, [energy, load, user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy(prev => {
        if (isFocusMode) return Math.max(10, prev - 0.5);
        return Math.min(100, prev + 0.2);
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [isFocusMode]);

  const handleLift = useCallback(async (newWeights: any[]) => {
    setWeights(prev => [...prev, ...newWeights]);
    const weightImpact = newWeights.reduce((acc, curr) => acc + curr.gravity, 0);
    setLoad(prev => Math.min(95, prev + weightImpact * 1.5));

    // Persist lift event to Supabase
    if (user) {
      for (const w of newWeights) {
        await supabase.from('lift_events').insert({
          user_id: user.id,
          weight_removed: w.gravity,
          visual_effect: 'upward_float',
          event_type: w.type || 'task_completed'
        });
      }
    }
  }, [user]);

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

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <ShiftLogo />
          <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden relative">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-white/20"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className={`flex min-h-screen flex-row relative overflow-hidden transition-all duration-700 ${theme === 'dark' ? 'bg-space-950' : 'light'}`}>
      {/* Background Zen sphere */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <ZenSphere load={load} isFocus={isFocusMode} />
      </div>

      {/* Side Navigation (Streamlined Ecosystem) */}
      <nav className="h-screen w-24 flex flex-col items-center py-10 gap-8 z-[100] glass border-r border-white/5">
        <div className="flex-1 flex flex-col gap-6">
          <NavItem active={activeTab === 'orbit'} onClick={() => setActiveTab('orbit')} icon={LayoutGrid} label="Orbit" />
          <NavItem active={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')} icon={Calendar} label="Schedule" />
          <NavItem active={activeTab === 'debris'} onClick={() => setActiveTab('debris')} icon={Mail} label="Triage" />
          <NavItem active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} icon={BarChart3} label="Data" />
        </div>

        <div className="flex flex-col gap-4 mt-auto">
           <button onClick={() => setShowReflection(true)} title="Journal" className="p-3 text-zinc-600 hover:text-white transition-all"><Moon className="w-5 h-5" /></button>
           <button onClick={() => setShowCoach(true)} title="AI Coach" className="p-3 bg-shift-purple/20 border border-shift-purple/30 rounded-xl text-shift-purple hover:bg-shift-purple hover:text-white transition-all"><MessageSquare className="w-5 h-5" /></button>
           <div className="w-10 h-[1px] bg-white/5 my-2" />
           <button onClick={signOut} title="Sign Out" className="p-3 text-zinc-600 hover:text-rose-400 transition-all"><LogOut className="w-5 h-5" /></button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto scrollbar-hide relative z-10">
        <div className="w-full px-8 pt-8">
          <motion.header 
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.05}
            className="w-full flex justify-between items-center py-4 px-10 glass border border-white/10 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl cursor-grab active:cursor-grabbing"
          >
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                <ShiftLogo mini />
                <button 
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-zinc-400 hover:text-white border border-white/5"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>
              
              <div className="h-6 w-[1px] bg-white/10" />
              
              <div className="flex items-center gap-6">
                <div className="px-5 py-2 rounded-full flex items-center gap-3 border border-white/5 bg-white/[0.02]">
                  <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${load > 75 ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-zinc-500">
                    Load
                  </span>
                  <div className="w-[1px] h-3 bg-white/10" />
                  <span className="text-[9px] font-bold text-white tracking-widest">{load}%</span>
                </div>
                <div className="px-5 py-2 rounded-full flex items-center gap-3 border border-white/5 bg-white/[0.02]">
                   <Zap className="w-3 h-3 text-amber-500" />
                   <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-zinc-500">
                    Energy
                   </span>
                   <div className="w-[1px] h-3 bg-white/10" />
                   <span className="text-[9px] font-bold text-white tracking-widest">{Math.round(energy)}%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
               <div className="flex items-center gap-3 glass py-1.5 pl-2 pr-5 rounded-2xl border-white/5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-shift-purple to-blue-500 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
                    {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left">
                    <p className="text-[7px] font-bold text-zinc-500 uppercase tracking-widest leading-none mb-1">Pilot Active</p>
                    <p className="text-[10px] text-white font-medium truncate max-w-[80px]">{user?.user_metadata?.full_name || user?.email?.split('@')[0]}</p>
                  </div>
               </div>
               <button onClick={() => setIsFocusMode(true)} className="px-6 py-2.5 bg-white text-black rounded-xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5 border border-white/10">Launch Focus</button>
            </div>
          </motion.header>
        </div>

        <div className="w-full max-w-[1600px] mx-auto p-16 pt-8 pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (isLaunching ? '-launching' : '')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-20">
                <div className={`${activeTab === 'analytics' || activeTab === 'prep' || activeTab === 'habits' || activeTab === 'matrix' || activeTab === 'observer' || activeTab === 'shield' || activeTab === 'student' || activeTab === 'vault' ? 'xl:col-span-12' : 'xl:col-span-12'} flex flex-col gap-20`}>
                  
                  {activeTab === 'orbit' && (
                    <>
                      {!isLaunching ? (
                        <div className="flex flex-col gap-24">
                           <div className="grid grid-cols-1 xl:grid-cols-12 gap-20 items-start">
                              <div className="flex flex-col gap-12 xl:col-span-6">
                                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
                                    <h1 className="text-5xl lg:text-6xl xl:text-[4.5rem] font-extralight tracking-tighter text-white leading-[1] md:leading-tight">
                                       Sustainable <br/>
                                       <span className="shift-logo italic font-light !text-6xl !tracking-widest">focus.</span>
                                    </h1>
                                 </motion.div>
                                 <WeightCollector onLift={handleLift} />
                              </div>
                              <div className="flex flex-col gap-12 xl:col-span-6 xl:pt-8">
                                 <VoiceCommander onResult={handleVoiceCommand} />
                                 <AmbientEngine />
                              </div>
                           </div>
                           
                           {weights.length > 0 && (
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                               {weights.slice(0, 4).map(w => (
                                 <button key={w.id} onClick={() => launchTask(w.text)} className="glass-premium p-10 rounded-[2.5rem] text-left hover:border-shift-purple/50 transition-all group">
                                    <div className="flex justify-between items-start mb-6">
                                       <span className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase">{w.gravity}G Density</span>
                                       <ArrowUp className="w-4 h-4 text-zinc-800 group-hover:text-white group-hover:-translate-y-1 transition-all" />
                                    </div>
                                    <p className="text-xl text-white font-light leading-relaxed">{w.text}</p>
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
                  <div className="xl:col-span-4 flex flex-col gap-16 lg:sticky lg:top-8">
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
      
      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
    </main>
  );
}

function NavItem({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) {
  return (
    <div className="relative group">
      <button 
        onClick={onClick}
        className={`p-3.5 rounded-2xl transition-all relative z-10 ${active ? 'bg-white text-black dark:bg-white dark:text-black' : 'text-zinc-600 hover:text-white'}`}
      >
        <Icon className="w-5 h-5" />
      </button>
      <div className="absolute left-full ml-4 px-3 py-1.5 glass rounded-lg text-[9px] font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
        {label}
      </div>
    </div>
  );
}








