import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Filter, Clock, AlertTriangle, CheckCircle2, ChevronRight, LayoutGrid, List as ListIcon, Calendar as CalendarIcon, Tag, FolderKanban } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../lib/utils";
import { useAuthStore } from "../store/useAuthStore";
import { useOrbitStore } from "../store/useOrbitStore";

export default function MyTasks() {
  const { user } = useAuthStore();
  const { tasks, projects, updateTaskStatus } = useOrbitStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const myTasks = tasks.filter(t => t.assignees.includes(user?.id || ""));
  
  const filteredTasks = myTasks.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "All" || t.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical": return "text-rose-500 bg-rose-500/10 border-rose-500/20";
      case "High": return "text-orange-500 bg-orange-500/10 border-orange-500/20";
      case "Medium": return "text-orbit-accent bg-orbit-accent/10 border-orbit-accent/20";
      default: return "text-slate-400 bg-white/5 border-white/10";
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight italic">Personal <span className="text-orbit-purple">Terminal</span></h1>
          <p className="text-slate-400">All mission directives assigned to your neural link.</p>
        </div>
        <div className="flex gap-4">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..." 
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-orbit-accent text-sm text-white w-64"
              />
           </div>
           <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
              {["All", "To Do", "In Progress", "Done"].map(s => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all",
                    filterStatus === s ? "bg-orbit-accent text-white" : "text-slate-500 hover:text-white"
                  )}
                >
                  {s}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* Task List Utility Container */}
      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => {
            const project = projects.find(p => p.id === task.projectId);
            return (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-6 hover:border-orbit-accent/30 hover:bg-white/[0.03] transition-all"
              >
                {/* Status Toggle (Simple) */}
                <button 
                  onClick={() => updateTaskStatus(task.id, task.status === "Done" ? "In Progress" : "Done")}
                  className={cn(
                    "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                    task.status === "Done" 
                      ? "bg-emerald-500 border-emerald-500" 
                      : "border-white/10 hover:border-orbit-accent"
                  )}
                >
                   {task.status === "Done" && <CheckCircle2 className="w-4 h-4 text-white" />}
                </button>

                {/* Info */}
                <div className="flex-1 min-w-0">
                   <div className="flex items-center gap-3 mb-1">
                      <span className={cn("px-2 py-0.5 rounded text-[8px] font-bold uppercase border", getUrgencyColor(task.urgency))}>
                        {task.urgency}
                      </span>
                      <span className="text-[10px] font-bold text-slate-600 uppercase flex items-center gap-1">
                        <FolderKanban className="w-3 h-3" /> {project?.name || "Unlinked"}
                      </span>
                   </div>
                   <h3 className={cn("font-bold text-white transition-all", task.status === "Done" && "text-slate-500 line-through")}>
                     {task.name}
                   </h3>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-8 shrink-0">
                   <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{task.dueDate ? format(new Date(task.dueDate), "MMM d") : "TBD"}</span>
                   </div>
                   <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-widest min-w-[90px] text-center">
                     {task.status}
                   </div>
                   <button className="p-2 rounded-lg hover:bg-white/5 text-slate-600 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                      <ChevronRight className="w-5 h-5" />
                   </button>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl opacity-30">
             <LayoutGrid className="w-12 h-12 mb-4" />
             <p className="text-sm font-medium">No tasks detected in this sector.</p>
          </div>
        )}
      </div>
    </div>
  );
}
