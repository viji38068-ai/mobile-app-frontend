import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, Grid3X3, X, Mic, MapPin, Bell, AlertTriangle,
  Users, Clock, Settings, Shield, ChevronRight, Phone
} from "lucide-react";

const menuItems = [
  { icon: Mic, label: "Voice Safety", path: "/voice-safety", color: "#E91E8C", bg: "#FCE4EC" },
  { icon: AlertTriangle, label: "Emergency Alert", path: "/emergency-alert", color: "#F44336", bg: "#FFEBEE" },
  { icon: MapPin, label: "Safety Map", path: "/safety-map", color: "#4CAF50", bg: "#E8F5E9" },
  { icon: Bell, label: "Complaint Support", path: "/complaint", color: "#FF9800", bg: "#FFF3E0" },
  { icon: Phone, label: "Emergency Contacts", path: "/emergency-contacts", color: "#9C27B0", bg: "#F3E5F5" },
  { icon: Clock, label: "Alert History", path: "/alert-history", color: "#2196F3", bg: "#E3F2FD" },
  { icon: Settings, label: "Settings", path: "/settings", color: "#607D8B", bg: "#ECEFF1" },
];

const quickActions = [
  { icon: Mic, label: "Voice Safety", path: "/voice-safety", color: "#E91E8C", bg: "#FCE4EC" },
  { icon: AlertTriangle, label: "Emergency", path: "/emergency-alert", color: "#F44336", bg: "#FFEBEE" },
  { icon: MapPin, label: "Safety Map", path: "/safety-map", color: "#4CAF50", bg: "#E8F5E9" },
  { icon: Bell, label: "Complaint", path: "/complaint", color: "#FF9800", bg: "#FFF3E0" },
];

const recentAlerts = [
  { type: "Voice Alert", time: "2 mins ago", location: "Sector 15, Noida", status: "Resolved", color: "#4CAF50" },
  { type: "Emergency Alert", time: "1 hour ago", location: "MG Road, Delhi", status: "Active", color: "#F44336" },
  { type: "Complaint Filed", time: "Yesterday", location: "Connaught Place", status: "Pending", color: "#FF9800" },
];

export function DashboardScreen() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="h-full w-full flex flex-col relative overflow-hidden" style={{ background: "#F8F4F9" }}>
      
      {/* Top Bar */}
      <div className="flex-shrink-0 px-4 pt-4 pb-4"
        style={{ background: "linear-gradient(135deg, #E91E8C, #C2185B)" }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-lg">🎙️</span>
            </div>
            <span className="text-white" style={{ fontSize: "1rem", fontWeight: 700 }}>HelpVoice</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"
            >
              <Search size={18} color="white" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(true)}
              className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"
            >
              <Grid3X3 size={18} color="white" />
            </motion.button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80" style={{ fontSize: "0.78rem" }}>Good morning,</p>
            <p className="text-white" style={{ fontSize: "1.1rem", fontWeight: 700 }}>Priya Sharma 👋</p>
          </div>
          <div className="bg-white/20 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
            <Shield size={14} color="white" />
            <span className="text-white" style={{ fontSize: "0.75rem", fontWeight: 600 }}>Protected</span>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* SOS Banner */}
        <motion.div
          className="mx-4 mt-4 rounded-2xl p-4 flex items-center justify-between shadow-sm"
          style={{ background: "linear-gradient(135deg, #FF1744, #D50000)", boxShadow: "0 4px 15px rgba(255,23,68,0.3)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/emergency-alert")}
        >
          <div>
            <p className="text-white/80" style={{ fontSize: "0.72rem" }}>EMERGENCY</p>
            <p className="text-white" style={{ fontSize: "1rem", fontWeight: 700 }}>🆘 SOS Alert</p>
            <p className="text-white/70" style={{ fontSize: "0.72rem" }}>Tap to send emergency alert</p>
          </div>
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
            <AlertTriangle size={28} color="white" />
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="px-4 mt-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[#1A1A2E]" style={{ fontSize: "0.95rem", fontWeight: 700 }}>Quick Actions</p>
            <button className="text-[#E91E8C]" style={{ fontSize: "0.78rem", fontWeight: 600 }}>See All</button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((item) => (
              <motion.button
                key={item.label}
                whileTap={{ scale: 0.93 }}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm"
                  style={{ background: item.bg }}>
                  <item.icon size={22} color={item.color} />
                </div>
                <span className="text-gray-600" style={{ fontSize: "0.68rem", textAlign: "center", lineHeight: 1.2 }}>
                  {item.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Safety Status Card */}
        <div className="px-4 mt-5">
          <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ border: "1px solid #F8BBD0" }}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[#1A1A2E]" style={{ fontSize: "0.9rem", fontWeight: 700 }}>Today's Safety Status</p>
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full" style={{ fontSize: "0.7rem", fontWeight: 600 }}>Safe</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Voice Checks", value: "3", icon: "🎙️" },
                { label: "Alerts Sent", value: "1", icon: "📢" },
                { label: "Safe Hours", value: "6h", icon: "⏱️" },
              ].map((stat) => (
                <div key={stat.label} className="bg-pink-50 rounded-xl p-2.5 text-center">
                  <span style={{ fontSize: "1.3rem" }}>{stat.icon}</span>
                  <p className="text-[#E91E8C] mt-1" style={{ fontSize: "1.1rem", fontWeight: 700 }}>{stat.value}</p>
                  <p className="text-gray-400" style={{ fontSize: "0.6rem" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="px-4 mt-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[#1A1A2E]" style={{ fontSize: "0.95rem", fontWeight: 700 }}>Recent Activity</p>
            <button
              className="text-[#E91E8C]" style={{ fontSize: "0.78rem", fontWeight: 600 }}
              onClick={() => navigate("/alert-history")}
            >
              View All
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {recentAlerts.map((alert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-3.5 flex items-center gap-3 shadow-sm"
                style={{ border: "1px solid #F3E5F5" }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: alert.color + "20" }}>
                  <Bell size={16} color={alert.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#1A1A2E]" style={{ fontSize: "0.82rem", fontWeight: 600 }}>{alert.type}</p>
                  <p className="text-gray-400 truncate" style={{ fontSize: "0.72rem" }}>
                    📍 {alert.location}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="px-2 py-0.5 rounded-full" style={{
                    background: alert.color + "20",
                    color: alert.color,
                    fontSize: "0.65rem",
                    fontWeight: 600
                  }}>{alert.status}</span>
                  <span className="text-gray-400" style={{ fontSize: "0.65rem" }}>{alert.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex-shrink-0 bg-white border-t border-pink-100 flex items-center justify-around px-2 py-2">
        {[
          { icon: "🏠", label: "Home", active: true },
          { icon: "🗺️", label: "Map", path: "/safety-map" },
          { icon: "📢", label: "Alerts", path: "/alert-history" },
          { icon: "👤", label: "Profile", path: "/settings" },
        ].map((tab) => (
          <button
            key={tab.label}
            onClick={() => tab.path && navigate(tab.path)}
            className="flex flex-col items-center gap-0.5 px-3 py-1"
          >
            <span style={{ fontSize: "1.3rem" }}>{tab.icon}</span>
            <span style={{ fontSize: "0.62rem", color: tab.active ? "#E91E8C" : "#9e9e9e", fontWeight: tab.active ? 700 : 400 }}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 z-10"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-0 right-0 bottom-0 w-4/5 bg-white z-20 flex flex-col shadow-2xl"
            >
              {/* Drawer header */}
              <div className="px-5 pt-5 pb-4 flex items-center justify-between"
                style={{ background: "linear-gradient(135deg, #E91E8C, #C2185B)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-xl">👩</span>
                  </div>
                  <div>
                    <p className="text-white" style={{ fontSize: "0.95rem", fontWeight: 700 }}>Priya Sharma</p>
                    <p className="text-white/70" style={{ fontSize: "0.72rem" }}>Verified User ✓</p>
                  </div>
                </div>
                <button onClick={() => setMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <X size={16} color="white" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto py-3">
                {menuItems.map((item, i) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => { setMenuOpen(false); navigate(item.path); }}
                    className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-pink-50"
                    style={{ borderBottom: "1px solid #FFF0F5" }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: item.bg }}>
                      <item.icon size={20} color={item.color} />
                    </div>
                    <span className="flex-1 text-left text-[#1A1A2E]" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                      {item.label}
                    </span>
                    <ChevronRight size={16} color="#ccc" />
                  </motion.button>
                ))}
              </div>

              {/* Logout */}
              <div className="px-5 py-4 border-t border-pink-100">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full py-3 rounded-2xl flex items-center justify-center gap-2"
                  style={{ border: "1.5px solid #E91E8C", color: "#E91E8C", fontSize: "0.9rem", fontWeight: 600 }}
                >
                  🚪 Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
