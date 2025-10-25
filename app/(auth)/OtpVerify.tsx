import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import COLORS from "@/constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useUserStore } from "@/store/AuthStore";

const OtpVerify: React.FC = () => {
  const { email,type } = useLocalSearchParams<{ email: string }>(); // typed param
  const router = useRouter();

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);
  const [timer, setTimer] = useState<number>(0);

  const { verifyOtp, loading, generateOtp } = useUserStore();

  // Countdown timer logic
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Handle OTP input changes
  const handleChange = (text: string, index: number) => {
    const cleanText = text.replace(/[^0-9]/g, "").slice(-1); // only digits
    const newOtp = [...otp];
    newOtp[index] = cleanText;
    setOtp(newOtp);

    if (cleanText && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // Verify OTP submission
  const handleVerify = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length < 6) {
      Alert.alert("Error", "Please enter the complete 6-digit OTP.");
      return;
    }

    try {
      let otp=enteredOtp;
      console.log("Verifying OTP for", email, otp);
      const res = await verifyOtp({ email, otp,type });
      if (res) {
        Alert.alert("Success", "OTP verified successfully!");
        router.replace("/Home");
      } else {
        Alert.alert("Error", "Invalid OTP. Please try again.");
      }
    } catch (err) {
      Alert.alert("Error", "Verification failed. Please try again.");
    }
  };

  // Resend OTP
  const handleResend = async () => {
    try {
      await generateOtp(email,type );
      setTimer(30);
      Alert.alert("OTP Sent", "A new OTP has been sent to your email.");
    } catch (err) {
      Alert.alert("Error", "Failed to resend OTP. Try again later.");
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 justify-center px-6 bg-[#FFF8E7]"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text
        className="text-3xl font-bold text-center mb-4"
        style={{ color: COLORS.TEXT }}
      >
        OTP Verification
      </Text>

      <Text
        className="text-center mb-8 text-gray-600"
        style={{ color: COLORS.TEXT_SECONDARY }}
      >
        Enter the 6-digit OTP sent to your email
      </Text>

      <TextInput
        value={email}
        editable={false} // ✅ fixed
        className="border border-gray-300 bg-white px-4 py-4 rounded-xl text-[#212121] mb-5"
      />

      {/* OTP Input Fields */}
      <View className="flex-row justify-between mb-8">
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            value={value}
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

      {/* Verify Button */}
      <TouchableOpacity
        className="rounded-xl py-3 mb-4"
        style={{
          backgroundColor:
            otp.join("").length < 6 || loading
              ?  "#ccc"
              : COLORS.PRIMARY,
        }}
        onPress={handleVerify}
        disabled={loading || otp.join("").length < 6}
      >
        {loading ? (
          <ActivityIndicator color="#212121" />
        ) : (
          <Text className="text-center text-[#212121] text-lg font-bold">
            Verify OTP
          </Text>
        )}
      </TouchableOpacity>

      {/* Resend OTP */}
      <TouchableOpacity
        disabled={timer > 0}
        onPress={handleResend}
        className={`mt-2 ${timer > 0 ? "opacity-50" : "opacity-100"}`}
      >
        <Text
          className={`text-center text-md font-bold ${
            timer > 0 ? "text-gray-500" : "text-red-500"
          }`}
        >
          {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default OtpVerify;
