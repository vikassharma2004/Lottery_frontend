import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import COLORS from "@/constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useVerifyOtp,useGenerateOtp } from "@/hooks/Auth";
const OtpVerify: React.FC = () => {
  const { email, action } = useLocalSearchParams<{ email: string; action: string }>(); // keep lowercase since router params are lowercase
  const router = useRouter();

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState<number>(0);
  const inputs = useRef<(TextInput | null)[]>([]);

  // ✅ Correct usage of React Query hooks
  const { mutateAsync: verifyOtp, isPending: isVerifying } = useVerifyOtp();
  const { mutateAsync: generateOtp, isPending: isGenerating } = useGenerateOtp();

 // Countdown logic
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => Math.max(prev - 1, 0)), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Handle OTP change
  const handleChange = (text: string, index: number) => {
    const cleanText = text.replace(/[^0-9]/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = cleanText;
    setOtp(newOtp);

    if (cleanText && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // ✅ Verify OTP
  const handleVerify = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length < 6) {
      Toast.show({
        type: "info",
        text1: "Please enter the complete 6-digit OTP",
      });
      return;
    } try {
      console.log("Verifying OTP for email:", email, "with OTP:", enteredOtp);
       await verifyOtp({ email, otp: enteredOtp, type: action }); // ✅ Correct payload
      Toast.show({
        type: "success",
        text1: "OTP verified successfully",
      });
      router.replace("/Login");
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: err?.response?.data?.message || "Invalid OTP. Please try again.",
      });
    }
  };

  // ✅ Resend OTP
  const handleResend = async () => {
    try {
    const data=  await generateOtp({ email, type: action }); // ✅ Correct payload
    console.log("Resent OTP for email:", email, "with OTP:", data);
       Toast.show({
        type: "success",
        text1: "OTP resent successfully",
      });
      setTimer(60);
     
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Failed to resend OTP. Try again later.",
      });
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
             placeholderTextColor="#999999" // explicit color
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
            otp.join("").length < 6 || isVerifying
              ?  "#ccc"
              : COLORS.PRIMARY,
        }}
        onPress={handleVerify}
        disabled={isVerifying || otp.join("").length < 6}
      >
        {isVerifying ? (
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
          className={`text-right text-[#212121] text-sm font-bold ${
            timer > 0 ? "text-gray-500" : "text-blue-500"
          }`}
        >
          {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default OtpVerify;
