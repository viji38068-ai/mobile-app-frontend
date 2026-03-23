import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, MapPin, FileText, CheckCircle, ChevronDown } from "lucide-react";

const complaintTypes = [
  "Unsafe Area",
  "Suspicious Activity",
  "Harassment",
  "Poor Lighting",
  "No Security",
  "Other",
];

export function ComplaintScreen() {
  const navigate = useNavigate();
  const [complaintType, setComplaintType] = useState("");
  const [description, setDescription] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    if (!complaintType) newErrors.type = "Please select complaint type";
    if (!description.trim()) newErrors.desc = "Please describe the incident";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center px-6"
        style={{ background: "#FFF0F5" }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          className="w-24 h-24 rounded-full bg-orange-50 flex items-center justify-center mb-6"
          style={{ border: "3px solid #FFCC02" }}
        >
          <CheckCircle size={50} color="#FF9800" />
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-[#1A1A2E] mb-2" style={{ fontSize: "1.3rem", fontWeight: 700 }}>
          Complaint Submitted!
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-gray-500 text-center mb-8" style={{ fontSize: "0.85rem" }}>
          Your complaint has been registered. We'll review it within 24 hours.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="w-full bg-white rounded-2xl p-4 shadow-sm mb-6"
          style={{ border: "1px solid #FFE0B2" }}
        >
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-400" style={{ fontSize: "0.8rem" }}>Complaint ID</span>
            <span className="text-[#1A1A2E]" style={{ fontSize: "0.8rem", fontWeight: 700 }}>#HV-2024-0583</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-400" style={{ fontSize: "0.8rem" }}>Type</span>
            <span className="text-orange-500" style={{ fontSize: "0.8rem", fontWeight: 600 }}>{complaintType}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-400" style={{ fontSize: "0.8rem" }}>Status</span>
            <span className="text-[#FF9800]" style={{ fontSize: "0.8rem", fontWeight: 600 }}>Under Review</span>
          </div>
        </motion.div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/dashboard")}
          className="w-full py-4 rounded-2xl text-white"
          style={{ background: "linear-gradient(135deg, #E91E8C, #C2185B)", fontSize: "1rem", fontWeight: 700 }}
        >
          Back to Dashboard
        </motion.button>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col" style={{ background: "#FFF0F5" }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-4 flex-shrink-0 flex items-center gap-3"
        style={{ background: "linear-gradient(135deg, #FF9800, #E65100)" }}>
        <button onClick={() => navigate("/dashboard")}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
          <ArrowLeft size={18} color="white" />
        </button>
        <div>
          <h1 className="text-white" style={{ fontSize: "1.1rem", fontWeight: 700 }}>Complaint Support</h1>
          <p className="text-white/70" style={{ fontSize: "0.72rem" }}>Report unsafe areas & incidents</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4">
        {/* Location (auto-detected) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ border: "1px solid #FFE0B2" }}>
          <label className="text-orange-500 mb-2 block" style={{ fontSize: "0.78rem", fontWeight: 700 }}>
            📍 DETECTED LOCATION
          </label>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
              <MapPin size={18} color="#FF9800" />
            </div>
            <div>
              <p className="text-[#1A1A2E]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                Sector 18, Noida
              </p>
              <p className="text-gray-400" style={{ fontSize: "0.72rem" }}>
                Uttar Pradesh, India - 201301
              </p>
            </div>
            <button className="ml-auto text-orange-500" style={{ fontSize: "0.72rem", fontWeight: 600 }}>
              Change
            </button>
          </div>
        </div>

        {/* Complaint Type */}
        <div className="relative">
          <label className="text-[#C2185B] mb-2 block" style={{ fontSize: "0.82rem", fontWeight: 600 }}>
            Complaint Type *
          </label>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full bg-white rounded-2xl px-4 py-3.5 flex items-center justify-between shadow-sm"
            style={{ border: errors.type ? "1.5px solid #F44336" : "1.5px solid #F8BBD0" }}
          >
            <span style={{ fontSize: "0.9rem", color: complaintType ? "#1A1A2E" : "#9e9e9e" }}>
              {complaintType || "Select complaint type..."}
            </span>
            <ChevronDown size={18} color="#9e9e9e"
              style={{ transform: showDropdown ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>
          {errors.type && <p className="text-red-500 mt-1" style={{ fontSize: "0.75rem" }}>{errors.type}</p>}

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-xl z-10 overflow-hidden"
                style={{ border: "1.5px solid #F8BBD0" }}
              >
                {complaintTypes.map((type) => (
                  <button
                    key={type}
                    className="w-full text-left px-4 py-3 hover:bg-pink-50"
                    style={{
                      fontSize: "0.88rem",
                      color: complaintType === type ? "#E91E8C" : "#1A1A2E",
                      fontWeight: complaintType === type ? 600 : 400,
                      borderBottom: "1px solid #FFF0F5"
                    }}
                    onClick={() => { setComplaintType(type); setShowDropdown(false); setErrors(e => ({ ...e, type: "" })); }}
                  >
                    {type}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Photo Evidence */}
        <div>
          <label className="text-[#C2185B] mb-2 block" style={{ fontSize: "0.82rem", fontWeight: 600 }}>
            Photo Evidence (Optional)
          </label>
          <div
            className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm"
            style={{ border: "1.5px dashed #F8BBD0", minHeight: "80px" }}
          >
            <span className="text-3xl mb-1">📷</span>
            <p className="text-gray-400" style={{ fontSize: "0.78rem" }}>Tap to add photo or video</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-[#C2185B] mb-2 block" style={{ fontSize: "0.82rem", fontWeight: 600 }}>
            Description *
          </label>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden"
            style={{ border: errors.desc ? "1.5px solid #F44336" : "1.5px solid #F8BBD0" }}>
            <textarea
              rows={5}
              placeholder="Describe what happened in detail. Include time, persons involved, and any other relevant information..."
              value={description}
              onChange={(e) => { setDescription(e.target.value); setErrors(er => ({ ...er, desc: "" })); }}
              className="w-full px-4 py-3 outline-none resize-none bg-transparent text-[#1A1A2E] placeholder-gray-400"
              style={{ fontSize: "0.85rem" }}
            />
            <div className="flex items-center justify-between px-4 pb-2">
              <div className="flex items-center gap-1">
                <FileText size={14} color="#E91E8C" />
                <span className="text-gray-400" style={{ fontSize: "0.72rem" }}>Be specific for faster resolution</span>
              </div>
              <span className="text-gray-400" style={{ fontSize: "0.72rem" }}>{description.length}/500</span>
            </div>
          </div>
          {errors.desc && <p className="text-red-500 mt-1" style={{ fontSize: "0.75rem" }}>{errors.desc}</p>}
        </div>

        {/* Urgency */}
        <div>
          <label className="text-[#C2185B] mb-2 block" style={{ fontSize: "0.82rem", fontWeight: 600 }}>
            Urgency Level
          </label>
          <div className="flex gap-2">
            {[
              { label: "Low", color: "#4CAF50", bg: "#E8F5E9" },
              { label: "Medium", color: "#FF9800", bg: "#FFF3E0" },
              { label: "High", color: "#F44336", bg: "#FFEBEE" },
            ].map((u) => (
              <button key={u.label} className="flex-1 py-2.5 rounded-xl"
                style={{
                  background: u.bg,
                  border: `1.5px solid ${u.color}`,
                  color: u.color,
                  fontSize: "0.82rem",
                  fontWeight: 600
                }}>
                {u.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          className="w-full py-4 rounded-2xl text-white shadow-lg"
          style={{
            background: "linear-gradient(135deg, #FF9800, #E65100)",
            fontSize: "1rem",
            fontWeight: 700,
            boxShadow: "0 8px 20px rgba(255,152,0,0.3)"
          }}
        >
          Submit Complaint 📢
        </motion.button>
      </div>
    </div>
  );
}
