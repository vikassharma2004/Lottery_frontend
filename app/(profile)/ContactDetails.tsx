import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function ContactDetails() {
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    createdAt: "2025-10-24T15:30:57.314Z",
    email: "vikasfixel@gmail.com",
    hasPaid: false,
    id: "68fb9bb19639608f4fec974d",
    isSuspended: false,
    isVerified: true,
    referralCode: null,
    referralCount: 0,
    role: "admin",
    successfulReferrals: 0,
    ticketCount: 0,
    walletBalance: 0,
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View className="items-center mt-6">
          <View className="relative">
            <Image
              source={{
                uri: "https://i.pravatar.cc/150?img=12",
              }}
              className="w-28 h-28 rounded-full border-4 border-blue-500"
            />
            <TouchableOpacity
              onPress={handleEditToggle}
              className="absolute bottom-0 right-1 bg-blue-500 p-2 rounded-full shadow"
            >
              <Ionicons
                name={isEditing ? "checkmark" : "create-outline"}
                size={18}
                color="white"
              />
            </TouchableOpacity>
          </View>

          <Text className="text-2xl font-bold text-gray-800 mt-4">
            {user.email.split("@")[0]}
          </Text>
          <Text className="text-gray-500 capitalize">{user.role}</Text>

          <View className="mt-3 bg-blue-50 px-4 py-2 rounded-full flex-row items-center">
            <Ionicons name="wallet-outline" size={16} color="#2563EB" />
            <Text className="ml-2 text-blue-600 font-semibold">
              ₹{user.walletBalance}
            </Text>
          </View>
        </View>

        {/* Profile Info Card */}
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          className="mt-8 bg-gray-50 rounded-2xl p-5 shadow-sm border border-gray-200"
        >
          {/* Email */}
          <View className="mb-5">
            <Text className="text-gray-500 mb-1">Email</Text>
            {isEditing ? (
              <TextInput
                value={user.email}
                onChangeText={(val) => handleChange("email", val)}
                className="border border-gray-300 rounded-xl p-3 text-gray-800"
                keyboardType="email-address"
              />
            ) : (
              <Text className="text-gray-800 font-semibold">{user.email}</Text>
            )}
          </View>

          {/* Referral Code */}
          <View className="mb-5">
            <Text className="text-gray-500 mb-1">Referral Code</Text>
            <Text className="text-gray-800 font-semibold">
              {user.referralCode || "Not generated"}
            </Text>
          </View>

          {/* Tickets */}
          <View className="mb-5">
            <Text className="text-gray-500 mb-1">Ticket Count</Text>
            <Text className="text-gray-800 font-semibold">
              {user.ticketCount}
            </Text>
          </View>

          {/* Verification */}
          <View className="mb-5">
            <Text className="text-gray-500 mb-1">Verification</Text>
            <Text
              className={`font-semibold ${
                user.isVerified ? "text-green-600" : "text-red-500"
              }`}
            >
              {user.isVerified ? "Verified" : "Not Verified"}
            </Text>
          </View>

          {/* Status */}
          <View>
            <Text className="text-gray-500 mb-1">Account Status</Text>
            <Text
              className={`font-semibold ${
                user.isSuspended ? "text-red-500" : "text-green-600"
              }`}
            >
              {user.isSuspended ? "Suspended" : "Active"}
            </Text>
          </View>
        </Animated.View>

        {/* Save Changes Button */}
        {isEditing && (
          <TouchableOpacity
            onPress={handleEditToggle}
            className="mt-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl py-4 shadow-lg"
          >
            <Text className="text-center text-white font-bold text-lg">
              Save Changes
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
