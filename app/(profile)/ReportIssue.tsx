import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker"; // ✅ install: expo install @react-native-picker/picker
import { useReportIssue } from "@/hooks/Auth";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/components/ToastConfig";
import { useUserStore } from "@/store/AuthStore";

export default function ReportIssue() {
  const router = useRouter();
  const {user}=useUserStore();
 const { mutateAsync: submitReport, isPending } = useReportIssue();
  const [email, setEmail] = useState(user?.email|| "");
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");

const handleSubmit = async () => {
  if (!issueType || !description.trim() || (!email.trim() && !issueType)) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Please fill in all required fields",
      position: "top",
      visibilityTime: 3000,
    });
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Please enter a valid email address",
      position: "top",
      visibilityTime: 3000,
    });
    return;
  }


    const payload = {
      email: email || null,
      issueType,
      description,
    };

    const data = await submitReport(payload);
    if (data?.success) {
  
      setEmail("");
      setIssueType("");
      setDescription("");
    }
  
};
  return (
    <SafeAreaView className="flex-1 bg-[#FFF8E7]">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Header */}
        <View className="flex flex-row items-center mb-8">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-800 ml-2">
            Help & Support
          </Text>
        </View>

        {/* Email Field */}
        <View className="mb-6">
          <Text className="text-gray-700 mb-2">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#888"
            className="border border-gray-300 rounded-xl p-4 text-gray-800 bg-white"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
          <View className="mb-6">
            <Text className="text-gray-700 mb-2 text-base font-medium">
              Issue Type
            </Text>

            <View
              style={{
                borderWidth: 1.5,
                borderColor: "#E5E7EB", // light gray border
                borderRadius: 14, // smooth roundness
                backgroundColor: "#FFFFFF", // white background
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 2, // Android shadow
                height: 55,
                justifyContent: "center",
                paddingHorizontal: 12,
              }}
            >
              <Picker
                selectedValue={issueType}
                onValueChange={(value) => setIssueType(value)}
                dropdownIconColor="#777"
                mode="dropdown"
                style={{
                  color: issueType ? "#111" : "#999",
                  fontSize: 16,
                  fontWeight: "500",
                  marginLeft: Platform.OS === "android" ? -8 : 0,
                }}
                itemStyle={{
                  fontSize: 16,
                  color: "#111",
                }}
              >
                <Picker.Item
                  label="Select an issue type..."
                  value=""
                  color="#999"
                />
                <Picker.Item label="Refund" value="refund" />
                <Picker.Item label="Technical" value="technical" />
                <Picker.Item label="Bug" value="bug" />
                <Picker.Item label="Payment" value="payment" />
                <Picker.Item label="Account" value="account" />
                <Picker.Item label="Content" value="content" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>
          </View>
     

        {/* Description Field */}
        <View className="mb-6">
          <Text className="text-gray-700 mb-2">Description</Text>
          <TextInput
            multiline
            value={description}
            onChangeText={setDescription}
            placeholder="Describe your issue..."
            placeholderTextColor="#888"
            className="border border-gray-300 rounded-xl p-4 text-gray-800 bg-white"
            style={{ minHeight: 120, textAlignVertical: "top" }}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          disabled={!issueType || !description.trim()}
          className={`py-3 rounded-xl items-center mt-4 ${
            !issueType || !description.trim() ? "bg-gray-400" : "bg-[#FFB800]"
          }`}
          onPress={handleSubmit}
        >
          <Text className="text-black font-bold text-lg">{isPending ? <ActivityIndicator size="small" color="black" /> : "Submit"}</Text>
        </TouchableOpacity>
      </ScrollView>
      <Toast config={toastConfig}/>
    </SafeAreaView>
  );
}
