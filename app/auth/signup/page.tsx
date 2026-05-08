"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ShiftLogo from "@/components/ShiftLogo";
import { User, Mail, Lock, ArrowRight } from "lucide-react";

export default function SignUp() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="flex justify-center mb-12">
          <ShiftLogo />
        </div>

        <div className="glass rounded-[3rem] p-10 md:p-12 border-white/5">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-light text-white mb-2 tracking-tight">Join the Shift</h1>
            <p className="text-zinc-500 text-sm">Start managing your cognitive load today.</p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-4">Full Name</label>
              <div className="relative">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-white/20 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-white/20 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-4">Password</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input 
                  type="password" 
                  placeholder="Create a strong password"
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-white/20 transition-all"
                />
              </div>
            </div>

            <button className="mt-4 w-full py-5 rounded-2xl bg-white text-black font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-zinc-600 text-xs">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-white hover:underline underline-offset-4">Sign in</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
