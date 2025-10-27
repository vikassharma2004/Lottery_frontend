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
import {useLogin} from "../../hooks/Auth.js";

export default function Login() {
  const router = useRouter();
  // const { loading, login, user } = useUserStore();
const { mutateAsync: loginUser, isPending } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [screenLoading, setScreenLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Missing fields",
        text2: "Please enter email and password.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Toast.show({
        type: "error",
        text1: "Invalid email",
        text2: "Enter a valid email address.",
      });
      return;
    }

    if (password.length < 6) {
      Toast.show({
        type: "error",
        text1: "Weak password",
        text2: "Password must be at least 6 characters.",
      });
      return;
    }
    setScreenLoading(true);
   const data=  await loginUser({ email, password });
   console.log("Login response data:", data);
    setScreenLoading(false);

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
              className="w-full h-64"
              resizeMode="contain"
            />
          </View>

          {/* Email */}
          <View className="mb-4">
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
               placeholderTextColor="#999999" // explicit color
              autoCapitalize="none"
              className="border border-gray-300 rounded-lg px-4 py-3 text-[#212121] bg-white"
            />
          </View>

          {/* Password */}
          <View className="relative mb-6">
            <TextInput
              value={password}
              onChangeText={setPassword}
               placeholderTextColor="#999999" // explicit color
              placeholder="Password"
              secureTextEntry={!showPassword}
              className="border border-gray-300 rounded-lg px-4 py-3 text-black bg-white"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#777"
              />
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isPending}
            className={`bg-yellow-500 py-4 rounded-xl items-center mb-4 ${
              isPending ? "opacity-70" : ""
            }`}
          >
            <Text className="text-black font-bold text-lg">
              {isPending ? <ActivityIndicator color="black" /> : "Login"}
            </Text>
          </TouchableOpacity>

          {/* Bottom Links */}
          <View className="flex-row justify-between mt-2">
            <TouchableOpacity onPress={() => router.push("/SignUp")}>
              <Text className="text-[#43A047] font-semibold text-sm">
                Don't have an account?{" "}
                <Text className="text-[#FFB800] underline">Sign Up</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/ResetPassword")}>
              <Text className="text-[#FFB800] font-semibold text-sm">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
}
