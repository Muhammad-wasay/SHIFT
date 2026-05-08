"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Sparkles, Brain, ArrowUp, Activity, X } from "lucide-react";

export default function VoiceCommander({ onResult }: { onResult: (text: string) => void }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('speechRecognition' in window)) {
      setIsSupported(false);
    }
  }, []);

  const startListening = () => {
    const Recognition = (window as any).webkitSpeechRecognition || (window as any).speechRecognition;
    if (!Recognition) return;

    const recognition = new Recognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: any) => {
      const current = event.results[event.results.length - 1][0].transcript;
      setTranscript(current);
      if (event.results[event.results.length - 1].isFinal) {
        onResult(current);
        setTimeout(() => setTranscript(""), 2000);
      }
    };

    recognition.start();
  };

  if (!isSupported) return null;

  return (
    <div className="w-full flex flex-col gap-6">
       <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <Mic className="w-4 h-4 text-shift-purple" />
             <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500">Voice Commander</span>
          </div>
          <div className="flex items-center gap-2">
             <div className={`w-1.5 h-1.5 rounded-full ${isListening ? 'bg-rose-500 animate-pulse' : 'bg-zinc-800'}`} />
             <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{isListening ? 'Listening' : 'Standby'}</span>
          </div>
       </div>

       <div className="relative group">
          <button
            onClick={startListening}
            className={`w-full glass-premium p-10 rounded-[3rem] border-white/5 transition-all flex flex-col items-center justify-center gap-6 group hover:border-shift-purple/30 ${
              isListening ? 'bg-shift-purple/10 border-shift-purple/30' : 'bg-white/[0.02]'
            }`}
          >
            <div className={`p-6 rounded-3xl transition-all ${isListening ? 'bg-shift-purple text-white shadow-[0_0_40px_rgba(124,58,237,0.4)]' : 'bg-white/5 text-zinc-500 group-hover:text-white'}`}>
               {isListening ? <Activity className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-light text-white mb-2">{isListening ? "Capturing Thought..." : "Begin Mental Dump"}</h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em]">Hands-free orbital offloading</p>
            </div>

            {/* Pulsing rings when listening */}
            {isListening && (
              <>
                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0, 0.2, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute w-40 h-40 rounded-full border border-shift-purple" />
                <motion.div animate={{ scale: [1, 2, 1], opacity: [0, 0.1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="absolute w-40 h-40 rounded-full border border-shift-purple" />
              </>
            )}
          </button>

          <AnimatePresence>
            {transcript && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-full left-0 right-0 mt-6 glass p-8 rounded-3xl border-shift-purple/20 bg-shift-purple/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                   <Sparkles className="w-5 h-5 text-shift-purple" />
                   <p className="text-white font-light text-lg italic">"{transcript}"</p>
                </div>
                <div className="flex items-center gap-2 text-emerald-500">
                   <ArrowUp className="w-4 h-4" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Sent to Orbit</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
       </div>

       <div className="flex items-center gap-4 px-4 text-zinc-700">
          <Brain className="w-3 h-3" />
          <p className="text-[9px] font-bold uppercase tracking-widest">Advanced Neural Transcription Active</p>
       </div>
    </div>
  );
}
