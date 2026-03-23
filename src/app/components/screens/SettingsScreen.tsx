import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Bell, Shield, Lock, Globe, HelpCircle, ChevronRight, LogOut, Moon, Vibrate } from "lucide-react";

export function SettingsScreen() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [locationShare, setLocationShare] = useState(true);

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className="w-12 h-6 rounded-full relative transition-colors duration-200"
      style={{ background: value ? "#E91E8C" : "#e0e0e0" }}
    >
      <div
        className="w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-200 shadow-sm"
        style={{ left: value ? "26px" : "2px" }}
      />
    </button>
  );

  const settingsGroups = [
    {
      title: "PROFILE",
      items: [
        {
          icon: "👩",
          label: "My Profile",
          sub: "Priya Sharma · +91 98765 43210",
          action: () => {},
          arrow: true
        },
        {
          icon: "🛡️",
          label: "Verification Status",
          sub: "Female voice verified ✓",
          action: () => {},
          badge: "Verified",
          badgeColor: "#4CAF50"
        },
      ]
    },
    {
      title: "NOTIFICATIONS",
      items: [
        {
          icon: "🔔",
          label: "Push Notifications",
          sub: "Alert and safety reminders",
          toggle: true,
          value: notifications,
          onChange: () => setNotifications(!notifications)
        },
        {
          icon: "📳",
          label: "Vibration",
          sub: "Vibrate on emergency alerts",
          toggle: true,
          value: vibration,
          onChange: () => setVibration(!vibration)
        },
      ]
    },
    {
      title: "PRIVACY & SECURITY",
      items: [
        {
          icon: "📍",
          label: "Location Sharing",
          sub: "Share live location on SOS",
          toggle: true,
          value: locationShare,
          onChange: () => setLocationShare(!locationShare)
        },
        {
          icon: "🔒",
          label: "App Lock",
          sub: "Biometric / PIN protection",
          action: () => {},
          arrow: true
        },
        {
          icon: "🗑️",
          label: "Clear Alert History",
          sub: "Delete all saved alerts",
          action: () => {},
          danger: true,
          arrow: true
        },
      ]
    },
    {
      title: "PREFERENCES",
      items: [
        {
          icon: "🌙",
          label: "Dark Mode",
          sub: "Switch to dark theme",
          toggle: true,
          value: darkMode,
          onChange: () => setDarkMode(!darkMode)
        },
        {
          icon: "🌐",
          label: "Language",
          sub: "English",
          action: () => {},
          arrow: true
        },
      ]
    },
    {
      title: "SUPPORT",
      items: [
        {
          icon: "❓",
          label: "Help & FAQ",
          sub: "Get answers to common questions",
          action: () => {},
          arrow: true
        },
        {
          icon: "⭐",
          label: "Rate HelpVoice",
          sub: "Share your feedback",
          action: () => {},
          arrow: true
        },
        {
          icon: "📋",
          label: "Privacy Policy",
          sub: "Read our privacy terms",
          action: () => {},
          arrow: true
        },
      ]
    }
  ];

  return (
    <div className="h-full w-full flex flex-col" style={{ background: "#FFF0F5" }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-4 flex-shrink-0 flex items-center gap-3"
        style={{ background: "linear-gradient(135deg, #607D8B, #37474F)" }}>
        <button onClick={() => navigate("/dashboard")}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
          <ArrowLeft size={18} color="white" />
        </button>
        <div>
          <h1 className="text-white" style={{ fontSize: "1.1rem", fontWeight: 700 }}>Settings</h1>
          <p className="text-white/70" style={{ fontSize: "0.72rem" }}>Manage your preferences</p>
        </div>
      </div>

      {/* Profile card */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm"
        style={{ border: "1px solid #F8BBD0" }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #FCE4EC, #F8BBD0)" }}>
          <span style={{ fontSize: "2rem" }}>👩</span>
        </div>
        <div className="flex-1">
          <p className="text-[#1A1A2E]" style={{ fontSize: "1rem", fontWeight: 700 }}>Priya Sharma</p>
          <p className="text-gray-400" style={{ fontSize: "0.78rem" }}>+91 98765 43210</p>
          <div className="flex items-center gap-1 mt-0.5">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span style={{ fontSize: "0.7rem", color: "#4CAF50", fontWeight: 600 }}>Verified User</span>
          </div>
        </div>
        <button className="text-[#E91E8C]" style={{ fontSize: "0.78rem", fontWeight: 600 }}>Edit</button>
      </div>

      {/* Settings List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-6">
        {settingsGroups.map((group) => (
          <div key={group.title} className="mb-5">
            <p className="text-gray-400 mb-2 px-1" style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.5px" }}>
              {group.title}
            </p>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: "1px solid #F3E5F5" }}>
              {group.items.map((item: any, i) => (
                <motion.button
                  key={item.label}
                  whileTap={{ scale: 0.99 }}
                  onClick={item.action}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                  style={{ borderBottom: i < group.items.length - 1 ? "1px solid #FFF0F5" : "none" }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "#FFF0F5" }}>
                    <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: "0.85rem", fontWeight: 600, color: item.danger ? "#F44336" : "#1A1A2E" }}>
                      {item.label}
                    </p>
                    <p style={{ fontSize: "0.72rem", color: "#9e9e9e" }}>{item.sub}</p>
                  </div>
                  {item.toggle && (
                    <Toggle value={item.value} onChange={item.onChange} />
                  )}
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-white" style={{ background: item.badgeColor, fontSize: "0.65rem", fontWeight: 700 }}>
                      {item.badge}
                    </span>
                  )}
                  {item.arrow && <ChevronRight size={16} color="#ccc" />}
                </motion.button>
              ))}
            </div>
          </div>
        ))}

        {/* App Version */}
        <div className="text-center mb-4">
          <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>HelpVoice v2.4.1</p>
          <p className="text-gray-300" style={{ fontSize: "0.7rem" }}>© 2024 HelpVoice Safety Solutions</p>
        </div>

        {/* Logout */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/login")}
          className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2"
          style={{ background: "#FFF0F5", border: "1.5px solid #E91E8C", color: "#E91E8C", fontSize: "0.9rem", fontWeight: 700 }}
        >
          <LogOut size={16} /> Logout
        </motion.button>
      </div>
    </div>
  );
}
