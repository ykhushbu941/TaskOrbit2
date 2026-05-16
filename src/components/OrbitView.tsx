import { motion } from "motion/react";
import { Zap, Target, Orbit } from "lucide-react";
import { cn } from "../lib/utils";

interface Task {
  id: string;
  name: string;
  status: string;
  urgency: string;
  dueDate: string;
}

interface OrbitViewProps {
  tasks: Task[];
  interactive?: boolean;
}

export default function OrbitView({ tasks, interactive = true }: OrbitViewProps) {
  const getUrgencyGlow = (urgency: string) => {
    switch (urgency) {
      case "Critical": return "shadow-[0_0_40px_rgba(244,63,94,0.4)] border-rose-500 bg-rose-500";
      case "High": return "shadow-[0_0_30px_rgba(249,115,22,0.3)] border-orange-500 bg-orange-500";
      case "Medium": return "shadow-[0_0_20px_rgba(99,102,241,0.2)] border-orbit-accent bg-orbit-accent";
      default: return "border-slate-700 bg-slate-800 opacity-60";
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
      {/* Stellar Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)]" />
        {[...Array(30)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-px h-px bg-white rounded-full opacity-20"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 4}s infinite`
            }}
          />
        ))}
      </div>

      {/* The Core */}
      <div className="relative z-10 w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white/10 flex items-center justify-center orbit-glow-sun animate-[pulse_4s_infinite]">
         <div className="text-center group">
            <Orbit className="w-8 h-8 md:w-12 md:h-12 text-white mb-2 group-hover:rotate-180 transition-transform duration-1000" />
            <p className="text-[8px] md:text-[10px] font-black tracking-widest text-white uppercase italic">Command Core</p>
         </div>

         {/* Orbit Lines */}
         <div className="absolute inset-[-30px] md:inset-[-40px] border border-white/5 rounded-full" />
         <div className="absolute inset-[-90px] md:inset-[-120px] border border-white/5 rounded-full" />
         <div className="absolute inset-[-180px] md:inset-[-240px] border border-white/5 rounded-full" />
      </div>

      {/* Rotating Task Nodes */}
      {tasks.slice(0, 8).map((task, index) => {
        const orbitRadius = (window.innerWidth < 768 ? 80 : 150) + (index % 3) * (window.innerWidth < 768 ? 40 : 80);
        const rotationSpeed = 30 + index * 10;
        const startAngle = (index * (360 / Math.min(tasks.length, 8)));

        return (
          <motion.div
            key={task.id}
            className="absolute pointer-events-none"
            animate={{ rotate: [startAngle, startAngle + 360] }}
            transition={{ duration: rotationSpeed, repeat: Infinity, ease: "linear" }}
            style={{ width: `${orbitRadius * 2}px`, height: `${orbitRadius * 2}px` }}
          >
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-auto"
              style={{ transform: "translateX(50%)" }}
            >
               <motion.div 
                 whileHover={interactive ? { scale: 1.2 } : {}}
                 className={cn(
                   "w-6 h-6 md:w-10 md:h-10 rounded-xl md:rounded-2xl border-2 flex items-center justify-center cursor-default group relative",
                   getUrgencyGlow(task.urgency)
                 )}
               >
                  {task.urgency === "Critical" ? <Zap className="w-3 h-3 md:w-4 md:h-4 text-white" /> : <Target className="w-3 h-3 md:w-4 md:h-4 text-white" />}
                  
                  {/* Tooltip Card */}
                  {interactive && (
                    <div className="absolute left-full ml-4 opacity-0 group-hover:opacity-100 transition-all pointer-events-none w-48 bg-[#111]/95 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl z-50">
                       <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">{task.urgency} Node</p>
                       <p className="text-sm font-bold text-white mb-2">{task.name}</p>
                       <div className="flex justify-between items-center text-[10px]">
                          <span className="text-slate-500 font-black uppercase tracking-tighter">{task.status}</span>
                          <span className="text-orbit-accent font-black uppercase">{task.dueDate}</span>
                       </div>
                    </div>
                  )}
               </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
