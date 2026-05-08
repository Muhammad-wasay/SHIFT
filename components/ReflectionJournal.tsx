"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Moon, Heart, Battery, CloudRain, Wind, X, CheckCircle2 } from "lucide-react";

export default function ReflectionJournal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [reflection, setReflection] = useState("");
  const [energy, setEnergy] = useState(50);

  const steps = [
    { id: 1, question: "How heavy did your mental load feel today?", sub: "Drag to set your daily gravity" },
    { id: 2, question: "What drained your energy most?", sub: "Identify your primary 'Gravitational Well'" },
    { id: 3, question: "What felt weightless and meaningful?", sub: "Celebrate your moments of flow" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-6"
    >
      <div className="w-full max-w-2xl flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-shift-purple/20 flex items-center justify-center border border-shift-purple/30 mb-4">
            <Moon className="w-8 h-8 text-shift-purple" />
          </div>
          <h2 className="text-[10px] font-bold tracking-[0.5em] uppercase text-shift-purple">Phase 5: Sustained Orbit</h2>
          <h1 className="text-4xl font-extralight text-white tracking-tight">End of Day Reflection</h1>
        </div>

        {/* Content */}
        <div className="glass-premium p-12 rounded-[3.5rem] border-white/10 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-10"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl text-white font-light">{steps[step - 1].question}</h3>
                <p className="text-zinc-500 text-xs font-light tracking-widest uppercase">{steps[step - 1].sub}</p>
              </div>

              {step === 1 && (
                <div className="flex flex-col gap-8">
                  <div className="flex justify-between text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                    <span>Weightless</span>
                    <span>Critical Mass</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={energy} 
                    onChange={(e) => setEnergy(parseInt(e.target.value))}
                    className="w-full accent-shift-purple h-1 bg-white/5 rounded-full appearance-none cursor-pointer"
                  />
                  <div className="text-center text-5xl font-extralight text-white tracking-tighter">
                    {energy}G
                  </div>
                </div>
              )}

              {(step === 2 || step === 3) && (
                <textarea
                  autoFocus
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="The words are weightless here..."
                  className="w-full h-40 bg-transparent border-none text-white text-xl font-light placeholder:text-zinc-800 focus:outline-none resize-none scrollbar-hide"
                />
              )}

              <div className="flex justify-between items-center mt-4">
                <button 
                  onClick={onClose}
                  className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest hover:text-white transition-colors"
                >
                  Skip Reflection
                </button>
                <button
                  onClick={() => step < 3 ? setStep(step + 1) : onClose()}
                  className="px-8 py-4 bg-white text-black rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center gap-3"
                >
                  {step === 3 ? "Archive Session" : "Continue"}
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${step === s ? "bg-shift-purple w-8" : "bg-white/10"}`} 
              />
            ))}
          </div>
        </div>

        {/* Footer Insight */}
        <div className="flex items-center justify-center gap-4 opacity-50">
          <CloudRain className="w-4 h-4 text-zinc-500" />
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest italic">
            "Your orbit was 84% stable today. Rest well."
          </p>
        </div>
      </div>
    </motion.div>
  );
}
