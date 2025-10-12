import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function ContactDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    email: "user@example.com",
    phone: "+91 9876543210",
    paymentStatus: "Paid",
    emailVerified: true,
    tickets: 3,
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (field: keyof typeof user, value: string) => {
    setUser({ ...user, [field]: value });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-2xl font-bold text-gray-800">Profile Details</Text>

          <TouchableOpacity
            onPress={handleEditToggle}
            className="bg-blue-500 px-4 py-2 rounded-xl flex-row items-center active:bg-blue-600"
          >
            <Ionicons
              name={isEditing ? "checkmark-circle-outline" : "create-outline"}
              size={18}
              color="white"
            />
            <Text className="text-white ml-2 font-semibold">
              {isEditing ? "Save" : "Edit"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View className="bg-gray-50 rounded-2xl p-5 shadow-sm border border-gray-200">
          {/* Email */}
          <View className="mb-4">
            <Text className="text-gray-500 mb-1">Email</Text>
            {isEditing ? (
              <TextInput
                value={user.email}
                onChangeText={(val) => handleChange("email", val)}
                className="border border-gray-300 rounded-xl p-2 text-gray-800"
                keyboardType="email-address"
              />
            ) : (
              <Text className="text-gray-800 font-semibold">{user.email}</Text>
            )}
          </View>

          {/* Phone */}
          <View className="mb-4">
            <Text className="text-gray-500 mb-1">Phone</Text>
            {isEditing ? (
              <TextInput
                value={user.phone}
                onChangeText={(val) => handleChange("phone", val)}
                className="border border-gray-300 rounded-xl p-2 text-gray-800"
                keyboardType="phone-pad"
              />
            ) : (
              <Text className="text-gray-800 font-semibold">{user.phone}</Text>
            )}
          </View>

          {/* Payment Status */}
          <View className="mb-4">
            <Text className="text-gray-500 mb-1">Payment Status</Text>
            <Text
              className={`font-semibold ${
                user.paymentStatus === "Paid" ? "text-green-600" : "text-red-500"
              }`}
            >
              {user.paymentStatus}
            </Text>
          </View>

          {/* Email Verified */}
          <View className="mb-4">
            <Text className="text-gray-500 mb-1">Email Verified</Text>
            <Text
              className={`font-semibold ${
                user.emailVerified ? "text-green-600" : "text-red-500"
              }`}
            >
              {user.emailVerified ? "Verified" : "Not Verified"}
            </Text>
          </View>

          {/* Ticket Purchased */}
          <View>
            <Text className="text-gray-500 mb-1">Tickets Purchased</Text>
            <Text className="text-gray-800 font-semibold">{user.tickets}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
