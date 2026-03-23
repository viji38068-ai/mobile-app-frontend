import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Navigation, Layers, ZoomIn, ZoomOut, MapPin } from "lucide-react";

type MapFilter = "all" | "safe" | "danger" | "police" | "patrol";

const zones = [
  { x: 10, y: 15, w: 40, h: 35, type: "safe", label: "Sector 14" },
  { x: 55, y: 10, w: 35, h: 30, type: "safe", label: "Green Park" },
  { x: 15, y: 55, w: 30, h: 35, type: "danger", label: "Old Market" },
  { x: 50, y: 50, w: 40, h: 40, type: "danger", label: "Station Area" },
  { x: 10, y: 5, w: 25, h: 10, type: "safe", label: "Residential" },
  { x: 70, y: 45, w: 25, h: 25, type: "safe", label: "Mall District" },
];

const markers = [
  { x: 20, y: 25, type: "police", label: "City Police Station" },
  { x: 68, y: 20, type: "police", label: "Sector 18 Police" },
  { x: 30, y: 65, type: "patrol", label: "Night Patrol Zone A" },
  { x: 60, y: 60, type: "patrol", label: "Night Patrol Zone B" },
  { x: 45, y: 35, type: "current", label: "You are here" },
];

const zoneColors: Record<string, string> = {
  safe: "rgba(76, 175, 80, 0.3)",
  danger: "rgba(244, 67, 54, 0.3)",
};

const markerColors: Record<string, string> = {
  police: "#2196F3",
  patrol: "#FFC107",
  current: "#E91E8C",
};

const markerEmojis: Record<string, string> = {
  police: "👮",
  patrol: "🚔",
  current: "📍",
};

export function SafetyMapScreen() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<MapFilter>("all");
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);

  const filters: { key: MapFilter; label: string; color: string }[] = [
    { key: "all", label: "All", color: "#E91E8C" },
    { key: "safe", label: "Safe", color: "#4CAF50" },
    { key: "danger", label: "Danger", color: "#F44336" },
    { key: "police", label: "Police", color: "#2196F3" },
    { key: "patrol", label: "Patrol", color: "#FFC107" },
  ];

  return (
    <div className="h-full w-full flex flex-col" style={{ background: "#F8F4F9" }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-4 flex-shrink-0 flex items-center gap-3"
        style={{ background: "linear-gradient(135deg, #4CAF50, #2E7D32)" }}>
        <button onClick={() => navigate("/dashboard")}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
          <ArrowLeft size={18} color="white" />
        </button>
        <div className="flex-1">
          <h1 className="text-white" style={{ fontSize: "1.1rem", fontWeight: 700 }}>Safety Map</h1>
          <p className="text-white/70" style={{ fontSize: "0.72rem" }}>Real-time area safety overview</p>
        </div>
        <Navigation size={20} color="white" />
      </div>

      {/* Filters */}
      <div className="flex-shrink-0 px-4 py-2.5 bg-white shadow-sm overflow-x-auto">
        <div className="flex gap-2">
          {filters.map((f) => (
            <motion.button
              key={f.key}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(f.key)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full"
              style={{
                background: activeFilter === f.key ? f.color : "#f5f5f5",
                color: activeFilter === f.key ? "white" : "#666",
                fontSize: "0.78rem",
                fontWeight: 600
              }}
            >
              {f.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Map Area */}
      <div className="relative flex-1 overflow-hidden" style={{ background: "#e8f5e9" }}>
        {/* Map grid background */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#4CAF50" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Roads */}
        <svg className="absolute inset-0 w-full h-full">
          {/* Main horizontal road */}
          <rect x="0" y="45%" width="100%" height="5%" fill="#c8e6c9" rx="2" />
          {/* Main vertical road */}
          <rect x="45%" y="0" width="5%" height="100%" fill="#c8e6c9" rx="2" />
          {/* Secondary roads */}
          <rect x="0" y="70%" width="100%" height="3%" fill="#dcedc8" rx="1" />
          <rect x="0" y="25%" width="100%" height="3%" fill="#dcedc8" rx="1" />
          <rect x="20%" y="0" width="3%" height="100%" fill="#dcedc8" rx="1" />
          <rect x="70%" y="0" width="3%" height="100%" fill="#dcedc8" rx="1" />
        </svg>

        {/* Zones */}
        <svg className="absolute inset-0 w-full h-full">
          {zones
            .filter((z) => activeFilter === "all" || activeFilter === z.type)
            .map((zone, i) => (
              <g key={i}>
                <rect
                  x={`${zone.x}%`}
                  y={`${zone.y}%`}
                  width={`${zone.w}%`}
                  height={`${zone.h}%`}
                  fill={zoneColors[zone.type]}
                  rx="8"
                  stroke={zone.type === "safe" ? "#4CAF50" : "#F44336"}
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                <text
                  x={`${zone.x + zone.w / 2}%`}
                  y={`${zone.y + zone.h / 2}%`}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={zone.type === "safe" ? "#2E7D32" : "#C62828"}
                  fontSize="10"
                  fontWeight="600"
                >
                  {zone.label}
                </text>
              </g>
            ))}
        </svg>

        {/* Markers */}
        {markers
          .filter((m) => {
            if (m.type === "current") return true;
            if (activeFilter === "all") return true;
            return activeFilter === m.type;
          })
          .map((marker, i) => (
            <motion.button
              key={i}
              className="absolute flex flex-col items-center"
              style={{
                left: `${marker.x}%`,
                top: `${marker.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              whileTap={{ scale: 1.2 }}
              onClick={() => setSelectedMarker(selectedMarker === i ? null : i)}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shadow-md"
                style={{ background: markerColors[marker.type] }}
              >
                <span style={{ fontSize: "0.9rem" }}>{markerEmojis[marker.type]}</span>
              </div>
              {marker.type === "current" && (
                <motion.div
                  className="absolute w-8 h-8 rounded-full"
                  style={{ background: "rgba(233,30,140,0.3)" }}
                  animate={{ scale: [1, 2], opacity: [0.8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              {selectedMarker === i && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-8 bg-white rounded-lg px-2 py-1 shadow-md whitespace-nowrap z-10"
                  style={{ border: "1px solid #F8BBD0", fontSize: "0.68rem", fontWeight: 600 }}
                >
                  {marker.label}
                </motion.div>
              )}
            </motion.button>
          ))}

        {/* Zoom controls */}
        <div className="absolute right-3 bottom-3 flex flex-col gap-2">
          <button
            onClick={() => setZoom(z => Math.min(z + 0.2, 2))}
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md"
          >
            <ZoomIn size={18} color="#1A1A2E" />
          </button>
          <button
            onClick={() => setZoom(z => Math.max(z - 0.2, 0.6))}
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md"
          >
            <ZoomOut size={18} color="#1A1A2E" />
          </button>
          <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md">
            <Layers size={18} color="#1A1A2E" />
          </button>
        </div>

        {/* My Location button */}
        <button
          className="absolute left-3 bottom-3 bg-white rounded-full px-3 py-2 shadow-md flex items-center gap-2"
          style={{ border: "1px solid #F8BBD0" }}
        >
          <Navigation size={14} color="#E91E8C" />
          <span style={{ fontSize: "0.72rem", color: "#E91E8C", fontWeight: 600 }}>My Location</span>
        </button>
      </div>

      {/* Legend */}
      <div className="flex-shrink-0 bg-white px-4 py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
        <p className="text-gray-400 mb-2" style={{ fontSize: "0.72rem", fontWeight: 600 }}>MAP LEGEND</p>
        <div className="grid grid-cols-4 gap-2">
          {[
            { color: "#4CAF50", label: "Safe Routes", dot: true },
            { color: "#F44336", label: "Danger Zones", dot: true },
            { color: "#2196F3", label: "Police Station", dot: true },
            { color: "#FFC107", label: "Patrol Zone", dot: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: item.color }} />
              <span style={{ fontSize: "0.65rem", color: "#555" }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Safe Route Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full mt-3 py-2.5 rounded-xl text-white flex items-center justify-center gap-2"
          style={{ background: "linear-gradient(135deg, #4CAF50, #2E7D32)", fontSize: "0.85rem", fontWeight: 700 }}
        >
          <Navigation size={16} /> Get Safest Route
        </motion.button>
      </div>
    </div>
  );
}
