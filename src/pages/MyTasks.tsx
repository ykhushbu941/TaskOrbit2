import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Plus, Filter, Target, Activity, Zap, CheckCircle2, MoreVertical, Trash2, Calendar, FolderKanban, Shield } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../lib/utils";
import { useAuthStore } from "../store/useAuthStore";
import { useOrbitStore } from "../store/useOrbitStore";

export default function MyTasks() {
  const { user } = useAuthStore();
  const { tasks, projects, updateTaskStatus, deleteTask } = useOrbitStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const myTasks = tasks.filter(t => t.assignees.includes(user?.id || ""));
  
  const filteredTasks = myTasks.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || t.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getUrgencyStyles = (urgency: string) => {
    switch (urgency) {
      case "Critical": return "text-rose-500 bg-rose-500/10 border-rose-500/30 glow-rose";
      case "High": return "text-orange-500 bg-orange-500/10 border-orange-500/30";
      case "Medium": return "text-orbit-accent bg-orbit-accent/10 border-orbit-accent/30";
      default: return "text-slate-500 bg-white/5 border-white/10";
    }
  };

  return (
    <div className="space-y-10 pb-20 font-sans">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 relative z-20">
        <div>
           <div className="flex items-center gap-2 mb-2 p-1">
              <Shield className="w-4 h-4 text-orbit-accent" />
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Neural Interface Layer</span>
           </div>
           <h1 className="text-4xl font-black text-white tracking-tighter leading-none italic uppercase">Task <span className="text-orbit-accent">Repository</span></h1>
           <p className="text-slate-500 text-sm font-medium mt-2 italic">Active mission directives synchronized for your rank.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
           <div className="relative group flex-1 sm:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-hover:text-orbit-accent transition-colors" />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Query Node..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white placeholder:text-slate-700 outline-none focus:border-orbit-accent transition-all font-medium backdrop-blur-md"
              />
           </div>
           <button className="px-6 py-4 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all orbit-glow shrink-0">
             <Plus className="w-4 h-4" /> Initialize Node
           </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 overflow-x-auto no-scrollbar">
         {["All", "To Do", "In Progress", "Done"].map((s) => (
            <button
               key={s}
               onClick={() => setActiveFilter(s)}
               className={cn(
                 "px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap",
                 activeFilter === s 
                  ? "bg-orbit-accent text-white border border-orbit-accent/40 shadow-lg shadow-orbit-accent/20" 
                  : "text-slate-500 border border-transparent hover:text-white"
               )}
            >
               {s}
            </button>
         ))}
      </div>

      {/* Task Board (List View) */}
      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, i) => {
              const project = projects.find(p => p.id === task.projectId);
              return (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -20 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative bg-[#0a0a0a]/40 border border-white/5 rounded-[32px] p-1 flex items-center overflow-hidden hover:border-white/10 transition-all"
                >
                   {/* Background Glow */}
                   <div className="absolute inset-0 bg-gradient-to-r from-orbit-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   
                   <div className="flex-1 p-6 flex flex-col sm:flex-row items-center gap-8 relative z-10">
                      {/* Checkbox */}
                      <button 
                        onClick={() => updateTaskStatus(task.id, task.status === "Done" ? "To Do" : "Done")}
                        className={cn(
                          "w-12 h-12 rounded-[20px] border-2 flex items-center justify-center shrink-0 transition-all duration-500",
                          task.status === "Done" 
                            ? "bg-emerald-500 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]" 
                            : "border-white/5 bg-white/5 hover:border-orbit-accent group-hover:scale-110"
                        )}
                      >
                         <CheckCircle2 className={cn("w-6 h-6 transition-all", task.status === "Done" ? "text-white scale-100" : "text-white/0 scale-50")} />
                      </button>

                      {/* Content */}
                      <div className="flex-1 min-w-0 space-y-2">
                         <div className="flex flex-wrap items-center gap-3">
                            <span className={cn("px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border", getUrgencyStyles(task.urgency))}>
                               {task.urgency}
                            </span>
                            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest flex items-center gap-1.5">
                               <FolderKanban className="w-3 h-3" /> {project?.name || "System Base"}
                            </span>
                         </div>
                         <h3 className={cn(
                           "text-xl font-bold text-white tracking-tight transition-all",
                           task.status === "Done" && "text-slate-700 line-through decoration-emerald-500/50"
                         )}>
                            {task.name}
                         </h3>
                      </div>

                      {/* Info & Metadata */}
                      <div className="flex items-center gap-12 shrink-0 pr-4">
                         <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                               <Calendar className="w-3 h-3" /> Due Node
                            </div>
                            <span className="text-white text-xs font-bold">{task.dueDate ? format(new Date(task.dueDate), "MMM dd, yyyy") : "N/A"}</span>
                         </div>

                         <div className="flex items-center gap-2">
                            <div className="flex -space-x-3">
                               {[1, 2].map(j => (
                                 <div key={j} className="w-10 h-10 rounded-2xl border-4 border-[#0a0a0a] bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-500">
                                    {task.assignees[0]?.[0] || "U"}
                                 </div>
                               ))}
                            </div>
                         </div>

                         <div className="flex items-center gap-2">
                            <button className="p-3 rounded-2xl bg-white/5 border border-white/5 text-slate-600 hover:text-white hover:bg-white/10 transition-all">
                               <MoreVertical className="w-5 h-5" />
                            </button>
                            <button 
                               onClick={() => deleteTask(task.id)}
                               className="p-3 rounded-2xl bg-white/5 border border-white/5 text-slate-800 hover:text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/20 transition-all opacity-0 group-hover:opacity-100"
                            >
                               <Trash2 className="w-5 h-5" />
                            </button>
                         </div>
                      </div>
                   </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="py-32 flex flex-col items-center justify-center border-4 border-dashed border-white/5 rounded-[40px] space-y-6"
            >
               <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-700">
                  <Activity className="w-10 h-10 animate-pulse" />
               </div>
               <div className="text-center">
                  <p className="text-xl font-black text-white uppercase italic tracking-widest">Sector Clear</p>
                  <p className="text-slate-500 text-sm font-medium mt-1">No active nodes detected on your current neural frequency.</p>
               </div>
               <button className="px-6 py-3 rounded-2xl bg-orbit-accent text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                  Initialize Protocol
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stats Summary Tooltip Section */}
      <div className="fixed bottom-0 left-[280px] right-0 p-8 flex justify-center pointer-events-none z-30">
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="bg-white/5 backdrop-blur-2xl border border-white/10 px-8 py-4 rounded-full flex items-center gap-10 pointer-events-auto shadow-2xl"
          >
             <div className="flex items-center gap-3">
                <Target className="w-4 h-4 text-orbit-accent" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">{myTasks.length} NODES</span>
             </div>
             <div className="w-px h-4 bg-white/10" />
             <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">{myTasks.filter(t => t.status === "Done").length} COMPLETED</span>
             </div>
             <div className="w-px h-4 bg-white/10" />
             <div className="flex items-center gap-3 text-orange-500">
                <Zap className="w-4 h-4 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">{myTasks.filter(t => t.urgency === "Critical").length} CRITICAL</span>
             </div>
          </motion.div>
      </div>
    </div>
  );
}
