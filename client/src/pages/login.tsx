import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Globe, Cpu, Lock, ChevronRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { theme } = useTheme();
  const [showGreeting, setShowGreeting] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleEnterSystem = () => {
    setShowGreeting(true);
    setTimeout(() => {
      setShowGreeting(false);
      setLocation("/");
      toast.success("Identity Verified. Welcome back.");
    }, 3000);
  };

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedDate = time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  const isDarkMode = theme === "dark";

  return (
    <div className={`min-h-screen selection:bg-primary/10 flex flex-col relative overflow-hidden transition-colors duration-700 ${isDarkMode ? "bg-black text-white" : "bg-[#F8FAFC] text-slate-900"}`}>
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {isDarkMode ? (
          // Dark Mode Background (From Screenshot)
          <>
            <motion.div 
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-blue-500/10 blur-[120px]" 
            />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
          </>
        ) : (
          // Light Mode Background (Current Design)
          <>
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 20, 0],
                y: [0, -20, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[-15%] left-[-15%] w-[60%] h-[60%] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent blur-[140px] rounded-full" 
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
                x: [0, -30, 0],
                y: [0, 30, 0]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[-15%] right-[-15%] w-[60%] h-[60%] bg-gradient-to-tl from-blue-500/10 via-blue-400/5 to-transparent blur-[140px] rounded-full" 
            />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] mix-blend-overlay pointer-events-none" />
          </>
        )}
      </div>

      <AnimatePresence>
        {showGreeting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={`fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-2xl ${isDarkMode ? "bg-black/95" : "bg-[#F8FAFC]/98"}`}
          >
            <div className="text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="space-y-4"
              >
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className={`text-5xl font-black tracking-tighter uppercase ${isDarkMode ? "text-white" : "text-slate-900"}`}
                >
                  Greetings of the day
                </motion.h2>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
                  className="h-1 bg-primary mx-auto rounded-full"
                />
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className={`font-mono text-xs tracking-[0.4em] uppercase ${isDarkMode ? "text-white" : "text-slate-900"}`}
                >
                  Synchronizing Terminal MM01
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="relative z-10 p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-black tracking-[0.4em] uppercase ${isDarkMode ? "text-white/40" : "text-slate-400"}`}>KLKG / ENTERPRISE</span>
        </div>
        <div className={`hidden md:flex items-center gap-8 text-[10px] font-black tracking-widest uppercase ${isDarkMode ? "text-white/40" : "text-slate-400"}`}>
          <div className="flex items-center gap-2">
            <Globe className="w-3 h-3" /> Node: Asia-East-1
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="w-3 h-3" /> Core: Active
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-3 h-3" /> SSL: Verified
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl space-y-12">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-sm ${isDarkMode ? "border-white/10 bg-white/5 text-white/50" : "border-slate-200 bg-white/50 text-slate-500"}`}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest">Terminal MM01 - Authorized Access Only</span>
            </motion.div>
            
            <div className="overflow-hidden py-2">
              <motion.h1 
                initial={{ opacity: 0, y: 100, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className={`text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                The Central <br />
                <span className={`${isDarkMode ? "text-white" : "text-primary"}`}>OS for Business.</span>
              </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
              className={`text-lg md:text-xl font-medium max-w-2xl mx-auto tracking-tight leading-relaxed ${isDarkMode ? "text-white/40" : "text-slate-500"}`}
            >
              Manage showrooms, logistics, and business intelligence through a high-performance terminal interface.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
            className="flex flex-col items-center gap-8 pt-4"
          >
            <Button 
              onClick={handleEnterSystem}
              className={`group relative h-14 px-10 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-500 shadow-sm flex items-center gap-3 active:scale-95 ${isDarkMode ? "bg-white text-black hover:bg-white" : "bg-white text-slate-900 hover:bg-white border border-slate-200"}`}
            >
              <span className="relative z-10 flex items-center gap-3">
                Enter Terminal
                <ChevronRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </Button>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="flex flex-col items-center gap-1 font-mono"
            >
              <span className={`text-4xl font-black tracking-tighter tabular-nums ${isDarkMode ? "text-white" : "text-slate-900"}`}>{formattedTime}</span>
              <span className={`text-[10px] uppercase tracking-widest font-bold ${isDarkMode ? "text-white/40" : "text-slate-400"}`}>{formattedDate}</span>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-8 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto w-full gap-4 opacity-40">
        <p className={`text-[10px] font-bold tracking-widest uppercase ${isDarkMode ? "text-white" : "text-slate-900"}`}>© 2026 KLKG ORGANISATION - ALL RIGHTS RESERVED</p>
        <div className={`flex items-center gap-6 text-[9px] font-black uppercase tracking-[0.2em] ${isDarkMode ? "text-white" : "text-slate-900"}`}>
          <span>Made by Whitecruise Technologies</span>
          <span>Encrypted Gateway</span>
          <span>System Vitals: Optimal</span>
        </div>
      </footer>
    </div>
  );
}
