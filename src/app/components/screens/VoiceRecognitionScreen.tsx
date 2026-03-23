import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Mic, MicOff } from "lucide-react";

export function VoiceRecognitionScreen() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [done, setDone] = useState(false);

  const handleRecord = () => {
    if (isRecording) return;
    setIsRecording(true);
    setTimeout(() => {
      setDone(true);
      setTimeout(() => {
        navigate("/voice-analysis");
      }, 500);
    }, 3000);
  };

  return (
    <div className="h-full w-full flex flex-col" style={{ background: "#FFF0F5" }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-3"
        style={{ background: "linear-gradient(145deg, #E91E8C, #C2185B)" }}>
        <button onClick={() => navigate("/otp")}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
          <ArrowLeft size={18} color="white" />
        </button>
        <div>
          <h1 className="text-white" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
            Voice Verification
          </h1>
          <p className="text-white/70" style={{ fontSize: "0.75rem" }}>
            Step 3 of 3
          </p>
        </div>
      </div>

      {/* Progress steps */}
      <div className="flex gap-1 px-4 py-3 bg-white shadow-sm">
        {["Phone", "OTP", "Voice"].map((step, i) => (
          <div key={step} className="flex-1">
            <div className="h-1.5 rounded-full"
              style={{ background: i <= 2 ? "#E91E8C" : "#F8BBD0" }} />
            <p className="mt-1 text-center" style={{
              fontSize: "0.65rem",
              color: i <= 2 ? "#E91E8C" : "#bbb",
              fontWeight: i <= 2 ? 600 : 400
            }}>{step}</p>
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-between px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-[#1A1A2E] mb-2" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
            Voice Verification
          </h2>
          <p className="text-gray-500" style={{ fontSize: "0.85rem" }}>
            We need to verify your voice to ensure only female users access the app
          </p>
        </motion.div>

        {/* Instruction card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-white rounded-3xl p-5 shadow-sm"
          style={{ border: "1.5px solid #F8BBD0" }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">💬</span>
            </div>
            <div>
              <p className="text-[#C2185B] mb-1" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                PLEASE SAY THIS PHRASE:
              </p>
              <p className="text-[#1A1A2E]" style={{ fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.4 }}>
                "I need help"
              </p>
              <p className="text-gray-400 mt-1" style={{ fontSize: "0.78rem" }}>
                Speak clearly in a quiet environment
              </p>
            </div>
          </div>
        </motion.div>

        {/* Mic Button */}
        <div className="flex flex-col items-center gap-6">
          <AnimatePresence mode="wait">
            {isRecording ? (
              <motion.div
                key="recording"
                className="relative"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
              >
                {/* Pulse rings */}
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full"
                    style={{ background: "rgba(233,30,140,0.15)" }}
                    animate={{ scale: [1, 1 + i * 0.4], opacity: [0.8, 0] }}
                    transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
                  />
                ))}
                <div className="w-28 h-28 rounded-full flex items-center justify-center relative z-10"
                  style={{ background: "linear-gradient(135deg, #E91E8C, #C2185B)", boxShadow: "0 8px 30px rgba(233,30,140,0.4)" }}>
                  <Mic size={44} color="white" />
                </div>
              </motion.div>
            ) : done ? (
              <motion.div
                key="done"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-28 h-28 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #4CAF50, #2E7D32)", boxShadow: "0 8px 30px rgba(76,175,80,0.4)" }}
              >
                <span className="text-4xl">✓</span>
              </motion.div>
            ) : (
              <motion.button
                key="idle"
                whileTap={{ scale: 0.93 }}
                onClick={handleRecord}
                className="w-28 h-28 rounded-full flex items-center justify-center shadow-xl"
                style={{ background: "linear-gradient(135deg, #E91E8C, #C2185B)", boxShadow: "0 8px 30px rgba(233,30,140,0.4)" }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Mic size={44} color="white" />
              </motion.button>
            )}
          </AnimatePresence>

          <div className="text-center">
            {isRecording && !done && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <p style={{ color: "#E91E8C", fontSize: "0.9rem", fontWeight: 600 }}>
                  Recording... Please say the phrase
                </p>
              </motion.div>
            )}
            {!isRecording && !done && (
              <p className="text-gray-500" style={{ fontSize: "0.85rem" }}>
                Tap the microphone to start recording
              </p>
            )}
            {done && (
              <p className="text-green-600" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                Voice captured! Analyzing...
              </p>
            )}
          </div>
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full bg-pink-50 rounded-2xl p-4"
          style={{ border: "1px solid #F8BBD0" }}
        >
          <p className="text-[#C2185B] mb-2" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
            💡 Tips for best results:
          </p>
          {["Speak at a normal volume", "Avoid background noise", "Hold device 15-20 cm away"].map((tip, i) => (
            <p key={i} className="text-gray-500" style={{ fontSize: "0.78rem" }}>• {tip}</p>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
