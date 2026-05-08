"use client";

import { motion } from "framer-motion";

export default function ShiftLogo() {
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 300 }}
      dragSnapToOrigin
      whileDrag={{ scale: 1.1, cursor: "grabbing" }}
      initial={{ y: 0 }}
      animate={{ y: [-5, 5, -5] }}
      transition={{ 
        y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
      }}
      className="text-4xl font-black tracking-tight text-white select-none cursor-grab w-fit"
      style={{ 
        fontFamily: 'var(--font-syncopate)',
        fontWeight: 800,
        letterSpacing: '-0.02em',
      }}
    >
      SHIFT
    </motion.div>
  );
}
