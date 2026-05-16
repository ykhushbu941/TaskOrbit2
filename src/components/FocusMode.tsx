import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Play, Pause, RotateCcw, Volume2, Wind } from "lucide-react";

export default function FocusMode({ onClose }: { onClose: () => void }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-orbit-bg/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8"
    >
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 p-3 rounded-full hover:bg-white/10 transition-all text-slate-500 hover:text-white"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="text-center space-y-12 max-w-lg w-full">
         <motion.div
           animate={{ 
             scale: isActive ? [1, 1.05, 1] : 1,
             opacity: isActive ? [0.8, 1, 0.8] : 1
           }}
           transition={{ duration: 4, repeat: Infinity }}
           className="relative"
         >
            <div className="absolute inset-0 bg-orbit-accent/20 blur-[100px] rounded-full" />
            <h1 className="text-[120px] font-black tracking-tighter text-white relative z-10 leading-none">
              {formatTime(timeLeft)}
            </h1>
         </motion.div>

         <div className="space-y-4">
            <p className="text-xl font-medium text-slate-400">Deep Work Cycle In Progress</p>
            <div className="flex items-center justify-center gap-8">
               <button 
                 onClick={() => setTimeLeft(25 * 60)}
                 className="p-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all"
               >
                 <RotateCcw className="w-6 h-6" />
               </button>
               <button 
                 onClick={() => setIsActive(!isActive)}
                 className="w-20 h-20 rounded-full bg-orbit-accent flex items-center justify-center text-white orbit-glow hover:scale-110 transition-all"
               >
                 {isActive ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 fill-current translate-x-1" />}
               </button>
               <button className="p-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all">
                 <Wind className="w-6 h-6" />
               </button>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-4 mt-12 w-full">
            <div className="glass p-6 rounded-2xl border-orbit-accent/10">
               <Volume2 className="w-5 h-5 text-orbit-accent mb-3" />
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Ambient Flow</p>
               <p className="text-sm text-white font-medium">Deep Space Static</p>
            </div>
            <div className="glass p-6 rounded-2xl border-orbit-purple/10">
               <Wind className="w-5 h-5 text-orbit-purple mb-3" />
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Focus Mode</p>
               <p className="text-sm text-white font-medium">No Notifications</p>
            </div>
         </div>
      </div>
    </motion.div>
  );
}
