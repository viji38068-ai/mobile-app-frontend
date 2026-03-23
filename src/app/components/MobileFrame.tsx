import { Outlet } from "react-router";

export function MobileFrame() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #FCE4EC 0%, #F3E5F5 50%, #E3F2FD 100%)" }}
    >
      {/* Phone outer shell */}
      <div
        className="relative"
        style={{
          width: "390px",
          height: "844px",
          borderRadius: "50px",
          background: "#1A1A2E",
          padding: "12px",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.08), 0 30px 80px rgba(0,0,0,0.4), 0 0 0 4px #111",
        }}
      >
        {/* Side buttons */}
        <div
          className="absolute"
          style={{
            left: "-3px",
            top: "120px",
            width: "3px",
            height: "40px",
            background: "#333",
            borderRadius: "3px 0 0 3px",
          }}
        />
        <div
          className="absolute"
          style={{
            left: "-3px",
            top: "175px",
            width: "3px",
            height: "70px",
            background: "#333",
            borderRadius: "3px 0 0 3px",
          }}
        />
        <div
          className="absolute"
          style={{
            left: "-3px",
            top: "260px",
            width: "3px",
            height: "70px",
            background: "#333",
            borderRadius: "3px 0 0 3px",
          }}
        />
        <div
          className="absolute"
          style={{
            right: "-3px",
            top: "180px",
            width: "3px",
            height: "90px",
            background: "#333",
            borderRadius: "0 3px 3px 0",
          }}
        />

        {/* Screen area */}
        <div
          className="relative overflow-hidden bg-white"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "40px",
          }}
        >
          {/* Status bar */}
          <div
            className="flex items-center justify-between px-6 py-2 flex-shrink-0"
            style={{
              background: "transparent",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 50,
              height: "28px",
            }}
          >
            {/* Dynamic island */}
            <div
              className="absolute left-1/2 top-0"
              style={{
                transform: "translateX(-50%)",
                width: "120px",
                height: "35px",
                background: "#1A1A2E",
                borderRadius: "0 0 20px 20px",
              }}
            />
          </div>

          {/* Actual screen content */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ paddingTop: "35px" }}
          >
            <div className="h-full w-full overflow-hidden">
              <Outlet />
            </div>
          </div>

          {/* Home indicator */}
          <div
            className="absolute bottom-2 left-1/2"
            style={{
              transform: "translateX(-50%)",
              width: "120px",
              height: "5px",
              background: "rgba(0,0,0,0.2)",
              borderRadius: "3px",
              zIndex: 50,
            }}
          />
        </div>
      </div>
    </div>
  );
}
