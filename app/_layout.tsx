import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useUserStore } from "../store/AuthStore";
import SplashScreen from "../components/SplashScreen";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const queryClient = new QueryClient();

export default function RootLayout() {
  const hydrated = useUserStore((s) => s.hydrated);
  const token = useUserStore((s) => s.token);
  const restoreSession = useUserStore((s) => s.restoreSession);
  const setHydrated = useUserStore((s) => s.setHydrated);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  // ✅ Always call hooks unconditionally
  useEffect(() => {
    const init = async () => {
      try {
        const token = await AsyncStorage.getItem("auth_token");
        console.log(token);
        await restoreSession(); // Restore token/user from storage
      } catch (err) {
        console.warn("Failed to restore session", err);
      } finally {
        setHydrated(); // Flip Zustand hydrated flag
        setReady(true); // Ready to navigate
      }
    };
    init();
  }, []);

  // ✅ Navigation effect
  useEffect(() => {
    if (!ready) return;
    // Instead of router.replace, use router.push inside useEffect
    if (!token) {
      router.push("/index"); // safe navigation
    }
    console.log(token);
    const user = useUserStore.getState().user; // direct access (no re-render)


    if (!user) return; // still restoring
    if (user.role !== "admin") {
      router.push("/(tabs)/Home"); // safe navigation
    } else {
      router.push("/(tabs)/Dashboard");
    }
  }, [ready, token, router]);

  // ✅ Conditional rendering only, not hooks
  if (!hydrated || !ready) {
    return <SplashScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView className="flex-1 bg-[#FFF8E7]">
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(profile)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
