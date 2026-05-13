"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, AlertCircle, Clock, Trash2, CheckCircle2, ChevronRight, Zap, Inbox } from "lucide-react";

interface Email {
  id: string;
  sender: string;
  subject: string;
  category: "urgent" | "waiting" | "ignore" | "later";
  summary: string;
}

const INITIAL_EMAILS: Email[] = [
  { id: "1", sender: "CEO", subject: "Q3 Strategy Update", category: "urgent", summary: "Requires immediate review for tomorrow's standup." },
  { id: "2", sender: "Marketing Team", subject: "Newsletter Draft", category: "later", summary: "Feedback needed by EOD Friday." },
  { id: "3", sender: "Cloud Services", subject: "Invoice Paid", category: "ignore", summary: "Automatic receipt for record keeping." },
  { id: "4", sender: "Ali", subject: "Quick Question", category: "waiting", summary: "Simple query about project timeline." },
];

export default function InboxTriage() {
  const [emails, setEmails] = useState<Email[]>(INITIAL_EMAILS);
  const [triagedCount, setTriagedCount] = useState(0);

  const handleTriage = (id: string, action: 'task' | 'delete') => {
    setEmails(prev => prev.filter(email => email.id !== id));
    setTriagedCount(prev => prev + 1);
    // In a real app, 'task' action would send this to the schedule database
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-shift-purple" />
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-zinc-500">Orbital Debris</h2>
        </div>
        <div className="flex gap-2">
           <span className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase bg-white/5 px-3 py-1 rounded-full border border-white/5">
            {emails.length} Remaining
          </span>
          {triagedCount > 0 && (
            <span className="text-[10px] font-bold tracking-widest text-emerald-500 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              {triagedCount} Triaged
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {emails.map((email, i) => (
            <motion.div
              key={email.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 20 }}
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

              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleTriage(email.id, 'task')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[9px] font-bold uppercase tracking-widest hover:bg-emerald-500/20 transition-all active:scale-95"
                  >
                    <CheckCircle2 className="w-3 h-3" /> Convert to Task
                  </button>
                </div>
                <button 
                  onClick={() => handleTriage(email.id, 'delete')}
                  className="p-2 text-zinc-700 hover:text-rose-500 transition-colors active:scale-90"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {emails.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 gap-4 border-2 border-dashed border-white/5 rounded-[3rem]"
          >
            <div className="p-6 bg-white/[0.02] rounded-full">
              <Inbox className="w-8 h-8 text-zinc-800" />
            </div>
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Orbit is Clear</p>
          </motion.div>
        )}
      </div>

      {emails.length > 0 && (
        <button 
          onClick={() => { setEmails([]); setTriagedCount(prev => prev + emails.length); }}
          className="w-full py-4 glass rounded-2xl text-[9px] font-bold tracking-[0.4em] uppercase text-zinc-600 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-3"
        >
          Clear All Debris
          <ChevronRight className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
