import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, TrendingUp, AlertCircle, Sparkles, MessageSquareCode, Circle, FolderKanban as FolderKanbanIcon, ShieldCheck } from "lucide-react";
import { cn } from "../lib/utils";
import OrbitView from "../components/OrbitView";
import { useAuthStore } from "../store/useAuthStore";
import { useOrbitStore } from "../store/useOrbitStore";
import { format } from "date-fns";
import { MOCK_ACTIVITY } from "../data/mockData";

export default function Dashboard() {
  const { user } = useAuthStore();
  const { projects, tasks } = useOrbitStore();
  const [activity] = useState(MOCK_ACTIVITY);
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const askAI = async (command: string) => {
    setAiLoading(true);
    // Simulate AI thinking
    setTimeout(() => {
      const responses = [
        "System analysis complete. Apollo-X Engine is currently at 75% capacity. Recommend allocating David Chen to help Sarah Miller with the Heat Shield stress tests.",
        "Team velocity is high. However, Marcus Thorne has 3 high-urgency tasks due this week. Potential burnout risk detected in Project: Stellar Security.",
        "Good morning Commander. Orbit synchronization is at 98%. All systems functional. Next priority: Ion Thruster Optimization review.",
      ];
      setAiResponse(responses[Math.floor(Math.random() * responses.length)]);
      setAiLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">System <span className="text-orbit-accent italic">Overview</span></h1>
          <p className="text-slate-400">Welcome back, commander {user?.name}. All systems functional.</p>
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={() => askAI("Suggest task priorities for my current project")}
             className="px-4 py-2 glass-bright border border-orbit-accent/30 text-orbit-accent rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-orbit-accent/10 transition-all"
           >
             <Sparkles className="w-4 h-4" /> AI Insights
           </button>
        </div>
      </div>

      {/* Hero: Orbit Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass rounded-3xl p-8 h-[500px] relative overflow-hidden flex items-center justify-center group">
          <div className="absolute top-8 left-8 z-20">
             <h3 className="text-lg font-bold text-white mb-1">Orbit Visualization</h3>
             <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Real-time Team Gravity</p>
          </div>
          <OrbitView projects={projects} />
        </div>

        {/* AI Insight Card */}
        <div className="glass rounded-3xl p-8 flex flex-col h-[500px] border-orbit-accent/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orbit-accent/20 flex items-center justify-center">
              <MessageSquareCode className="text-orbit-accent w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white">AI Command</h3>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Orbit intelligence</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto mb-6 custom-scrollbar pr-2">
            <AnimatePresence mode="wait">
              {aiLoading ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="h-4 bg-white/5 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-white/5 rounded w-full animate-pulse" />
                  <div className="h-4 bg-white/5 rounded w-1/2 animate-pulse" />
                </motion.div>
              ) : aiResponse ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-sm text-slate-300 leading-relaxed space-y-4"
                >
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 leading-relaxed">
                    {aiResponse}
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-20">
                  <Sparkles className="w-10 h-10 text-slate-700 mx-auto mb-4" />
                  <p className="text-slate-500 text-sm">Ask the AI to analyze your sprint or suggest priorities.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-auto flex gap-2">
            <input 
              type="text" 
              placeholder="Deploy a command..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orbit-accent transition-all"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  askAI((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = "";
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Tasks", value: projects.reduce((acc, p) => acc + p.tasks.length, 0), icon: Zap, color: "text-orbit-accent" },
          { label: "Avg Progress", value: projects.length > 0 ? Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length) + "%" : "0%", icon: TrendingUp, color: "text-orbit-teal" },
          { label: "Active Projects", value: projects.length, icon: FolderKanbanIcon, color: "text-orbit-purple" },
          { label: "Team Health", value: "98%", icon: ShieldCheck, color: "text-white" },
        ].map((m, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center justify-between group hover:border-orbit-accent/40 transition-all cursor-default relative overflow-hidden">
            <div className="relative z-10">
              <p className="label-title mb-1">{m.label}</p>
              <p className="text-2xl font-bold text-white tracking-tight">{m.value}</p>
            </div>
            <div className={cn("w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform relative z-10", m.color)}>
              <m.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Grid: Activity & Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Feed */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col h-[400px]">
          <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-4 h-4 text-orbit-accent" /> Team Velocity
          </h3>
          <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2">
            {activity.map((log, i) => (
              <div key={log.id} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 group hover:bg-white/5 transition-all">
                <div className="w-8 h-8 rounded-full border border-orbit-accent/30 flex items-center justify-center text-[10px] text-orbit-accent font-bold shrink-0">
                  {log.userName[0]}
                </div>
                <div>
                   <p className="text-sm text-white">
                      <span className="font-bold">{log.userName}</span> {log.action} <span className="text-orbit-accent">"{log.targetName}"</span>
                   </p>
                   <p className="text-[10px] uppercase font-bold text-slate-500 mt-1">{format(new Date(log.timestamp), "MMM d, h:mm a")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Burnout Alert Style Panel */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 h-[400px] flex flex-col">
          <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2 text-rose-500">
            <AlertCircle className="w-4 h-4" /> Burnout Analysis
          </h3>
          <div className="space-y-6 overflow-y-auto flex-1 custom-scrollbar pr-2">
            {projects.flatMap(p => p.tasks).filter(t => t.urgency === "Critical" || t.urgency === "High").slice(0, 4).map((task, i) => (
              <div key={task.id} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-rose-500/30 flex items-center justify-center text-xs text-rose-500 font-bold bg-rose-500/5 group-hover:bg-rose-500/10 transition-all">
                  AL
                </div>
                <div className="flex-1">
                   <div className="flex justify-between mb-1">
                      <span className="text-[11px] font-bold text-slate-300">{task.name}</span>
                      <span className="text-[10px] text-rose-400 font-bold uppercase">{task.urgency}</span>
                   </div>
                   <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="w-[85%] h-full bg-rose-500" />
                   </div>
                </div>
              </div>
            ))}
            {projects.flatMap(p => p.tasks).filter(t => t.urgency === "Critical" || t.urgency === "High").length === 0 && (
              <div className="text-center py-10">
                <ShieldCheck className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                <p className="text-slate-500 text-sm">Personnel health optimal. No high risks.</p>
              </div>
            )}
          </div>
          
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl mt-6">
             <p className="text-[10px] text-rose-200">AI suggests load balancing for 2 developers to maintain velocity.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

