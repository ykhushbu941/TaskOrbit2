import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Zap, Mail, Lock, User, ArrowRight, Loader2, Shield } from "lucide-react";
import api from "../lib/api";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("ADMIN"); // Default first user as Admin for demo purposes
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await api.post("/auth/register", { email, password, name, role });
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orbit-bg flex items-center justify-center p-6 bg-[radial-gradient(circle_at_100%_100%,_#8b5cf615_0%,_transparent_50%)]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass border p-8 rounded-3xl"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-orbit-purple flex items-center justify-center mb-4 orbit-glow">
            <Zap className="text-white w-6 h-6 fill-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Join the Orbit</h1>
          <p className="text-slate-400 text-sm">Create your space for productive collaboration</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-400/10 border border-red-400/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white outline-none focus:border-orbit-purple transition-all"
                placeholder="Khushbu"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white outline-none focus:border-orbit-purple transition-all"
                placeholder="ykhushbu941@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white outline-none focus:border-orbit-purple transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Account Type</label>
            <div className="flex gap-4">
              <button 
                type="button"
                onClick={() => setRole("ADMIN")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all",
                  role === "ADMIN" ? "bg-orbit-purple/20 border-orbit-purple text-orbit-purple" : "border-white/10 text-slate-500"
                )}
              >
                <Shield className="w-4 h-4" /> Admin
              </button>
              <button 
                type="button"
                onClick={() => setRole("MEMBER")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all",
                  role === "MEMBER" ? "bg-orbit-purple/20 border-orbit-purple text-orbit-purple" : "border-white/10 text-slate-500"
                )}
              >
                <User className="w-4 h-4" /> Member
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orbit-purple hover:bg-orbit-purple/90 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-orbit-purple/20 flex items-center justify-center gap-2 group mt-4"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                Create Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-sm">
          Already have an account? <Link to="/login" className="text-orbit-purple hover:underline font-medium">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
}
import { cn } from "../lib/utils";
