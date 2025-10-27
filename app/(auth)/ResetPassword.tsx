import React, { useState } from "react";
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
import { Image } from "react-native";
import { useRouter } from "expo-router";
import COLORS from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useSendResetToken } from "@/hooks/Auth";
import Toast from "react-native-toast-message";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const { mutateAsync: sendResetToken, isPending } = useSendResetToken();
  const router = useRouter();

  const handleReset = async () => {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Please enter your email address",
      });
      return;
    }

    const data = await sendResetToken({ email });
    if (data?.success) {
      router.push({
        pathname: "/OtpVerify",
        params: { email },
      });
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => router.back()}
        className="mt-10  px-3 flex-row items-center bg-[#FFF8E7] rounded-full"
      >
        <Ionicons name="arrow-back" size={24} color={COLORS.TEXT} />
      </TouchableOpacity>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: COLORS.BACKGROUND }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingHorizontal: 20,
            paddingVertical: 40,
          }}
        >
          <View className="items-center mb-8">
            <Image
              source={require("../../assets/images/resetpassword.png")}
              className="w-full h-72"
            />
          </View>

          <Text
            className="text-3xl font-bold text-center mb-6"
            style={{ color: COLORS.TEXT }}
          >
            Reset Password
          </Text>
          <Text
            className="text-center mb-8 text-gray-600"
            style={{ color: COLORS.TEXT_SECONDARY }}
          >
            Enter your email address to receive an OTP for password reset
          </Text>

          <TextInput
            className="border border-gray-300 rounded-xl bg-white py-3 px-4 mb-6 text-gray-800 text-lg"
            placeholder="Enter your email"
            placeholderTextColor={COLORS.TEXT_SECONDARY}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity
            className="rounded-xl py-3"
            style={{ backgroundColor: COLORS.PRIMARY }}
            onPress={handleReset}
          >
            <Text className="text-[#212121] text-center text-lg font-bold">
              {isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                "Reset Password"
              )}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default ResetPassword;
