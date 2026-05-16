import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, FolderKanban, ShieldCheck, Zap, LogOut, MessageSquareCode, LineChart, LayoutGrid, Search, Command, X, Sparkles, Send, Settings as SettingsIcon, Orbit } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

export default function Layout() {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [commandInput, setCommandInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Orbit", path: "/orbit", icon: Orbit },
    { name: "Tasks", path: "/tasks", icon: LayoutGrid },
    { name: "Projects", path: "/projects", icon: FolderKanban },
    { name: "Analytics", path: "/analytics", icon: LineChart },
    { name: "Focus", path: "/focus", icon: Zap },
    { name: "Settings", icon: SettingsIcon, path: "/settings" },
  ];

  return (
    <div className="flex h-screen bg-orbit-bg overflow-hidden flex-col font-sans selection:bg-orbit-accent selection:text-white">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orbit-accent/5 blur-[150px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orbit-purple/5 blur-[150px] rounded-full" />
      </div>

      <AnimatePresence>
        {isCommandOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCommandOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[32px] box-shadow-orbit overflow-hidden"
            >
               <div className="p-6 flex items-center gap-4 border-b border-white/5">
                  <Command className="w-6 h-6 text-orbit-accent" />
                  <input 
                    autoFocus
                    placeholder="Search mission protocols or ask AI..."
                    className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-slate-700 font-bold italic"
                    value={commandInput}
                    onChange={(e) => setCommandInput(e.target.value)}
                  />
                  <div className="flex items-center gap-3">
                    <kbd className="bg-white/5 px-2 py-1 rounded text-[10px] font-black text-slate-500 border border-white/5">CTRL K</kbd>
                    <button onClick={() => setIsCommandOpen(false)} className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
               </div>

               <div className="max-h-[50vh] overflow-y-auto p-4 custom-scrollbar">
                  {!commandInput ? (
                    <div className="space-y-6 p-4">
                       <div>
                          <p className="text-[10px] font-black uppercase text-slate-600 tracking-[0.3em] mb-4 ml-2">Quick Actions</p>
                          <div className="grid grid-cols-2 gap-2">
                             {[
                               { label: "Initialize New Project", icon: FolderKanban, path: "/projects" },
                               { label: "Sync Orbital Data", icon: Zap, path: "/orbit" },
                               { label: "System Preferences", icon: SettingsIcon, path: "/settings" },
                               { label: "Personnel Analytics", icon: LineChart, path: "/analytics" },
                             ].map((action, i) => (
                               <button 
                                 key={i}
                                 className="flex items-center gap-3 p-4 rounded-2xl hover:bg-white/5 text-sm text-slate-400 group transition-all text-left border border-transparent hover:border-white/5"
                                 onClick={() => { navigate(action.path); setIsCommandOpen(false); }}
                               >
                                 <action.icon className="w-4 h-4 text-orbit-accent transition-transform group-hover:scale-110" />
                                 <span className="font-bold group-hover:text-white transition-colors">{action.label}</span>
                               </button>
                             ))}
                          </div>
                       </div>
                    </div>
                  ) : (
                    <div className="p-6 space-y-6">
                       <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-orbit-accent/20 flex items-center justify-center shrink-0 orbit-glow-blue">
                             <Sparkles className="w-5 h-5 text-orbit-accent" />
                          </div>
                          <div className="space-y-4">
                             <div>
                                <p className="text-[10px] font-black tracking-widest text-orbit-accent uppercase mb-1">AI Processor Response</p>
                                <p className="text-white font-bold leading-relaxed italic">
                                   &quot;Processing command <span className="text-orbit-accent italic">&apos;{commandInput}&apos;</span>. Telemetry suggests 12 active nodes in the Apollo-X sector. Should I prioritize these for today&apos;s mission briefing?&quot;
                                </p>
                             </div>
                             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                                <Zap className="w-3 h-3 fill-emerald-500" /> System: Optimal
                             </div>
                          </div>
                       </div>
                    </div>
                  )}
               </div>

               <div className="p-4 bg-white/[0.02] border-t border-white/5 flex justify-between items-center px-8">
                  <p className="text-[9px] text-slate-700 font-black uppercase tracking-[0.4em]">Orbit Neural Interface Ready</p>
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] font-black text-slate-500 uppercase">Return to Execute</span>
                     <Send className="w-3 h-3 text-slate-700" />
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* Sidebar */}
        <motion.aside 
          animate={{ width: isSidebarOpen ? 280 : 80 }}
          className="bg-orbit-bg/80 backdrop-blur-3xl border-r border-white/5 flex flex-col items-center py-10 shrink-0 relative z-50 hidden md:flex transition-all duration-500 ease-in-out"
        >
          <Link to="/dashboard" className="mb-16 flex items-center gap-3 px-6 h-12 w-full overflow-hidden">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shrink-0 orbit-glow-blue shadow-lg shadow-indigo-500/20">
               <div className="w-6 h-6 border-2 border-white rounded-full" />
            </div>
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-2xl font-black tracking-tighter text-white italic transition-all uppercase"
              >
                ORBIT
              </motion.span>
            )}
          </Link>

          <nav className="w-full px-4 space-y-2 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group overflow-hidden whitespace-nowrap",
                  location.pathname === item.path 
                    ? "bg-white/[0.07] text-white border border-white/5 shadow-2xl" 
                    : "text-slate-500 hover:text-white hover:bg-white/[0.03]"
                )}
              >
                <div className={cn(
                  "shrink-0 transition-all",
                  location.pathname === item.path ? "text-orbit-accent scale-110" : "group-hover:text-white group-hover:scale-110"
                )}>
                   <item.icon className="w-5 h-5 font-bold" strokeWidth={2.5} />
                </div>
                {isSidebarOpen && <span className="text-sm font-bold tracking-tight uppercase tracking-[0.1em]">{item.name}</span>}
              </Link>
            ))}
          </nav>

          <div className="w-full px-4 space-y-2 mb-4">
             <button 
               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
               className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-slate-600 hover:text-white hover:bg-white/[0.03] transition-all"
             >
                <LayoutGrid className="w-5 h-5 shrink-0" />
                {isSidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest">Collapse View</span>}
             </button>
             <button 
               onClick={handleLogout}
               className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-slate-600 hover:text-rose-500 hover:bg-white/[0.03] transition-all"
             >
                <LogOut className="w-5 h-5 shrink-0 px-1" />
                {isSidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest">Disconnect</span>}
             </button>
          </div>
        </motion.aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-transparent">
          {/* Top Navbar */}
          <header className="h-24 flex items-center justify-between px-10 shrink-0 z-40 bg-transparent">
             <div className="flex items-center gap-6 flex-1">
                <div className="relative max-w-sm w-full group hidden md:block">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-hover:text-orbit-accent transition-colors" />
                   <input 
                     placeholder="Search mission protocols..."
                     className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-slate-700 outline-none focus:border-orbit-accent transition-all font-medium backdrop-blur-sm"
                   />
                </div>
             </div>

             <div className="flex items-center gap-6">
                <button className="relative w-12 h-12 flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-all group">
                   <div className="absolute top-3 right-3 w-2 h-2 bg-orbit-accent rounded-full border-2 border-orbit-bg" />
                   <MessageSquareCode className="w-5 h-5 text-slate-500 group-hover:text-orbit-accent transition-colors" />
                </button>

                <div className="flex items-center gap-3 group cursor-pointer px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all backdrop-blur-sm">
                   <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orbit-accent/40 to-orbit-purple/40 flex items-center justify-center text-[10px] font-black text-white border border-white/10 glass-orbit group-hover:scale-105 transition-all">
                      {user?.avatar || user?.name?.[0]}
                   </div>
                   <div className="text-left hidden sm:block">
                      <p className="text-xs font-black text-white group-hover:text-orbit-accent transition-colors leading-none mb-1 uppercase tracking-tight">{user?.name}</p>
                      <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest leading-none">Mission Admin</p>
                   </div>
                </div>
             </div>
          </header>

          <div className="flex-1 overflow-y-auto overflow-x-hidden pt-4 pb-12 px-6 md:px-10 custom-scrollbar">
             <div className="max-w-7xl mx-auto h-full">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Outlet />
                </motion.div>
             </div>
          </div>
        </main>
      </div>
    </div>
  );
}
