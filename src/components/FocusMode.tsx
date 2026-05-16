import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, Moon, Sun, Coffee, Brain } from "lucide-react";
import { cn } from "../lib/utils";

interface FocusModeProps {
  onClose: () => void;
}

export default function FocusMode({ onClose }: FocusModeProps) {
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
      // Play sound notification here if desired
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-orbit-bg/95 backdrop-blur-3xl flex flex-col items-center justify-center p-8 overflow-hidden"
    >
      {/* Background Particles Simulation */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orbit-accent/30 blur-[150px] rounded-full animate-pulse" />
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orbit-purple/30 blur-[150px] rounded-full" />
      </div>

      <button 
        onClick={onClose}
        className="absolute top-12 right-12 p-3 text-slate-500 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="max-w-xl w-full text-center space-y-12 relative z-10">
        <div className="space-y-4">
           <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.4em]">Stellar Focus Active</p>
           <h2 className="text-4xl font-bold italic tracking-tighter text-white">Zone <span className="text-orbit-accent">Infinity</span></h2>
        </div>

        {/* Timer Modes */}
        <div className="flex justify-center gap-4">
           {modes.map((m) => (
             <button
               key={m.name}
               onClick={() => switchMode(m.name as any, m.time)}
               className={cn(
                 "flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all text-sm font-bold uppercase tracking-widest",
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

        <div className="relative py-20 flex flex-col items-center">
           <motion.div 
             key={timeLeft}
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="text-[180px] font-black tracking-tighter text-white leading-none tabular-nums"
           >
              {formatTime(timeLeft)}
           </motion.div>
           
           <div className="absolute inset-0 border-[20px] border-white/5 rounded-full -m-10 opacity-30 animate-[spin_60s_linear_infinite]" />
           <div className="absolute inset-0 border border-orbit-accent/20 rounded-full -m-20 animate-[spin_20s_linear_infinite_reverse]" />
        </div>

        <div className="flex items-center justify-center gap-8">
           <button 
             onClick={resetTimer}
             className="p-5 rounded-3xl bg-white/5 border border-white/10 text-slate-500 hover:text-white transition-all"
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
             className="p-5 rounded-3xl bg-white/5 border border-white/10 text-slate-500 hover:text-white transition-all"
           >
             {isMuted ? <VolumeX className="w-8 h-8" /> : <Volume2 className="w-8 h-8" />}
           </button>
        </div>

        <div className="pt-12 text-slate-500 italic font-medium">
          "The stars do not hurry, yet everything is accomplished."
        </div>
      </div>
    </motion.div>
  );
}
