import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

export function VoiceAnalysisScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/voice-result");
    }, 3500);
    return () => clearTimeout(timer);
  }, [navigate]);

  const bars = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(160deg, #FFF0F5 0%, #FCE4EC 100%)" }}>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center px-8 text-center"
      >
        {/* Brain / AI icon */}
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-6 shadow-lg"
          style={{ border: "3px solid #F8BBD0" }}>
          <span className="text-5xl">🧠</span>
        </div>

        {/* Waveform animation */}
        <div className="flex items-center gap-[3px] h-16 mb-6">
          {bars.map((i) => (
            <motion.div
              key={i}
              className="w-[3px] rounded-full"
              style={{ background: i % 3 === 0 ? "#E91E8C" : i % 3 === 1 ? "#C2185B" : "#F48FB1" }}
              animate={{
                height: [8, Math.random() * 40 + 15, 8],
              }}
              transition={{
                duration: 0.8 + Math.random() * 0.4,
                delay: i * 0.05,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.h2
          className="text-[#1A1A2E] mb-3"
          style={{ fontSize: "1.4rem", fontWeight: 700 }}
        >
          Analyzing Voice…
        </motion.h2>
        <p className="text-gray-500 mb-8" style={{ fontSize: "0.85rem" }}>
          Please wait while our AI analyzes your voice pattern
        </p>

        {/* Progress steps */}
        <div className="w-full bg-white rounded-2xl p-5 shadow-sm" style={{ border: "1px solid #F8BBD0" }}>
          {[
            { label: "Capturing audio sample", done: true },
            { label: "Processing voice frequencies", done: true },
            { label: "Running AI gender analysis", done: false },
            { label: "Generating result", done: false },
          ].map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.3 }}
              className="flex items-center gap-3 py-2"
              style={{ borderBottom: i < 3 ? "1px solid #FFF0F5" : "none" }}
            >
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: step.done ? "#E91E8C" : "#F8BBD0" }}>
                {step.done ? (
                  <span className="text-white" style={{ fontSize: "0.7rem" }}>✓</span>
                ) : (
                  <motion.div
                    className="w-3 h-3 rounded-full"
                    style={{ background: "#E91E8C" }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </div>
              <p style={{
                fontSize: "0.82rem",
                color: step.done ? "#1A1A2E" : "#9e9e9e",
                fontWeight: step.done ? 500 : 400
              }}>
                {step.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Loading dots */}
        <div className="flex gap-2 mt-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#E91E8C" }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
