import { useState } from "react";
import { motion } from "motion/react";
import { Zap, Target, Shield, AlertCircle, MessageSquareCode, Orbit, LogOut, ArrowUpRight, Sparkles, Activity } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useOrbitStore } from "../store/useOrbitStore";
import { cn } from "../lib/utils";
import { MOCK_USERS } from "../data/mockData";

export default function Dashboard() {
  const { user } = useAuthStore();
  const { tasks, projects } = useOrbitStore();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "Done").length;
  const pendingTasks = totalTasks - completedTasks;
  const efficiency = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-10 pb-20 font-sans relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
        <div>
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
             <div className="px-3 py-1 rounded-full bg-orbit-accent/10 border border-orbit-accent/20 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orbit-accent animate-pulse" />
                <span className="text-[10px] font-black text-orbit-accent uppercase tracking-[0.2em]">Neural Link: Active</span>
             </div>
             <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Protocol 4.0.2</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl font-black text-white tracking-tighter leading-none italic mb-2 uppercase"
          >
            Welcome back, <span className="text-orbit-accent">{user?.name || "Commander"}</span>.
          </motion.h1>
          <p className="text-slate-500 text-sm font-medium">All mission sectors report stable telemetry. Ready for deployment.</p>
        </div>
        
        <div className="flex gap-4">
           <button className="px-8 py-4 rounded-2xl bg-white text-black font-black text-sm hover:translate-y-[-2px] transition-all focus:ring-4 focus:ring-white/20 orbit-glow flex items-center gap-2 group">
              <Activity className="w-4 h-4 group-hover:rotate-12 transition-transform" /> START SPRINT
           </button>
        </div>
      </div>

      {/* AI Intelligence Strip */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orbit-accent/20 via-indigo-500/10 to-transparent rounded-[40px] border border-white/5" />
        <div className="relative z-10 p-8 flex flex-col lg:flex-row items-center gap-8 backdrop-blur-3xl rounded-[40px]">
           <div className="w-20 h-20 rounded-3xl bg-orbit-accent flex items-center justify-center shrink-0 orbit-glow-blue rotate-3 group-hover:rotate-6 transition-transform duration-500">
              <Sparkles className="w-10 h-10 text-white" />
           </div>
           
           <div className="flex-1 space-y-2">
              <div className="flex items-center gap-4 mb-1">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-orbit-accent">AI Telemetry Insight</h3>
                 <span className="h-px bg-orbit-accent/20 flex-1" />
              </div>
              <p className="text-2xl font-bold text-white leading-tight">
                Node velocity is peaking at <span className="text-orbit-accent">{efficiency}%</span>. 
                <span className="text-slate-500 font-medium ml-2">Consider allocating resources to the Apollo-X heat shield simulation to mitigate deadline drift.</span>
              </p>
           </div>

           <div className="flex gap-3">
              <button className="px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-black text-white uppercase tracking-widest transition-all">
                 Dismiss
              </button>
              <button className="px-6 py-3 rounded-2xl bg-orbit-accent text-white font-black text-[10px] border border-orbit-accent/40 uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-orbit-accent/20">
                 Deploy Action
              </button>
           </div>
        </div>
        
        {/* Animated Background Pulse */}
        <div className="absolute top-0 right-[-10%] w-[40%] h-full bg-orbit-accent/5 blur-[100px] animate-pulse rounded-full pointer-events-none" />
      </motion.div>

      {/* Core Vitals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Nodes", val: totalTasks, icon: Target, color: "text-orbit-accent", trend: "+12%" },
          { label: "System Stability", val: efficiency + "%", icon: Shield, color: "text-emerald-400", trend: "+5%" },
          { label: "Synced Sectors", val: projects.length, icon: Orbit, color: "text-orbit-purple", trend: "0%" },
          { label: "At Risk", val: pendingTasks, icon: AlertCircle, color: "text-orange-500", trend: "-2%" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-white/5 border border-white/5 rounded-[40px] p-8 hover:bg-white/[0.07] transition-all hover:border-white/20 cursor-default"
          >
            <div className="flex justify-between items-start mb-8">
               <div className={cn("p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform", stat.color)}>
                  <stat.icon className="w-8 h-8" />
               </div>
               <span className="text-[10px] font-black text-emerald-500 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> {stat.trend}
               </span>
            </div>
            
            <div className="space-y-1">
               <h4 className="text-5xl font-black text-white italic tabular-nums leading-none mb-2">{stat.val}</h4>
               <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em]">{stat.label}</p>
            </div>
            
            {/* Hover Shine Effect */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-[40px] blur-sm" />
          </motion.div>
        ))}
      </div>

      {/* Secondary Data Layer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Activity Stream */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-center px-4">
             <div className="flex items-center gap-4">
                <h3 className="text-sm font-black uppercase text-white tracking-[0.4em]">Live Feeds</h3>
                <div className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[8px] font-black text-emerald-500 animate-pulse uppercase tracking-widest">Real-time</div>
             </div>
             <button className="text-[10px] font-black text-slate-500 uppercase hover:text-white transition-colors tracking-widest">Protocol Logs</button>
          </div>
          <div className="grid gap-4">
             {tasks.slice(0, 5).map((task, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="group bg-white/5 border border-white/5 rounded-3xl p-6 flex items-center justify-between hover:bg-white/[0.08] transition-all cursor-default border-l-4"
                  style={{ borderLeftColor: task.status === "Done" ? "#10b981" : "#6366f1" }}
                >
                   <div className="flex items-center gap-6">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-white/5",
                        task.status === "Done" ? "bg-emerald-500/10 text-emerald-500" : "bg-orbit-accent/10 text-orbit-accent"
                      )}>
                         {task.status === "Done" ? <Shield className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                      </div>
                      <div>
                         <p className="text-lg font-bold text-white group-hover:text-orbit-accent transition-colors leading-tight mb-1">{task.name}</p>
                         <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{task.status}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-800" />
                            <span className="text-[10px] font-black text-orbit-accent uppercase tracking-widest">{task.urgency} Priority</span>
                         </div>
                      </div>
                   </div>
                   <div className="flex -space-x-3">
                      {[1, 2, 3].map(j => (
                        <div key={j} className="w-9 h-9 rounded-xl border-4 border-[#0a0a0a] bg-slate-900 flex items-center justify-center text-[10px] font-black text-slate-500 transform transition-transform group-hover:scale-110">
                           {String.fromCharCode(65 + j)}
                        </div>
                      ))}
                   </div>
                </motion.div>
             ))}
          </div>
        </div>

        {/* Personnel Status */}
        <div className="space-y-8">
          <div className="flex justify-between items-center px-4">
             <h3 className="text-sm font-black uppercase text-white tracking-[0.4em]">Personnel</h3>
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">12 Active</span>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-[40px] p-10 space-y-8 backdrop-blur-sm">
             {MOCK_USERS.slice(0, 4).map((m, i) => (
               <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-5">
                     <div className="relative">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-xs font-black text-white group-hover:scale-105 transition-all">
                           {m.avatar}
                        </div>
                        <div className="absolute bottom-[-2px] right-[-2px] w-4 h-4 bg-emerald-500 rounded-lg border-4 border-[#0d0d12]" />
                     </div>
                     <div>
                        <p className="text-sm font-black text-white group-hover:text-orbit-accent transition-colors uppercase tracking-tight">{m.name}</p>
                        <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.2em]">{m.role}</p>
                     </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                     <button className="p-2 rounded-xl bg-white/5 text-slate-500 hover:text-white transition-all">
                        <MessageSquareCode className="w-4 h-4" />
                     </button>
                  </div>
               </div>
             ))}
             <button className="w-full py-5 rounded-3xl bg-white/[0.02] border border-white/5 text-[10px] font-black text-slate-600 hover:text-white hover:bg-white/5 hover:border-white/10 transition-all uppercase tracking-[0.3em] mt-4">
                View All Rosters
             </button>
          </div>

          {/* Quick Disconnect */}
          <button className="w-full p-8 rounded-[40px] border border-rose-500/10 hover:bg-rose-500/5 transition-all flex items-center justify-between group overflow-hidden relative">
             <div className="relative z-10 text-left">
                <p className="text-xs font-black text-rose-500 uppercase tracking-widest mb-1">Emergency Halt</p>
                <p className="text-[10px] font-bold text-slate-600 uppercase">Suspend Deployment</p>
             </div>
             <LogOut className="w-6 h-6 text-rose-500/40 relative z-10 group-hover:translate-x-2 transition-transform" />
             <div className="absolute inset-0 bg-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </div>
  );
}
