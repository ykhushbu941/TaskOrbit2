import { useState } from "react";
import { User, Bell, Shield, Palette, Globe, Save, Trash2, Cpu, Zap, CreditCard } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { useAuthStore } from "../store/useAuthStore";

type Tab = "Profile" | "Appearance" | "Security" | "Fleet";

export default function Settings() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<Tab>("Profile");

  const sidebarItems = [
    { id: "Profile", icon: User },
    { id: "Appearance", icon: Palette },
    { id: "Security", icon: Shield },
    { id: "Fleet", icon: Zap },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight italic">System <span className="text-orbit-accent">Configuration</span></h1>
          <p className="text-slate-400">Manage your neural link parameters and fleet permissions.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-black font-black text-sm hover:opacity-90 transition-all">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Sidebar Nav */}
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm",
                activeTab === item.id 
                  ? "bg-orbit-accent text-white shadow-[0_0_20px_rgba(99,102,241,0.2)]" 
                  : "text-slate-500 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.id}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 border border-white/10 rounded-[32px] p-8 space-y-10"
          >
            {activeTab === "Profile" && (
              <>
                <div className="flex items-center gap-8">
                   <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-orbit-accent to-orbit-purple flex items-center justify-center text-3xl font-black text-white orbit-glow">
                      {user?.name?.[0] || "C"}
                   </div>
                   <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white tracking-tight">Personal Avatar</h3>
                      <div className="flex gap-4">
                         <button className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-bold transition-all text-white">Upload New</button>
                         <button className="px-5 py-2 rounded-xl border border-rose-500/30 text-rose-500 text-xs font-bold hover:bg-rose-500/10 transition-all">Delete</button>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-1">Callsign</label>
                      <input 
                        defaultValue={user?.name}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-orbit-accent text-white font-bold"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-1">Frequency (Email)</label>
                      <input 
                        disabled
                        defaultValue={user?.email}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none opacity-50 text-slate-500 font-bold"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-1">Bio (Telemetry Metadata)</label>
                   <textarea 
                     rows={4}
                     placeholder="State your purpose in the galactic cluster..."
                     className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-orbit-accent text-white font-medium resize-none"
                   />
                </div>
              </>
            )}

            {activeTab === "Appearance" && (
              <div className="space-y-8">
                <div className="space-y-6">
                   <p className="text-[12px] font-black uppercase text-slate-500 tracking-[0.2em]">Visual Theme Layer</p>
                   <div className="grid grid-cols-3 gap-6">
                      {["Deep Space", "Solar Flare", "Nebula Aura"].map((t, i) => (
                        <div key={i} className={cn(
                          "aspect-square rounded-3xl border flex flex-col items-center justify-center gap-4 cursor-pointer transition-all hover:scale-105",
                          i === 0 ? "bg-black border-orbit-accent ring-4 ring-orbit-accent/20" : "bg-white/5 border-white/10 opacity-60"
                        )}>
                           <div className={cn("w-12 h-12 rounded-full", i === 0 ? "bg-orbit-accent" : i === 1 ? "bg-orange-500" : "bg-orbit-purple")} />
                           <span className="text-xs font-bold text-white">{t}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="space-y-6">
                   <p className="text-[12px] font-black uppercase text-slate-500 tracking-[0.2em]">Interface Dynamics</p>
                   <div className="space-y-4">
                      {[
                        { label: "Glassmorphism Overlays", enabled: true },
                        { label: "Gravitational Motion Effects", enabled: true },
                        { label: "High Fidelity Particles", enabled: false }
                      ].map((pref, i) => (
                        <div key={i} className="flex justify-between items-center bg-white/5 border border-white/10 p-5 rounded-2xl">
                           <span className="text-sm font-bold text-white">{pref.label}</span>
                           <div className={cn(
                             "w-12 h-6 rounded-full p-1 cursor-pointer transition-all",
                             pref.enabled ? "bg-orbit-accent" : "bg-white/10"
                           )}>
                              <div className={cn("w-4 h-4 rounded-full bg-white transition-all", pref.enabled ? "translate-x-6" : "translate-x-0")} />
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            )}

            {activeTab === "Fleet" && (
              <div className="space-y-12">
                 <div className="bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border border-orbit-accent/30 p-8 rounded-3xl flex items-center justify-between shadow-2xl">
                    <div className="space-y-2">
                       <p className="text-[10px] font-black uppercase text-orbit-accent tracking-[0.3em]">Current Fleet Protocol</p>
                       <h3 className="text-2xl font-bold text-white uppercase italic tracking-tight">Enterprise Alpha</h3>
                       <p className="text-slate-400 text-sm font-medium">Unrestricted orbital slots and AI telemetry active.</p>
                    </div>
                    <CreditCard className="w-16 h-16 text-orbit-accent/40" />
                 </div>

                 <div className="space-y-6">
                    <p className="text-[12px] font-black uppercase text-slate-500 tracking-[0.2em]">Resource Allocation</p>
                    <div className="grid grid-cols-2 gap-6">
                       {[
                         { id: "Compute", val: "92%", icon: Cpu },
                         { id: "Connectivity", val: "100%", icon: Globe },
                       ].map((r, i) => (
                         <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
                            <div className="flex items-center gap-3">
                               <r.icon className="w-5 h-5 text-orbit-accent" />
                               <span className="text-xs font-bold text-white uppercase">{r.id}</span>
                            </div>
                            <div className="text-4xl font-black text-white italic">{r.val}</div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
