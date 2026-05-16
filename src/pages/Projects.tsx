import { motion } from "motion/react";
import { FolderKanban, Plus, Clock, Users, ChevronRight, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useOrbitStore } from "../store/useOrbitStore";
import { cn } from "../lib/utils";
import { format } from "date-fns";

export default function Projects() {
  const { projects, tasks } = useOrbitStore();

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight italic">Active <span className="text-orbit-accent">Fleets</span></h1>
          <p className="text-slate-400">Your organization's project portfolio and mission hubs.</p>
        </div>
        <div className="flex gap-4">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                placeholder="Search projects..." 
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-orbit-accent text-sm text-white w-64"
              />
           </div>
           <button className="p-2 rounded-xl border border-white/10 hover:bg-white/5 text-slate-400">
             <Filter className="w-5 h-5" />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map((project) => {
          const projectTasks = tasks.filter(t => t.projectId === project.id);
          const completedTasks = projectTasks.filter(t => t.status === "Done").length;
          
          return (
            <Link key={project.id} to={`/projects/${project.id}`}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 group hover:border-orbit-accent/30 transition-all cursor-pointer h-full flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                   <div 
                     className="w-12 h-12 rounded-2xl flex items-center justify-center orbit-glow" 
                     style={{ backgroundColor: `${project.color}20`, border: `1px solid ${project.color}40`, color: project.color }}
                   >
                      <FolderKanban className="w-6 h-6" />
                   </div>
                   <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      {project.status}
                   </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orbit-accent transition-colors">{project.name}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-8 flex-1">{project.description}</p>

                <div className="space-y-6">
                   <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase">
                         <span className="text-slate-500">Progress</span>
                         <span className="text-white">{project.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${project.progress}%` }}
                           className="h-full bg-orbit-accent"
                         />
                      </div>
                   </div>

                   <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-4">
                         <div className="flex -space-x-2">
                            {project.members && project.members.slice(0, 3).map((m, i) => (
                              <div key={i} className="w-6 h-6 rounded-full border border-orbit-bg bg-white/10 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                                {m[0]}
                              </div>
                            ))}
                         </div>
                         <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{projectTasks.length} Tasks</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                         <Clock className="w-3 h-3" /> 
                         {project.deadline ? format(new Date(project.deadline), "MMM d") : "TBD"}
                      </div>
                   </div>
                </div>
              </motion.div>
            </Link>
          );
        })}
        
        {/* Add Project Card */}
        <button className="border-2 border-dashed border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 hover:border-orbit-accent/30 hover:bg-white/[0.02] transition-all group min-h-[300px]">
           <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6 text-slate-600 group-hover:text-white" />
           </div>
           <div className="text-center">
              <p className="text-sm font-bold text-white mb-1">Expand Fleet</p>
              <p className="text-xs text-slate-500">Initialize a new mission</p>
           </div>
        </button>
      </div>
    </div>
  );
}
