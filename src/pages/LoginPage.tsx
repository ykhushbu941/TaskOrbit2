import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Zap, Mail, Lock, ArrowRight, Github } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { MOCK_USERS } from "../data/mockData";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("demo@taskorbit.com");
  const [password, setPassword] = useState("TaskOrbit123");

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    
    // Simulate auth delay
    setTimeout(() => {
      const user = MOCK_USERS.find(u => u.email === email) || MOCK_USERS[1];
      setAuth(user, "mock-session-token-" + Date.now());
      navigate("/dashboard");
    }, 1200);
  };

  const handleDemoLogin = () => {
    setEmail("demo@taskorbit.com");
    setPassword("TaskOrbit123");
    handleLogin();
  };

  return (
    <div className="min-h-screen bg-orbit-bg flex items-center justify-center p-6 selection:bg-orbit-accent selection:text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orbit-accent/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orbit-purple/5 blur-[100px] rounded-full" />
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
          <h1 className="text-2xl font-bold text-white mb-2">Access Control</h1>
          <p className="text-slate-500 text-sm font-medium">Enter mission credentials to access the terminal.</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] backdrop-blur-xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
            <Zap className="w-12 h-12 text-orbit-accent rotate-12" />
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-1">Personnel Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 outline-none focus:border-orbit-accent text-white placeholder:text-slate-700 transition-all font-medium"
                  placeholder="commander@taskorbit.io"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-1">Neural Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 outline-none focus:border-orbit-accent text-white placeholder:text-slate-700 transition-all font-medium"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-white text-black font-black text-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Establish Link <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
             <button 
               onClick={handleDemoLogin}
               className="w-full py-4 rounded-2xl bg-gradient-to-r from-orbit-accent to-orbit-purple text-white font-black text-sm hover:opacity-90 transition-all flex items-center justify-center gap-3 orbit-glow-blue shadow-lg shadow-orbit-accent/20"
             >
                <Zap className="w-4 h-4 fill-white animate-pulse" /> Try Demo Account
             </button>
             
             <button className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                <Github className="w-4 h-4" /> Continue with NeuralNet
             </button>
             
             <p className="text-center text-xs text-slate-500 font-medium">
               New recruit? <Link to="/register" className="text-orbit-accent font-bold hover:underline">Apply for Command</Link>
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
