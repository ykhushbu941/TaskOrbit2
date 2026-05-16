import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, FolderKanban, ShieldCheck, Zap, LogOut, MessageSquareCode, LineChart, LayoutGrid, Search, Command, X, Sparkles, Send, Settings as SettingsIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import FocusMode from "./FocusMode";

export default function Layout() {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [commandInput, setCommandInput] = useState("");

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
    navigate("/");
  };

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "My Tasks", path: "/my-tasks", icon: LayoutGrid },
    { name: "Projects", path: "/projects", icon: FolderKanban },
    { name: "Analytics", path: "/analytics", icon: LineChart },
    { name: "Focus Mode", icon: Zap, path: "#", onClick: () => setIsFocusMode(true) },
    { name: "AI Assistant", icon: MessageSquareCode, path: "#", onClick: () => setIsCommandOpen(true), ai: true },
    { name: "Settings", icon: SettingsIcon, path: "/settings" },
    { name: "Admin", icon: ShieldCheck, path: "/admin", adminOnly: true },
  ];

  return (
    <div className="flex h-screen bg-orbit-bg overflow-hidden flex-col font-sans">
      <AnimatePresence>
        {isFocusMode && <FocusMode onClose={() => setIsFocusMode(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {isCommandOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCommandOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md" 
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
               <div className="p-4 flex items-center gap-4 border-b border-white/5">
                  <Command className="w-5 h-5 text-slate-500" />
                  <input 
                    autoFocus
                    placeholder="Ask AI or type a command (e.g. 'deploy project', 'analyze sprint')..."
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-slate-600 font-medium"
                    value={commandInput}
                    onChange={(e) => setCommandInput(e.target.value)}
                  />
                  <div className="flex items-center gap-2">
                    <kbd className="bg-white/5 px-2 py-1 rounded text-[10px] text-slate-500 border border-white/5">ESC</kbd>
                    <button onClick={() => setIsCommandOpen(false)} className="p-1 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
               </div>

               <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                  {!commandInput ? (
                    <div className="space-y-6">
                       <div>
                          <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-3 ml-2">Suggested Actions</p>
                          <div className="space-y-1">
                             {[
                               { label: "Analyze team burnout risk", icon: Sparkles, color: "text-rose-400" },
                               { label: "Sync orbital telemetry", icon: Zap, color: "text-orbit-accent" },
                               { label: "Summarize Apollo-X status", icon: MessageSquareCode, color: "text-indigo-400" },
                             ].map((action, i) => (
                               <button 
                                 key={i}
                                 className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-sm text-slate-300 group text-left"
                                 onClick={() => setCommandInput(action.label)}
                               >
                                 <action.icon className={cn("w-4 h-4", action.color)} />
                                 <span className="font-medium group-hover:text-white transition-colors">{action.label}</span>
                               </button>
                             ))}
                          </div>
                       </div>
                    </div>
                  ) : (
                    <div className="p-4 space-y-4">
                       <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-lg bg-orbit-accent/20 flex items-center justify-center shrink-0">
                             <Sparkles className="w-4 h-4 text-orbit-accent" />
                          </div>
                          <div className="space-y-2">
                             <p className="text-sm font-bold text-white">ORBIT COMMANDER V2.0</p>
                             <p className="text-sm text-slate-400 leading-relaxed italic">
                               "Processing your request regarding <span className="text-white">'{commandInput}'</span>. 
                               Based on current session telemetry, the team velocity is peaked at 92%. 
                               I suggest scheduling a sync for Stellar Security tomorrow at 0900h."
                             </p>
                          </div>
                       </div>
                    </div>
                  )}
               </div>

               <div className="p-3 bg-white/[0.02] border-t border-white/5 flex justify-between items-center px-6">
                  <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">AI Command Center Ready</p>
                  <button className="flex items-center gap-2 text-orbit-accent hover:text-white transition-colors">
                     <span className="text-[10px] font-black">EXECUTE</span>
                     <Send className="w-3 h-3" />
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/10 bg-black/20 flex flex-col p-6 gap-8 overflow-y-auto custom-scrollbar">
          <div>
            <Link to="/dashboard" className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center orbit-glow-sun">
                <div className="w-4 h-4 border-2 border-white rounded-full"></div>
              </div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">TASKORBIT</span>
            </Link>

            <div className="space-y-6">
              <div className="space-y-3">
                <p className="label-title">Command</p>
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    (!item.adminOnly || user?.role === "ADMIN") && (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={item.onClick}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 group text-sm",
                          location.pathname === item.path 
                            ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20" 
                            : "text-slate-400 hover:text-white"
                        )}
                      >
                        <item.icon className={cn("w-4 h-4", location.pathname === item.path ? "text-indigo-400" : "group-hover:text-white")} />
                        <span className="font-medium">{item.name}</span>
                        {item.ai && <span className="ml-auto text-[8px] border border-white/10 px-1 rounded font-bold">AI</span>}
                      </Link>
                    )
                  ))}
                </nav>
              </div>

              {/* AI Insight Mini Widget from Theme */}
              <div className="space-y-3">
                <p className="label-title">AI Insights</p>
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-semibold text-teal-400 uppercase">System Status</span>
                    <span className="text-[10px] text-slate-400">92%</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-[92%] h-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.5)]"></div>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed italic line-clamp-2">"Productivity is peaking. Recommend focus on High Orbit tasks."</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-white/10">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 mb-4 border border-white/5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-white/20 p-1">
                <div className="w-full h-full rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-[10px] items-center justify-center font-bold">
                  {user?.name?.[0]}
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{user?.role}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto relative custom-scrollbar flex flex-col">
          <div className="p-8 flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Outlet />
            </motion.div>
          </div>

          {/* Footer from Theme */}
          <footer className="h-12 border-t border-white/10 flex items-center px-8 justify-between bg-black/40 text-[10px] font-bold tracking-[0.1em] text-slate-500 shrink-0">
            <div className="flex gap-8">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> ENGINE: LIVE</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> STATUS: SYNCED</span>
            </div>
            <div className="flex gap-6 uppercase">
              <span className="text-white/80">Press <kbd className="bg-white/10 px-1 rounded text-white">⌘ K</kbd> for Command</span>
              <span className="hover:text-indigo-400 cursor-pointer transition-colors">v2.0.4-stable</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
