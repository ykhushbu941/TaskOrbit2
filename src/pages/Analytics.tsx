import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
import { Zap, TrendingUp, Users, Target, Activity, Flame, ShieldCheck } from "lucide-react";
import { useOrbitStore } from "../store/useOrbitStore";

const data = [
  { name: "Mon", tasks: 4, velocity: 85 },
  { name: "Tue", tasks: 7, velocity: 92 },
  { name: "Wed", tasks: 5, velocity: 88 },
  { name: "Thu", tasks: 9, velocity: 95 },
  { name: "Fri", tasks: 12, velocity: 110 },
  { name: "Sat", tasks: 3, velocity: 70 },
  { name: "Sun", tasks: 2, velocity: 65 },
];

const COLORS = ["#6366f1", "#8b5cf6", "#14b8a6", "#f43f5e"];

export default function Analytics() {
  const { tasks, projects } = useOrbitStore();

  const statusData = [
    { name: "To Do", value: tasks.filter(t => t.status === "To Do").length },
    { name: "In Progress", value: tasks.filter(t => t.status === "In Progress").length },
    { name: "In Review", value: tasks.filter(t => t.status === "In Review").length },
    { name: "Done", value: tasks.filter(t => t.status === "Done").length },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight italic">Mission <span className="text-orbit-accent">Analytics</span></h1>
          <p className="text-slate-400">Deep telemetry and performance metrics for the current cycle.</p>
        </div>
        <div className="flex gap-2">
           <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-400">MAY 2026 CYCLE</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Cycle Velocity", value: "92.4%", trend: "+5.2%", icon: Zap, color: "text-orbit-accent" },
          { label: "Deployment Rate", value: "12/day", trend: "+2.1%", icon: Activity, color: "text-emerald-400" },
          { label: "Risk Index", value: "Low", trend: "-4%", icon: ShieldCheck, color: "text-teal-400" },
          { label: "System Load", value: "78%", trend: "+12%", icon: Flame, color: "text-rose-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden group">
            <div className="relative z-10">
              <p className="label-title mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <span className={cn("text-[10px] font-bold", stat.trend.startsWith("+") ? "text-emerald-400" : "text-rose-400")}>{stat.trend}</span>
              </div>
            </div>
            <stat.icon className={cn("absolute right-4 bottom-4 w-12 h-12 opacity-5 scale-125 transition-transform group-hover:scale-150 duration-500", stat.color)} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8">
          <div className="flex justify-between items-center mb-8">
             <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
               <TrendingUp className="w-4 h-4 text-orbit-accent" /> Productivity Trajectory
             </h3>
             <div className="flex gap-4">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500"><div className="w-2 h-2 rounded-full bg-orbit-accent" /> TASKS</span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500"><div className="w-2 h-2 rounded-full bg-white/10" /> VELOCITY</span>
             </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                   dataKey="name" 
                   stroke="#475569" 
                   fontSize={10} 
                   tickLine={false} 
                   axisLine={false} 
                />
                <YAxis 
                   stroke="#475569" 
                   fontSize={10} 
                   tickLine={false} 
                   axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "10px" }}
                  itemStyle={{ fontSize: "10px", fontWeight: "bold" }}
                />
                <Area type="monotone" dataKey="tasks" stroke="#6366f1" fillOpacity={1} fill="url(#colorTasks)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
           <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-8 flex items-center gap-2">
             <Target className="w-4 h-4 text-orbit-accent" /> Orbit Distribution
           </h3>
           <div className="h-[250px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={statusData}
                   innerRadius={60}
                   outerRadius={80}
                   paddingAngle={5}
                   dataKey="value"
                 >
                   {statusData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                   ))}
                 </Pie>
                 <Tooltip 
                    contentStyle={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "10px" }}
                 />
               </PieChart>
             </ResponsiveContainer>
           </div>
           <div className="mt-4 space-y-3">
              {statusData.map((s, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    {s.name}
                  </span>
                  <span className="text-xs font-bold text-white">{s.value}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
