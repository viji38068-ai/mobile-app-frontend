import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Mic, Shield, Volume2, Activity } from "lucide-react";

export function VoiceSafetyScreen() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const toggleProtection = () => setIsActive(!isActive);

  return (
    <div className="h-full w-full flex flex-col" style={{ background: "#FFF0F5" }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-4 flex-shrink-0 flex items-center gap-3"
        style={{ background: "linear-gradient(135deg, #E91E8C, #C2185B)" }}>
        <button onClick={() => navigate("/dashboard")}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
          <ArrowLeft size={18} color="white" />
        </button>
        <div className="flex-1">
          <h1 className="text-white" style={{ fontSize: "1.1rem", fontWeight: 700 }}>Voice Safety Protection</h1>
          <p className="text-white/70" style={{ fontSize: "0.72rem" }}>AI-powered voice monitoring</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
          <Shield size={18} color="white" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4">
        {/* Status Card */}
        <motion.div
          className="rounded-3xl p-6 flex flex-col items-center text-center shadow-sm"
          style={{
            background: isActive
              ? "linear-gradient(135deg, #E91E8C, #C2185B)"
              : "white",
            border: isActive ? "none" : "1.5px solid #F8BBD0"
          }}
          animate={{ scale: isActive ? 1.01 : 1 }}
        >
          {/* Animated mic */}
          <div className="relative mb-4">
            {isActive && [1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full"
                style={{ background: "rgba(255,255,255,0.2)" }}
                animate={{ scale: [1, 1 + i * 0.5], opacity: [0.6, 0] }}
                transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
              />
            ))}
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center relative z-10"
              style={{
                background: isActive ? "rgba(255,255,255,0.2)" : "#FCE4EC",
                border: isActive ? "2px solid rgba(255,255,255,0.4)" : "2px solid #F8BBD0"
              }}
            >
              <Mic size={40} color={isActive ? "white" : "#E91E8C"} />
            </div>
          </div>

          <p style={{ fontSize: "1.1rem", fontWeight: 700, color: isActive ? "white" : "#1A1A2E" }}>
            {isActive ? "Protection Active" : "Protection Inactive"}
          </p>
          <p style={{ fontSize: "0.8rem", color: isActive ? "rgba(255,255,255,0.8)" : "#9e9e9e", marginTop: 4 }}>
            {isActive
              ? "Monitoring voice for danger signals..."
              : "Tap Start to enable voice monitoring"}
          </p>

          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mt-3 bg-white/20 rounded-full px-4 py-1.5"
            >
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white" style={{ fontSize: "0.75rem", fontWeight: 600 }}>LIVE MONITORING</span>
            </motion.div>
          )}
        </motion.div>

        {/* How it works */}
        <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ border: "1px solid #F8BBD0" }}>
          <p className="text-[#1A1A2E] mb-3" style={{ fontSize: "0.9rem", fontWeight: 700 }}>
            🛡️ How Voice Safety Works
          </p>
          {[
            { icon: <Mic size={16} color="#E91E8C" />, text: "Continuously monitors ambient audio for distress signals" },
            { icon: <Activity size={16} color="#E91E8C" />, text: "AI detects fear, screaming, or keywords like 'help', 'stop'" },
            { icon: <Volume2 size={16} color="#E91E8C" />, text: "Automatically alerts emergency contacts when danger detected" },
            { icon: <Shield size={16} color="#E91E8C" />, text: "All audio is processed locally for your privacy" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 py-2"
              style={{ borderBottom: i < 3 ? "1px solid #FFF0F5" : "none" }}>
              <div className="w-7 h-7 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                {item.icon}
              </div>
              <p className="text-gray-600" style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>{item.text}</p>
            </div>
          ))}
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ border: "1px solid #F8BBD0" }}>
          <p className="text-[#1A1A2E] mb-3" style={{ fontSize: "0.9rem", fontWeight: 700 }}>
            ⚙️ Detection Settings
          </p>
          {[
            { label: "Distress keyword detection", enabled: true },
            { label: "Scream / loud noise alert", enabled: true },
            { label: "Silent SOS (3 taps)", enabled: false },
            { label: "Auto-record on trigger", enabled: true },
          ].map((setting, i) => (
            <div key={i} className="flex items-center justify-between py-2.5"
              style={{ borderBottom: i < 3 ? "1px solid #FFF0F5" : "none" }}>
              <span className="text-gray-600" style={{ fontSize: "0.82rem" }}>{setting.label}</span>
              <div
                className="w-10 h-5 rounded-full relative cursor-pointer"
                style={{ background: setting.enabled ? "#E91E8C" : "#e0e0e0" }}
              >
                <div className="w-4 h-4 bg-white rounded-full absolute top-0.5"
                  style={{ left: setting.enabled ? "auto" : "2px", right: setting.enabled ? "2px" : "auto", boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={toggleProtection}
          className="w-full py-4 rounded-2xl text-white shadow-lg"
          style={{
            background: isActive
              ? "linear-gradient(135deg, #757575, #424242)"
              : "linear-gradient(135deg, #E91E8C, #C2185B)",
            fontSize: "1rem",
            fontWeight: 700,
            boxShadow: isActive ? "none" : "0 8px 20px rgba(233,30,140,0.35)"
          }}
        >
          {isActive ? "⏹ Stop Protection" : "▶ Start Protection"}
        </motion.button>
      </div>
    </div>
  );
}
