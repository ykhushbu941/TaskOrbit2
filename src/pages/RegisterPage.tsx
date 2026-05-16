import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Zap, Mail, Lock, User, ArrowRight, Github, Sparkles } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { MOCK_USERS } from "../data/mockData";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth delay
    setTimeout(() => {
      setAuth({ ...MOCK_USERS[0], name: "New Recruit" }, "mock-token");
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-orbit-bg flex items-center justify-center p-6 selection:bg-orbit-accent selection:text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-orbit-purple/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-orbit-accent/5 blur-[100px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center justify-center gap-3 mb-6 group">
             <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center orbit-glow group-hover:scale-110 transition-all">
                <div className="w-6 h-6 border-2 border-white rounded-full" />
             </div>
             <span className="text-3xl font-bold tracking-tighter text-white uppercase italic">Task<span className="text-orbit-accent">Orbit</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2 italic">Neural Enlistment</h1>
          <p className="text-slate-500 text-sm">Create your galactic profile and lead your fleet.</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] backdrop-blur-xl shadow-2xl">
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-1">Callsign (Full Name)</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 outline-none focus:border-orbit-accent text-white placeholder:text-slate-700 transition-all font-bold"
                  placeholder="Commander Shepard"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-1">Secure Frequency (Email)</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="email" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 outline-none focus:border-orbit-accent text-white placeholder:text-slate-700 transition-all font-bold"
                  placeholder="commander@taskorbit.io"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-1">Encryption Key (Password)</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="password" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 outline-none focus:border-orbit-accent text-white placeholder:text-slate-700 transition-all font-bold"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-white text-black font-black text-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 mt-4 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Initiate Command <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
             <p className="text-center text-xs text-slate-500 font-medium">
               Already enlisted? <Link to="/login" className="text-orbit-accent font-bold hover:underline">Return to Base</Link>
             </p>
          </div>
        </div>

        <div className="mt-8 text-center flex items-center justify-center gap-2 text-[10px] font-black uppercase text-slate-600 tracking-widest">
           <Sparkles className="w-3 h-3" /> Encrypted by TaskOrbit Quantum Protocol
        </div>
      </motion.div>
    </div>
  );
}
