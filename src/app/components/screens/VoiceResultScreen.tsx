import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, XCircle } from "lucide-react";

export function VoiceResultScreen() {
  const navigate = useNavigate();
  // Toggle for demo: true = female detected, false = not female
  const [isFemale, setIsFemale] = useState(true);

  return (
    <div className="h-full w-full flex flex-col" style={{ background: "#FFF0F5" }}>
      {/* Demo toggle */}
      <div className="px-4 pt-3 pb-2 bg-white shadow-sm flex items-center justify-between">
        <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>Demo:</p>
        <div className="flex gap-2">
          <button
            onClick={() => setIsFemale(true)}
            className="px-3 py-1 rounded-full text-white"
            style={{
              fontSize: "0.72rem",
              background: isFemale ? "#E91E8C" : "#e0e0e0",
              color: isFemale ? "white" : "#666"
            }}
          >
            Female ✓
          </button>
          <button
            onClick={() => setIsFemale(false)}
            className="px-3 py-1 rounded-full"
            style={{
              fontSize: "0.72rem",
              background: !isFemale ? "#1A1A2E" : "#e0e0e0",
              color: !isFemale ? "white" : "#666"
            }}
          >
            Not Female ✗
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isFemale ? (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center px-6 pb-8"
          >
            {/* Success glow */}
            <div className="relative mb-6">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: "rgba(233,30,140,0.15)" }}
                animate={{ scale: [1, 1.4], opacity: [0.8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-28 h-28 rounded-full flex items-center justify-center relative z-10"
                style={{ background: "linear-gradient(135deg, #E91E8C, #C2185B)", boxShadow: "0 10px 40px rgba(233,30,140,0.4)" }}
              >
                <span className="text-5xl">♀️</span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle size={24} color="#4CAF50" />
                <h2 className="text-[#1A1A2E]" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
                  Female Voice Detected
                </h2>
              </div>
              <p className="text-gray-500" style={{ fontSize: "0.85rem" }}>
                Your voice has been successfully verified as female. Welcome to HelpVoice!
              </p>
            </motion.div>

            {/* Result card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full bg-white rounded-3xl p-5 shadow-sm mb-8"
              style={{ border: "1.5px solid #F8BBD0" }}
            >
              {[
                { label: "Voice Gender", value: "Female", icon: "♀️", color: "#E91E8C" },
                { label: "Confidence Score", value: "97.3%", icon: "📊", color: "#4CAF50" },
                { label: "Verification Status", value: "Verified ✓", icon: "🛡️", color: "#4CAF50" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2.5"
                  style={{ borderBottom: "1px solid #FFF0F5" }}>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                    <span className="text-gray-500" style={{ fontSize: "0.82rem" }}>{item.label}</span>
                  </div>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: item.color }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/dashboard")}
              className="w-full text-white py-4 rounded-2xl shadow-lg"
              style={{
                background: "linear-gradient(135deg, #E91E8C, #C2185B)",
                fontSize: "1rem",
                fontWeight: 700,
                boxShadow: "0 8px 20px rgba(233,30,140,0.35)"
              }}
            >
              Continue to App 🎉
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="fail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center px-6 pb-20 relative"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center mb-6"
              style={{ border: "3px solid #ef9a9a" }}
            >
              <XCircle size={56} color="#E53935" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-6"
            >
              <h2 className="text-[#1A1A2E] mb-3" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                Access Denied
              </h2>
              <div className="bg-red-50 rounded-2xl p-4" style={{ border: "1px solid #FFCDD2" }}>
                <p className="text-[#C62828]" style={{ fontSize: "0.9rem", fontWeight: 600, lineHeight: 1.5 }}>
                  Only Female Users Are Allowed to Use This Application
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-full bg-white rounded-2xl p-4 shadow-sm mb-6"
              style={{ border: "1px solid #FFCDD2" }}
            >
              <p className="text-gray-500 text-center" style={{ fontSize: "0.82rem" }}>
                HelpVoice is designed exclusively for women's safety. If you believe this is an error, please try again.
              </p>
            </motion.div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/voice-recognition")}
              className="w-full py-3.5 rounded-2xl"
              style={{
                border: "2px solid #E91E8C",
                color: "#E91E8C",
                fontSize: "0.95rem",
                fontWeight: 700,
                background: "transparent"
              }}
            >
              Try Again
            </motion.button>

            {/* Bottom notification bar */}
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="absolute bottom-0 left-0 right-0 px-4 py-4"
              style={{ background: "#1A1A2E" }}
            >
              <div className="flex items-start gap-3">
                <span style={{ fontSize: "1.1rem" }}>⚠️</span>
                <p className="text-white" style={{ fontSize: "0.78rem", lineHeight: 1.5 }}>
                  This application is restricted to female users. The app will now exit.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
