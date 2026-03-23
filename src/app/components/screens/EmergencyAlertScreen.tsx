import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, AlertTriangle, Phone, MapPin, CheckCircle } from "lucide-react";

export function EmergencyAlertScreen() {
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const handleSendAlert = () => {
    setSending(true);
    let count = 5;
    const interval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(interval);
        setSending(false);
        setSent(true);
      }
    }, 1000);
  };

  if (sent) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center px-6"
        style={{ background: "#FFF0F5" }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
          style={{ background: "#E8F5E9" }}
        >
          <CheckCircle size={52} color="#4CAF50" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-[#1A1A2E] mb-2 text-center"
          style={{ fontSize: "1.4rem", fontWeight: 700 }}
        >
          Alert Sent! 🆘
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 text-center mb-8"
          style={{ fontSize: "0.85rem" }}
        >
          Your emergency alert has been sent to all contacts and nearby police stations.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full bg-white rounded-2xl p-4 shadow-sm mb-6"
          style={{ border: "1.5px solid #C8E6C9" }}
        >
          {[
            { label: "Priya's Mom", status: "Notified ✓", color: "#4CAF50" },
            { label: "Emergency Contact 2", status: "Notified ✓", color: "#4CAF50" },
            { label: "Nearest Police Station", status: "Alert Sent ✓", color: "#4CAF50" },
            { label: "Location Shared", status: "Active 📍", color: "#2196F3" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-2"
              style={{ borderBottom: i < 3 ? "1px solid #F5F5F5" : "none" }}>
              <span className="text-[#1A1A2E]" style={{ fontSize: "0.82rem" }}>{item.label}</span>
              <span style={{ fontSize: "0.78rem", fontWeight: 600, color: item.color }}>{item.status}</span>
            </div>
          ))}
        </motion.div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => { setSent(false); navigate("/dashboard"); }}
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
        style={{ background: "linear-gradient(135deg, #F44336, #C62828)" }}>
        <button onClick={() => navigate("/dashboard")}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
          <ArrowLeft size={18} color="white" />
        </button>
        <div>
          <h1 className="text-white" style={{ fontSize: "1.1rem", fontWeight: 700 }}>Emergency Alert</h1>
          <p className="text-white/70" style={{ fontSize: "0.72rem" }}>Send SOS to emergency contacts</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4">
        {/* Main SOS button */}
        <div className="flex flex-col items-center py-4">
          <AnimatePresence mode="wait">
            {sending ? (
              <motion.div
                key="sending"
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="relative">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full"
                      style={{ background: "rgba(244,67,54,0.2)" }}
                      animate={{ scale: [1, 1 + i * 0.4], opacity: [0.8, 0] }}
                      transition={{ duration: 1, delay: i * 0.25, repeat: Infinity }}
                    />
                  ))}
                  <div className="w-32 h-32 rounded-full flex flex-col items-center justify-center relative z-10"
                    style={{ background: "linear-gradient(135deg, #F44336, #C62828)", boxShadow: "0 10px 40px rgba(244,67,54,0.4)" }}>
                    <span className="text-white" style={{ fontSize: "2rem", fontWeight: 900 }}>{countdown}</span>
                    <span className="text-white/80" style={{ fontSize: "0.7rem" }}>Sending...</span>
                  </div>
                </div>
                <p className="mt-4 text-gray-500" style={{ fontSize: "0.85rem" }}>
                  Alert sending in <span className="text-red-500 font-bold">{countdown}s</span>
                </p>
              </motion.div>
            ) : (
              <motion.button
                key="idle"
                whileTap={{ scale: 0.95 }}
                onClick={handleSendAlert}
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-2xl"
                  style={{ background: "linear-gradient(135deg, #F44336, #C62828)", boxShadow: "0 10px 40px rgba(244,67,54,0.35)" }}>
                  <AlertTriangle size={36} color="white" />
                  <span className="text-white mt-1" style={{ fontSize: "0.85rem", fontWeight: 700 }}>Send Alert</span>
                </div>
              </motion.button>
            )}
          </AnimatePresence>
          <p className="text-gray-400 mt-3 text-center" style={{ fontSize: "0.78rem" }}>
            Press to send emergency alert to all contacts & nearby police
          </p>
        </div>

        {/* Current Location */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3"
          style={{ border: "1px solid #FFCDD2" }}>
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
            <MapPin size={20} color="#F44336" />
          </div>
          <div className="flex-1">
            <p className="text-gray-400" style={{ fontSize: "0.72rem" }}>YOUR CURRENT LOCATION</p>
            <p className="text-[#1A1A2E]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>Sector 18, Noida, UP - 201301</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ border: "1px solid #F8BBD0" }}>
          <p className="text-[#1A1A2E] mb-3" style={{ fontSize: "0.9rem", fontWeight: 700 }}>
            📞 Alert Will Be Sent To:
          </p>
          {[
            { name: "Mom (Sunita)", relation: "Mother", number: "+91 98765 43210", avatar: "👩‍🦳" },
            { name: "Anjali Singh", relation: "Best Friend", number: "+91 87654 32109", avatar: "👩" },
            { name: "Police Helpline", relation: "Emergency Services", number: "100", avatar: "👮" },
          ].map((contact, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5"
              style={{ borderBottom: i < 2 ? "1px solid #FFF0F5" : "none" }}>
              <div className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
                <span style={{ fontSize: "1.2rem" }}>{contact.avatar}</span>
              </div>
              <div className="flex-1">
                <p className="text-[#1A1A2E]" style={{ fontSize: "0.82rem", fontWeight: 600 }}>{contact.name}</p>
                <p className="text-gray-400" style={{ fontSize: "0.7rem" }}>{contact.relation} • {contact.number}</p>
              </div>
              <Phone size={14} color="#E91E8C" />
            </div>
          ))}
        </div>

        {/* What happens */}
        <div className="bg-red-50 rounded-2xl p-4" style={{ border: "1px solid #FFCDD2" }}>
          <p className="text-[#C62828] mb-2" style={{ fontSize: "0.82rem", fontWeight: 700 }}>🆘 When You Send Alert:</p>
          {["SMS sent to all emergency contacts", "Live location shared via Google Maps", "Audio recording started automatically", "Nearest police station notified"].map((item, i) => (
            <p key={i} className="text-gray-600 mb-1" style={{ fontSize: "0.78rem" }}>• {item}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
