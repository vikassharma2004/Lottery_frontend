import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { useRouter } from "expo-router";
import COLORS from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useSendResetToken, useResetPassword } from "@/hooks/Auth";
import Toast from "react-native-toast-message";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputs = useRef([]);

  const { mutateAsync: sendResetToken, isPending: sendingOtp } =
    useSendResetToken();
  const { mutateAsync: resetPassword, isPending: resetting } =
    useResetPassword();
  const router = useRouter();

  // Countdown timer
  useEffect(() => {
    let interval;
    if (timer > 0) interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // --- Handlers ---
  const handleSendOtp = async () => {
    if (!email.trim()) {
      Toast.show({ type: "error", text1: "Please enter your email" });
      return;
    }
    try {
      const data = await sendResetToken({ email });
      if (data?.success) {
        console.log("OTP sent successfully!", data);
        Toast.show({ type: "success", text1: "OTP sent successfully!" });
        setStep(2);
        setTimer(60);
      }
    } catch {
      Toast.show({ type: "error", text1: "Failed to send OTP" });
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0) return;
    await handleSendOtp();
  };

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 5) inputs.current[index + 1].focus();
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleResetPassword = async () => {
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      Toast.show({ type: "error", text1: "Enter a valid 6-digit OTP" });
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      Toast.show({
        type: "error",
        text1: "Password must be at least 6 characters",
      });
      return;
    }

    try {
      const data = await resetPassword({
        otp: otpValue,
        password: newPassword,
        email,
      });
      if (data?.success) {
        Toast.show({ type: "success", text1: "Password reset successful!" });
        router.replace("/Login");
      } else {
        Toast.show({
          type: "error",
          text1: data?.message || "Failed to reset password",
        });
      }
    } catch {
      Toast.show({ type: "error", text1: "Something went wrong" });
    }
  };

  // --- UI ---
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.BACKGROUND }}>
      <TouchableOpacity
        onPress={() => (step === 1 ? router.back() : setStep(1))}
        className="flex-row items-center px-4 py-2 mb-2"
      >
        <Ionicons name="arrow-back" size={22} color={COLORS.TEXT} />
        <Text
          className="ml-2 text-base font-medium"
          style={{ color: COLORS.TEXT }}
        >
          {step === 1 ? "Back" : "Edit Email"}
        </Text>
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingHorizontal: 20,
            paddingBottom: 40,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center mb-8">
            <Image
              source={require("../../assets/images/resetpassword.png")}
              className="w-full h-72"
              resizeMode="contain"
            />
          </View>
          {step === 1 && (
            <>
              <Text
                className="text-3xl font-bold text-center mb-4"
                style={{ color: COLORS.TEXT }}
              >
                Reset Password
              </Text>
              <Text
                className="text-center mb-8"
                style={{ color: COLORS.TEXT_SECONDARY }}
              >
                Enter your email to receive an OTP
              </Text>

              <TextInput
                className="border rounded-xl bg-white py-3 px-4 mb-6 text-lg"
                placeholder="Enter your email"
                placeholderTextColor={COLORS.TEXT_SECONDARY}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TouchableOpacity
                className="rounded-xl py-3"
                style={{
                  backgroundColor:
                    sendingOtp || !email.trim() ? "#C8C8C8" : COLORS.PRIMARY,
                }}
                onPress={handleSendOtp}
                disabled={sendingOtp || !email.trim()}
              >
                {sendingOtp ? (
                  <ActivityIndicator color="#000" />
                ) : (
                  <Text className="text-[#212121] text-center text-lg font-bold">
                    Send OTP
                  </Text>
                )}
              </TouchableOpacity>
            </>
          )}

          {step === 2 && (
            <>
              <Text
                className="text-3xl font-bold text-center mb-4"
                style={{ color: COLORS.TEXT }}
              >
                Verify OTP
              </Text>
              <Text
                className="text-center mb-8"
                style={{ color: COLORS.TEXT_SECONDARY }}
              >
                Enter the 6-digit OTP sent to {email}
              </Text>

              <View className="flex-row justify-between mb-8">
                {otp.map((value, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (inputs.current[index] = ref)}
                    value={value}
                    placeholder="•"
                    placeholderTextColor="#999"
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    className="border rounded-xl text-center text-xl"
                    style={{
                      borderColor: COLORS.BORDER,
                      backgroundColor: COLORS.CARD,
                      color: COLORS.TEXT,
                      width: 50,
                      height: 50,
                      shadowColor: COLORS.SHADOW,
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.2,
                      shadowRadius: 2,
                      elevation: 2,
                    }}
                  />
                ))}
              </View>

              {/* New Password Input */}
              <View className="relative mb-6">
                <TextInput
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="Enter new password"
                  placeholderTextColor={COLORS.TEXT_SECONDARY}
                  secureTextEntry={!showPassword}
                  className="border rounded-xl bg-white py-3 px-4 text-lg pr-10"
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

              {/* Reset Password Button */}
              <TouchableOpacity
                className="rounded-xl py-3 mb-4"
                style={{
                  backgroundColor: resetting ? "#C8C8C8" : COLORS.PRIMARY,
                }}
                onPress={handleResetPassword}
                disabled={resetting}
              >
                {resetting ? (
                  <ActivityIndicator color="#000" />
                ) : (
                  <Text className="text-[#212121] text-center text-lg font-bold">
                    Reset Password
                  </Text>
                )}
              </TouchableOpacity>

              {/* Resend OTP Button */}
              <TouchableOpacity
                className="rounded-xl py-3"
                style={{
                  backgroundColor: timer > 0 ? "#ccc" : COLORS.PRIMARY,
                }}
                onPress={handleResendOtp}
                disabled={timer > 0}
              >
                <Text className="text-[#212121] text-center text-lg font-bold">
                  {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPassword;
