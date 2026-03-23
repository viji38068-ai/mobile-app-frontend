import { createBrowserRouter } from "react-router-dom";
import { MobileFrame } from "./components/MobileFrame";
import { SplashScreen } from "./components/screens/SplashScreen";
import { LoginScreen } from "./components/screens/LoginScreen";
import { OTPScreen } from "./components/screens/OTPScreen";
import { VoiceRecognitionScreen } from "./components/screens/VoiceRecognitionScreen";
import { VoiceAnalysisScreen } from "./components/screens/VoiceAnalysisScreen";
import { VoiceResultScreen } from "./components/screens/VoiceResultScreen";
import { DashboardScreen } from "./components/screens/DashboardScreen";
import { VoiceSafetyScreen } from "./components/screens/VoiceSafetyScreen";
import { EmergencyAlertScreen } from "./components/screens/EmergencyAlertScreen";
import { SafetyMapScreen } from "./components/screens/SafetyMapScreen";
import { ComplaintScreen } from "./components/screens/ComplaintScreen";
import { EmergencyContactsScreen } from "./components/screens/EmergencyContactsScreen";
import { AlertHistoryScreen } from "./components/screens/AlertHistoryScreen";
import { SettingsScreen } from "./components/screens/SettingsScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MobileFrame,
    children: [
      { index: true, Component: SplashScreen },
      { path: "login", Component: LoginScreen },
      { path: "otp", Component: OTPScreen },
      { path: "voice-recognition", Component: VoiceRecognitionScreen },
      { path: "voice-analysis", Component: VoiceAnalysisScreen },
      { path: "voice-result", Component: VoiceResultScreen },
      { path: "dashboard", Component: DashboardScreen },
      { path: "voice-safety", Component: VoiceSafetyScreen },
      { path: "emergency-alert", Component: EmergencyAlertScreen },
      { path: "safety-map", Component: SafetyMapScreen },
      { path: "complaint", Component: ComplaintScreen },
      { path: "emergency-contacts", Component: EmergencyContactsScreen },
      { path: "alert-history", Component: AlertHistoryScreen },
      { path: "settings", Component: SettingsScreen },
    ],
  },
]);
