"use client";

import { motion } from "framer-motion";
import { Mail, AlertCircle, Clock, Trash2, CheckCircle2, ChevronRight, Zap } from "lucide-react";

interface Email {
  id: string;
  sender: string;
  subject: string;
  category: "urgent" | "waiting" | "ignore" | "later";
  summary: string;
}

const MOCK_EMAILS: Email[] = [
  { id: "1", sender: "CEO", subject: "Q3 Strategy Update", category: "urgent", summary: "Requires immediate review for tomorrow's standup." },
  { id: "2", sender: "Marketing Team", subject: "Newsletter Draft", category: "later", summary: "Feedback needed by EOD Friday." },
  { id: "3", sender: "Cloud Services", subject: "Invoice Paid", category: "ignore", summary: "Automatic receipt for record keeping." },
  { id: "4", sender: "Ali", subject: "Quick Question", category: "waiting", summary: "Simple query about project timeline." },
];

export default function InboxTriage() {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-shift-purple" />
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-zinc-500">Orbital Debris</h2>
        </div>
        <span className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase bg-white/5 px-3 py-1 rounded-full border border-white/5">
          23 Unread
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {MOCK_EMAILS.map((email, i) => (
          <motion.div
            key={email.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass group p-5 rounded-3xl border-white/5 hover:border-white/10 relative overflow-hidden"
          >
            {/* Category Indicator */}
            <div className={`absolute top-0 left-0 w-1 h-full ${
              email.category === 'urgent' ? 'bg-rose-500' :
              email.category === 'waiting' ? 'bg-amber-500' :
              email.category === 'later' ? 'bg-blue-500' : 'bg-zinc-800'
            }`} />

            <div className="flex justify-between items-start mb-3">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter mb-1">{email.sender}</span>
                <h3 className="text-sm font-medium text-white group-hover:text-shift-purple transition-colors">{email.subject}</h3>
              </div>
              <div className="flex gap-2">
                {email.category === 'urgent' && <AlertCircle className="w-4 h-4 text-rose-500" />}
                {email.category === 'waiting' && <Clock className="w-4 h-4 text-amber-500" />}
              </div>
            </div>

            <p className="text-xs text-zinc-500 font-light leading-relaxed mb-4 italic">
              "{email.summary}"
            </p>

            <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all">
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[9px] font-bold uppercase tracking-widest hover:bg-emerald-500/20 transition-all">
                  <CheckCircle2 className="w-3 h-3" /> Convert to Task
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-zinc-500 border border-white/5 text-[9px] font-bold uppercase tracking-widest hover:text-white transition-all">
                  <Zap className="w-3 h-3" /> AI Summary
                </button>
              </div>
              <button className="p-2 text-zinc-700 hover:text-rose-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full py-4 glass rounded-2xl text-[9px] font-bold tracking-[0.4em] uppercase text-zinc-600 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-3">
        Clear All Debris
        <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
}
