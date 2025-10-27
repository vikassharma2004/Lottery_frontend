import React, { act, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Link, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/components/ToastConfig";
import "../../global.css";
import { useUserStore } from "@/store/AuthStore";

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const { register, loading } = useUserStore();

  const handleSubmit = async () => {
    // Trim inputs
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedReferral = referralCode.trim();

    // Validation
    if (!trimmedEmail || !trimmedPassword) {
      Toast.show({
        type: "error",
        text1: "Missing fields",
        text2: "Email and password are required.",
      });
      return;
    }

    // Email basic regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      Toast.show({
        type: "error",
        text1: "Invalid email",
        text2: "Please enter a valid email address.",
      });
      return;
    }
    if (trimmedPassword.length < 6) {
      Toast.show({
        type: "error",
        text1: "Invalid password",
        text2: "Password must be at least 6 characters long.",
      });
      return;
    }
    if (trimmedReferral !== "" && trimmedReferral.length < 8) {
      Toast.show({
        type: "error",
        text1: "Invalid referral code",
        text2: "Referral code must be at least 8 characters long.",
      });
    }

    const res = await register({
      email: trimmedEmail,
      password: trimmedPassword,
      referralCode: trimmedReferral,
    });
    if (res) {
      setEmail("");
      setPassword("");
      setReferralCode("");
      router.push({
        pathname: "/OtpVerify",
        params: { email: trimmedEmail, action: "VerifyEmail" },
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ height: "100%" }}
      keyboardShouldPersistTaps="handled"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 "
      >
        <SafeAreaView className="flex-1 h-full bg-[#FFF8E7] px-6 justify-center">
          {/* Top image */}
          <View className="items-center ">
            <Image
              source={require("../../assets/images/Auth.png")}
              className="w-full h-72"
              resizeMode="cover"
            />
          </View>

          {/* Form */}
          <View className="flex  space-y-4">
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#999999" // explicit color
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              className="border border-[#BDBDBD] rounded-lg px-4 py-3 text-[#212121] mb-5"
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#999999" // explicit color
              placeholder="Password"
              secureTextEntry
              className="border border-[#BDBDBD] rounded-lg px-4 py-3 text-[#212121] mb-5"
            />
            <TextInput
              value={referralCode}
              onChangeText={setReferralCode}
              placeholder="Referral Code (optional)"
              placeholderTextColor="#999999" // explicit color
              maxLength={8}
              className="border border-[#BDBDBD] rounded-lg px-4 py-3 text-[#212121] mb-5"
            />

            <TouchableOpacity
              disabled={loading}
              onPress={handleSubmit}
              className={`rounded-lg py-3 items-center ${
                loading ? "bg-gray-400" : "bg-[#FFB800]"
              }`}
            >
              {loading ? (
                <ActivityIndicator color="black" />
              ) : (
                <Text className="text-black font-bold text-lg">Submit</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Login link */}
          <TouchableOpacity className="mt-6 items-center">
            <Text className="text-[#43A047] font-semibold">
              Already have an account?{" "}
              <Link href="/Login" className="text-[#FFB800] underline">
                Login
              </Link>
            </Text>
          </TouchableOpacity>

          <Toast />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SignUp;
