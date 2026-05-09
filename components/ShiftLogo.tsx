"use client";

import { motion } from "framer-motion";

export default function ShiftLogo({ mini = false }: { mini?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative group cursor-pointer"
    >
      <motion.div
        animate={{ 
          y: [-1, 1, -1],
          filter: [
            "drop-shadow(0 0 8px rgba(124, 58, 237, 0.1))",
            "drop-shadow(0 0 15px rgba(124, 58, 237, 0.3))",
            "drop-shadow(0 0 8px rgba(124, 58, 237, 0.1))"
          ]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className={`shift-logo font-syncopate ${mini ? 'text-xl' : 'text-3xl md:text-4xl'} text-white flex items-center gap-1.5 tracking-[0.1em]`}
      >
        <span>SHIFT</span>
        {!mini && (
          <motion.div 
            animate={{ y: [0, -3, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-shift-purple shadow-[0_0_10px_rgba(124,58,237,1)]" 
          />
        )}
      </motion.div>
      
      {!mini && (
        <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-shift-purple to-transparent group-hover:w-full transition-all duration-700 ease-out opacity-50" />
      )}
    </motion.div>
  );
}


