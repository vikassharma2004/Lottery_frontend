import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import COLORS from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";

const OtpVerify = () => {
    const { email } = useLocalSearchParams(); // email is available here
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<TextInput[]>([]);
  const [timer, setTimer] = useState(0); // countdown timer
  // Countdown logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text.slice(-1); // only last char
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    console.log("OTP entered:", enteredOtp);
    // TODO: call verify OTP API here
  };

  const handleResend = () => {
    console.log("Resend OTP");
    // TODO: call resend OTP API here
    setTimer(30); // start 30 second countdown
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
        Enter the 6-digit OTP sent to your mobile number
      </Text>
        <TextInput
                      value={email}
                      readOnly={true}
                    
                      placeholder="Email"
                      className="border border-gray-300 bg-white px-4 py-4 rounded-xl text-[#212121] mb-5"
                    />

      <View className="flex-row justify-between mb-8">
        
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref!)}
            value={value}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleBackspace(e, index)}
            keyboardType="email-address"
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

      <TouchableOpacity
        className="rounded-xl py-3 mb-4"
        style={{ backgroundColor: COLORS.PRIMARY }}
        onPress={handleVerify}
      >
        <Text className="text-center text-[#212121] text-lg font-bold">
          Verify OTP
        </Text>
      </TouchableOpacity>

      {/* Resend OTP button */}
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
          {timer > 0
            ? `Resend OTP in ${timer}s`
            : "Resend OTP"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default OtpVerify;
