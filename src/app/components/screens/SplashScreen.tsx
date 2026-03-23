import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

export function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(145deg, #E91E8C 0%, #C2185B 50%, #AD1457 100%)" }}>
      
      {/* Background decorative circles */}
      <div className="absolute top-[-60px] right-[-60px] w-[200px] h-[200px] rounded-full opacity-20"
        style={{ background: "rgba(255,255,255,0.3)" }} />
      <div className="absolute bottom-[-80px] left-[-80px] w-[250px] h-[250px] rounded-full opacity-10"
        style={{ background: "rgba(255,255,255,0.4)" }} />
      <div className="absolute top-[30%] left-[-40px] w-[120px] h-[120px] rounded-full opacity-15"
        style={{ background: "rgba(255,255,255,0.2)" }} />

      {/* Logo area */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 shadow-lg"
          style={{ border: "2px solid rgba(255,255,255,0.4)" }}
        >
          <span className="text-5xl">🎙️</span>
        </motion.div>

        {/* App Name */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-white mb-2"
          style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.5px", textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}
        >
          HelpVoice
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-white/90 text-center px-8"
          style={{ fontSize: "0.95rem", letterSpacing: "0.5px" }}
        >
          Voice-Based Safety for Women
        </motion.p>

        {/* Dots loading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex gap-2 mt-12"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-white"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 text-white/60"
        style={{ fontSize: "0.75rem", letterSpacing: "1px" }}
      >
        Empowering Women · Protecting Lives
      </motion.p>
    </div>
  );
}
