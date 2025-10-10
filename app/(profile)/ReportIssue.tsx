import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ReportIssue() {
    const router=useRouter()
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"pending">("pending");

  const handleSubmit = () => {
    if (!issueType.trim() || !description.trim()) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      issueType,
      description,
      status,
    };
    console.log("Submitting issue:", payload);
    alert("Issue submitted successfully!");

    // Reset form
    setIssueType("");
    setDescription("");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8E7]">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View className="flex flex-row items-center mb-8  ">

         {/* Back arrow */}
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-800 ">
          Report Issue
        </Text>
        </View>

        {/* Issue Type */}
        <View className="mb-6">
          <Text className="text-gray-700 mb-2">Issue Type</Text>
          <TextInput
            value={issueType}
            onChangeText={setIssueType}
            placeholder="Enter issue type (e.g. refund, technical)"
            className="border border-gray-300 rounded-xl p-4 text-gray-800"
          />
        </View>

        {/* Description */}
        <View className="mb-6">
          <Text className="text-gray-700 mb-2">Description</Text>
          <TextInput
            multiline
            value={description}
            onChangeText={setDescription}
            placeholder="Describe your issue..."
            className="border border-gray-300 rounded-xl p-4 text-gray-800"
            style={{ minHeight: 120, textAlignVertical: "top" }}
          />
        </View>

        

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-[#FFB800] py-3 rounded-xl items-center mt-4"
          onPress={handleSubmit}
        >
          <Text className="text-black font-bold text-lg">Submit Issue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
