import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import landing from "../assets/images/landing.png"; // adjust path if needed
import "../global.css";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white h-full">

      {/* Image at the top */}
      <View className="items-center mt-10  ">
        <Image
          source={landing}
          className="w-full h-[330px]"
          resizeMode="cover"
        />
      </View>

      {/* Content below image */}
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
