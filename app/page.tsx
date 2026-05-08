"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Activity, 
  Wind, 
  Focus, 
  Layers, 
  ChevronRight, 
  Bell, 
  Settings,
  ShieldCheck,
  Zap
} from "lucide-react";
import ZenSphere from "@/components/ZenSphere";
import ShiftLogo from "@/components/ShiftLogo";

export default function Home() {
  const [load, setLoad] = useState(24);
  const [isFocus, setIsFocus] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Simulate dynamic load changes
  useEffect(() => {
    const interval = setInterval(() => {
      setLoad(prev => {
        const change = (Math.random() - 0.5) * 5;
        return Math.max(10, Math.min(95, prev + change));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans selection:bg-white/20 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-8">
          <ShiftLogo />
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <button 
              onClick={() => setActiveTab("dashboard")}
              className={`transition-colors hover:text-white ${activeTab === "dashboard" ? "text-white" : ""}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab("focus")}
              className={`transition-colors hover:text-white ${activeTab === "focus" ? "text-white" : ""}`}
            >
              Focus Mode
            </button>
            <button className="transition-colors hover:text-white">Insights</button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
            <Bell size={20} className="text-zinc-400" />
          </button>
          <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
            <Settings size={20} className="text-zinc-400" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-500 border border-white/10" />
        </div>
      </nav>

      <main className="relative z-10 flex-1 flex flex-col items-center px-6 pt-12">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Stats & Context */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4 flex flex-col gap-8"
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">System Status</h2>
              <h1 className="text-4xl font-bold tracking-tight">Managing Load.</h1>
              <p className="text-zinc-400 leading-relaxed max-w-sm">
                Shift is monitoring your cognitive state across 8 active digital contexts. 
                Focus is currently high.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-4 rounded-2xl flex flex-col gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Activity size={16} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Cognitive Load</div>
                  <div className="text-2xl font-bold">{Math.round(load)}%</div>
                </div>
              </div>
              <div className="glass p-4 rounded-2xl flex flex-col gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Focus size={16} className="text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Focus Rating</div>
                  <div className="text-2xl font-bold">{isFocus ? "Peak" : "Steady"}</div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsFocus(!isFocus)}
              className={`group flex items-center justify-between w-full p-4 rounded-2xl transition-all duration-500 ${
                isFocus 
                ? "bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.3)]" 
                : "bg-zinc-900 text-white hover:bg-zinc-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isFocus ? "bg-black/5" : "bg-white/5"}`}>
                  <Zap size={18} fill={isFocus ? "currentColor" : "none"} />
                </div>
                <span className="font-bold">{isFocus ? "Exit Deep Focus" : "Enter Deep Focus"}</span>
              </div>
              <ChevronRight size={18} className={`transition-transform duration-300 ${isFocus ? "rotate-180" : "group-hover:translate-x-1"}`} />
            </button>
          </motion.div>

          {/* Center Column: ZenSphere */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-4 flex flex-col items-center justify-center relative"
          >
            <div className="w-[450px] h-[450px] relative">
              <ZenSphere load={load} isFocus={isFocus} />
              
              {/* Dynamic Overlay Info */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isFocus ? "focus" : "normal"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center"
                  >
                    <div className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-1">
                      Current State
                    </div>
                    <div className="text-2xl font-black tracking-tighter">
                      {isFocus ? "SILENCE" : "BALANCED"}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contextual Tasks */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-4 flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Active Contexts</h2>
              <button className="text-xs font-bold text-blue-400 hover:underline">View All</button>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { name: "Frontend Development", icon: <Layers size={14} />, color: "bg-blue-500" },
                { name: "Communication Hub", icon: <Bell size={14} />, color: "bg-purple-500" },
                { name: "System Research", icon: <Brain size={14} />, color: "bg-emerald-500" }
              ].map((item, i) => (
                <div key={i} className="glass p-4 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={14} className="text-zinc-600" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-6 rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-blue-400" />
                <span className="text-sm font-bold">Shift AI Guard</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Blocking 14 high-friction notifications to maintain your current focus state.
              </p>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "70%" }}
                  className="h-full bg-blue-500"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      {/* Footer Branding */}
      <footer className="p-8 flex justify-center opacity-30">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold">
          <Wind size={12} />
          <span>Shift Ecosystem • 2026</span>
        </div>
      </footer>
    </div>
  );
}
