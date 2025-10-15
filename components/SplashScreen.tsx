import React from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";

const SplashScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-[#FFF8E7]">
      <Image
        source={require("../assets/images/logo.png")} // replace with your logo
        className="w-48 h-48"
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#FFB800" className="mt-5" />
      <Text className="mt-3 text-gray-800 text-lg font-semibold">Loading...</Text>
    </View>
  );
};

export default SplashScreen;
