"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, Zap, Activity, ArrowRight, X, Shield, Target } from "lucide-react";
import ShiftLogo from "./ShiftLogo";

interface Step {
  title: string;
  description: string;
  icon: any;
  color: string;
}

const STEPS: Step[] = [
  {
    title: "System Initialization",
    description: "Welcome to SHIFT. Your cognitive load is being analyzed and digitized. Prepare for a more focused existence.",
    icon: Shield,
    color: "text-blue-400"
  },
  {
    title: "The Gravity of Thought",
    description: "Every thought has weight. We measure this as 'Load'. Higher load slows your decision-making. We're here to lift it.",
    icon: Brain,
    color: "text-shift-purple"
  },
  {
    title: "Orbital Offloading",
    description: "Use the Weight Collector or Voice Commander to send messy thoughts into orbit. Clear your mind, keep your productivity.",
    icon: Target,
    color: "text-emerald-400"
  },
  {
    title: "Bio-Energy Sync",
    description: "We track your biological energy in real-time. When it's low, the system will suggest tactical recovery breaks.",
    icon: Zap,
    color: "text-amber-400"
  }
];

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const next = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }
  };

  const skip = () => {
    setIsVisible(false);
    setTimeout(onComplete, 500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-2xl p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-2xl glass-premium rounded-[3rem] border-white/10 overflow-hidden relative"
          >
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 flex gap-1 px-1 pt-1">
              {STEPS.map((_, i) => (
                <div key={i} className="flex-1 h-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: i <= currentStep ? '100%' : '0%' }}
                    className={`h-full ${i === currentStep ? 'bg-shift-purple' : 'bg-white/20'}`}
                  />
                </div>
              ))}
            </div>

            <div className="p-12 md:p-16 flex flex-col items-center text-center gap-10">
              <div className="flex flex-col items-center gap-6">
                <ShiftLogo />
                <div className="h-px w-12 bg-white/10" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col items-center gap-8"
                >
                  <div className={`p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 ${STEPS[currentStep].color}`}>
                    {(() => {
                      const Icon = STEPS[currentStep].icon;
                      return <Icon className="w-12 h-12" />;
                    })()}
                  </div>

                  <div className="flex flex-col gap-4">
                    <h2 className="text-3xl font-light text-white tracking-tight">{STEPS[currentStep].title}</h2>
                    <p className="text-zinc-500 text-lg leading-relaxed max-w-md mx-auto">
                      {STEPS[currentStep].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center gap-6 mt-6">
                <button 
                  onClick={skip}
                  className="text-zinc-600 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
                >
                  Skip Tutorial
                </button>
                <button 
                  onClick={next}
                  className="px-10 py-5 bg-white text-black rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all flex items-center gap-4 group shadow-2xl shadow-white/10"
                >
                  {currentStep === STEPS.length - 1 ? "Initialize OS" : "Next Protocol"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Decorative Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
