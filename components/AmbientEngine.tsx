"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, CloudRain, Waves, Trees, Moon, Coffee, Sparkles, Loader2 } from "lucide-react";

interface Environment {
  id: string;
  name: string;
  icon: any;
  color: string;
  desc: string;
  url: string;
}

const ENVIRONMENTS: Environment[] = [
  { 
    id: 'space', 
    name: 'Deep Space', 
    icon: Moon, 
    color: 'text-shift-purple', 
    desc: 'Low-frequency celestial hum',
    url: '/sound/deep%20space.mp3'
  },
  { 
    id: 'rain', 
    name: 'Heavy Rain', 
    icon: CloudRain, 
    color: 'text-blue-400', 
    desc: 'Continuous atmospheric white noise',
    url: '/sound/rain.mp3'
  },
  { 
    id: 'forest', 
    name: 'Ancient Forest', 
    icon: Trees, 
    color: 'text-emerald-400', 
    desc: 'Distant wind and organic textures',
    url: '/sound/forest.mp3'
  },
  { 
    id: 'cafe', 
    name: 'Cyber Cafe', 
    icon: Coffee, 
    color: 'text-amber-500', 
    desc: 'Subtle lo-fi chatter and clinking',
    url: '/sound/cafe.mp3'
  },
];

export default function AmbientEngine() {
  const [active, setActive] = useState<string | null>(null);
  const [volume, setVolume] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const handlePlay = async () => {
      if (!active) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
        return;
      }

      setIsLoading(true);
      setError(null);

      const env = ENVIRONMENTS.find(e => e.id === active);
      if (!env) return;

      try {
        if (audioRef.current) {
          audioRef.current.pause();
        }

        const audio = new Audio(env.url);
        audio.loop = true;
        audio.volume = volume / 100;
        audioRef.current = audio;

        // Wait for it to be playable
        await new Promise((resolve, reject) => {
          audio.oncanplaythrough = resolve;
          audio.onerror = reject;
          // Set a timeout in case it takes too long
          setTimeout(resolve, 3000); 
        });

        await audio.play();
        setIsLoading(false);
      } catch (err) {
        console.error("Playback failed:", err);
        setError("Playback failed. Please try again.");
        setIsLoading(false);
      }
    };

    handlePlay();
  }, [active]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  return (
    <div className="w-full glass-premium p-10 rounded-[3rem] border-white/5 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
             <Volume2 className="w-4 h-4 text-shift-purple" />
             <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500">Spatial Ambient Engine</span>
          </div>
          <h3 className="text-xl font-light text-white">Cognitive Anchoring</h3>
        </div>
        <button 
          onClick={() => setActive(null)} 
          className="p-3 hover:bg-white/5 rounded-2xl transition-all"
        >
          <VolumeX className="w-5 h-5 text-zinc-700" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {ENVIRONMENTS.map((env) => (
          <button
            key={env.id}
            onClick={() => setActive(env.id === active ? null : env.id)}
            disabled={isLoading && active !== env.id}
            className={`relative p-6 rounded-[2rem] border transition-all flex flex-col items-center gap-4 group ${
              active === env.id 
              ? 'bg-shift-purple/10 border-shift-purple/40 shadow-[0_0_30px_rgba(124,58,237,0.1)]' 
              : 'bg-white/[0.02] border-white/5 hover:border-white/10'
            } ${isLoading && active === env.id ? 'opacity-70' : ''}`}
          >
            <div className={`p-4 rounded-2xl transition-all ${active === env.id ? 'bg-shift-purple/20 ' + env.color : 'bg-white/5 text-zinc-600'}`}>
               {isLoading && active === env.id ? (
                 <Loader2 className="w-6 h-6 animate-spin" />
               ) : (
                 <env.icon className="w-6 h-6" />
               )}
            </div>
            <div className="text-center">
              <p className={`text-sm font-medium ${active === env.id ? 'text-white' : 'text-zinc-500'}`}>{env.name}</p>
              <p className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest mt-1">
                {isLoading && active === env.id ? 'Loading...' : (env.id === active ? 'Active' : 'Standby')}
              </p>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex flex-col gap-4 p-6 bg-white/[0.03] rounded-2xl border border-white/5"
          >
            {error ? (
              <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest text-center">{error}</p>
            ) : (
              <div className="flex items-center gap-6">
                <Sparkles className="w-4 h-4 text-shift-purple animate-pulse" />
                <div className="flex-1 flex flex-col gap-2">
                   <div className="flex justify-between text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                     <span>Immersion Level</span>
                     <span>{volume}%</span>
                   </div>
                   <input 
                     type="range" 
                     min="0"
                     max="100"
                     value={volume}
                     onChange={(e) => setVolume(parseInt(e.target.value))}
                     className="w-full accent-shift-purple bg-white/5 h-1 rounded-full appearance-none cursor-pointer"
                   />
                </div>
                <div className="p-3 bg-shift-purple/10 rounded-xl text-shift-purple text-[10px] font-bold">
                  8D Spatial active
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
