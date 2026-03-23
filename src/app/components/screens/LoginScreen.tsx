import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Phone, ChevronRight, Shield } from "lucide-react";

export function LoginScreen() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSendOTP = () => {
    if (phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    navigate("/otp", { state: { phone } });
  };

  return (
    <div className="h-full w-full flex flex-col overflow-y-auto" style={{ background: "#FFF0F5" }}>
      
      {/* Top pink wave */}
      <div className="relative h-[220px] flex-shrink-0"
        style={{ background: "linear-gradient(145deg, #E91E8C, #C2185B)" }}>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#FFF0F5]"
          style={{ borderRadius: "50% 50% 0 0 / 30px 30px 0 0" }} />
        <div className="flex flex-col items-center justify-center h-full pb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-3"
          >
            <Shield size={32} color="white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white"
            style={{ fontSize: "1.5rem", fontWeight: 700 }}
          >
            HelpVoice
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/80"
            style={{ fontSize: "0.8rem" }}
          >
            Voice-Based Safety for Women
          </motion.p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pt-4 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-[#1A1A2E] mb-1" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
            Welcome Back 👋
          </h2>
          <p className="text-gray-500 mb-8" style={{ fontSize: "0.85rem" }}>
            Login to your account to stay safe
          </p>

          {/* Phone Input */}
          <label className="text-[#C2185B] mb-2 block" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
            Mobile Number
          </label>
          <div className="flex items-center bg-white rounded-2xl px-4 py-3 mb-2 shadow-sm"
            style={{ border: "1.5px solid #F8BBD0" }}>
            <div className="flex items-center gap-2 pr-3" style={{ borderRight: "1.5px solid #F8BBD0" }}>
              <span style={{ fontSize: "1.1rem" }}>🇮🇳</span>
              <span className="text-[#1A1A2E]" style={{ fontSize: "0.9rem", fontWeight: 500 }}>+91</span>
            </div>
            <div className="flex items-center flex-1 pl-3">
              <Phone size={16} color="#E91E8C" className="mr-2" />
              <input
                type="tel"
                placeholder="Enter your mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                className="flex-1 bg-transparent outline-none text-[#1A1A2E] placeholder-gray-400"
                style={{ fontSize: "0.95rem" }}
              />
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 mb-3"
              style={{ fontSize: "0.8rem" }}
            >
              {error}
            </motion.p>
          )}

          <p className="text-gray-400 mb-8" style={{ fontSize: "0.78rem" }}>
            We'll send a one-time password to this number.
          </p>

          {/* Send OTP Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSendOTP}
            className="w-full text-white py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg"
            style={{
              background: "linear-gradient(135deg, #E91E8C, #C2185B)",
              fontSize: "1rem",
              fontWeight: 700,
              boxShadow: "0 8px 20px rgba(233, 30, 140, 0.35)"
            }}
          >
            Send OTP <ChevronRight size={20} />
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400" style={{ fontSize: "0.8rem" }}>or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google Sign In */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full bg-white py-3.5 rounded-2xl flex items-center justify-center gap-3 shadow-sm"
            style={{ border: "1.5px solid #F8BBD0", fontSize: "0.9rem", fontWeight: 600, color: "#1A1A2E" }}
          >
            <span style={{ fontSize: "1.2rem" }}>🔍</span> Sign in with Google
          </motion.button>

          {/* Terms */}
          <p className="text-center text-gray-400 mt-6" style={{ fontSize: "0.75rem" }}>
            By continuing, you agree to our{" "}
            <span className="text-[#E91E8C]">Terms of Service</span> &{" "}
            <span className="text-[#E91E8C]">Privacy Policy</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
