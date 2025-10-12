import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import COLORS from "@/constants/Colors";

const OtpVerify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text.slice(-1); // only take last char
    setOtp(newOtp);

    // Move to next input
    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    console.log("OTP entered:", otp.join(""));
  };

  const handleResend = () => {
    console.log("Resend OTP");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 justify-center px-6 bg-[#FFF8E7]"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text className="text-3xl font-bold text-center mb-4" style={{ color: COLORS.TEXT }}>
        OTP Verification
      </Text>
      <Text className="text-center mb-8 text-gray-600" style={{ color: COLORS.TEXT_SECONDARY }}>
        Enter the 6-digit OTP sent to your mobile number
      </Text>

      <View className="flex-row justify-between mb-8">
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            value={value}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleBackspace(e, index)}
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

      <TouchableOpacity
        className="rounded-xl py-3 mb-4"
        style={{ backgroundColor: COLORS.PRIMARY }}
        onPress={handleVerify}
      >
        <Text className="text-center text-[#212121] text-lg font-bold">Verify OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleResend}>
        <Text className="text-center text-red-500 text-lg">Resend OTP</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default OtpVerify;
