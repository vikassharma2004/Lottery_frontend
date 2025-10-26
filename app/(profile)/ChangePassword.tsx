import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useChangePassword } from "@/hooks/Auth";
import Toast from "react-native-toast-message";

export default function ChangePassword() {
  const router = useRouter();

  // ✅ Use camelCase to match backend
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: changePassword, isPending } = useChangePassword();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all fields.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Passwords do not match.",
      });
      return;
    }

    // ✅ Pass camelCase keys
    await changePassword({ oldPassword, newPassword });
    // Optionally, you can clear the input fields after successful change
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const renderPasswordInput = (
    label: string,
    value: string,
    setValue: any,
    showPassword: boolean,
    setShowPassword: any
  ) => (
    <View className="mb-10">
      <Text className="text-gray-700 mb-2">{label}</Text>
      <View className="flex-row items-center border border-gray-300 rounded-xl px-4">
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color={COLORS.TEXT_SECONDARY}
        />
        <TextInput
          className="ml-2 flex-1 py-4"
          placeholder={label}
          secureTextEntry={!showPassword}
          value={value}
          onChangeText={setValue}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color={COLORS.TEXT_SECONDARY}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8E7]">
      <KeyboardAvoidingView className="flex-1 bg-[#FFF8E7]" behavior="padding">
        <ScrollView contentContainerStyle={{ padding: 15 }}>
          <View className="flex flex-row items-center mb-8">
            <TouchableOpacity onPress={() => router.back()} className="-p-2 mr-5">
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-gray-800">
              Change Password
            </Text>
          </View>

          {renderPasswordInput(
            "Old Password",
            oldPassword,
            setOldPassword,
            showOldPassword,
            setShowOldPassword
          )}
          {renderPasswordInput(
            "New Password",
            newPassword,
            setNewPassword,
            showNewPassword,
            setShowNewPassword
          )}
          {renderPasswordInput(
            "Confirm New Password",
            confirmPassword,
            setConfirmPassword,
            showConfirmPassword,
            setShowConfirmPassword
          )}

          <TouchableOpacity
            className="bg-[#FFB800] py-3 rounded-xl items-center mt-4"
            onPress={handleChangePassword}
          >
            <Text className="text-black font-bold text-lg">
              {isPending ? <ActivityIndicator color={"black"} /> : "Change Password"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
}
