import { motion } from "motion/react";
import { FolderKanban, Plus, Clock, Users, ChevronRight, Search, Target, Activity, Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useOrbitStore } from "../store/useOrbitStore";
import { cn } from "../lib/utils";
import { format } from "date-fns";
import { MOCK_USERS } from "../data/mockData";

export default function Projects() {
  const { projects, tasks } = useOrbitStore();

  return (
    <div className="space-y-10 pb-20 font-sans">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 relative z-10">
        <div>
           <div className="flex items-center gap-2 mb-2 p-1">
              <Sparkles className="w-4 h-4 text-orbit-accent" />
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Fleet Management Level</span>
           </div>
           <h1 className="text-4xl font-black text-white tracking-tighter leading-none italic uppercase">Active <span className="text-orbit-accent">Fleets</span></h1>
           <p className="text-slate-500 text-sm font-medium mt-2 italic">Synchronized command centers for cross-functional deployment.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
           <div className="relative group flex-1 sm:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-hover:text-orbit-accent transition-colors" />
              <input 
                placeholder="Query Sector..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white placeholder:text-slate-700 outline-none focus:border-orbit-accent transition-all font-medium backdrop-blur-md"
              />
           </div>
           <button className="px-6 py-4 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all orbit-glow shrink-0">
             <Plus className="w-4 h-4" /> Initialize Fleet
           </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map((project, i) => {
          const projectTasks = tasks.filter(t => t.projectId === project.id);
          const completedTasks = projectTasks.filter(t => t.status === "Done").length;
          const progress = projectTasks.length > 0 ? Math.round((completedTasks / projectTasks.length) * 100) : 0;
          
          return (
            <Link key={project.id} to={`/projects/${project.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-[#0a0a0a]/40 border border-white/5 rounded-[40px] p-8 flex flex-col hover:border-white/10 transition-all hover:bg-white/[0.03] box-shadow-orbit h-full overflow-hidden"
              >
                {/* Visual Accent */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity" 
                  style={{ backgroundColor: project.color }}
                />

                <div className="flex justify-between items-start mb-8 relative z-10">
                   <div 
                     className="w-16 h-16 rounded-3xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500" 
                     style={{ backgroundColor: `${project.color}15`, border: `1px solid ${project.color}30`, color: project.color }}
                   >
                      <FolderKanban className="w-8 h-8" />
                   </div>
                   <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">
                      {project.status || "Synchronizing"}
                   </div>
                </div>

                <div className="space-y-3 mb-10 flex-1 relative z-10">
                   <h3 className="text-2xl font-black text-white italic group-hover:text-orbit-accent transition-colors leading-tight uppercase tracking-tight">{project.name}</h3>
                   <p className="text-slate-500 text-sm font-medium line-clamp-2 leading-relaxed italic">{project.description}</p>
                </div>

                <div className="space-y-8 mt-auto relative z-10">
                   <div className="space-y-3">
                      <div className="flex justify-between items-end">
                         <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em]">Deployment Progress</span>
                         <span className="text-xl font-black text-white italic">{progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${progress}%` }}
                           transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                           className="h-full bg-orbit-accent orbit-glow"
                           style={{ backgroundColor: project.color }}
                         />
                      </div>
                   </div>

                   <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex items-center gap-6">
                         <div className="flex -space-x-3">
                            {MOCK_USERS.slice(0, 3).map((u, i) => (
                              <div key={i} className="w-9 h-9 rounded-xl border-4 border-[#0d0d12] bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-500">
                                {u.avatar}
                              </div>
                            ))}
                         </div>
                         <div className="flex flex-col">
                            <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest">Active Nodes</span>
                            <span className="text-xs font-bold text-white">{projectTasks.length}</span>
                         </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                         <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest">Deadline</span>
                         <span className="text-xs font-bold text-white flex items-center gap-1.5 uppercase">
                            <Clock className="w-3 h-3 text-orbit-accent" /> {project.deadline ? format(new Date(project.deadline), "MMM d") : "TBD"}
                         </span>
                      </div>
                   </div>
                </div>
              </motion.div>
            </Link>
          );
        })}
        
        {/* Initialization Hub (Add Project) */}
        <button className="relative group bg-white/[0.01] border-2 border-dashed border-white/5 rounded-[40px] p-12 flex flex-col items-center justify-center gap-6 hover:border-orbit-accent/40 hover:bg-white/[0.03] transition-all min-h-[400px] overflow-hidden">
           <div className="w-20 h-20 rounded-[32px] bg-white text-black flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all shadow-2xl">
              <Plus className="w-10 h-10" strokeWidth={3} />
           </div>
           <div className="text-center">
              <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-1">New Sector</h3>
              <p className="text-slate-600 text-xs font-black uppercase tracking-[0.2em]">Deploy Mission Protocol</p>
           </div>
           
           {/* Decorative elements */}
           <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/10" />
           <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/10" />
        </button>
      </div>
    </div>
  );
}
