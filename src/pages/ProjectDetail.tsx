import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { MoreHorizontal, Plus, Clock, AlertTriangle, CheckCircle2, MoreVertical, LayoutGrid, List as ListIcon, Calendar as CalendarIcon, UserPlus, Info, ExternalLink, FolderKanban, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../lib/utils";
import { useAuthStore } from "../store/useAuthStore";
import { useOrbitStore } from "../store/useOrbitStore";
import { MOCK_USERS } from "../data/mockData";

const COLUMNS = ["To Do", "In Progress", "In Review", "Done"];

export default function ProjectDetail() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { projects, tasks, updateTaskStatus, addTask } = useOrbitStore();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  
  const project = projects.find(p => p.id === id);
  const projectTasks = tasks.filter(t => t.projectId === id);

  if (!project) return <div className="flex items-center justify-center h-full"><p className="text-slate-500">Project not found in current sector.</p></div>;

  const handleUpdateStatus = (taskId: string, newStatus: string) => {
    updateTaskStatus(taskId, newStatus);
  };

  return (
    <div className="space-y-8">
      {/* Project Header */}
      <div className="glass rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orbit-accent/5 blur-3xl -z-10" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-6">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: project.color }}
            >
              <FolderKanban className="text-white w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold text-white tracking-tight">{project.name}</h1>
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-bold text-slate-400 uppercase tracking-wider">{project.status}</span>
              </div>
              <p className="text-slate-400 max-w-xl text-sm leading-relaxed">{project.description}</p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
             <div className="flex -space-x-3 mb-2">
                {project.members && MOCK_USERS.filter(u => project.members.includes(u.id)).map((u: any) => (
                  <div key={u.id} className="w-9 h-9 rounded-full border-2 border-orbit-bg bg-orbit-accent text-white flex items-center justify-center font-bold text-xs" title={u.name}>
                    {u.name[0]}
                  </div>
                ))}
                <button className="w-9 h-9 rounded-full border-2 border-orbit-bg bg-white/5 text-slate-400 flex items-center justify-center hover:bg-white/10 transition-all">
                  <UserPlus className="w-4 h-4" />
                </button>
             </div>
             <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1.5"><CalendarIcon className="w-4 h-4" /> Due {project.deadline ? format(new Date(project.deadline), "MMM d, yyyy") : "TBD"}</span>
                <span className="flex items-center gap-1.5"><Info className="w-4 h-4" /> {projectTasks.length} Tasks</span>
             </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 pt-8 border-t border-white/5">
           <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Orbit Progress</span>
              <span className="text-sm font-bold text-white">{project.progress}% Complete</span>
           </div>
           <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                className="h-full bg-gradient-to-r from-orbit-accent to-orbit-purple shadow-[0_0_10px_rgba(99,102,241,0.5)]"
              />
           </div>
        </div>

        {/* Links */}
        <div className="flex gap-4 mt-6">
           {project.specificationsLink && (
             <a href={project.specificationsLink} className="flex items-center gap-2 text-xs font-bold text-orbit-accent hover:underline">
               <ExternalLink className="w-3 h-3" /> Specs
             </a>
           )}
           {project.assetsFolder && (
             <a href={project.assetsFolder} className="flex items-center gap-2 text-xs font-bold text-orbit-teal hover:underline">
               <ExternalLink className="w-3 h-3" /> Asset Drive
             </a>
           )}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex justify-between items-center">
         <div className="flex gap-1 p-1 bg-white/5 rounded-lg border border-white/10">
            <button className="px-4 py-1.5 rounded-md bg-white/10 text-white text-sm font-bold flex items-center gap-2 transition-all">
              <LayoutGrid className="w-4 h-4" /> Board
            </button>
            <button className="px-4 py-1.5 rounded-md text-slate-500 text-sm font-bold flex items-center gap-2 hover:text-slate-300 transition-all">
              <ListIcon className="w-4 h-4" /> List
            </button>
         </div>
         {user?.role === "ADMIN" && (
           <button 
             onClick={() => setIsTaskModalOpen(true)}
             className="px-6 py-2.5 rounded-xl bg-orbit-accent hover:opacity-90 text-white font-bold flex items-center gap-2 text-sm shadow-lg shadow-orbit-accent/20 transition-all hover:-translate-y-0.5"
           >
             <Plus className="w-5 h-5" /> Deploy New Task
           </button>
         )}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[600px]">
        {COLUMNS.map((col) => (
          <div key={col} className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-2">
                 <h3 className="font-bold text-white text-sm uppercase tracking-widest">{col}</h3>
                 <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full text-slate-500 font-bold">
                   {projectTasks.filter(t => t.status === col).length}
                 </span>
               </div>
               <button className="text-slate-600 hover:text-white transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
            </div>

            <div className="flex-1 space-y-4">
               {projectTasks.filter(t => t.status === col).map((task) => (
                 <motion.div
                    key={task.id}
                    layoutId={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass p-5 rounded-2xl border border-white/5 hover:border-white/20 transition-all cursor-grab active:cursor-grabbing group shadow-sm hover:shadow-xl"
                 >
                   <div className="flex justify-between items-start mb-3">
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded uppercase",
                        task.urgency === "Critical" ? "bg-red-400/10 text-red-400 border border-red-400/20" :
                        task.urgency === "High" ? "bg-orange-400/10 text-orange-400 border border-orange-400/20" :
                        "bg-orbit-accent/10 text-orbit-accent border border-orbit-accent/20"
                      )}>
                        {task.urgency}
                      </span>
                      <button className="text-slate-600 hover:text-white opacity-0 group-hover:opacity-100 transition-all"><MoreVertical className="w-4 h-4" /></button>
                   </div>

                   <h4 className="font-bold text-white mb-2 leading-tight">{task.name}</h4>
                   <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">{task.description || "Experimental task module."}</p>

                   <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-bold">{task.dueDate ? format(new Date(task.dueDate), "MMM d") : "No due date"}</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                        {COLUMNS.filter(c => c !== col).map(targetCol => (
                          <button 
                            key={targetCol}
                            onClick={() => handleUpdateStatus(task.id, targetCol)}
                            className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-orbit-accent transition-all text-slate-400 hover:text-white"
                            title={`Move to ${targetCol}`}
                          >
                             {targetCol === "Done" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
                          </button>
                        ))}
                      </div>
                   </div>
                 </motion.div>
               ))}
               
               {/* Empty State Spot */}
               {projectTasks.filter(t => t.status === col).length === 0 && (
                 <div className="h-24 border-2 border-dashed border-white/5 rounded-2xl flex items-center justify-center">
                    <p className="text-xs text-slate-700 font-bold">DROP ZONE</p>
                 </div>
               )}
            </div>
          </div>
        ))}
      </div>

      {/* Simple Task Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="w-full max-w-lg glass p-8 rounded-3xl border border-white/10"
           >
              <h2 className="text-2xl font-bold text-white mb-6">Deploy New Task</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = {
                  name: formData.get("name") as string,
                  description: formData.get("description") as string,
                  urgency: formData.get("urgency") as string,
                  projectId: id!,
                  dueDate: formData.get("dueDate") as string,
                  assignees: [user?.id || ""],
                  status: "To Do"
                };
                addTask(data);
                setIsTaskModalOpen(false);
              }} className="space-y-4">
                 <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Task Title</label>
                   <input name="name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orbit-accent text-white" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Description</label>
                   <textarea name="description" rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orbit-accent text-white" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Urgency</label>
                      <select name="urgency" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orbit-accent text-white">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Due Date</label>
                      <input type="date" name="dueDate" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orbit-accent text-white" />
                    </div>
                 </div>
                 <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setIsTaskModalOpen(false)} className="flex-1 py-3 rounded-xl border border-white/10 font-bold hover:bg-white/5 transition-all">Cancel</button>
                    <button type="submit" className="flex-1 py-3 rounded-xl bg-orbit-accent font-bold hover:opacity-90 transition-all orbit-glow">Deploy</button>
                 </div>
              </form>
           </motion.div>
        </div>
      )}
    </div>
  );
}

