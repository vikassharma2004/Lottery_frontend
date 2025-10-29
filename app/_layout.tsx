// app/_layout.tsx
import { Stack, useRouter } from "expo-router";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useUserStore } from "../store/AuthStore";
import SplashScreen from "../components/SplashScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useVerifyToken } from "@/hooks/Auth";
import { StatusBar } from "expo-status-bar";
import { toastConfig } from "@/components/ToastConfig";

export const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <RootContent />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const RootContent = () => {
  const hydrated = useUserStore((s) => s.hydrated);
  const token = useUserStore((s) => s.token);
  const setHydrated = useUserStore((s) => s.setHydrated);
  const router = useRouter();
  const { mutate: verifyToken } = useVerifyToken(); // ✅ safe now
  const [ready, setReady] = useState(false);

  // Restore token and verify once
  useEffect(() => {
    const init = async () => {
      try {
        const storedToken = (await AsyncStorage.getItem("auth_token")) || token;
        console.log("Stored token: at _layout", storedToken);
        if (storedToken) {
          verifyToken(); // runs only once
        }
      } catch (err) {
        Toast.show({ type: "error", text1: "Initialization error", text2: "Failed to initialize app" });
      } finally {
        setHydrated();
        setReady(true);
      }
    };
    init();
  }, []);

  // Navigation logic
  useEffect(() => {
    if (!ready) return;

    const user = useUserStore.getState().user;

    if (!token || !user) {
      router.replace("/");
      return;
    }

    if (user.role === "admin") {
      Toast.show({
        type: "error",
        text1: "Access Denied",
        text2: "Admin login prohibited on mobile app.",
      });
      AsyncStorage.removeItem("auth_token");
      useUserStore.getState().logout?.();
      router.replace("/Login");
      return;
    }

    router.replace("/(tabs)/ReferEarn");
  }, [ready, token]);

  if (!hydrated || !ready) return <SplashScreen />;

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8E7]">
      <StatusBar style="dark" backgroundColor="black" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(profile)" options={{ headerShown: false }} />
      </Stack>
      <Toast  config={toastConfig}/>
    </SafeAreaView>
  );
};
