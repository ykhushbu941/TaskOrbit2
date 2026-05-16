import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Users, FolderKanban, Plus, UserPlus, Settings2, Trash2, Mail, Shield, User } from "lucide-react";
import { cn } from "../lib/utils";
import { format } from "date-fns";
import { useOrbitStore } from "../store/useOrbitStore";
import { MOCK_USERS } from "../data/mockData";

export default function AdminPanel() {
  const { projects, addProject } = useOrbitStore();
  const [users] = useState(MOCK_USERS);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight italic">Admin <span className="text-orbit-purple">Control</span></h1>
          <p className="text-slate-400">Manage workspace resources and system permissions.</p>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={() => setIsProjectModalOpen(true)}
             className="px-6 py-2.5 rounded-xl bg-orbit-purple hover:opacity-90 text-white font-bold flex items-center gap-2 text-sm shadow-lg shadow-orbit-purple/20 transition-all"
           >
             <Plus className="w-5 h-5" /> Initialize Project
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Management */}
        <div className="lg:col-span-2 glass rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-orbit-teal" /> Personnel Registry
            </h3>
            <button className="text-xs font-bold text-orbit-teal hover:underline flex items-center gap-1">
               <UserPlus className="w-3 h-3" /> Register New
            </button>
          </div>

          <div className="space-y-4">
            {users.map((u) => (
              <div key={u.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:bg-white/5 transition-all">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-orbit-purple/20 flex items-center justify-center text-orbit-purple font-bold border border-orbit-purple/30">
                      {u.avatar || u.name[0]}
                   </div>
                   <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-sm">{u.name}</h4>
                        {u.role === "ADMIN" && <Shield className="w-3 h-3 text-orbit-accent" />}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                         <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {u.email}</span>
                         <span className="bg-white/5 px-2 py-0.5 rounded uppercase font-bold text-[10px] tracking-widest">{u.role}</span>
                      </div>
                   </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                   <button className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"><Settings2 className="w-4 h-4" /></button>
                   <button className="p-2 rounded-lg hover:bg-red-400/10 text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Quickview */}
        <div className="glass rounded-3xl p-8">
           <h3 className="font-bold text-white mb-8 flex items-center gap-2">
             <FolderKanban className="w-5 h-5 text-orbit-accent" /> Active Fleets
           </h3>
           <div className="space-y-6">
              {projects.map((p) => (
                <div key={p.id} className="relative">
                  <div className="flex justify-between items-center mb-2">
                     <h4 className="text-sm font-bold text-white flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                       {p.name}
                     </h4>
                     <span className="text-[10px] font-bold text-slate-500">{p.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-orbit-accent" style={{ width: `${p.progress}%` }} />
                  </div>
                  <div className="flex justify-between items-center mt-3">
                     <div className="flex -space-x-2">
                        {p.members?.slice(0, 3).map((uid: any) => {
                          const u = MOCK_USERS.find(user => user.id === uid);
                          return (
                            <div key={uid} className="w-6 h-6 rounded-full border border-orbit-bg bg-orbit-purple text-[8px] flex items-center justify-center text-white font-bold">
                              {u?.avatar || u?.name[0]}
                            </div>
                          );
                        })}
                     </div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Initialize Project Modal */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="w-full max-w-xl glass p-8 rounded-3xl border border-white/10"
           >
              <h2 className="text-2xl font-bold text-white mb-6">Initialize New Project</h2>
              <form onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const selectedMembers = Array.from(formData.getAll("members") as string[]);
                const data = {
                  name: formData.get("name") as string,
                  description: formData.get("description") as string,
                  color: formData.get("color") as string,
                  deadline: formData.get("deadline") as string,
                  members: selectedMembers,
                  status: "Active"
                };
                addProject(data);
                setIsProjectModalOpen(false);
              }} className="space-y-4">
                 <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Project Name</label>
                   <input name="name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orbit-purple text-white" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Mission Parameters (Description)</label>
                   <textarea name="description" rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orbit-purple text-white" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Fleet Color</label>
                      <input type="color" name="color" defaultValue="#6366f1" className="w-full h-12 bg-white/5 border border-white/10 rounded-xl outline-none cursor-pointer" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Deadline</label>
                      <input type="date" name="deadline" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orbit-purple text-white" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Assign Personnel</label>
                    <div className="max-h-40 overflow-y-auto space-y-2 custom-scrollbar p-2 rounded-xl bg-white/5 border border-white/10">
                       {users.map(u => (
                         <label key={u.id} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-all">
                            <input type="checkbox" name="members" value={u.id} className="w-4 h-4 rounded border-white/10 bg-white/5 text-orbit-purple focus:ring-orbit-purple" />
                            <span className="text-sm text-slate-300">{u.name}</span>
                         </label>
                       ))}
                    </div>
                 </div>
                 <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setIsProjectModalOpen(false)} className="flex-1 py-3 rounded-xl border border-white/10 font-bold hover:bg-white/5 transition-all">Abort</button>
                    <button type="submit" className="flex-1 py-3 rounded-xl bg-orbit-purple font-bold hover:opacity-90 transition-all orbit-glow">Launch Project</button>
                 </div>
              </form>
           </motion.div>
        </div>
      )}
    </div>
  );
}
