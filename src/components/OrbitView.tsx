import { motion } from "motion/react";
import { Zap } from "lucide-react";
import { cn } from "../lib/utils";

interface Project {
  id: string;
  name: string;
  progress: number;
  tasks: any[];
  color: string;
}

export default function OrbitView({ projects }: { projects: Project[] }) {
  // Center is (0,0) concept in a coordinate plane
  // We'll map projects to orbits
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central Sun */}
      <div className="relative z-10">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: 360 
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-orbit-accent to-orbit-purple flex items-center justify-center orbit-glow relative"
        >
          <Zap className="text-white w-8 h-8 fill-white" />
          {/* Corona Effect */}
          <div className="absolute inset-0 rounded-full bg-orbit-accent/40 blur-2xl animate-pulse -z-10" />
        </motion.div>
      </div>

      {/* Orbital Layers */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Constant Rings */}
        {[100, 180, 260, 340].map((radius, i) => (
          <div 
            key={i} 
            className="absolute border border-white/[0.03] rounded-full" 
            style={{ width: radius * 2, height: radius * 2 }} 
          />
        ))}
      </div>

      {/* Project Planets */}
      {projects.map((project, index) => {
        // Higher progress = closer to center (100 is min radius, 0 is max)
        const radius = 340 - (project.progress / 100) * 240;
        // Workload density (more tasks = slower/heavier orbit or more moons)
        const duration = 15 + (project.tasks.length * 2);
        const size = 30 + (project.tasks.length * 2);
        
        return (
          <motion.div
            key={project.id}
            className="absolute flex items-center justify-center"
            style={{ width: radius * 2, height: radius * 2 }}
            animate={{ rotate: 360 }}
            transition={{ duration, repeat: Infinity, ease: "linear", delay: index * -5 }}
          >
            <div className="absolute top-0 flex flex-col items-center group pointer-events-auto cursor-pointer">
              {/* Planet */}
              <motion.div 
                whileHover={{ scale: 1.2 }}
                className={cn(
                  "relative rounded-full shadow-lg shadow-black/50 border border-white/20 transition-all",
                  "flex items-center justify-center overflow-hidden"
                )}
                style={{ 
                  width: size, 
                  height: size, 
                  backgroundColor: project.color,
                  boxShadow: `0 0 20px ${project.color}40`
                }}
              >
                {/* Surface texture/gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
                <span className="text-[10px] font-bold text-white z-10">{project.progress}%</span>
                
                {/* Individual Task Moons */}
                {project.tasks.slice(0, 5).map((task: any, i: number) => (
                   <motion.div
                      key={task.id}
                      className="absolute w-1 h-1 rounded-full bg-white opacity-60"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
                      style={{ originY: 10 + i * 2 }}
                   />
                ))}
              </motion.div>

              {/* Label */}
              <div className="absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 flex flex-col items-center whitespace-nowrap z-50">
                <span className="bg-orbit-card backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-bold text-white">
                  {project.name}
                </span>
                <div className="w-0.5 h-3 bg-white/20" />
              </div>
            </div>
          </motion.div>
        );
      })}

      {projects.length === 0 && (
         <div className="absolute z-20 text-center opacity-30">
            <p className="text-sm font-medium text-slate-400">No active projects orbiting.</p>
         </div>
      )}
    </div>
  );
}
