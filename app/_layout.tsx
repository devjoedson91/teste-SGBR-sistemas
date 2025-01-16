import { AuthProvider } from "@/hooks/AuthContext";
import "../style/global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarTranslucent: true,
          statusBarBackgroundColor: "#0062fe",
          statusBarStyle: "light",
        }}
      />
    </AuthProvider>
  );
}
