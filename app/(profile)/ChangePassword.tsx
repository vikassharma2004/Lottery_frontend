import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function ChangePassword() {
      const router = useRouter(); // navigation handler
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    // 🔹 Send request to server here
    alert("Password changed successfully!");
  };

  const renderPasswordInput = (label: string, value: string, setValue: any, showPassword: boolean, setShowPassword: any) => (
    <View className="mb-10">
      <Text className="text-gray-700 mb-2">{label}</Text>
      <View className="flex-row items-center border border-gray-300 rounded-xl px-4">
        <Ionicons name="lock-closed-outline" size={20} color={COLORS.TEXT_SECONDARY} />
        <TextInput
          className="ml-2 flex-1 py-4"
          placeholder={label}
          secureTextEntry={!showPassword}
          value={value}
          onChangeText={setValue}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color={COLORS.TEXT_SECONDARY} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8E7]">
         
      <KeyboardAvoidingView className="flex-1 bg-[#FFF8E7]" behavior="padding">
        <ScrollView contentContainerStyle={{ padding: 15 }}>
              {/* Back arrow */}
              <View className="flex flex-row items-center mb-8  ">

        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-800 ">Change Password</Text>
              </View>

          {renderPasswordInput("Old Password", oldPassword, setOldPassword, showOldPassword, setShowOldPassword)}
          {renderPasswordInput("New Password", newPassword, setNewPassword, showNewPassword, setShowNewPassword)}
          {renderPasswordInput("Confirm New Password", confirmPassword, setConfirmPassword, showConfirmPassword, setShowConfirmPassword)}

          {/* Change Password Button */}
          <TouchableOpacity
            className="bg-[#FFB800] py-3 rounded-xl items-center mt-4"
            onPress={handleChangePassword}
          >
            <Text className="text-black font-bold text-lg">Change Password</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
