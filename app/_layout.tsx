import { AuthProvider } from "@/data/contexts/AuthContext";
import "../style/global.css";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
