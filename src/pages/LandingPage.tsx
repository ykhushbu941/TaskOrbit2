import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Zap, Shield, Sparkles, Rocket, Globe, Star, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-orbit-bg text-white overflow-hidden selection:bg-orbit-accent selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orbit-accent flex items-center justify-center orbit-glow">
            <Zap className="text-white w-5 h-5 fill-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Task<span className="text-orbit-accent">Orbit</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#orbit" className="hover:text-white transition-colors">Orbit View</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium hover:text-white text-slate-400">Sign In</Link>
          <Link to="/register" className="px-5 py-2 rounded-full bg-orbit-accent hover:bg-orbit-accent/90 transition-all font-medium text-sm orbit-glow">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8 flex flex-col items-center text-center">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl aspect-square bg-gradient-to-b from-orbit-accent/10 to-transparent blur-[150px] -z-10 rounded-full" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-bright border border-white/10 text-xs font-semibold text-orbit-accent mb-6">
            <Sparkles className="w-3 h-3" />
            Next-Gen Productivity Platform
          </span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 max-w-4xl leading-[0.95]">
            Team Productivity, In <span className="text-orbit-accent italic">Perfect</span> <span className="text-gradient">Orbit.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
            The first AI-powered task engine designed to visualize your team's workload 
            through gravitational space models and real-time intelligence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="group px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-all w-full sm:w-auto flex items-center justify-center gap-2">
              Start Free Trial <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 rounded-full glass-bright font-bold hover:bg-white/10 transition-all w-full sm:w-auto">
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Orbit Visualization Mockup */}
        <motion.div 
          className="mt-20 relative w-full max-w-5xl aspect-video glass rounded-2xl border border-white/10 overflow-hidden orbit-glow"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
          <div className="relative h-full w-full p-4 flex items-center justify-center">
             {/* Simple Orbit Simulation for Hero */}
             <div className="relative w-[500px] h-[500px] flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-orbit-accent blur-xl absolute opacity-30 animate-pulse" />
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orbit-accent to-orbit-purple absolute z-10 shadow-[0_0_50px_rgba(99,102,241,0.5)] flex items-center justify-center outline outline-white/10">
                   <Zap className="text-white w-8 h-8 fill-white" />
                </div>
                
                {/* Orbital Rings */}
                {[1, 2, 3].map((ring) => (
                  <div key={ring} className="absolute border border-white/5 rounded-full" style={{ width: ring * 120, height: ring * 120 }}>
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-white absolute" 
                      animate={{ rotate: 360 }}
                      transition={{ duration: ring * 5, repeat: Infinity, ease: "linear" }}
                      style={{ originX: '50%', originY: '1666%' }} // Visual hack for orbit
                    />
                  </div>
                ))}
             </div>
          </div>
        </motion.div>
      </section>

      {/* Marquee Section */}
      <div className="py-12 glass border-y bg-white/[0.02] flex overflow-hidden group">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-2xl font-bold tracking-tight text-slate-600">
           {Array.from({length: 10}).map((_, i) => (
             <span key={i} className="flex items-center gap-4">
               TRUSTED BY VISIONARY TEAMS <Rocket className="w-6 h-6 text-orbit-accent" /> SPACE-X 
               <Globe className="w-6 h-6 text-orbit-accent" /> METAVERSE <Star className="w-6 h-6 text-orbit-accent" /> FRONTIER
             </span>
           ))}
        </div>
      </div>

      {/* Features Grid */}
      <section id="features" className="py-32 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">Beyond Task Management.</h2>
          <p className="text-slate-400">A holistic ecosystem built for the speed of modern engineering.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "AI Command Center", icon: Sparkles, desc: "Break deep projects into actionable sprints with a single natural language command." },
            { title: "Orbit Visualization", icon: Globe, desc: "See your team's workload as a gravitational model. Distance is rank, color is density." },
            { title: "Burnout Detection", icon: Shield, desc: "Intelligent sensors monitor workload streaks to protect your team's long-term wellness." },
          ].map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl glass hover:bg-white/[0.05] transition-all border border-white/5"
            >
              <div className="w-12 h-12 rounded-2xl bg-orbit-accent/20 flex items-center justify-center mb-6">
                <f.icon className="text-orbit-accent w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
