"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Calendar, CheckCircle2 } from "lucide-react";

export default function FocusMode({ isActive, onClose }: { isActive: boolean; onClose: () => void }) {
  const [breathStage, setBreathStage] = useState("Inhale");
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (isActive) {
      // Initialize Audio
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioContextRef.current = new AudioContextClass();
        
        const osc = audioContextRef.current.createOscillator();
        const gain = audioContextRef.current.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(852, audioContextRef.current.currentTime); 
        
        gain.gain.setValueAtTime(0, audioContextRef.current.currentTime);
        
        osc.connect(gain);
        gain.connect(audioContextRef.current.destination);
        
        osc.start();
        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
      }
    } else {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setBreathStage((prev) => {
        const next = prev === "Inhale" ? "Exhale" : "Inhale";
        
        if (gainNodeRef.current && audioContextRef.current) {
          const now = audioContextRef.current.currentTime;
          const targetVolume = next === "Inhale" ? 0.05 : 0.01; 
          gainNodeRef.current.gain.exponentialRampToValueAtTime(targetVolume + 0.001, now + 4);
        }
        
        return next;
      });
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-2xl p-6"
        >
          <button 
            onClick={onClose}
            className="absolute top-12 right-12 text-zinc-600 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="flex flex-col items-center gap-16 text-center">
            <motion.div
              animate={{ 
                scale: breathStage === "Inhale" ? 1.5 : 1,
                opacity: breathStage === "Inhale" ? 1 : 0.5 
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
              className="w-48 h-48 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_40px_rgba(255,255,255,0.5)]" />
            </motion.div>

            <div className="flex flex-col gap-4">
              <motion.h2 
                key={breathStage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-light tracking-[0.2em] text-white uppercase"
              >
                {breathStage}
              </motion.h2>
              <p className="text-zinc-500 text-sm tracking-[0.4em] uppercase font-bold">FlowState Meditation</p>
            </div>
          </div>

          <div className="absolute bottom-24 flex gap-12">
             <div className="flex flex-col items-center gap-2">
               <Mail className="w-4 h-4 text-zinc-700" />
               <span className="text-[9px] text-zinc-800 font-bold tracking-widest uppercase">Urgent Mail</span>
             </div>
             <div className="flex flex-col items-center gap-2">
               <Calendar className="w-4 h-4 text-zinc-700" />
               <span className="text-[9px] text-zinc-800 font-bold tracking-widest uppercase">Next Meeting</span>
             </div>
             <div className="flex flex-col items-center gap-2 border-t-2 border-emerald-500 pt-2">
               <CheckCircle2 className="w-4 h-4 text-emerald-500" />
               <span className="text-[9px] text-emerald-500 font-bold tracking-widest uppercase">Urgent Task</span>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
