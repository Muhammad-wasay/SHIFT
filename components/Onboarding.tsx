"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sparkles, Brain, Zap, ArrowRight, X } from "lucide-react";

const STEPS = [
  {
    title: "Meet the Bouncer",
    desc: "Your personal AI gatekeeper. It scores every incoming event and only lets the essential ones through to your dashboard.",
    icon: <Shield className="w-8 h-8 text-white" />,
  },
  {
    title: "Zen Sphere Visualization",
    desc: "The central orb pulses based on your cognitive load. If it turns red, it's time to trigger Focus Mode.",
    icon: <Brain className="w-8 h-8 text-white" />,
  },
  {
    title: "Deep Work: 852Hz",
    desc: "Focus Mode uses ancient frequencies and guided breathing to stabilize your neural activity instantly.",
    icon: <Zap className="w-8 h-8 text-white" />,
  },
  {
    title: "AI Digest",
    desc: "Don't worry about what's missing. The Bouncer summarizes the Waiting Room so you can catch up in seconds.",
    icon: <Sparkles className="w-8 h-8 text-white" />,
  }
];

export default function Onboarding() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeen = localStorage.getItem("shift_onboarding");
    if (!hasSeen) setIsVisible(true);
  }, []);

  const next = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      finish();
    }
  };

  const finish = () => {
    localStorage.setItem("shift_onboarding", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-3xl p-6"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="w-full max-w-lg glass rounded-[3rem] p-12 relative overflow-hidden"
          >
            {/* Close */}
            <button onClick={finish} className="absolute top-8 right-8 text-zinc-600 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center gap-10">
              <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10">
                {STEPS[currentStep].icon}
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-light text-white tracking-tight leading-tight">
                  {STEPS[currentStep].title}
                </h2>
                <p className="text-zinc-500 text-lg leading-relaxed font-light">
                  {STEPS[currentStep].desc}
                </p>
              </div>

              {/* Progress */}
              <div className="flex gap-2">
                {STEPS.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1 rounded-full transition-all duration-500 ${i === currentStep ? 'w-8 bg-white' : 'w-2 bg-zinc-800'}`} 
                  />
                ))}
              </div>

              <button 
                onClick={next}
                className="w-full py-5 rounded-2xl bg-white text-black font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group mt-4"
              >
                {currentStep === STEPS.length - 1 ? "Enter System" : "Next Principle"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
