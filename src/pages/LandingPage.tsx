import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Zap, Shield, Sparkles, Globe, ArrowRight, Circle, Play, Star } from "lucide-react";
import { cn } from "../lib/utils";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-orbit-bg text-white overflow-x-hidden selection:bg-orbit-accent selection:text-white">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orbit-accent/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/4 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orbit-purple/10 blur-[120px] rounded-full translate-y-1/4 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03)_0%,transparent_70%)]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex justify-between items-center bg-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center orbit-glow-sun">
             <div className="w-5 h-5 border-2 border-white rounded-full" />
          </div>
          <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">TASKORBIT</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-sm font-bold tracking-widest text-slate-400 uppercase">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#vision" className="hover:text-white transition-colors">Vision</a>
          <a href="#pricing" className="hover:text-white transition-colors">Fleets</a>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="px-6 py-2.5 rounded-xl border border-white/10 text-sm font-bold hover:bg-white/5 transition-all text-slate-300">Sign In</Link>
          <Link to="/register" className="px-6 py-2.5 rounded-xl bg-orbit-accent text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-orbit-accent/20">Launch Station</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.2em] text-orbit-accent uppercase"
          >
            <Sparkles className="w-3 h-3 animate-pulse" /> 
            Protocol v2.0 Live: AI-Powered Synchronization
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] italic"
          >
            Your Team's Productivity, <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orbit-accent via-indigo-400 to-orbit-purple">In Perfect Orbit.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-slate-400 font-medium leading-relaxed"
          >
            AI-powered task management designed for modern galactic teams. 
            Visualize workload through dynamic orbital telemetry and maintain perfect velocity.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-8"
          >
            <Link to="/register" className="px-10 py-5 rounded-2xl bg-white text-black font-black text-lg hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              Get Started
            </Link>
            <Link to="/dashboard" className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-3">
              <Play className="w-5 h-5 fill-white" /> Live Demo
            </Link>
          </motion.div>
        </div>

        {/* Orbit Visualization Mockup */}
        <div className="max-w-5xl mx-auto mt-32 relative group font-sans">
           <div className="absolute inset-0 bg-orbit-accent/20 blur-[100px] rounded-full scale-50 group-hover:scale-75 transition-transform duration-1000 -z-10" />
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.2, delay: 0.4 }}
             className="relative bg-black/40 border border-white/10 rounded-[40px] p-4 md:p-8 glass overflow-hidden aspect-[16/9] flex items-center justify-center"
           >
              {/* Static Orbit Preview for Landing */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                 <div className="w-[300px] h-[300px] border border-white/10 rounded-full animate-[spin_20s_linear_infinite]" />
                 <div className="absolute w-[500px] h-[500px] border border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
              </div>
              <div className="relative text-center space-y-4">
                 <div className="w-20 h-20 bg-indigo-500 rounded-full mx-auto animate-pulse shadow-[0_0_60px_rgba(99,102,241,0.5)]" />
                 <p className="text-xs font-bold text-slate-500 tracking-[0.3em] uppercase">Telemetry Active</p>
                 <div className="flex gap-4 justify-center">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-orbit-accent animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                 </div>
              </div>

              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-20 bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl w-64 shadow-2xl hidden md:block text-left"
              >
                 <div className="flex justify-between mb-4">
                    <span className="text-[10px] bg-rose-500 px-2 py-0.5 rounded-full font-black">CRITICAL</span>
                    <Circle className="w-3 h-3 text-slate-500" />
                 </div>
                 <p className="text-sm font-bold text-white">Refactor Ignition Core</p>
                 <div className="mt-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orbit-accent" />
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Apollo-X Fleet</span>
                 </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 left-20 bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl w-72 shadow-2xl hidden md:block text-left"
              >
                 <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-orbit-accent/40 border border-orbit-accent/40 flex items-center justify-center font-bold text-[10px]">KH</div>
                    <div>
                       <p className="text-xs font-bold text-white">Khushbu</p>
                       <p className="text-[8px] text-slate-500 uppercase">System Admin</p>
                    </div>
                 </div>
                 <p className="text-xs text-slate-400 italic">"Productivity spiking. High velocity detected in Nebula sector."</p>
              </motion.div>
           </motion.div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center">
            <h2 className="text-sm font-bold text-orbit-accent uppercase tracking-[0.4em] mb-4">Features</h2>
            <p className="text-4xl font-bold tracking-tight">Everything you need to command your flow.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 hover:bg-white/[0.08] transition-all aspect-square flex flex-col justify-between">
              <Zap className="w-12 h-12 text-orbit-accent" />
              <div>
                <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-tight">Orbital Visibility</h3>
                <p className="text-slate-400 leading-relaxed font-medium">Visualize tasks as dynamic nodes orbiting project centers. Immediate insight into priority and workload.</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[40px] p-10 aspect-square flex flex-col justify-between shadow-2xl shadow-indigo-500/20">
               <Shield className="w-12 h-12 text-white" />
               <div>
                 <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-tight">Neural Security</h3>
                 <p className="text-white/80 leading-relaxed font-medium">Enterprise-grade quantum encryption for your workspace and team intelligence.</p>
               </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 hover:bg-white/[0.08] transition-all aspect-square flex flex-col justify-between">
               <Sparkles className="w-12 h-12 text-orbit-purple" />
               <div>
                 <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-tight">Gemini AI Engine</h3>
                 <p className="text-slate-400 leading-relaxed font-medium">Predictive risk analysis and automated resource balancing to prevent team burnout.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-20 px-6">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
            <div className="col-span-2">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white rounded-full" />
                  </div>
                  <span className="text-xl font-bold tracking-tight text-white uppercase">TASKORBIT</span>
               </div>
               <p className="text-slate-500 max-w-sm mb-8">
                 The future of collaborative task management for the modern galactic era.
               </p>
               <div className="flex gap-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-all">
                       <Star className="w-4 h-4 text-slate-500" />
                    </div>
                  ))}
               </div>
            </div>
            <div>
               <h4 className="text-sm font-black uppercase tracking-widest mb-6 text-white italic">Product</h4>
               <ul className="space-y-4 text-slate-400 text-sm font-bold">
                  <li className="hover:text-white cursor-pointer">Pricing</li>
                  <li className="hover:text-white cursor-pointer">Security</li>
                  <li className="hover:text-white cursor-pointer">Visions</li>
                  <li className="hover:text-white cursor-pointer">API</li>
               </ul>
            </div>
            <div>
               <h4 className="text-sm font-black uppercase tracking-widest mb-6 text-white italic">Company</h4>
               <ul className="space-y-4 text-slate-400 text-sm font-bold">
                  <li className="hover:text-white cursor-pointer">About</li>
                  <li className="hover:text-white cursor-pointer">Careers</li>
                  <li className="hover:text-white cursor-pointer">Status</li>
                  <li className="hover:text-white cursor-pointer">Contact</li>
               </ul>
            </div>
         </div>
      </footer>
    </div>
  );
}
