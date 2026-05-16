import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Moon, Sun, Coffee, Brain, Sparkles } from "lucide-react";
import { cn } from "../lib/utils";

export default function FocusPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mode, setMode] = useState<"Focus" | "Short Break" | "Long Break">("Focus");

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === "Focus" ? 25 * 60 : mode === "Short Break" ? 5 * 60 : 15 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const modes = [
    { name: "Focus", time: 25 * 60, icon: Brain, color: "text-orbit-accent" },
    { name: "Short Break", time: 5 * 60, icon: Coffee, color: "text-emerald-400" },
    { name: "Long Break", time: 15 * 60, icon: Moon, color: "text-orbit-purple" },
  ];

  const switchMode = (m: typeof mode, time: number) => {
    setMode(m);
    setTimeLeft(time);
    setIsActive(false);
  };

  return (
    <div className="h-full flex flex-col font-sans">
      <div className="mb-12">
        <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">Distraction <span className="text-orbit-purple">Zero</span></h1>
        <p className="text-slate-500 text-sm font-medium">Deep work simulation with metabolic rhythm tracking.</p>
      </div>

      <div className="flex-1 bg-white/5 border border-white/10 rounded-[40px] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05)_0%,transparent_70%)]" />
        
        <div className="max-w-xl w-full text-center space-y-12 relative z-10">
          {/* Timer Modes */}
          <div className="flex justify-center gap-4">
             {modes.map((m) => (
               <button
                 key={m.name}
                 onClick={() => switchMode(m.name as any, m.time)}
                 className={cn(
                   "flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest",
                   mode === m.name 
                    ? "bg-white/10 border-white/20 text-white" 
                    : "bg-transparent border-transparent text-slate-600 hover:text-slate-400"
                 )}
               >
                 <m.icon className={cn("w-4 h-4", mode === m.name ? m.color : "")} />
                 {m.name}
               </button>
             ))}
          </div>

          <div className="relative py-12 flex flex-col items-center">
             <motion.div 
               key={timeLeft}
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               className="text-[120px] md:text-[180px] font-black tracking-tighter text-white leading-none tabular-nums italic"
             >
                {formatTime(timeLeft)}
             </motion.div>
             
             <div className="absolute inset-0 border-[20px] border-white/5 rounded-full -m-10 opacity-30 animate-[spin_60s_linear_infinite]" />
          </div>

          <div className="flex items-center justify-center gap-8">
             <button 
               onClick={resetTimer}
               className="p-5 rounded-3xl bg-white/5 border border-white/10 text-slate-500 hover:text-white transition-all hover:scale-110"
             >
               <RotateCcw className="w-8 h-8" />
             </button>
             <button 
               onClick={toggleTimer}
               className="w-32 h-32 rounded-[40px] bg-white text-black flex items-center justify-center hover:scale-105 transition-all shadow-[0_0_60px_rgba(255,255,255,0.2)]"
             >
               {isActive ? <Pause className="w-12 h-12 fill-black" /> : <Play className="w-12 h-12 fill-black ml-1" />}
             </button>
             <button 
               onClick={() => setIsMuted(!isMuted)}
               className="p-5 rounded-3xl bg-white/5 border border-white/10 text-slate-500 hover:text-white transition-all hover:scale-110"
             >
               {isMuted ? <VolumeX className="w-8 h-8" /> : <Volume2 className="w-8 h-8" />}
             </button>
          </div>

          <motion.div 
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="pt-12 text-slate-600 italic font-bold uppercase text-[10px] tracking-[0.5em] flex items-center justify-center gap-4"
          >
            <Sparkles className="w-4 h-4" /> Neural Link Synchronized <Sparkles className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
