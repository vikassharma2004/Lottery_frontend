import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store/AuthStore";
import SplashScreen from "@/components/SplashScreen";
import "../global.css";

export default function Index() {
  const router = useRouter();
  const { token, hydrated, user } = useUserStore();
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    if (!hydrated) return;

    // Only redirect once
    if (token) {
      if (user?.role === "admin") {
        router.replace("/Dashboard");
      } else {
        router.replace("/Home");
      }
    }
    setBooting(false); // done with routing
  }, [hydrated, token, user, router]);

  // Show splash screen until hydration and routing decision
  if (!hydrated || booting) return <SplashScreen />;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top image */}
      <View className="items-center mt-10">
        <Image
          source={require("../assets/images/landing.png")}
          className="w-full h-[330px]"
          resizeMode="cover"
        />
      </View>

      {/* Content section */}
      <View className="flex-1 px-6 justify-center items-center">
        <Text className="text-4xl font-bold text-[#212121] mb-6 text-center">
          Welcome to Refer n Earn
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/SignUp")}
          className="bg-yellow-500 py-4 rounded-xl mb-4 w-full"
        >
          <Text className="text-center text-black font-bold text-lg">
            Get Started
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/Login")}
          className="border border-black py-4 rounded-xl w-full"
        >
          <Text className="text-center text-black font-bold text-lg">
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
