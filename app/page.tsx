"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import ZenSphere from "@/components/ZenSphere";
import ShiftLogo from "@/components/ShiftLogo";
import AmbientDashboard from "@/components/AmbientDashboard";
import WaitingRoom from "@/components/WaitingRoom";
import FocusMode from "@/components/FocusMode";
import FlowStateGraph from "@/components/FlowStateGraph";
import Onboarding from "@/components/Onboarding";
import { Maximize2, Shield, Radio, Activity, LayoutGrid, Bell, Zap, Cloud, Mail, MessageSquare, Menu } from "lucide-react";

// Mock Data for the Bouncer with AI Reasoning
const INITIAL_NOTIFS = [
  { id: 1, title: "Deep Work Session", time: "10:00 AM", category: "Focus", icon: <Zap className="w-4 h-4" />, score: 9.2, reason: "Matches your peak productivity window." },
  { id: 2, title: "Team Sync: Strategy", time: "2:00 PM", category: "Meeting", icon: <Bell className="w-4 h-4" />, score: 8.5, reason: "High-priority calendar event." },
  { id: 3, source: "Slack", content: "3 messages from #marketing", icon: <MessageSquare className="w-3 h-3" />, score: 4.5, reason: "Non-urgent internal chatter." },
  { id: 4, source: "Gmail", content: "Newsletter: Tech Weekly", icon: <Mail className="w-3 h-3" />, score: 2.1, reason: "Low priority promotional content." },
];

export default function Home() {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [load, setLoad] = useState(24);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFS);

  const threshold = isFocusMode ? 9.5 : 7.0;

  const dashboardItems = useMemo(() => 
    notifications.filter(n => (n.score || 0) >= threshold), 
    [notifications, threshold]
  );

  const waitingRoomItems = useMemo(() => 
    notifications.filter(n => (n.score || 0) < threshold), 
    [notifications, threshold]
  );

  useEffect(() => {
    let targetLoad = dashboardItems.length * 12 + 10;
    if (isFocusMode) targetLoad = 12;
    const timer = setTimeout(() => setLoad(targetLoad), 500);
    return () => clearTimeout(timer);
  }, [dashboardItems, isFocusMode]);

  const addNotification = () => {
    const scores = [2, 5, 8, 9.8];
    const randomScore = scores[Math.floor(Math.random() * scores.length)];
    const newNotif = {
      id: Date.now(),
      source: randomScore > 7 ? "Urgent System" : "Slack",
      content: randomScore > 7 ? "Critical Security Patch" : "Someone mentioned you",
      icon: randomScore > 7 ? <Bell className="w-4 h-4" /> : <MessageSquare className="w-3 h-3" />,
      score: randomScore,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: randomScore > 7 ? "Alert" : "Social",
      title: randomScore > 7 ? "Critical Alert" : "Message Received",
      reason: randomScore > 7 ? "Security protocol bypass" : "Low priority social ping"
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  return (
    <main className="flex min-h-screen flex-col items-start relative overflow-hidden bg-[#050505]">
      <Onboarding />
      
      {/* Background Zen sphere - large and subtle */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <ZenSphere load={load} isFocus={isFocusMode} />
      </div>

      {/* Navigation */}
      <nav className="w-full flex justify-between items-center z-50 py-6 md:py-8 px-6 md:px-12 bg-[#050505]/50 backdrop-blur-md">
        <div className="flex-1">
          <ShiftLogo />
        </div>
        
        {/* Desktop Controls */}
        <div className="hidden md:flex gap-4 items-center">
          <button 
            onClick={addNotification}
            className="flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 text-[9px] font-bold tracking-[0.2em] text-zinc-600 hover:text-white transition-all uppercase"
          >
            Simulate Event
          </button>
          <button 
            onClick={() => setIsFocusMode(true)}
            className="flex items-center gap-3 px-8 py-3 rounded-full glass hover:bg-white/10 transition-all text-[10px] font-bold tracking-[0.3em] uppercase group"
          >
            <Maximize2 className="w-3 h-3 group-hover:scale-110 transition-transform" />
            Focus Mode
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden gap-3">
          <button onClick={() => setIsFocusMode(true)} className="p-3 rounded-full glass">
            <Maximize2 className="w-4 h-4 text-white" />
          </button>
          <button onClick={addNotification} className="p-3 rounded-full border border-white/5">
            <Zap className="w-4 h-4 text-zinc-600" />
          </button>
        </div>
      </nav>

      {/* Floating White Line Separator */}
      <div className="w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] mx-auto h-[1px] bg-white/10 z-50" />

      {/* Main Content Area */}
      <div className="w-full flex justify-center z-10">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start p-6 md:p-12 lg:p-24 lg:pt-16">
          
          {/* Left Column: FlowState and Core UI */}
          <div className="lg:col-span-8 flex flex-col gap-12 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Contextual Status Bar */}
              <div className="flex flex-wrap items-center gap-4 mb-8 md:mb-10">
                <div className="glass px-4 md:px-6 py-2 rounded-full flex items-center gap-3 border-white/5">
                  <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${load > 60 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                  <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400">
                    {isFocusMode 
                      ? "Deep Work: Noise Silenced" 
                      : load > 60 
                        ? "High Input: Bouncer Active" 
                        : "Optimal Flow"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-4 h-4 text-zinc-600" />
                <span className="text-zinc-600 text-[10px] font-bold tracking-[0.4em] uppercase">
                  {isFocusMode ? "Bouncer: Max Security" : "Bouncer: Active"}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-8xl font-extralight tracking-tight text-white mb-8 leading-[1.1]">
                Manage your <br/>
                <span className="text-zinc-500 italic font-light">cognitive load.</span>
              </h1>
              
              <p className="text-zinc-500 text-lg md:text-xl max-w-xl font-light leading-relaxed tracking-wide">
                {waitingRoomItems.length} interruptions filtered. Protecting your current flow state.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <AmbientDashboard items={dashboardItems} />
            </motion.div>
          </div>

          {/* Right Column: Waiting Room and Stats */}
          <div className="lg:col-span-4 flex flex-col gap-10 lg:sticky lg:top-24 w-full">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <WaitingRoom items={waitingRoomItems} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <FlowStateGraph />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass p-8 md:p-10 rounded-[3rem] flex flex-col gap-8 w-full"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-zinc-600" />
                  <span className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase">Neural Load</span>
                </div>
                <span className={`text-[10px] font-bold tracking-widest ${load > 60 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {load}%
                </span>
              </div>
              <div className="w-full h-1 bg-zinc-900/50 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ width: `${load}%` }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className={`h-full ${load > 60 ? 'bg-red-500/40' : 'bg-emerald-500/40'}`} 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <FocusMode isActive={isFocusMode} onClose={() => setIsFocusMode(false)} />

      <footer className="mt-auto py-12 text-zinc-800 text-[10px] font-bold tracking-[1em] uppercase text-center w-full opacity-40 px-6">
        Proxion 2026 // Shift System v1.3
      </footer>
    </main>
  );
}
