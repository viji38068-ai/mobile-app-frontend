import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Clock, AlertTriangle, MapPin, Phone, Shield } from "lucide-react";

const dummyAlerts = [
  { id: 1, time: "2 min ago", type: "Voice Distress", location: "Main Bazaar", status: "Sent", icon: AlertTriangle, color: "#F44336" },
  { id: 2, time: "1 hr ago", type: "Manual Alert", location: "Park Street", status: "Sent", icon: Phone, color: "#FF9800" },
  { id: 3, time: "3 hrs ago", type: "Safety Check", location: "Home", status: "Resolved", icon: Shield, color: "#4CAF50" },
  { id: 4, time: "Yesterday", type: "Voice Distress", location: "Market Rd", status: "Sent", icon: AlertTriangle, color: "#F44336" },
];

export function AlertHistoryScreen() {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-b from-orange-50 to-red-50/50">
      {/* Header */}
      <div className="px-4 pt-4 pb-6 flex-shrink-0 flex items-center" style={{ background: "linear-gradient(135deg, #FF5722, #F44336)" }}>
        <button onClick={() => navigate("/dashboard")}
          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
          <ArrowLeft size={18} color="white" />
        </button>
        <div>
          <h1 className="text-white text-lg font-bold">Alert History</h1>
          <p className="text-white/80 text-sm">Your safety alerts</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-20">
        {dummyAlerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border"
            style={{ borderColor: `${alert.color}20` }}
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mt-0.5 flex-shrink-0"
                style={{ backgroundColor: `${alert.color}15` }}>
                <alert.icon size={20} style={{ color: alert.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-gray-800 text-base truncate">{alert.type}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${alert.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                    {alert.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-1">{alert.location}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock size={12} />
                  <span>{alert.time}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

