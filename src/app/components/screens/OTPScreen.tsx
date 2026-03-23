import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, RefreshCw } from "lucide-react";

export function OTPScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = (location.state as any)?.phone || "XXXXXXXXXX";
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [resent, setResent] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.join("").length < 4) {
      setError("Please enter the complete 4-digit OTP.");
      return;
    }
    navigate("/voice-recognition");
  };

  const handleResend = () => {
    setResent(true);
    setOtp(["", "", "", ""]);
    setTimeout(() => setResent(false), 3000);
    inputRefs[0].current?.focus();
  };

  return (
    <div className="h-full w-full flex flex-col overflow-y-auto" style={{ background: "#FFF0F5" }}>
      {/* Header */}
      <div className="relative h-[200px] flex-shrink-0"
        style={{ background: "linear-gradient(145deg, #E91E8C, #C2185B)" }}>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#FFF0F5]"
          style={{ borderRadius: "50% 50% 0 0 / 30px 30px 0 0" }} />
        
        {/* Back button */}
        <button onClick={() => navigate("/login")}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
          <ArrowLeft size={18} color="white" />
        </button>

        <div className="flex flex-col items-center justify-center h-full pb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-5xl mb-2"
          >
            📱
          </motion.div>
          <h1 className="text-white" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
            Verify OTP
          </h1>
        </div>
      </div>

      <div className="flex-1 px-6 pt-4 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-[#1A1A2E] mb-1" style={{ fontSize: "1.3rem", fontWeight: 700 }}>
            Enter OTP
          </h2>
          <p className="text-gray-500 mb-8" style={{ fontSize: "0.85rem" }}>
            A 4-digit code was sent to{" "}
            <span className="text-[#E91E8C] font-semibold">+91 {phone}</span>
          </p>

          {/* OTP Boxes */}
          <div className="flex justify-center gap-4 mb-4">
            {otp.map((digit, i) => (
              <motion.input
                key={i}
                ref={inputRefs[i]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="w-[60px] h-[60px] text-center rounded-2xl text-[#1A1A2E] bg-white shadow-sm outline-none"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  border: digit ? "2px solid #E91E8C" : "1.5px solid #F8BBD0",
                  boxShadow: digit ? "0 0 0 3px rgba(233,30,140,0.1)" : "0 2px 8px rgba(0,0,0,0.05)"
                }}
              />
            ))}
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-red-500 mb-3"
              style={{ fontSize: "0.8rem" }}
            >
              {error}
            </motion.p>
          )}

          {resent && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-green-500 mb-3"
              style={{ fontSize: "0.8rem" }}
            >
              ✓ OTP resent successfully!
            </motion.p>
          )}

          {/* Resend */}
          <div className="flex justify-center mb-8">
            <button onClick={handleResend}
              className="flex items-center gap-1.5 text-[#E91E8C]"
              style={{ fontSize: "0.85rem", fontWeight: 600 }}>
              <RefreshCw size={14} /> Resend OTP
            </button>
          </div>

          {/* Verify Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleVerify}
            className="w-full text-white py-4 rounded-2xl shadow-lg"
            style={{
              background: "linear-gradient(135deg, #E91E8C, #C2185B)",
              fontSize: "1rem",
              fontWeight: 700,
              boxShadow: "0 8px 20px rgba(233, 30, 140, 0.35)"
            }}
          >
            Verify OTP
          </motion.button>

          <p className="text-center text-gray-400 mt-4" style={{ fontSize: "0.78rem" }}>
            Didn't receive the OTP? Check your spam or try{" "}
            <span className="text-[#E91E8C]">another number</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
