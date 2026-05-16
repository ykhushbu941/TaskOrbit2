import OrbitView from "../components/OrbitView";
import { useOrbitStore } from "../store/useOrbitStore";
import { cn } from "../lib/utils";

export default function OrbitViewPage() {
  const { tasks } = useOrbitStore();

  return (
    <div className="h-full flex flex-col font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">Orbital <span className="text-orbit-accent">Telemetry</span></h1>
        <p className="text-slate-500 text-sm font-medium">Real-time visualization of mission nodes and project gravitational centers.</p>
      </div>

      <div className="flex-1 relative bg-black/20 border border-white/5 rounded-[40px] overflow-hidden">
        <OrbitView tasks={tasks} />

        {/* Legend */}
        <div className="absolute bottom-10 right-10 flex gap-6 px-8 py-4 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md z-20">
           {[
             { label: "Critical", color: "bg-rose-500" },
             { label: "High", color: "bg-orange-500" },
             { label: "Medium", color: "bg-orbit-accent" },
             { label: "Stable", color: "bg-slate-700" }
           ].map(l => (
             <div key={l.label} className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", l.color)} />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{l.label}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
