import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { useUserStore } from "../../store/AuthStore";

export default function Login() {
  const router = useRouter();
  const { loading, login } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Missing fields",
        text2: "Please enter email and password.",
      });
      return;
    }
    // Email basic regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Toast.show({
        type: "error",
        text1: "Invalid email",
        text2: "Please enter a valid email address.",
      });
      return;
    }
    if (password.length < 6) {
      Toast.show({
        type: "error",
        text1: "Invalid password",
        text2: "Password must be at least 6 characters long.",
      });
      return;
    }
    const res = await login({ email, password });

    if (!res) return; // STOP here if login failed
    if (!res || res.error) {
      // Handle special cases
      if (res?.message === "User email not verified") {
        router.push({
          pathname: "/OtpVerify",
          params: { email: email },
        });
        return;
      }
      if (res?.message === "Account suspended. Contact support.") {
        Toast.show({ type: "error", text1: res.message });
        return; // Stop login
      }
      Toast.show({ type: "error", text1: res?.message || "Login failed" });
      return;
    }
    setTimeout(() => {
      if (res.user?.role !== "admin") {
        router.replace("/Home");
      } else {
        router.replace("/Dashboard");
      }
    }, 2000); // 2000ms = 2 seconds;
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8E7]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            padding: 24,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Image */}
          <View className="items-center mb-10">
            <Image
              source={require("../../assets/images/Auth.png")}
              className="w-full h-72"
              resizeMode="contain"
            />
          </View>

          {/* Email Input */}
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-[#212121]"
          />

          {/* Password Input with toggle */}
          <View className="relative mb-4">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry={!showPassword}
              className="border border-gray-300 rounded-lg px-4 py-3 text-[#212121]"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            className={`bg-yellow-500 py-4 rounded-xl mb-4 w-full items-center ${
              loading ? "opacity-50" : ""
            }`}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-black font-bold text-lg">Login</Text>
            )}
          </TouchableOpacity>

          {/* Signup Link */}
          <TouchableOpacity
            onPress={() => router.push("/SignUp")}
            className="items-center mt-2"
          >
            <Text className="text-[#43A047] font-semibold text-center">
              Don't have an account?{" "}
              <Text className="text-[#FFB800] underline">Sign Up</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/OtpVerify")}
            className="items-center mt-2"
          >
            <Text className="text-[#43A047] font-semibold text-center">
              Don't have an account?{" "}
              <Text className="text-[#FFB800] underline">Sign Up</Text>
            </Text>
          </TouchableOpacity>

          <Toast />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
